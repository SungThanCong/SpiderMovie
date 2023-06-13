from django.contrib.auth.models import User, Group
from rest_framework import serializers
from comments.models import Comment, Rating
from movies.serializers import MovieSerializer
from authentication.serializers import UserSerializer

class CommentSerializer(serializers.ModelSerializer):
    movie = MovieSerializer()
    user = UserSerializer()

    class Meta:
        model = Comment
        fields = ['id', 'content', 'post_time', 'user', 'movie']
        read_only_fields = ['id', 'post_time']

class RatingSerializer(serializers.ModelSerializer):
    user_id = serializers.IntegerField()
    movie_id = serializers.IntegerField()
    class Meta:
        model = Rating
        fields = ['id', 'rating', 'user', 'movie', 'user_id', 'movie_id']
        read_only_fields = ['id']