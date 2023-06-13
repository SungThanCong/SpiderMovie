from django.contrib.auth.models import User
from rest_framework import generics
from rest_framework.permissions import AllowAny
from .serializers import RegisterSerializer, UserSerializer
from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework.permissions import IsAuthenticated
from rest_framework.views import APIView
from rest_framework.response import Response
from django.views.decorators.csrf import csrf_exempt
from django.http import HttpResponse, JsonResponse
from PIL import Image
from io import BytesIO
from rest_framework_simplejwt.views import TokenObtainPairView


class RegisterView(generics.CreateAPIView):
    queryset = User.objects.all()
    permission_classes = [AllowAny]
    serializer_class = RegisterSerializer


class AdminTokenObtainPairView(TokenObtainPairView):
    def post(self, request, *args, **kwargs):
        response = super().post(request, *args, **kwargs)
        token = response.data.get('access')
        if token:
            username = request.data.get('username')
            user = User.objects.get(username=username)
            response.data['role'] = 1
            if not user.is_superuser:
                return Response({'detail': 'You do not have permission to access this resource.'}, status=403)
        return response
    
class UserTokenObtainPairView(TokenObtainPairView):
    def post(self, request, *args, **kwargs):
        response = super().post(request, *args, **kwargs)
        token = response.data.get('access')
        if token:
            username = request.data.get('username')
            user = User.objects.get(username=username)
            response.data['role'] = 0
            if not user.is_active:
                return Response({'detail': 'Your account has locked.'}, status=403)
            if user.is_superuser:
                return Response({'detail': 'Your account is not access as customer.'}, status=403)
        return response
    
class UserInfoView(APIView):
    permission_classes = [IsAuthenticated]
    authentication_classes = [JWTAuthentication]

    def get(self, request):
        user = request.user
        info = User.objects.get(pk=user.id)
        serializer = RegisterSerializer(info)

        return JsonResponse(
            serializer.data, safe=False
        )
    def post(self, request):
        user = request.user
        info = User.objects.get(pk=user.id)
        serializer = UserSerializer(info, data=request.data, partial=True)
        
        if serializer.is_valid():
            image_data = request.FILES.get('avatar')
            if image_data:
                info.avatar_url.save(image_data.name, image_data)

            serializer.save()

            return JsonResponse(
                serializer.data, safe=False, status=200
            )
        else:
            return JsonResponse(
                serializer.errors, status=400)
        
