from django.urls import path
from .views import (
    ItemListView,
    AddToCartView,
    OrderDetailView,
    PaymentView,
    AddCoupon,
    ItemDetailView,
    AddressListView,
    AddressCreateView,
    CountryListView,
    UserIDView,
    AddressUpdateView,
    AddressDeleteView,
    OrderItemDeleteView,
    OrderQuantityUpdateView
)

urlpatterns = [
    path('product-list/', ItemListView.as_view(), name='product-list'), #
    path('products/<pk>/', ItemDetailView.as_view(), name='product-detail'), #
    path('add-to-cart/', AddToCartView.as_view(), name='add-to-cart'),#
    path('order-summary/', OrderDetailView.as_view(), name='order-summary'),#
    path('payment/', PaymentView.as_view(), name='payment'),#
    path('add-coupon/', AddCoupon.as_view(), name='add-coupon'),
    path('addresses/', AddressListView.as_view(), name='addresses'),
    path('addresses/create/', AddressCreateView.as_view(), name='address-create'),
    path('countriesList', CountryListView.as_view(), name='countries-list'),
    path('addresses/<pk>/update/', AddressUpdateView.as_view(), name='address-update'),
    path('addresses/<pk>/delete/', AddressDeleteView.as_view(), name='address-delete'),
    path('userID/', UserIDView.as_view(), name='userId'),
    path('order-items/<pk>/delete/', OrderItemDeleteView.as_view(), name='order-items-delete'),#
    path('order-items/update-quantity', OrderQuantityUpdateView.as_view(), name='order-item-quantity-update'),#
]