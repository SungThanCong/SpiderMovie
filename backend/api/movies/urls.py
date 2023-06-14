from django.urls import path
from movies import views

urlpatterns = [
    path('', views.movie_list),
    path('list', views.movie_pagination),
    path('<int:pk>/', views.movie_detail),
    path('toprate/',views.movie_top_rate),
    path('trending/',views.movie_trending),
    path('category/<int:id>/',views.movie_category),
    path('search/<str:keyword>/',views.movie_search),

    path('add_movie/',views.add_movie),
    path('update_movie/<int:pk>',views.update_movie),
    path('remove_movie/<int:pk>', views.remove_movie),

]