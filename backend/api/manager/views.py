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
    """
    Hàm xử lý yêu cầu để lấy danh sách tất cả người dùng không phải là nhân viên hoặc quản trị viên.

    Tham số:
    - request: Đối tượng HttpRequest chứa thông tin về yêu cầu được gửi đến server.

    Phương thức:
    - HTTP GET: Phương thức xử lý yêu cầu GET để lấy danh sách tất cả người dùng không phải là nhân viên hoặc quản trị viên.

    Trả về:
    - Trả về một đối tượng JsonResponse chứa danh sách tất cả người dùng không phải là nhân viên hoặc quản trị viên nếu thành công.
    - Nếu có lỗi xảy ra trong quá trình xử lý yêu cầu, trả về một đối tượng HttpResponse với mã trạng thái HTTP 400.

    Cách sử dụng:
    - Sử dụng đối tượng HttpRequest để gửi yêu cầu GET để lấy danh sách tất cả người dùng không phải là nhân viên hoặc quản trị viên.
    - Trả về một đối tượng JsonResponse chứa danh sách tất cả người dùng không phải là nhân viên hoặc quản trị viên nếu thành công.
    - Nếu có lỗi xảy ra trong quá trình xử lý yêu cầu, đối tượng HttpResponse sẽ trả về với mã trạng thái HTTP 400.
    """
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
    """
    Hàm xử lý yêu cầu để lấy thông tin chi tiết của một người dùng cụ thể.

    Tham số:
    - request: Đối tượng HttpRequest chứa thông tin về yêu cầu được gửi đến server.
    - id: Id của người dùng cần lấy thông tin chi tiết.

    Phương thức:
    - HTTP GET: Phương thức xử lý yêu cầu GET để lấy thông tin chi tiết của một người dùng cụ thể.

    Trả về:
    - Trả về một đối tượng JsonResponse chứa thông tin chi tiết của một người dùng cụ thể nếu thành công.
    - Nếu có lỗi xảy ra trong quá trình xử lý yêu cầu, trả về một đối tượng HttpResponse với mã trạng thái HTTP 400.

    Cách sử dụng:
    - Sử dụng đối tượng HttpRequest và id của người dùng để gửi yêu cầu GET để lấy thông tin chi tiết của một người dùng cụ thể.
    - Trả về một đối tượng JsonResponse chứa thông tin chi tiết của một người dùng cụ thể nếu thành công.
    - Nếu có lỗi xảy ra trong quá trình xử lý yêu cầu, đối tượng HttpResponse sẽ trả về với mã trạng thái HTTP 400.
    """
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
    """
    Kích hoạt hoặc vô hiệu hóa tài khoản của một người dùng cụ thể.

    Tham số:
    - request: HttpRequest object.
    - id: Id của người dùng cần thay đổi trạng thái tài khoản.

    Phương thức:
    - POST.

    Trả về:
    - Trả về một đối tượng JsonResponse chứa thông tin về tài khoản đã được thay đổi trạng thái nếu thành công.
    - Nếu có lỗi xảy ra, trả về HttpResponse object với mã trạng thái HTTP 400.

    Yêu cầu:
    - Phải xác thực và có quyền quản lý để thực hiện thay đổi trạng thái tài khoản của một người dùng cụ thể.
    - Sử dụng các lớp IsAuthenticated và IsManagerUser để kiểm tra quyền truy cập của người dùng.
    - Sử dụng lớp JWTAuthentication để xác thực người dùng bằng JSON Web Tokens.
    - Sử dụng phương thức get() để truy vấn thông tin người dùng và sau đó thay đổi trạng thái tài khoản của người dùng.
    - Trả về thông tin về tài khoản đã được kích hoạt hoặc vô hiệu hóa dưới dạng JSON.
    - Nếu người dùng là quản trị viên hoặc nhân viên, trả về HttpResponse object với mã trạng thái HTTP 400.
    - Nếu có lỗi xảy ra trong quá trình thực hiện thay đổi trạng thái tài khoản của một người dùng, trả về HttpResponse object với mã trạng thái HTTP 400.
    """
    try:
        activate = request.data.get('active')
        user = User.objects.get(id =id)
        if not user.is_superuser and not user.is_staff:
            user.is_active = activate
            serializers = UserSerializer(user, many=False)
            user.save()
            return JsonResponse(serializers.data, status=200,safe=False)
        return HttpResponse("Bad request",status=400)
    except:
        return HttpResponse("Bad request",status=400)
    
