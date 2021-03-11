from django.urls import path
from .views import (
    Homepage,
    current_user,
    UserList
    )


app_name = 'shop'

urlpatterns = [
    path('', Homepage.as_view(), name="Homepage"),
    path('current_user/', current_user),
    path('users/', UserList.as_view())
]
