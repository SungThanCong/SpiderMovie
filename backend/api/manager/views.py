from django.shortcuts import render
from django.contrib.auth.models import User
from payments.models import Purchase
from payments.serializers import PurchaseSerializer
from comments.models import Comment, Rating
from comments.serializers import CommentSerializer, RatingSerializer
from authentication.serializers import UserSerializer
from django.http import HttpResponse, JsonResponse
from rest_framework_simplejwt.authentication import JWTAuthentication
from authentication.permissions import IsManagerUser
from rest_framework.decorators import api_view
from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import permission_classes, authentication_classes
from django.shortcuts import get_object_or_404
from rest_framework.response import Response

# Create your views here.

@api_view(['GET'])
@permission_classes([IsAuthenticated, IsManagerUser])
@authentication_classes([JWTAuthentication])
def admin_get_all_user(request):
    try:
        users = User.objects.filter(is_superuser=False,is_staff=False)
        serializers = UserSerializer(users, many=True)
        return JsonResponse(serializers.data, status=200,safe=False)
    except:
        return HttpResponse("Bad request",status=400)

@api_view(['GET'])
@permission_classes([IsAuthenticated, IsManagerUser])
@authentication_classes([JWTAuthentication])
def admin_get_detai_user(request, id):
    try:
        users = User.objects.filter(is_superuser=False,is_staff=False, id =id)
        serializers = UserSerializer(users, many=True)
        return JsonResponse(serializers.data, status=200,safe=False)
    except:
        return HttpResponse("Bad request",status=400)
    
@api_view(['POST'])
@permission_classes([IsAuthenticated, IsManagerUser])
@authentication_classes([JWTAuthentication])
def admin_active_user(request, id):
    # try:
        activate = request.data.get('active')
        user = User.objects.get(id =id)
        if not user.is_superuser and not user.is_staff:
            user.is_active = activate
            serializers = UserSerializer(user, many=False)
            user.save()
            return JsonResponse(serializers.data, status=200,safe=False)
        return HttpResponse("Bad request",status=400)
    # except:
    #     return HttpResponse("Bad request",status=400)
    
@api_view(['GET'])
@permission_classes([IsAuthenticated, IsManagerUser])
@authentication_classes([JWTAuthentication])
def admin_get_all_payment(request):
    try:
        payments = Purchase.objects.all().order_by('-time').order_by('user_id')
        serializers = PurchaseSerializer(payments, many=True)
        return JsonResponse(serializers.data, status=200,safe=False)
    except:
        return HttpResponse("Bad request",status=400)
    
@api_view(['GET'])
@permission_classes([IsAuthenticated, IsManagerUser])
@authentication_classes([JWTAuthentication])
def admin_get_detail_payment(request,id):
    try:
        payment = Purchase.objects.get(id=id)
        serializers = PurchaseSerializer(payment)
        return JsonResponse(serializers.data, status=200,safe=False)
    except:
        return HttpResponse("Bad request",status=400)
    
@api_view(['GET'])
@permission_classes([IsAuthenticated, IsManagerUser])
@authentication_classes([JWTAuthentication])
def admin_get_all_comment(request):
    try:
        comments = Comment.objects.all().order_by('-post_time')
        serializers = CommentSerializer(comments, many=True)
        return JsonResponse(serializers.data, status=200,safe=False)
    except:
        return HttpResponse("Bad request",status=400)
    
@api_view(['POST'])
@permission_classes([IsAuthenticated, IsManagerUser])
@authentication_classes([JWTAuthentication])
def admin_remove_comment(request, pk):
    try:
        comment = get_object_or_404(Comment, pk=pk)  
        comment.delete()
        return HttpResponse("Delete success", status=200)
    except Comment.DoesNotExist:
        return Response({'error': 'Comment not found.'}, status=404)
    except Exception as e:
        return Response({'error': str(e)}, status=500)