from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('api/store/', include('store.urls')),
    path('api/admin/', admin.site.urls),
]
