from .views import *
from django.urls import path
from api import views
from . import views

urlpatterns = [
    path("latest-products-1", LatestProductsList_1.as_view(),),
    path("latest-products-2", LatestProductsList_2.as_view(),),
    path("latest-products-3", LatestProductsList_3.as_view(),),
    path("latest-products-4", LatestProductsList_4.as_view(),),    
    path("add-product", views.AddItem.as_view(),),
    path('products/<slug:category_slug>/<slug:product_slug>/', views.ProductDetail.as_view()),
    path('get-product', views.GetProductId.as_view()),
    path('cart-create', CartListCreateAPIView.as_view()),
    path('cart-retrieve/<slug:pk>', CartRetrieveUpdateAPIView.as_view()),
    path('cart-retrieve/<slug:pk>/items/', CartItems.as_view()),
    path('cart-retrieve/<slug:pk>/item/<int:id>', CartItemsView.as_view()),
    path('products/<slug:category_slug>/', CategoryDetail.as_view()),
    path('confirm_payment/<slug:pk>', views.confirm_payment),
    path('send_email', SendMail.as_view())


]
