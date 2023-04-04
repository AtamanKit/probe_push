from django.http import HttpResponse
from . import models
import json
from django.views.decorators.csrf import csrf_exempt

def get_products(request):
    products = models.Product.objects.all()
    queryset = json.dumps(list(products.values()))

    return HttpResponse(queryset)

def get_categories(request):
    categories = models.Category.objects.all()
    queryset = json.dumps(list(categories.values()))

    return HttpResponse(queryset)

@csrf_exempt
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
    