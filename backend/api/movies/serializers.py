from rest_framework import serializers
from movies.models import Movie, Genre


class GenreSerializer(serializers.ModelSerializer):
    class Meta:
        model = Genre
        fields = '__all__'

class MovieSerializer(serializers.ModelSerializer):
    genres = GenreSerializer(many=True, allow_null=True)

    class Meta:
        model = Movie
        fields = '__all__'

class MovieCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Movie
        fields = '__all__'
