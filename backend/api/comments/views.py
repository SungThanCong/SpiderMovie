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
    """
    Trả về danh sách bình luận cho một phim cụ thể dựa trên ID của phim.

    Tham số:
    - request: Đối tượng HttpRequest đại diện cho yêu cầu HTTP hiện tại.
    - id: ID của phim cần lấy bình luận.

    Trả về:
    - Nếu tìm thấy bình luận, trả về dữ liệu bình luận được mã hóa bởi CommentSerializer dưới dạng một đối tượng JsonResponse.
    - Nếu không tìm thấy bình luận, trả về một đối tượng HttpResponse với mã trạng thái HTTP 404.

    Ngoại lệ:
    - Comment.DoesNotExist: Nếu không có bình luận nào được tìm thấy cho phim cụ thể.

    Cách sử dụng:
    - Sử dụng CommentSerializer để mã hóa các đối tượng Comment.
    - Lấy bình luận cho phim cụ thể.
    - Trả về một đối tượng JsonResponse chứa dữ liệu bình luận hoặc một đối tượng HttpResponse với mã trạng thái HTTP 404 nếu không tìm thấy bình luận.
    """
    try:
        comments = Comment.objects.all().filter(movie__id=id)
        serializer = CommentSerializer(comments, many=True)
        return JsonResponse(serializer.data, safe=False)
    except Comment.DoesNotExist:
        return HttpResponse("Not find",status=404)
        
@api_view(['POST'])
@permission_classes([IsAuthenticated])
@authentication_classes([JWTAuthentication])
def add_comment(request):
    """
    Thêm một bình luận mới cho một phim cụ thể.

    Tham số:
    - request: Đối tượng HttpRequest đại diện cho yêu cầu HTTP hiện tại.

    Trả về:
    - Nếu thành công, trả về dữ liệu bình luận được mã hóa bởi model_to_dict() dưới dạng một đối tượng JsonResponse với mã trạng thái HTTP 200.
    - Nếu không thành công, trả về một đối tượng HttpResponse với mã trạng thái HTTP 500.

    Ngoại lệ:
    - Movie.DoesNotExist: Nếu không tìm thấy phim với ID được cung cấp.

    Cách sử dụng:
    - Sử dụng request.data để lấy dữ liệu đầu vào từ yêu cầu HTTP.
    - Sử dụng IsAuthenticated để xác minh người dùng đã đăng nhập.
    - Sử dụng JWTAuthentication để xác thực người dùng bằng JSON Web Token (JWT).
    - Tạo một đối tượng Comment mới với các trường được cung cấp.
    - Lưu đối tượng Comment vào cơ sở dữ liệu.
    - Trả về một đối tượng JsonResponse chứa dữ liệu bình luận hoặc một đối tượng HttpResponse với mã trạng thái HTTP 500 nếu không thành công.
    """
    user = request.user
    content = request.data.get('content')
    movie = request.data.get('movie')
    user = request.user

    try:
        movieInstane = Movie.objects.get(id=movie)
    except Movie.DoesNotExist:
        return HttpResponse("Movie does not exist", status=404)
    
    if content and movie and user:
        post_time = timezone.now()
        comment = Comment(
            content = content,
            user = user,
            movie = movieInstane,
            post_time = post_time 
        )
        try:
            comment.save()
        except Exception as e:
            return HttpResponse(f"Error: {str(e)}", status=500)
        return JsonResponse(model_to_dict(comment), status=200, safe=False)
    return HttpResponse("Error", status=500)

@api_view(['POST'])
@permission_classes([IsAuthenticated])
@authentication_classes([JWTAuthentication])
def update_comment(request, pk):
    """
    Cập nhật một bình luận đã tồn tại.

    Tham số:
    - request: Đối tượng HttpRequest đại diện cho yêu cầu HTTP hiện tại.
    - pk: Khóa chính của bình luận cần cập nhật.

    Trả về:
    - Nếu thành công, trả về dữ liệu bình luận được cập nhật dưới dạng một đối tượng Response với mã trạng thái HTTP 200.
    - Nếu không thành công, trả về một đối tượng Response với mã trạng thái HTTP 400.

    Cách sử dụng:
    - Sử dụng request.data để lấy dữ liệu đầu vào từ yêu cầu HTTP.
    - Sử dụng IsAuthenticated để xác minh người dùng đã đăng nhập.
    - Sử dụng JWTAuthentication để xác thực người dùng bằng JSON Web Token (JWT).
    - Sử dụng get_object_or_404() để lấy bình luận cần cập nhật.
    - Sử dụng CommentSerializer để giải mã bình luận và lưu các thay đổi.
    - Trả về một đối tượng Response chứa dữ liệu bình luận hoặc một đối tượng Response với mã trạng thái HTTP 400 nếu không thành công.
    """
    user = request.user
    comment = get_object_or_404(Comment, pk=pk, user__id = user.id)  
    serializer = CommentSerializer(comment, data=request.data, partial=True)
    if serializer.is_valid():      
        serializer.save() 
        return Response(serializer.data)
    
