from django.conf import settings
from rest_framework_jwt.views import obtain_jwt_token
from django.contrib import admin
from django.views.generic import TemplateView
from django.conf.urls.static import static
from django.urls import path, include, re_path

urlpatterns = [
    path('admin/', admin.site.urls),
    path('accounts/', include('allauth.urls')),
    path('', include('shop.urls', namespace='shop')),
    path('jwt-token-auth/', obtain_jwt_token),#
    path('rest-auth/', include('rest_auth.urls')),
    path('rest-auth/registration/', include('rest_auth.registration.urls')),#
    path('api/', include('shop.api.urls')),
]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
    urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)

if not settings.DEBUG: 
    urlpatterns += [re_path(r'^.*', TemplateView.as_view(template_name='index.html'))]