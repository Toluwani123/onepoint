from django.db import models
from django.contrib.auth.models import User
# Create your models here.
from io import BytesIO
from PIL import Image
from django.core.files import File
import uuid
import decimal

class Category(models.Model):
    name = models.CharField(max_length=225)
    slug = models.SlugField()
    
    class Meta:
        ordering = ('name',)
    
    def __str__(self):
        return self.name
    
    def get_absolute_url(self):
        return f'/{self.slug}/'

class Customer(models.Model):
    user = models.OneToOneField(User, on_delete = models.CASCADE, null=True, blank=True)
    name = models.CharField(max_length=200, null=True)
    email = models.EmailField(max_length=200, null = True)
    
    def __str__(self):
        return self.email

class Product(models.Model):
    category = models.ForeignKey(Category, related_name='products', on_delete = models.CASCADE, blank = True, null=True)
    name = models.CharField(max_length=250, blank = True, null=True)
    slug = models.SlugField(blank = True, null=True)
    description = models.TextField(blank=True, null=True)
    price = models.DecimalField(max_digits=6, decimal_places=2)
    image = models.ImageField(upload_to="productimages/", blank = True, null=True)
    thumbnail = models.ImageField(upload_to="productimages/",blank=True, null=True)
    date_added = models.DateTimeField(auto_now_add=True)
    
    class Meta:
        ordering = ('-date_added',)
    def __str__(self):
        return self.name
    def get_absolute_url(self):
        return f'/{self.category.slug}/{self.slug}/'
    def get_image(self):
        if self.image:
            return 'http://127.0.0.1:8000' + self.image.url
        
        return ""
    def get_thumbnail(self):
        if self.thumbnail:
            return 'http://127.0.0.1:8000' + self.thumbnail.url
        else:
            if self.image:
                self.thumbnail = self.make_thumbnail(self.image)
                self.save()
                return 'http://127.0.0.1:8000' + self.thumbnail.url
            else:
                return ''
            
    def make_thumbnail(self, image, size={300, 200}):
        img = Image.open(image)
        img.convert('RGB')
        img.thumbnail(size)

        thumb_io = BytesIO()
        img.save(thumb_io, 'JPEG', quality=85)

        thumbnail = File(thumb_io, name=image.name)
        return thumbnail


    
    
class Cart(models.Model):
    customer = models.CharField(unique=True, max_length=50,null=True, blank=True)
    id = models.UUIDField(default=uuid.uuid4, editable=False, primary_key=True)
    date_ordered = models.DateTimeField(auto_now_add=True)
    complete = models.BooleanField(default=False)
    transaction_id = models.CharField(max_length=100, null=True)
    

    def __str__(self):
        return str(self.id) 
    
    @property
    def total_sum_cart(self):
        cartitems = self.items.all()
        total = sum([item.total_sum for item in cartitems])
        return total

       
    @property
    def total_items_cart(self):
        cartitems = self.items.all()
        total = sum([item.quantity for item in cartitems])
        return total
    
    
    def total_tax_cart(self):
        cartitems = self.items.all()
        total = sum([item.total_sum for item in cartitems])
        final = (total * decimal.Decimal(8.25/100))

        return final
    
    @property
    def final_sum_cart(self):
        cartitems = self.items.all()
        total = sum([item.total_sum for item in cartitems])

        return (total * decimal.Decimal(8.25/100)) + total + 40

        
    
    
class CartItem(models.Model):
    product = models.ForeignKey(Product, on_delete=models.SET_NULL, null=True)
    order = models.ForeignKey(Cart, on_delete = models.SET_NULL, null = True, related_name='items')
    quantity = models.IntegerField(default=0, null=True, blank=True)
    date_init = models.DateTimeField(auto_now_add=True)

    @property
    def total_sum(self):
        total = self.product.price * self.quantity
        return total

class ShippingAddress(models.Model):
    customer = models.ForeignKey(Customer, on_delete=models.SET_NULL, null=True)
    order = models.ForeignKey(Cart, on_delete=models.SET_NULL, null=True)
    address = models.CharField(max_length=200, null=False)
    city = models.CharField(max_length=200, null=False)
    state = models.CharField(max_length=200, null=False)
    zipcode = models.CharField(max_length=200, null=False)
    date_added = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.address 
