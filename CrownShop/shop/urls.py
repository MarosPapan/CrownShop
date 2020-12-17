from django.urls import path
from .views import (
    Homepage,
    ItemDetailView,
    CheckoutView,
    add_to_cart,
    remove_from_cart,
    OrderSummaryView,
    remove_single_item_from_cart,
    PaymentView,
    AddCoupon,
    RequestRefundView,
    current_user,
    UserList
    )


app_name = 'shop'

urlpatterns = [
    path('', Homepage.as_view(), name="Homepage"),
    path('product/<slug>', ItemDetailView.as_view(), name="ItemDetailView"),
    path('checkout/', CheckoutView.as_view(), name="Checkout"),
    path('add_to_cart/<slug>', add_to_cart, name="add_to_cart"),
    path('add_coupon/', AddCoupon.as_view(), name="add_coupon"),
    path('remove_from_cart/<slug>', remove_from_cart, name="remove_from_cart"),
    path('order-summary/', OrderSummaryView.as_view(), name="order-summary"),
    path('remove-single-item-from-cart/<slug>', remove_single_item_from_cart, name="remove-single-item-from-cart"),
    path('payment/<payment_option>/', PaymentView.as_view(), name="payment"),
    path('request_refund/', RequestRefundView.as_view(), name='request_refund'),
    path('current_user/', current_user),
    path('users/', UserList.as_view())
]
