from django.urls import path, include
from comments import views

urlpatterns = [
    path('comment/<int:id>', views.get_comment_movie),
    path('comment/add/', views.add_comment),
    path('comment/update/<int:pk>', views.update_comment),
    path('comment/remove/<int:pk>', views.remove_comment),

    path('rating/<int:id>', views.get_rating_movie),
    path('rating/user/<int:id>', views.get_rating_movie_user),
    path('rating/add/', views.add_rating),
    # path('rating/update/<int:pk>', views.update_rating),
    path('rating/remove/<int:pk>', views.remove_rating),

    
];