@api_view(['GET'])
@permission_classes([IsAuthenticated, IsManagerUser])
@authentication_classes([JWTAuthentication])
def admin_get_all_payment(request):
    """
    Lấy thông tin về tất cả các giao dịch thanh toán.

    Tham số:
    - request: Đối tượng HttpRequest chứa thông tin về yêu cầu được gửi đến server.

    Phương thức:
    - HTTP GET: Phương thức xử lý yêu cầu GET để lấy thông tin về tất cả các giao dịch thanh toán.

    Trả về:
    - Trả về một đối tượng JsonResponse chứa thông tin về tất cả các giao dịch thanh toán nếu thành công.
    - Nếu có lỗi xảy ra trong quá trình xử lý yêu cầu, trả về một đối tượng HttpResponse với mã trạng thái HTTP 400.

    Yêu cầu:
    - Phải xác thực và có quyền quản lý để lấy thông tin về tất cả các giao dịch thanh toán.
    - Sử dụng các lớp IsAuthenticated và IsManagerUser để kiểm tra quyền truy cập của người dùng.
    - Sử dụng lớp JWTAuthentication để xác thực người dùng bằng JSON Web Tokens.
    - Sử dụng phương thức all() để lấy thông tin về tất cả các giao dịch thanh toán.
    - Sắp xếp các giao dịch thanh toán theo thời gian giảm dần và theo ID của người dùng tăng dần.
    - Trả về thông tin về tất cả các giao dịch thanh toán dưới dạng JSON.
    - Nếu có lỗi xảy ra trong quá trình lấy thông tin về tất cả các giao dịch thanh toán, trả về một đối tượng HttpResponse với mã trạng thái HTTP 400.
    """
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
    """
    Trả về thông tin chi tiết của một hóa đơn.

    Tham số:
    - request: Đối tượng HttpRequest chứa thông tin về yêu cầu được gửi đến server.
    - id: ID của hóa đơn cần lấy thông tin chi tiết.

    Phương thức:
    - HTTP GET: Phương thức xử lý yêu cầu GET để lấy thông tin chi tiết của một hóa đơn.

    Trả về:
    - Trả về một đối tượng JsonResponse chứa thông tin chi tiết về hóa đơn nếu thành công.
    - Nếu không tìm thấy hóa đơn tương ứng với ID được cung cấp, trả về một đối tượng Http404.
    - Nếu người dùng không được ủy quyền để truy cập vào thông tin chi tiết hóa đơn, trả về một đối tượng PermissionDenied.
    - Nếu có lỗi xảy ra trong quá trình xử lý yêu cầu, trả về một đối tượng HttpResponse với mã trạng thái HTTP 400.

    Yêu cầu:
    - Phải xác thực và có quyền quản lý để truy cập vào thông tin chi tiết hóa đơn.
    - Sử dụng các lớp IsAuthenticated và IsManagerUser để kiểm tra quyền truy cập của người dùng.
    - Sử dụng lớp JWTAuthentication để xác thực người dùng bằng JSON Web Tokens.
    - Sử dụng đối tượng Purchase.objects.get(id=id) để lấy thông tin chi tiết của hóa đơn.
    - Sử dụng đối tượng PurchaseSerializer để chuyển đổi thông tin chi tiết hóa đơn thành định dạng JSON.
    """
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
    """
    Lấy thông tin về tất cả các bình luận được đăng trên trang web.

    Tham số:
    - request: Đối tượng HttpRequest chứa thông tin về yêu cầu được gửi đến server.

    Phương thức:
    - HTTP GET: Phương thức xử lý yêu cầu GET để lấy thông tin về tất cả các bình luận.

    Trả về:
    - Trả về một đối tượng JsonResponse chứa thông tin về tất cả các bình luận được đăng trên trang web nếu thành công.
    - Nếu có lỗi xảy ra trong quá trình xử lý yêu cầu, trả về một đối tượng HttpResponse với mã trạng thái HTTP 400.

    Yêu cầu:
    - Phải xác thực và có quyền quản lý để lấy thông tin về tất cả các bình luận.
    - Sử dụng các lớp IsAuthenticated và IsManagerUser để kiểm tra quyền truy cập của người dùng.
    - Sử dụng lớp JWTAuthentication để xác thực người dùng bằng JSON Web Tokens.
    - Sử dụng đối tượng Comment.objects.all().order_by('-post_time') để lấy thông tin về tất cả các bình luận và sắp xếp chúng theo thời gian đăng bài giảm dần.
    - Sử dụng đối tượng CommentSerializer để chuyển đổi thông tin về tất cả các bình luận thành định dạng JSON.
    """
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
    """
    Xóa một bình luận khỏi trang web.

    Tham số:
    - request: Đối tượng HttpRequest chứa thông tin về yêu cầu được gửi đến server.
    - pk: Khóa chính của bình luận cần xóa.

    Phương thức:
    - HTTP POST: Phương thức xử lý yêu cầu POST để xóa một bình luận.

    Trả về:
    - Trả về một đối tượng HttpResponse với mã trạng thái HTTP 200 nếu xóa bình luận thành công.
    - Nếu không tìm thấy bình luận tương ứng với khóa chính được cung cấp, trả về một đối tượng Response với mã trạng thái HTTP 404.
    - Nếu có lỗi xảy ra trong quá trình xóa bình luận, trả về một đối tượng Response với mã trạng thái HTTP 500.

    Yêu cầu:
    - Phải xác thực và có quyền quản lý để xóa bình luận.
    - Sử dụng các lớp IsAuthenticated và IsManagerUser để kiểm tra quyền truy cập của người dùng.
    - Sử dụng lớp JWTAuthentication để xác thực người dùng bằng JSON Web Tokens.
    - Sử dụng đối tượng get_object_or_404(Comment, pk=pk) để lấy bình luận cần xóa.
    """
    try:
        comment = get_object_or_404(Comment, pk=pk)  
        comment.delete()
        return HttpResponse("Delete success", status=200)
    except Comment.DoesNotExist:
        return Response({'error': 'Comment not found.'}, status=404)
    except Exception as e:
        return Response({'error': str(e)}, status=500)