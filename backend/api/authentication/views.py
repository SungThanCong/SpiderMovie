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
    """
    Lớp xử lý yêu cầu đăng ký người dùng mới.

    Tham số:
    - generics.CreateAPIView: Lớp cho phép tạo đối tượng mới.

    Thuộc tính:
    - queryset: Queryset của tất cả các đối tượng User trong cơ sở dữ liệu.
    - permission_classes: Danh sách các lớp cho phép xác định ai được phép truy cập API. Ở đây, tất cả các người dùng đều được phép truy cập.
    - serializer_class: Lớp Serializer để sử dụng cho yêu cầu đăng ký mới.

    Trả về:
    - Trả về một đối tượng User mới được tạo ra dưới dạng đối tượng JSON được mã hóa bởi RegisterSerializer và mã trạng thái HTTP 201 nếu thành công.

    Cách sử dụng:
    - Sử dụng lớp RegisterSerializer để phân tích cú pháp yêu cầu đăng ký và tạo một đối tượng User mới.
    - Trả về một đối tượng JsonResponse chứa đối tượng User mới nếu thành công.
    """
    queryset = User.objects.all()
    permission_classes = [AllowAny]
    serializer_class = RegisterSerializer


class AdminTokenObtainPairView(TokenObtainPairView):
    """
    Lớp xử lý yêu cầu truy xuất mã thông báo truy cập (access token và refresh token) cho người dùng quản trị.

    Tham số:
    - TokenObtainPairView: Lớp xử lý yêu cầu truy xuất mã thông báo truy cập.

    Phương thức:
    - post: Phương thức xử lý yêu cầu POST để truy xuất mã thông báo truy cập.
    
    Trả về:
    - Trả về một đối tượng Response với mã trạng thái HTTP 403 nếu người dùng không có quyền truy cập tài nguyên.
    - Trả về một đối tượng Response với mã trạng thái HTTP và thông tin mã thông báo truy cập.

    Cách sử dụng:
    - Lấy mã thông báo truy cập được trả về bởi phương thức POST.
    - Sử dụng mã thông báo truy cập để xác thực người dùng và trả về thông tin về mã thông báo truy cập.
    - Kiểm tra xem người dùng có quyền truy cập tài nguyên hay không. Nếu không có, trả về một đối tượng Response với mã trạng thái HTTP 403.
    """
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
    """
    Lớp xử lý yêu cầu truy xuất mã thông báo truy cập cho người dùng.

    Tham số:
    - TokenObtainPairView: Lớp xử lý yêu cầu truy xuất mã thông báo truy cập.

    Phương thức:
    - post: Phương thức xử lý yêu cầu POST để truy xuất mã thông báo truy cập.
    
    Trả về:
    - Trả về một đối tượng Response với mã trạng thái HTTP 403 nếu tài khoản của người dùng bị khóa hoặc người dùng không phải là khách hàng.
    - Trả về một đối tượng Response với mã trạng thái HTTP và thông tin mã thông báo truy cập.

    Cách sử dụng:
    - Lấy mã thông báo truy cập được trả về bởi phương thức POST.
    - Sử dụng mã thông báo truy cập để xác thực người dùng và trả về thông tin về mã thông báo truy cập.
    - Kiểm tra xem tài khoản của người dùng có bị khóa hay không hoặc người dùng có phải là khách hàng hay không. Nếu không phải, trả về một đối tượng Response với mã trạng thái HTTP 403.
    """
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
    """
    Lớp xử lý yêu cầu để lấy thông tin người dùng và cập nhật thông tin người dùng.

    Thuộc tính:
    - permission_classes: Danh sách các lớp cho phép xác định ai được phép truy cập API. Ở đây, chỉ người dùng đã xác thực mới được phép truy cập.
    - authentication_classes: Danh sách các lớp xác thực được sử dụng để xác thực yêu cầu. Ở đây, chúng tôi sử dụng JWTAuthentication để xác thực mã thông báo truy cập.

    Phương thức:
    - get: Phương thức xử lý yêu cầu GET để lấy thông tin người dùng.
    - post: Phương thức xử lý yêu cầu POST để cập nhật thông tin người dùng.

    Trả về:
    - Trả về một đối tượng JsonResponse chứa thông tin người dùng hoặc thông tin lỗi nếu yêu cầu không hợp lệ.

    Cách sử dụng:
    - Lấy thông tin người dùng bằng cách sử dụng đối tượng HttpRequest và trả về một đối tượng JsonResponse chứa thông tin người dùng.
    - Cập nhật thông tin người dùng bằng cách sử dụng đối tượng HttpRequest và serializer, sau đó trả về một đối tượng JsonResponse chứa thông tin người dùng mới nếu thành công hoặc một đối tượng JsonResponse chứa thông tin lỗi nếu yêu cầu không hợp lệ.
    """
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
        
