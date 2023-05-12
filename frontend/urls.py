from django.urls import path
from .views import index

urlpatterns = [
    path('', index),
    path('product/<int:id>', index),
    path('cart/<slug:code>', index),
    path('catalog/', index),
    path('catalogs/<slug:slug>', index),
    path('checkout/<slug:val>', index),
    path('aboutus/', index),

]