@api_view(['POST'])
@permission_classes([IsAuthenticated])
@authentication_classes([JWTAuthentication])
def remove_comment(request, pk):
    """
    Xóa một bình luận đã tồn tại.

    Tham số:
    - request: Đối tượng HttpRequest đại diện cho yêu cầu HTTP hiện tại.
    - pk: Khóa chính của bình luận cần xóa.

    Trả về:
    - Nếu thành công, trả về một đối tượng HttpResponse với mã trạng thái HTTP 200 và thông báo "Delete success".
    - Nếu không thành công vì bình luận không tồn tại, trả về một đối tượng Response với mã trạng thái HTTP 404 và thông báo lỗi.
    - Nếu không thành công vì lỗi khác, trả về một đối tượng Response với mã trạng thái HTTP 500 và thông báo lỗi.

    Cách sử dụng:
    - Sử dụng request.user để xác định người dùng hiện tại.
    - Sử dụng get_object_or_404() để lấy bình luận cần xóa.
    - Xóa bình luận.
    - Trả về một đối tượng HttpResponse với mã trạng thái HTTP 200 nếu thành công hoặc một đối tượng Response với mã trạng thái HTTP 404 hoặc 500 nếu không thành công.
    """
    try:
        user = request.user
        comment = get_object_or_404(Comment, pk=pk, user__id=user.id)  
        comment.delete()
        return HttpResponse("Delete success", status=200)
    except Comment.DoesNotExist:
        return Response({'error': 'Comment not found.'}, status=404)
    except Exception as e:
        return Response({'error': str(e)}, status=500)

@api_view(['GET'])
def get_rating_movie(request,id):
    """
    Lấy tất cả các đánh giá cho một phim cụ thể.

    Tham số:
    - request: Đối tượng HttpRequest đại diện cho yêu cầu HTTP hiện tại.
    - id: ID của phim cần lấy đánh giá.

    Trả về:
    - Nếu thành công, trả về một đối tượng JsonResponse chứa danh sách đánh giá được mã hóa bởi CommentSerializer dưới dạng một mảng các đối tượng JSON với mã trạng thái HTTP 200.
    - Nếu không thành công vì không tìm thấy đánh giá nào cho phim cụ thể, trả về một đối tượng HttpResponse với mã trạng thái HTTP 404.

    Cách sử dụng:
    - Sử dụng ID của phim để lọc các đánh giá trong bảng Rating.
    - Sử dụng CommentSerializer để mã hóa danh sách đánh giá.
    - Trả về một đối tượng JsonResponse chứa danh sách đánh giá nếu thành công hoặc một đối tượng HttpResponse với mã trạng thái HTTP 404 nếu không thành công.
    """
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
    """
    Lấy đánh giá của một phim cụ thể được thực hiện bởi một người dùng cụ thể.

    Tham số:
    - request: Đối tượng HttpRequest đại diện cho yêu cầu HTTP hiện tại.
    - id: ID của phim cần lấy đánh giá.
    
    Trả về:
    - Nếu thành công, trả về một đối tượng JsonResponse chứa đánh giá được mã hóa bởi RatingSerializer dưới dạng một đối tượng JSON với mã trạng thái HTTP 200.
    - Nếu không thành công vì không tìm thấy đánh giá nào của người dùng cụ thể cho phim cụ thể, trả về một đối tượng HttpResponse với mã trạng thái HTTP 404.

    Cách sử dụng:
    - Sử dụng ID của phim để lọc các đánh giá trong bảng Rating.
    - Sử dụng request.user để xác định người dùng hiện tại.
    - Sử dụng RatingSerializer để mã hóa đánh giá.
    - Trả về một đối tượng JsonResponse chứa đánh giá nếu thành công hoặc một đối tượng HttpResponse với mã trạng thái HTTP 404 nếu không thành công.
    """
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
    """
    Thêm một đánh giá mới hoặc cập nhật đánh giá hiện có cho một phim.

    Tham số:
    - request: Đối tượng HttpRequest đại diện cho yêu cầu HTTP hiện tại.

    Trả về:
    - Nếu thành công, trả về một đối tượng JsonResponse chứa đánh giá được mã hóa bởi RatingSerializer dưới dạng một đối tượng JSON với mã trạng thái HTTP 200.
    - Nếu không thành công, trả về một đối tượng JsonResponse với thông báo lỗi và mã trạng thái HTTP 500.

    Cách sử dụng:
    - Sử dụng request.user để xác định người dùng hiện tại.
    - Sử dụng request.data để lấy dữ liệu đầu vào từ yêu cầu HTTP.
    - Kiểm tra xem người dùng đã đánh giá phim này trước đó hay chưa. Nếu có, cập nhật đánh giá hiện có. Nếu không, thêm đánh giá mới.
    - Cập nhật tổng điểm và số lượt đánh giá của phim.
    - Trả về một đối tượng JsonResponse chứa đánh giá nếu thành công hoặc một đối tượng JsonResponse với thông báo lỗi nếu không thành công.
    """
    try:
        rating = Rating(
            user_id = request.user.id,
            rating = request.data.get('rating'),
            movie_id = request.data.get('movie')
        )
    
        check = Rating.objects.filter(user__id= rating.user_id, movie__id = rating.movie_id).first()
        if check:
            movie = Movie.objects.get(id= rating.movie_id)
            movie.total_rating -= check.rating

            check.rating = rating.rating
            check.save() 

            movie.total_rating += int(rating.rating)
            movie.save()

            return JsonResponse(model_to_dict(check), status=200, safe=False)
        else:
            rating.save()

            movie = Movie.objects.get(id=rating.movie_id)
            movie.total_number_rating += 1
            movie.total_rating += int(rating.rating)
            movie.save()

            return JsonResponse(model_to_dict(rating), status=200, safe=False)
    except Exception as e:
        return JsonResponse({'error': str(e)}, status=500)

        
