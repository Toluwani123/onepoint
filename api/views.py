from django.shortcuts import render, redirect
from .serializers import *
from rest_framework.views import APIView
from rest_framework.response import Response
from .models import *
from rest_framework.generics import *
from rest_framework import generics, status
from rest_framework.viewsets import ModelViewSet, GenericViewSet
from rest_framework.mixins import CreateModelMixin
from django.contrib import messages
from django.core.mail import send_mail
from django.conf import settings
class LatestProductsList_1(APIView):
    def get(self, request, format=None):
        products = Product.objects.all()[0:4]
        serializer = ProductSerializer(products, many=True)
        data = ProductSerializer(products[0]).data
        return Response(data, status=status.HTTP_200_OK)
class LatestProductsList_2(APIView):
    def get(self, request, format=None):
        products = Product.objects.all()[0:4]
        serializer = ProductSerializer(products, many=True)
        data = ProductSerializer(products[1]).data
        return Response(data, status=status.HTTP_200_OK)
class LatestProductsList_3(APIView):
    def get(self, request, format=None):
        products = Product.objects.all()[0:4]
        serializer = ProductSerializer(products, many=True)
        data = ProductSerializer(products[2]).data
        return Response(data, status=status.HTTP_200_OK)
class LatestProductsList_4(APIView):
    def get(self, request, format=None):
        products = Product.objects.all()[0:4]
        serializer = ProductSerializer(products, many=True)
        data = ProductSerializer(products[3]).data
        return Response(data, status=status.HTTP_200_OK)


class AddItem(APIView):
    serializer_class = ProductSerializer
    def post(self, request, format=None):
        
        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid():
            name = serializer.data.get('name')
            description = serializer.data.get('description')
            category = serializer.data.get('category')
            slug = serializer.data.get('slug')
            price = serializer.data.get('price')
            image = serializer.data.get('image')
            thumbnail = serializer.data.get('thumbnail')

            item = Product(name=name, description=description, slug=slug, price=price, image=image, category=category, thumbnail=thumbnail)
            item.save()

            return Response(ProductSerializer(item).data, status= status.HTTP_201_CREATED)
        return Response({'Bad Request': 'Invalid data...'}, status=status.HTTP_400_BAD_REQUEST)




class CartListCreateAPIView(APIView):
    
    serializer_class = CartSerializer
    def post(self, request, format=None):
        if not self.request.session.exists(self.request.session.session_key):
            self.request.session.create()
        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid():
            customer = self.request.session.session_key
            queryset = Cart.objects.filter(customer=customer)
            if queryset.exists():
                cart= queryset[0]
                return Response(CartSerializer(cart).data, status=status.HTTP_200_OK)
                
            else:
                cart = Cart(customer=customer)
                cart.save()
                return Response(CartSerializer(cart).data, status=status.HTTP_201_CREATED)
            
        return Response({'Bad Request': 'Invalid data...'}, status=status.HTTP_400_BAD_REQUEST)


class CartRetrieveUpdateAPIView(RetrieveUpdateDestroyAPIView):
    queryset = Cart.objects.all()
    serializer_class = CartSerializer

class CartItemView(APIView):
    def get_queryset(self):
        queryset = CartItem.objects.all(order_id = self.kwargs['pk'])
    
    
    serializer_class = CartItemSerializer     
class GetProductId(APIView):
    serializer_class = ProductSerializer
    lookup_url_kwarg = 'id'

    def get(self, request, format=None):
        id = request.GET.get(self.lookup_url_kwarg)
        if id != None:
            product = Product.objects.filter(id=id)
            data = ProductSerializer(product[0]).data
            return Response(data, status=status.HTTP_200_OK)
        return Response({'There is no Product like this':'Not Found'}, status=status.HTTP_404_NOT_FOUND)
        
class ProductDetail(APIView):

            

    def get_objects(self,category_slug, product_slug):
        try:
            return Product.objects.filter(category__slug=category_slug).get(slug=product_slug)
        except Product.DoesNotExist:
            raise Http404
        
    def get(self, request,category_slug, product_slug, format=None):
        product = self.get_objects(category_slug, product_slug)
        serializer = ProductSerializer(product)
        return Response(serializer.data, status=status.HTTP_200_OK)
    
class CartItemsView(generics.RetrieveUpdateDestroyAPIView):
    queryset = CartItem.objects.all()
    serializer_class = UpdateCartItemSerializer
    lookup_url_kwarg = 'id'

    def list(self, request, id, format=None):
        queryset = self.filter_queryset(self.get_queryset())
        cart_items = queryset.filter(order_id = self.kwargs['pk'])
        val= cart_items.get(id=id)  # Filter cart items based on user
        products = [UpdateCartItemSerializer(val).data]  # Serialize cart items
        return Response(products, status=status.HTTP_200_OK)
    


        
        
class CartItems(ListCreateAPIView, DestroyAPIView):
    http_method_names= ['get', 'post','patch', 'delete']

    def get_queryset(self):
        return CartItem.objects.filter(order_id=self.kwargs['pk'])
    def get_serializer_class(self):
        if self.request.method =="POST":
            return AddCartItemSerializer
        elif self.request.method == "PATCH":
            return UpdateCartItemSerializer
        elif self.request.method == "DELETE":
            return CartItemRemoveSerializer
        return CartItemSerializer
    def get_serializer_context(self):
        return {'order_id':self.kwargs['pk'], 'product_id': self.request.data.get('product_id'),'quantity': self.request.data.get('quantity')}




class CategoryDetail(APIView):
    def get_object(self, category_slug):
        try:
            return Category.objects.get(slug=category_slug)
        except Product.DoesNotExist:
            raise Http404
        
    def get(self, request, category_slug, format=None):
        category = self.get_object(category_slug)
        serializer = CategorySerializer(category)
        return Response(serializer.data)

        
def confirm_payment(self,request,format=None):
    customer = self.request.session.session_key
    cart = Cart.objects.filter(customer=customer)
    cart.complete = True
    cart.save()
    return Response(status=status.HTTP_200_OK)

class SendMail(APIView):
    def post(self, request, format=None):
        customer = self.request.session.session_key
        firstname = self.request.data.get('firstname')
        lastname = self.request.data.get('lastname')
        address = self.request.data.get('street1')
        address_2 = self.request.data.get('street2')
        state = self.request.data.get('state')
        country = self.request.data.get('country')
        city = self.request.data.get('city')
        email = self.request.data.get('email')
        postcode = self.request.data.get('postcode')
        subject = "Order made"
        message = f'Customer is {customer}, This is the Customer Name{firstname}{lastname}.\n Address:{address}{address_2}.\n{state}{country}.\n{city}{postcode}.This is the Customer Email\n{email}'
        from_email = settings.EMAIL_HOST_USER
        recipient_list = [settings.EMAIL_HOST_USER]
        send_mail(subject, message, from_email, recipient_list,fail_silently=False)
