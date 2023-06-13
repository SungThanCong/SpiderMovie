from rest_framework import serializers
from payments.models import Purchase
from movies.serializers import MovieSerializer
from authentication.serializers import UserSerializer

class PurchaseSerializer(serializers.ModelSerializer):
    movie = MovieSerializer()
    user = UserSerializer()
    class Meta:
        model = Purchase
        fields = '__all__'