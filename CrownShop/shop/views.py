from django.conf import settings
from django.views.generic import ListView
from django.contrib.auth.models import User
from rest_framework import permissions, status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.views import APIView
from .serializers import UserSerializer, UserSerializerWithToken
from django.shortcuts import redirect

from django.utils import timezone

from .models import (
    Item,
    Order,
    OrderItem,
    Address,
    Payment,
    Coupon,
    Refund
)
import stripe
import random
import string
stripe.api_key = settings.STRIPE_SECRET_KEY

class Homepage(ListView):
    model = Item
    paginate_by = 10
    template_name = "shop/home-page.html"



@api_view(['GET'])
def current_user(request):
    serialzer = UserSerializer(request.user)
    return Response(serialzer.data)


class UserList(APIView):
    permission_classes = (permissions.AllowAny,)

    def post(self, request, format=None):
        serializer = UserSerializerWithToken(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
