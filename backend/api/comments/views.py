from rest_framework import viewsets, permissions, mixins, status
from rest_framework.decorators import api_view
from django.http import HttpResponse, JsonResponse
from rest_framework.response import Response
from .models import Comment, Rating
from .serializers import CommentSerializer, RatingSerializer
from django.shortcuts import get_object_or_404
from django.utils import timezone
from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import permission_classes, authentication_classes
from rest_framework.pagination import PageNumberPagination
from movies.models import Movie
from django.forms.models import model_to_dict




@api_view(['GET'])
def get_comment_movie(request,id):
    try:
        comments = Comment.objects.all().filter(movie__id=id)[:10]
        serializer = CommentSerializer(comments, many=True)
        return JsonResponse(serializer.data, safe=False)
    except Comment.DoesNotExist:
        return HttpResponse("Not find",status=404)
        
@api_view(['POST'])
@permission_classes([IsAuthenticated])
@authentication_classes([JWTAuthentication])
def add_comment(request):
    user = request.user
    content = request.data.get('content')
    movie = request.data.get('movie')
    movieInstane = Movie.objects.get(id=movie)
    user = request.user

    if content and movie and user:
        post_time = timezone.now()
        comment = Comment(
            content = content,
            user = user,
            movie = movieInstane,
            post_time = post_time 
        )
        comment.save()   
        return JsonResponse(model_to_dict(comment), status=200, safe=False)
    return HttpResponse("Error", status=500)

@api_view(['POST'])
@permission_classes([IsAuthenticated])
@authentication_classes([JWTAuthentication])
def update_comment(request, pk):
    user = request.user
    comment = get_object_or_404(Comment, pk=pk, user__id = user.id)  
    serializer = CommentSerializer(comment, data=request.data, partial=True)
    if serializer.is_valid():      
        serializer.save() 
        return Response(serializer.data)

@api_view(['GET'])
def get_rating_movie(request,id):
    try:
        ratings = Rating.objects.all().filter(movie__id=id)
        serializer = CommentSerializer(ratings, many=True)
        return JsonResponse(serializer.data, safe=False)
    except Rating.DoesNotExist:
        return HttpResponse("Not find",status=404)
    
@api_view(['GET'])
@permission_classes([IsAuthenticated])
@authentication_classes([JWTAuthentication])
def get_rating_movie_user(request,id):
    try:
        user = request.user
        ratings = Rating.objects.all().filter(movie__id=id, user__id=user.id)
        serializer = RatingSerializer(ratings, many=True)
        return JsonResponse(serializer.data, safe=False)
    except Rating.DoesNotExist:
        return HttpResponse("Not find",status=404)
    
@api_view(['POST'])
@permission_classes([IsAuthenticated])
@authentication_classes([JWTAuthentication])
def add_rating(request):
    rating = Rating(
        user_id = request.user.id,
        rating = request.data.get('rating'),
        movie_id = request.data.get('movie')
    )
 
    check = Rating.objects.get(user__id= rating.user_id, movie__id = rating.movie_id)
    if check:
        check.rating = rating.rating
        check.save() 
        return JsonResponse(model_to_dict(check), status=200, safe=False)
    else:
        rating.save()
        return JsonResponse(model_to_dict(rating), status=200, safe=False)
    return JsonResponse(model_to_dict(rating), status=500)
        
@api_view(['POST'])
@permission_classes([IsAuthenticated])
@authentication_classes([JWTAuthentication])
def update_rating(request, pk):
    rating = get_object_or_404(Rating, pk=pk)
    serializer = RatingSerializer(rating, data=request.data,partial=True)
    if serializer.is_valid():      
        serializer.save() 
        return Response(serializer.data)
