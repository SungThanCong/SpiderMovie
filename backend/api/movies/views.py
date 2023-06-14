from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from django.http import HttpResponse, JsonResponse
from django.views.decorators.csrf import csrf_exempt
from movies.models import Movie, Genre
from movies.serializers import MovieSerializer, GenreSerializer, MovieCreateSerializer
from rest_framework.pagination import PageNumberPagination
from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import permission_classes, authentication_classes
from authentication.permissions import IsManagerUser
from django.shortcuts import get_object_or_404

@api_view(['GET'])
def movie_list(request):
    if request.method == 'GET':
        movies = Movie.objects.all()
        serializer = MovieSerializer(movies, many=True)
        return JsonResponse(serializer.data, safe=False)

@api_view(['GET'])
def movie_pagination(request):
    paginator = PageNumberPagination()
    paginator.page_size = 10
    movies = paginator.paginate_queryset(Movie.objects.all(), request)
    serializer = MovieSerializer(movies, many=True)
    return paginator.get_paginated_response(serializer.data)

@api_view(['GET'])
def movie_category(request, id):
    try:
        movies = Movie.objects.all().filter(genres__id=id)
        serializer = MovieSerializer(movies, many=True)
        return JsonResponse(serializer.data, safe=False)
    except Movie.DoesNotExist:
        return HttpResponse("Not find",status=404)
    
@api_view(['GET'])
def movie_search(request, keyword):
    try:
        movies = Movie.objects.all().filter(title__icontains=keyword)
        serializer = MovieSerializer(movies, many=True)
        return JsonResponse(serializer.data, safe=False)
    except Movie.DoesNotExist:
        return HttpResponse("Not find",status=404)
    
@api_view(['GET'])
def movie_top_rate(request):
    try:
        movies = Movie.objects.all().order_by('-total_rating')[:10]
        serializer = MovieSerializer(movies, many=True)
        return JsonResponse(serializer.data, safe=False)
    except Movie.DoesNotExist:
        return HttpResponse("Not find",status=404)
    
@api_view(['GET'])
def movie_trending(request):
    try:
        movies = Movie.objects.all().order_by('-count_view')[:10]
        serializer = MovieSerializer(movies, many=True)
        return JsonResponse(serializer.data, safe=False)
    except Movie.DoesNotExist:
        return HttpResponse("Not find",status=404)


    
@api_view(['GET'])
def movie_detail(request, pk):
    try:
        movie = Movie.objects.get(pk=pk)
    except Movie.DoesNotExist:
        return HttpResponse("Not find",status=404)

    if request.method == 'GET':
        serializer = MovieSerializer(movie)
        return JsonResponse(serializer.data)

@api_view(['POST'])
@permission_classes([IsAuthenticated, IsManagerUser])
@authentication_classes([JWTAuthentication])
def add_movie(request):
    try:
        serializer = MovieCreateSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=200)
        return Response(serializer.errors, status=400)
    except Exception as e:
        return Response({'error': str(e)}, status=500)

@api_view(['POST'])
@permission_classes([IsAuthenticated, IsManagerUser])
@authentication_classes([JWTAuthentication])
def update_movie(request,pk):
    try:
        movie = get_object_or_404(Movie, pk = pk)
        serializer = MovieCreateSerializer(movie, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=200)
        return Response(serializer.errors, status=400)
    except Exception as e:
        return Response({'error': str(e)}, status=500)
    
@api_view(['POST'])
@permission_classes([IsAuthenticated, IsManagerUser])
@authentication_classes([JWTAuthentication])
def remove_movie(request,pk):
    try:
        movie = get_object_or_404(Movie, pk = pk)
        movie.delete()
        return HttpResponse("Delete success", status=200)
    except Movie.DoesNotExist:
        return Response({'error': 'Movie not found.'}, status=404)
    except Exception as e:
        return Response({'error': str(e)}, status=500)
    

@api_view(['GET'])
def genre_list(request):
    if request.method == 'GET':
        genres = Genre.objects.all()
        serializer = GenreSerializer(genres, many=True)
        return JsonResponse(serializer.data, safe=False)


@api_view(['GET', 'PUT', 'DELETE'])
def genre_detail(request, pk):
    try:
        genre = Genre.objects.get(pk=pk)
    except Genre.DoesNotExist:
        return HttpResponse("Not find",status=404)

    if request.method == 'GET':
        serializer = GenreSerializer(genre)
        return JsonResponse(serializer.data)

    elif request.method == 'PUT':
        data = request.data
        serializer = GenreSerializer(genre, data=data)
        if serializer.is_valid():
            serializer.save()
            return JsonResponse(serializer.data)
        return JsonResponse(serializer.errors, status=400)

    elif request.method == 'DELETE':
        genre.delete()
        return HttpResponse(status=204)