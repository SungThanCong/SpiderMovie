from django.urls import path, include
from rest_framework import routers
from .views import CommentViewSet, RatingViewSet

router = routers.DefaultRouter()
router.register(r'comments', CommentViewSet)
router.register(r'ratings', RatingViewSet)

urlpatterns = [
    path('', include(router.urls)),
]