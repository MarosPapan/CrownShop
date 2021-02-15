from django.urls import path
from .views import (
    ItemListView,
    AddToCartView,
    OrderDetailView,
    PaymentView,
    AddCoupon,
    ItemDetailView
)

urlpatterns = [
    path('product-list/', ItemListView.as_view(), name='product-list'),
    path('products/<pk>/', ItemDetailView.as_view(), name='product-detail'),
    path('add-to-cart/', AddToCartView.as_view(), name='add-to-cart'),
    path('order-summary/', OrderDetailView.as_view(), name='order-summary'),
    path('payment/', PaymentView.as_view(), name='payment'),
    path('add-coupon/', AddCoupon.as_view(), name='add-coupon'),
]