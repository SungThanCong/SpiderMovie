from django.contrib.auth.models import User, Group
from rest_framework import serializers
from comments.models import Comment, Rating

class CommentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Comment
        fields = ['id', 'content', 'post_time', 'user', 'movie']
        read_only_fields = ['id', 'post_time']

class RatingSerializer(serializers.ModelSerializer):
    class Meta:
        model = Rating
        fields = ['id', 'rating', 'user', 'movie']
        read_only_fields = ['id']