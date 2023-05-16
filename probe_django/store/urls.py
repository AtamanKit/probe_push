from django.urls import path

from . import views

urlpatterns = [
    path('products/', views.get_products),
    path('categories/', views.get_categories),
    path('postproduct/', views.post_product),
    path('publickey/', views.get_public_key),
    path('pushnotif/', views.push_notif),
]