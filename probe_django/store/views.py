from django.http import HttpResponse
from . import models
import json
from django.views.decorators.csrf import csrf_exempt, ensure_csrf_cookie, csrf_protect
from django.conf import settings

from rest_framework.response import Response
from rest_framework import status
from rest_framework.decorators import api_view

from pywebpush import webpush

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

@csrf_exempt
# @ensure_csrf_cookie
def post_product(request):
    output = json.dumps({'message': 'good'})

    data = json.loads(request.body)

    category_id = data['categoryId']    
    product = data['product']

    # print(category_id)
    # print(product)

    product = models.Product(category_id=category_id, name=product)
    product.save()
        
    return HttpResponse(output)

################# Push Notifications Working ###############################
WEBPUSH_SETTINGS = getattr(settings, 'WEBPUSH_SETTINGS')
VAPID_PRIVATE_KEY = WEBPUSH_SETTINGS['VAPID_PRIVATE_KEY']
VAPID_PUBLIC_KEY = WEBPUSH_SETTINGS['VAPID_PUBLIC_KEY']
VAPID_CLAIMS = {
    "sub": f"mailto:{WEBPUSH_SETTINGS['VAPID_ADMIN_EMAIL']}"
}

print('sssssssssssssssssssssss', VAPID_CLAIMS)

@api_view()
def get_public_key(request):
    output = {'vapid_public_key': VAPID_PUBLIC_KEY}

    return Response(output, status=status.HTTP_200_OK)

def send_web_push(subscription_information, message_body):
    print(subscription_information)
    return webpush(
        subscription_info=subscription_information,
        data=message_body,
        vapid_private_key=VAPID_PRIVATE_KEY,
        vapid_claims=VAPID_CLAIMS
    )

@api_view(['POST'])
def push_notif(request):
    token = json.loads(request.body)
    message = "Working, mama!"

    send_web_push(token, message)

    output = {'mama': 'Hello World!'}

    return Response(output, status=status.HTTP_200_OK)
    