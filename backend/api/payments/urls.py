from django.urls import path
from payments import views

urlpatterns = [
    path('', views.get_all_payment),
    path('user/', views.get_all_payment_user),
    path('check/<int:idMovie>',views.check_movie_and_user),
    path('payment_create/', views.create_receipt)
    # path('payment/', views.payment),
    # path('payment_ipn/', views.payment_ipn),
    # path('payment_return/', views.payment_return),

]