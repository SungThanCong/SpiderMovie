from django.urls import path
from movies import views

urlpatterns = [
    path('', views.movie_list),
    path('<int:pk>/', views.movie_detail),
]