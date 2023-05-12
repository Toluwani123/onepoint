from .models import *
from rest_framework import serializers


class ProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = (
            'id',
            'name',
            'description',
            'price',
            'get_image',
            'get_thumbnail',
            'get_absolute_url',
            'slug'
        )
class BasicProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = (
            'id',
            'name',
            'price',
            'get_image'
        )
class CategorySerializer(serializers.ModelSerializer):
    products = ProductSerializer(many=True)
    class Meta:
        model = Category
        fields = (
            'id',
            'name',
            'get_absolute_url',
            'products'
        )
class CartItemSerializer(serializers.ModelSerializer):
    product = BasicProductSerializer(many=False)
    class Meta:
        model = CartItem
        fields = (
            'id',
            'product',
            'quantity',
            'order',
            'date_init',
            'total_sum',
            
            
        )

class AddCartItemSerializer(serializers.ModelSerializer):
    product_id = serializers.IntegerField()
    def validate_product_id(self, value):
        if not Product.objects.filter(pk=value).exists():
            raise serializers.ValidationError('No product with that Id')
        return value
    def save(self, **kwargs):
        cart_id = self.context['order_id']
        product_id = self.context['product_id']
        quantity = self.context['quantity']

        try:
            cartitem = CartItem.objects.get(product_id=product_id, order_id=cart_id)
            cartitem.quantity += quantity
            cartitem.save()
            self.instance = cartitem

        except: 
            self.instance = CartItem.objects.create(product_id=product_id, order_id=cart_id, quantity=quantity) 

        return self.instance



    class Meta:
        model = CartItem
        fields = ('id', 'product_id', 'quantity')


class ShippingSerializer(serializers.ModelSerializer):
    class Meta:
        model = ShippingAddress
        fields = '__all__'

class CartSerializer(serializers.ModelSerializer):
    items = CartItemSerializer(many=True, read_only=True)
    class Meta:
        model = Cart
        fields = ['id', 'customer','items', 'total_sum_cart', 'total_items_cart', 'total_tax_cart', 'final_sum_cart', 'complete']

class UpdateCartItemSerializer(serializers.ModelSerializer):
   
    class Meta:
        model= CartItem
        fields = (
            'id',
            'product',
            'quantity',
            'order',
            'date_init',
            'total_sum'
            
        )
class CartItemRemoveSerializer(serializers.Serializer):
    cart_item_id = serializers.IntegerField()

    def validate_cart_item_id(self, value):
        try:
            cart_item = CartItem.objects.get(id=value)
        except CartItem.DoesNotExist:
            raise serializers.ValidationError("Cart item not found")

        # You can add additional validation logic here
        # For example, checking if the cart item belongs to the logged-in user

        return value

    def delete_cart_item(self):

        cart_id = self.context['order_id']
        product_id = self.context['product_id']
        cartitem = CartItem.objects.get(product_id=product_id, order_id=cart_id)
        cartitem.delete()
        