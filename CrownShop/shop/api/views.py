from django.conf import settings
from django.core.exceptions import ObjectDoesNotExist
from django.shortcuts import render, get_object_or_404
from django.utils import timezone

from rest_framework.generics import ListAPIView, RetrieveAPIView 
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.status import HTTP_200_OK, HTTP_400_BAD_REQUEST
from shop.models import (
    Item, 
    OrderItem, 
    Order, 
    Payment, 
    Address, 
    Coupon, 
    Refund, 
    UserProfile)
from .serializers import ItemSerializer, OrderSerializer

import stripe

stripe.api_key = settings.STRIPE_SECRET_KEY

class ItemListView(ListAPIView):
    permission_classes = (AllowAny, ) 
    serializer_class = ItemSerializer
    queryset = Item.objects.all()

class AddToCartView(APIView): 
    def post(self, request, *args, **kwargs):
        slug = request.data.get('slug', None)
        if slug is None: 
            return Response({"message": "Invalid request"}, status=HTTP_400_BAD_REQUEST)
        item = get_object_or_404(Item, slug=slug)
        order_item, created = OrderItem.objects.get_or_create(item=item, user=request.user, ordered=False)
        order_qs = Order.objects.filter(user=request.user, ordered=False)
        if order_qs.exists():
            order = order_qs[0]

            if order.items.filter(item__slug=item.slug).exists():
                order_item.quantity += 1
                order_item.save()
                return Response(status=HTTP_200_OK)
            else:
                order.items.add(order_item)
                return Response(status=HTTP_200_OK)

        else:
            ordered_date = timezone.now()
            order = Order.objects.create(user=request.user, ordered_date=ordered_date)
            order.items.add(order_item)
 
            return Response(status=HTTP_200_OK)

class OrderDetailView(RetrieveAPIView): 
    serializer_class = OrderSerializer
    permission_classes = (IsAuthenticated, )

    def get_object(self): 
        try: 
            order = Order.objects.get(user=self.request.user, ordered=False)
            return order
        except ObjectDoesNotExist: 
            return Response({"messege": "You do not have an active order"})
            #return Response({"messege": "You do not have an active order"}, status=HTTP_400_BAD_REQUEST)

class PaymentView(APIView): 

    def post(self, request, *args, **kwargs):
        order = Order.objects.get(user=self.request.user, ordered=False)
        # userprofile = UserProfile.objects.get(user=self.request.user)
        token = request.data.get('stripeToken')
        print('STRIPE TOKEN: ', token)
        # print(f'TOKEN: {token}') 
        amount = int(order.get_total() * 100)

        
        # if userprofile.stripe_customer_id != '' and userprofile.stripe_customer_id is not None:
        #     customer = stripe.Customer.retrieve(
        #         userprofile.stripe_customer_id)
        #     customer.sources.create(source=token)

        # else:
        #     customer = stripe.Customer.create(
        #         email=self.request.user.email,
        #     )
        #     customer.sources.create(source=token)
        #     userprofile.stripe_customer_id = customer['id']
        #     userprofile.one_click_purchasing = True
        #     userprofile.save()

        try:
            charge = stripe.Charge.create(
                amount=amount,
                    currency="usd",
                source=token,
            )

            payment = Payment()
            payment.stripe_charge_id = charge['id']
            payment.user = self.request.user
            payment.amount = order.get_total()
            payment.save()

            order_items = order.items.all()
            order_items.update(ordered=True)
            for item in order_items:
                item.save()

            order.ordered = True
            order.payment = payment
            # order.ref_code = create_ref_code()
            order.save()

            return Response(status=HTTP_200_OK)


        except stripe.error.CardError as e:
            body = e.json_body
            err = body.get('error', {})
            return Response({"message": f"{err.get('message')}"}, status=HTTP_400_BAD_REQUEST)

        except stripe.error.RateLimitError as e:
            # Too many requests made to the API too quickly
            messages.warning(self.request, "Rate limit error")
            return Response({"message": "Rate limit error"}, status=HTTP_400_BAD_REQUEST)

        except stripe.error.InvalidRequestError as e:
            print("INVALID PARAMETERS", e)
            # Invalid parameters were supplied to Stripe's API
            return Response({"message": "Invalid parameters"}, status=HTTP_400_BAD_REQUEST)

        except stripe.error.AuthenticationError as e:
            # Authentication with Stripe's API failed
            # (maybe you changed API keys recently)
            return Response({"message": "Not authenticated"}, status=HTTP_400_BAD_REQUEST)

        except stripe.error.APIConnectionError as e:
            # Network communication with Stripe failed
            return Response({"message": "Network error"}, status=HTTP_400_BAD_REQUEST)

        except stripe.error.StripeError as e:
            # Display a very generic error to the user, and maybe send
            # yourself an email
            return Response({"message": "Something went wrong. You were not charged. Please try again."}, status=HTTP_400_BAD_REQUEST)

        except Exception as e:
            # send an email to ourselves
            print(f'ERROR -> {e}')
            return Response({"message": "A serious error occurred. We have been notifed."}, status=HTTP_400_BAD_REQUEST)

        return Response({"message": "Invalid data received"}, status=HTTP_400_BAD_REQUEST)
