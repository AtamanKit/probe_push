from django.http import HttpResponse
from . import models
import json
# from django.views.decorators.csrf import csrf_exempt, ensure_csrf_cookie, csrf_protect


# Here is import for push notification
from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from pywebpush import WebPushException, webpush
from django.conf import settings
from django.http import HttpResponseBadRequest
from .models import PushSubscription


# Class for notifications
class SubscriptionView(APIView):
    def post(self, request):
        subscription_info = request.data

        subscription = PushSubscription.objects.create(
            endpoint=subscription_info['endpoint'],
            p256dh=subscription_info['keys']['p256dh'],
            auth=subscription_info['keys']['auth']
        )
        subscription.save()

        return Response({'success': True})

# @ensure_csrf_cookie
def get_products(request):
    products = models.Product.objects.all()
    queryset = json.dumps(list(products.values()))

    return HttpResponse(queryset)


# @ensure_csrf_cookie
def get_categories(request):
    categories = models.Category.objects.all()
    queryset = json.dumps(list(categories.values()))

    return HttpResponse(queryset)

# @csrf_exempt
# @ensure_csrf_cookie
def post_product(request):
    output = json.dumps({'message': 'good'})

    data = json.loads(request.body)

    category_id = data['categoryId']    
    product = data['product']

    print(category_id)
    print(product)

    product = models.Product(category_id=category_id, name=product)
    product.save()
        
    return HttpResponse(output)
    