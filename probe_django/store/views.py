from django.http import HttpResponse
from . import models
import json

def get_products(request):
    products = models.Product.objects.all()
    queryset = json.dumps(list(products.values()))

    return HttpResponse(queryset)

def get_categories(request):
    categories = models.Category.objects.all()
    queryset = json.dumps(list(categories.values()))

    return HttpResponse(queryset)