# @api_view(['POST'])
# @permission_classes([IsAuthenticated])
# @authentication_classes([JWTAuthentication])
# def update_rating(request, pk):
#     try:
#         user = request.user
#         rating = get_object_or_404(Rating, pk=pk, user__id = user.id)
#         serializer = RatingSerializer(rating, data=request.data,partial=True)
#         if serializer.is_valid():      
#             serializer.save() 
#             return Response(serializer.data)
#     except Exception as e:
#         return JsonResponse({'error': str(e)}, status=500)

@api_view(['POST'])
@permission_classes([IsAuthenticated])
@authentication_classes([JWTAuthentication])
def remove_rating(request, pk):
    """
    Xóa một đánh giá của người dùng cho một phim.

    Tham số:
    - request: Đối tượng HttpRequest đại diện cho yêu cầu HTTP hiện tại.
    - pk: Khóa chính của đánh giá cần xóa.

    Trả về:
    - Nếu thành công, trả về một đối tượng HttpResponse với mã trạng thái HTTP 200 và thông báo "Delete success".
    - Nếu không thành công vì đánh giá không tồn tại hoặc không thuộc về người dùng hiện tại, trả về một đối tượng Response với mã trạng thái HTTP 404 và thông báo lỗi.
    - Nếu không thành công vì lỗi khác, trả về một đối tượng Response với mã trạng thái HTTP 500 và thông báo lỗi.

    Cách sử dụng:
    - Sử dụng request.user để xác định người dùng hiện tại.
    - Sử dụng get_object_or_404() để lấy đánh giá cần xóa.
    - Xóa đánh giá.
    - Cập nhật tổng điểm và số lượt đánh giá của phim.
    - Trả về một đối tượng HttpResponse với mã trạng thái HTTP 200 nếu thành công hoặc một đối tượng Response với mã trạng thái HTTP 404 hoặc 500 nếu không thành công.
    """
    try:
        user = request.user
        rating = get_object_or_404(Rating, pk=pk, user__id = user.id)
        
        movie = Movie.objects.get(id=rating.movie_id)
        movie.total_number_rating -= 1
        movie.total_rating -= int(rating.rating)
            
        rating.delete()
        movie.save()
        return HttpResponse("Delete success", status=200)
    except Rating.DoesNotExist:
        return Response({'error': 'Rating not found.'}, status=404)
    except Exception as e:
        return Response({'error': str(e)}, status=500)