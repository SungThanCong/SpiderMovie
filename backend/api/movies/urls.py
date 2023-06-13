from django.urls import path
from movies import views

urlpatterns = [
    path('', views.movie_list),
    path('list', views.movie_pagination),
    path('<int:pk>/', views.movie_detail),
    path('toprate/',views.movie_top_rate),
    path('trending/',views.movie_trending),
    path('category/<str:id>/',views.movie_category),
    path('search/<str:keyword>/',views.movie_search)
]