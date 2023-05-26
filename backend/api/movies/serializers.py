from django.contrib.auth.models import User, Group
from rest_framework import serializers
from movies.models import Movie, Genre

class GenreSerializer(serializers.ModelSerializer):
    id = serializers.IntegerField(read_only=True)
    name = serializers.CharField(max_length=100)
    description = serializers.CharField(max_length=1000)
    
    class Meta:
        model= Genre

        


class MovieSerializer(serializers.ModelSerializer):
    id = serializers.IntegerField(read_only=True)
    title = serializers.CharField(max_length=255)
    description = serializers.CharField()
    banner = serializers.CharField(max_length=255)
    source_link = serializers.CharField(max_length=255)
    trailer_link = serializers.CharField(max_length=255)
    date_release = serializers.DateField()
    count_view = serializers.IntegerField(default=0)
    is_showing = serializers.BooleanField(default=False)
    genres = GenreSerializer(many=True)

    class Meta: 
        model = Movie

    def create(self, validated_data):
        genres_data = validated_data.pop('genres')
        movie = Movie.objects.create(**validated_data)
        for genre_data in genres_data:
            genre = Genre.objects.get(id=genre_data.get('id'))
            movie.genres.add(genre)
        return movie
    
    def update(self, instance, validated_data):
        instance.title = validated_data.get('title', instance.title)
        instance.description = validated_data.get('description', instance.description)
        instance.banner = validated_data.get('banner', instance.banner)
        instance.source_link = validated_data.get('source_link', instance.source_link)
        instance.trailer_link = validated_data.get('trailer_link', instance.trailer_link)
        instance.date_release = validated_data.get('date_release', instance.date_release)
        instance.is_showing = validated_data.get('is_showing', instance.is_showing)
        instance.save()
        return instance


# class UserSerializer(serializers.HyperlinkedModelSerializer):
#     class Meta:
#         model = User
#         fields = ['url', 'username', 'email', 'groups']


# class GroupSerializer(serializers.HyperlinkedModelSerializer):
#     class Meta:
#         model = Group
#         fields = ['url', 'name']