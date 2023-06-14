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
    """
    Hàm xử lý yêu cầu để lấy danh sách tất cả các bộ phim.

    Tham số:
    - request: Đối tượng HttpRequest chứa thông tin về yêu cầu được gửi đến server.

    Phương thức:
    - HTTP GET: Phương thức xử lý yêu cầu GET để lấy danh sách tất cả các bộ phim.

    Trả về:
    - Trả về một đối tượng JsonResponse chứa thông tin về danh sách các bộ phim.
    - Nếu không tìm thấy bất kỳ bộ phim nào, trả về một đối tượng JsonResponse trống.

    Cách sử dụng:
    - Sử dụng đối tượng HttpRequest để gửi yêu cầu GET để lấy danh sách tất cả các bộ phim.
    - Trả về một đối tượng JsonResponse chứa thông tin về danh sách các bộ phim hoặc trả về một đối tượng JsonResponse trống nếu không tìm thấy bất kỳ bộ phim nào.
    """
    if request.method == 'GET':
        movies = Movie.objects.all()
        serializer = MovieSerializer(movies, many=True)
        return JsonResponse(serializer.data, safe=False)

@api_view(['GET'])
def movie_pagination(request):
    """
    Hàm xử lý yêu cầu để lấy danh sách các bộ phim được phân trang.

    Tham số:
    - request: Đối tượng HttpRequest chứa thông tin về yêu cầu được gửi đến server.

    Phương thức:
    - HTTP GET: Phương thức xử lý yêu cầu GET để lấy danh sách các bộ phim được phân trang.

    Trả về:
    - Trả về một đối tượng JsonResponse chứa thông tin về danh sách các bộ phim được phân trang.
    - Nếu không tìm thấy bất kỳ bộ phim nào, trả về một đối tượng JsonResponse trống.

    Cách sử dụng:
    - Sử dụng đối tượng HttpRequest để gửi yêu cầu GET để lấy danh sách các bộ phim được phân trang.
    - Trả về một đối tượng JsonResponse chứa thông tin về danh sách các bộ phim được phân trang hoặc trả về một đối tượng JsonResponse trống nếu không tìm thấy bất kỳ bộ phim nào.

    Chú thích:
    - Hàm này sử dụng phân trang để hiển thị danh sách các bộ phim một cách phù hợp. Mặc định, mỗi trang sẽ hiển thị 10 bộ phim.
    """
    paginator = PageNumberPagination()
    paginator.page_size = 10
    movies = paginator.paginate_queryset(Movie.objects.all(), request)
    serializer = MovieSerializer(movies, many=True)
    return paginator.get_paginated_response(serializer.data)

@api_view(['GET'])
def movie_category(request, id):
    """
    Hàm xử lý yêu cầu để lấy danh sách các bộ phim thuộc một thể loại cụ thể.

    Tham số:
    - request: Đối tượng HttpRequest chứa thông tin về yêu cầu được gửi đến server.
    - id: Mã số của thể loại bộ phim cần được lấy danh sách.

    Phương thức:
    - HTTP GET: Phương thức xử lý yêu cầu GET để lấy danh sách các bộ phim thuộc một thể loại cụ thể.

    Trả về:
    - Trả về một đối tượng JsonResponse chứa thông tin về danh sách các bộ phim thuộc một thể loại cụ thể.
    - Trả về một đối tượng HttpResponse với mã trạng thái HTTP 404 và nội dung "Not find" nếu không tìm thấy bất kỳ bộ phim nào thuộc thể loại cụ thể.

    Cách sử dụng:
    - Sử dụng đối tượng HttpRequest và mã số của thể loại bộ phim để gửi yêu cầu GET để lấy danh sách các bộ phim thuộc một thể loại cụ thể.
    - Trả về một đối tượng JsonResponse chứa thông tin về danh sách các bộ phim thuộc một thể loại cụ thể hoặc trả về một đối tượng HttpResponse với mã trạng thái HTTP 404 và nội dung "Not find" nếu không tìm thấy bất kỳ bộ phim nào thuộc thể loại cụ thể.
    """
    try:
        movies = Movie.objects.all().filter(genres__id=id)
        serializer = MovieSerializer(movies, many=True)
        return JsonResponse(serializer.data, safe=False)
    except Movie.DoesNotExist:
        return HttpResponse("Not find",status=404)
    
@api_view(['GET'])
def movie_search(request, keyword):
    """
    Hàm xử lý yêu cầu để tìm kiếm các bộ phim theo từ khóa.

    Tham số:
    - request: Đối tượng HttpRequest chứa thông tin về yêu cầu được gửi đến server.
    - keyword: Từ khóa tìm kiếm để tìm các bộ phim.

    Phương thức:
    - HTTP GET: Phương thức xử lý yêu cầu GET để tìm kiếm các bộ phim theo từ khóa.

    Trả về:
    - Trả về một đối tượng JsonResponse chứa thông tin về danh sách các bộ phim phù hợp với từ khóa tìm kiếm.
    - Trả về một đối tượng HttpResponse với mã trạng thái HTTP 404 và nội dung "Not find" nếu không tìm thấy bất kỳ bộ phim nào phù hợp với từ khóa tìm kiếm.

    Cách sử dụng:
    - Sử dụng đối tượng HttpRequest và từ khóa tìm kiếm để gửi yêu cầu GET để tìm kiếm các bộ phim phù hợp với từ khóa tìm kiếm.
    - Trả về một đối tượng JsonResponse chứa thông tin về danh sách các bộ phim phù hợp với từ khóa tìm kiếm hoặc trả về một đối tượng HttpResponse với mã trạng thái HTTP 404 và nội dung "Not find" nếu không tìm thấy bất kỳ bộ phim nào phù hợp với từ khóa tìm kiếm.
    """
    try:
        movies = Movie.objects.all().filter(title__icontains=keyword)
        serializer = MovieSerializer(movies, many=True)
        return JsonResponse(serializer.data, safe=False)
    except Movie.DoesNotExist:
        return HttpResponse("Not find",status=404)
    
@api_view(['GET'])
def movie_top_rate(request):
    """
    Hàm xử lý yêu cầu để lấy danh sách 10 bộ phim có tỷ lệ đánh giá cao nhất.

    Tham số:
    - request: Đối tượng HttpRequest chứa thông tin về yêu cầu được gửi đến server.

    Phương thức:
    - HTTP GET: Phương thức xử lý yêu cầu GET để lấy danh sách 10 bộ phim có tỷ lệ đánh giá cao nhất.

    Trả về:
    - Trả về một đối tượng JsonResponse chứa thông tin về danh sách 10 bộ phim có tỷ lệ đánh giá cao nhất.
    - Trả về một đối tượng HttpResponse với mã trạng thái HTTP 404 và nội dung "Not find" nếu không tìm thấy bất kỳ bộ phim nào.

    Cách sử dụng:
    - Sử dụng đối tượng HttpRequest để gửi yêu cầu GET để lấy danh sách 10 bộ phim có tỷ lệ đánh giá cao nhất.
    - Trả về một đối tượng JsonResponse chứa thông tin về danh sách 10 bộ phim có tỷ lệ đánh giá cao nhất hoặc trả về một đối tượng HttpResponse với mã trạng thái HTTP 404 và nội dung "Not find" nếu không tìm thấy bất kỳ bộ phim nào.

    Ghi chú:
    - Hàm này sử dụng phương thức `order_by` để sắp xếp danh sách bộ phim theo tỷ lệ đánh giá. Mặc định, danh sách được sắp xếp theo thứ tự giảm dần và chỉ trả về 10 bộ phim có tỷ lệ đánh giá cao nhất.
    """
    try:
        movies = Movie.objects.all().order_by('-total_rating')[:10]
        serializer = MovieSerializer(movies, many=True)
        return JsonResponse(serializer.data, safe=False)
    except Movie.DoesNotExist:
        return HttpResponse("Not find",status=404)
    
@api_view(['GET'])
def movie_trending(request):
    """
    Hàm xử lý yêu cầu để lấy danh sách 10 bộ phim đang được xem nhiều nhất.

    Tham số:
    - request: Đối tượng HttpRequest chứa thông tin về yêu cầu được gửi đến server.

    Phương thức:
    - HTTP GET: Phương thức xử lý yêu cầu GET để lấy danh sách 10 bộ phim đang được xem nhiều nhất.

    Trả về:
    - Trả về một đối tượng JsonResponse chứa thông tin về danh sách 10 bộ phim đang được xem nhiều nhất.
    - Trả về một đối tượng HttpResponse với mã trạng thái HTTP 404 và nội dung "Not find" nếu không tìm thấy bất kỳ bộ phim nào.

    Cách sử dụng:
    - Sử dụng đối tượng HttpRequest để gửi yêu cầu GET để lấy danh sách 10 bộ phim đang được xem nhiều nhất.
    - Trả về một đối tượng JsonResponse chứa thông tin về danh sách 10 bộ phim đang được xem nhiều nhất hoặc trả về một đối tượng HttpResponse với mã trạng thái HTTP 404 và nội dung "Not find" nếu không tìm thấy bất kỳ bộ phim nào.

    Ghi chú:
    - Hàm này sử dụng phương thức `order_by` để sắp xếp danh sách bộ phim theo số lần xem. Mặc định, danh sách được sắp xếp theo thứ tự giảm dần và chỉ trả về 10 bộ phim đang được xem nhiều nhất.
    """
    try:
        movies = Movie.objects.all().order_by('-count_view')[:10]
        serializer = MovieSerializer(movies, many=True)
        return JsonResponse(serializer.data, safe=False)
    except Movie.DoesNotExist:
        return HttpResponse("Not find",status=404)


    
@api_view(['GET'])
def movie_detail(request, pk):
    """
    Hàm xử lý yêu cầu để lấy thông tin chi tiết về một bộ phim cụ thể.

    Tham số:
    - request: Đối tượng HttpRequest chứa thông tin về yêu cầu được gửi đến server.
    - pk: Khóa chính của bộ phim cần lấy thông tin chi tiết.

    Phương thức:
    - HTTP GET: Phương thức xử lý yêu cầu GET để lấy thông tin chi tiết về một bộ phim cụ thể.

    Trả về:
    - Trả về một đối tượng JsonResponse chứa thông tin chi tiết về bộ phim cụ thể.
    - Trả về một đối tượng HttpResponse với mã trạng thái HTTP 404 và nội dung "Not find" nếu không tìm thấy bộ phim có khóa chính phù hợp.

    Cách sử dụng:
    - Sử dụng đối tượng HttpRequest và khóa chính của bộ phim để gửi yêu cầu GET để lấy thông tin chi tiết về bộ phim cụ thể.
    - Trả về một đối tượng JsonResponse chứa thông tin chi tiết về bộ phim cụ thể hoặc trả về một đối tượng HttpResponse với mã trạng thái HTTP 404 và nội dung "Not find" nếu không tìm thấy bộ phim có khóa chính phù hợp.
    """
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
    """
    Hàm xử lý yêu cầu để thêm một bộ phim mới vào cơ sở dữ liệu.

    Tham số:
    - request: Đối tượng HttpRequest chứa thông tin về yêu cầu được gửi đến server.

    Phương thức:
    - HTTP POST: Phương thức xử lý yêu cầu POST để thêm một bộ phim mới vào cơ sở dữ liệu.

    Trả về:
    - Trả về một đối tượng Response với mã trạng thái HTTP 200 và thông tin về bộ phim mới được thêm vào nếu thêm thành công.
    - Trả về một đối tượng Response với mã trạng thái HTTP 400 và thông tin về lỗi nếu thông tin bộ phim được gửi không hợp lệ.
    - Trả về một đối tượng Response với mã trạng thái HTTP 500 và thông tin về lỗi nếu có lỗi xảy ra trong quá trình thêm bộ phim mới.

    Cách sử dụng:
    - Sử dụng đối tượng HttpRequest để gửi yêu cầu POST để thêm một bộ phim mới vào cơ sở dữ liệu.
    - Trả về một đối tượng Response với mã trạng thái HTTP 200 và thông tin về bộ phim mới được thêm vào nếu thêm thành công.
    - Trả về một đối tượng Response với mã trạng thái HTTP 400 và thông tin về lỗi nếu thông tin bộ phim được gửi không hợp lệ.
    - Trả về một đối tượng Response với mã trạng thái HTTP 500 và thông tin về lỗi nếu có lỗi xảy ra trong quá trình thêm bộ phim mới.

    Ghi chú:
    - Hàm này yêu cầu người dùng đã xác thực và có quyền quản lý để thêm bộ phim mới vào cơ sở dữ liệu.
    - Hàm này sử dụng serializer `MovieCreateSerializer` để xác thực và tạo một đối tượng bộ phim mới từ dữ liệu được gửi trong yêu cầu.
    - Nếu serializer hợp lệ, bộ phim mới sẽ được lưu vào cơ sở dữ liệu và trả về trong đối tượng Response với mã trạng thái HTTP 200.
    - Nếu serializer không hợp lệ, thông tin về lỗi sẽ được trả về trong đối tượng Response với mã trạng thái HTTP 400.
    - Nếu có bất kỳ lỗi nào khác xảy ra trong quá trình thêm bộ phim mới, thông tin về lỗi sẽ được trả về trong đối tượng Response với mã trạng thái HTTP 500.
    """
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
    """
    Hàm xử lý yêu cầu để cập nhật thông tin của một bộ phim có sẵn trong cơ sở dữ liệu.

    Tham số:
    - request: Đối tượng HttpRequest chứa thông tin về yêu cầu được gửi đến server.
    - pk: Khóa chính của bộ phim cần cập nhật thông tin.

    Phương thức:
    - HTTP POST: Phương thức xử lý yêu cầu POST để cập nhật thông tin của một bộ phim có sẵn trong cơ sở dữ liệu.

    Trả về:
    - Trả về một đối tượng Response với mã trạng thái HTTP 200 và thông tin về bộ phim được cập nhật nếu cập nhật thành công.
    - Trả về một đối tượng Response với mã trạng thái HTTP 400 và thông tin về lỗi nếu thông tin bộ phim được gửi không hợp lệ.
    - Trả về một đối tượng Response với mã trạng thái HTTP 404 nếu không tìm thấy bộ phim có khóa chính phù hợp.
    - Trả về một đối tượng Response với mã trạng thái HTTP 500 và thông tin về lỗi nếu có lỗi xảy ra trong quá trình cập nhật bộ phim.

    Cách sử dụng:
    - Sử dụng đối tượng HttpRequest và khóa chính của bộ phim để gửi yêu cầu POST để cập nhật thông tin của bộ phim có sẵn trong cơ sở dữ liệu.
    - Trả về một đối tượng Response với mã trạng thái HTTP 200 và thông tin về bộ phim được cập nhật nếu cập nhật thành công.
    - Trả về một đối tượng Response với mã trạng thái HTTP 400 và thông tin về lỗi nếu thông tin bộ phim được gửi không hợp lệ.
    - Trả về một đối tượng Response với mã trạng thái HTTP 404 nếu không tìm thấy bộ phim có khóa chính phù hợp.
    - Trả về một đối tượng Response với mã trạng thái HTTP 500 và thông tin về lỗi nếu có lỗi xảy ra trong quá trình cập nhật bộ phim.

    Ghi chú:
    - Hàm này yêu cầu người dùng đã xác thực và có quyền quản lý để cập nhật thông tin của một bộ phim có sẵn trong cơ sở dữ liệu.
    - Hàm này sử dụng serializer `MovieCreateSerializer` để xác thực và cập nhật thông tin của bộ phim từ dữ liệu được gửi trong yêu cầu.
    - Thông tin bộ phim cập nhật sẽ được truyền dưới dạng `request.data`.
    - Nếu serializer hợp lệ, thông tin về bộ phim đã được cập nhật sẽ được trả về trong đối tượng Response với mã trạng thái HTTP 200.
    - Nếu serializer không hợp lệ, thông tin về lỗi sẽ được trả về trong đối tượng Response với mã trạng thái HTTP 400.
    - Nếu không tìm thấy bộ phim có khóa chính phù hợp, đối tượng Response sẽ trả về với mã trạng thái HTTP 404.
    - Nếu có bất kỳ lỗi nào khác xảy ra trong quá trình cập nhật bộ phim, thông tin về lỗi sẽ được trả về trong đối tượng Response với mã trạng thái HTTP 500.
    """
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
    """
    Hàm xử lý yêu cầu để xóa thông tin của một bộ phim có sẵn trong cơ sở dữ liệu.

    Tham số:
    - request: Đối tượng HttpRequest chứa thông tin về yêu cầu được gửi đến server.
    - pk: Khóa chính của bộ phim cần xóa thông tin.

    Phương thức:
    - HTTP POST: Phương thức xử lý yêu cầu POST để xóa thông tin của một bộ phim có sẵn trong cơ sở dữ liệu.

    Trả về:
    - Trả về một đối tượng HttpResponse với mã trạng thái HTTP 200 và thông tin xóa thành công nếu xóa thành công.
    - Trả về một đối tượng Response với mã trạng thái HTTP 404 và thông tin bộ phim không được tìm thấy nếu không tìm thấy bộ phim có khóa chính phù hợp.
    - Trả về một đối tượng Response với mã trạng thái HTTP 500 và thông tin về lỗi nếu có lỗi xảy ra trong quá trình xóa bộ phim.

    Cách sử dụng:
    - Sử dụng đối tượng HttpRequest và khóa chính của bộ phim để gửi yêu cầu POST để xóa thông tin của bộ phim có sẵn trong cơ sở dữ liệu.
    - Trả về một đối tượng HttpResponse với mã trạng thái HTTP 200 và thông tin xóa thành công nếu xóa thành công.
    - Trả về một đối tượng Response với mã trạng thái HTTP 404 và thông tin bộ phim không được tìm thấy nếu không tìm thấy bộ phim có khóa chính phù hợp.
    - Trả về một đối tượng Response với mã trạng thái HTTP 500 và thông tin về lỗi nếu có lỗi xảy ra trong quá trình xóa bộ phim.

    Ghi chú:
    - Hàm này yêu cầu người dùng đã xác thực và có quyền quản lý để xóa thông tin của một bộ phim có sẵn trong cơ sở dữ liệu.
    - Thông tin bộ phim cần xóa sẽ được xác định bằng khóa chính của nó.
    - Nếu xóa thành công, đối tượng HttpResponse sẽ trả về với mã trạng thái HTTP 200 và thông tin xóa thành công.
    - Nếu không tìm thấy bộ phim có khóa chính phù hợp, đối tượng Response sẽ trả về với mã trạng thái HTTP 404.
    - Nếu có bất kỳ lỗi nào khác xảy ra trong quá trình xóa bộ phim, thông tin về lỗi sẽ được trả về trong đối tượng Response với mã trạng thái HTTP 500.
    """
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
    """
    Hàm xử lý yêu cầu để lấy danh sách các thể loại phim có sẵn trong cơ sở dữ liệu.

    Tham số:
    - request: Đối tượng HttpRequest chứa thông tin về yêu cầu được gửi đến server.

    Phương thức:
    - HTTP GET: Phương thức xử lý yêu cầu GET để lấy danh sách các thể loại phim có sẵn trong cơ sở dữ liệu.

    Trả về:
    - Trả về một đối tượng JsonResponse chứa danh sách các thể loại phim có sẵn trong cơ sở dữ liệu nếu thành công.
    - Nếu có lỗi xảy ra trong quá trình lấy danh sách thể loại phim, trả về một đối tượng Response với mã trạng thái HTTP 500 và thông tin về lỗi.

    Cách sử dụng:
    - Sử dụng đối tượng HttpRequest để gửi yêu cầu GET để lấy danh sách các thể loại phim có sẵn trong cơ sở dữ liệu.
    - Trả về một đối tượng JsonResponse chứa danh sách các thể loại phim có sẵn trong cơ sở dữ liệu nếu thành công.
    - Nếu có lỗi xảy ra trong quá trình lấy danh sách thể loại phim, thông tin về lỗi sẽ được trả về trong đối tượng Response với mã trạng thái HTTP 500.

    Ghi chú:
    - Để lấy danh sách các thể loại phim, hàm này sử dụng hàm `all()` của lớp `Genre` để truy vấn tất cả các thể loại phim có sẵn trong cơ sở dữ liệu.
    - Sau đó, chúng tôi sử dụng `GenreSerializer` để chuyển đổi danh sách các thể loại phim thành JSON và trả về đối tượng JsonResponse.
    - Nếu có bất kỳ lỗi nào khác xảy ra trong quá trình lấy danh sách thể loại phim, chúng tôi sẽ trả về một đối tượng Response với mã trạng thái HTTP 500 và thông tin về lỗi.
    """
    try:
        genres = Genre.objects.all()
        serializer = GenreSerializer(genres, many=True)
        return JsonResponse(serializer.data, safe=False)
    except Exception as e:
        return Response("Error", status=500)


@api_view(['GET', 'PUT', 'DELETE'])
def genre_detail(request, pk):
    """
    Hàm xử lý yêu cầu để thực hiện các thao tác trên một thể loại phim cụ thể trong cơ sở dữ liệu.

    Tham số:
    - request: Đối tượng HttpRequest chứa thông tin về yêu cầu được gửi đến server.
    - pk: Khóa chính của thể loại phim cần thực hiện các thao tác.

    Phương thức:
    - HTTP GET: Phương thức xử lý yêu cầu GET để lấy thông tin về thể loại phim cụ thể trong cơ sở dữ liệu.
    - HTTP PUT: Phương thức xử lý yêu cầu PUT để cập nhật thông tin của một thể loại phim cụ thể trong cơ sở dữ liệu.
    - HTTP DELETE: Phương thức xử lý yêu cầu DELETE để xóa thông tin của một thể loại phim cụ thể trong cơ sở dữ liệu.

    Trả về:
    - Trả về một đối tượng JsonResponse chứa thông tin về thể loại phim nếu thành công với phương thức GET hoặc PUT.
    - Trả về một đối tượng HttpResponse với mã trạng thái HTTP 204 nếu thành công với phương thức DELETE.
    - Nếu không tìm thấy thể loại phim có khóa chính phù hợp, trả về một đối tượng HttpResponse với mã trạng thái HTTP 404.
    - Nếu có lỗi xảy ra trong quá trình cập nhật thông tin của một thể loại phim, trả về một đối tượng JsonResponse với mã trạng thái HTTP 400 và thông tin về lỗi.

    Cách sử dụng:
    - Sử dụng đối tượng HttpRequest và khóa chính của thể loại phim để gửi yêu cầu GET, PUT hoặc DELETE để lấy thông tin, cập nhật hoặc xóa thông tin của một thể loại phim trong cơ sở dữ liệu.
    - Trả về một đối tượng JsonResponse chứa thông tin về thể loại phim nếu thành công với phương thức GET hoặc PUT.
    - Trả về một đối tượng HttpResponse với mã trạng thái HTTP 204 nếu thành công với phương thức DELETE.
    - Nếu không tìm thấy thể loại phim có khóa chính phù hợp, đối tượng HttpResponse sẽ trả về với mã trạng thái HTTP 404.
    - Nếu có lỗi xảy ra trong quá trình cập nhật thông tin của một thể loại phim, thông tin về lỗi sẽ được trả về trong đối tượng JsonResponse với mã trạng thái HTTP 400.

    Ghi chú:
    - Hàm này yêu cầu người dùng đã xác thực và có quyền quản lý để thực hiện các thao tác trên thể loại phim trong cơ sở dữ liệu.
    - Thông tin về thể loại phim cần thực hiện các thao tác sẽ được xác định bằng khóa chính của nó.
    - Nếu thành công với phương thức PUT, chúng tôi sử dụng `GenreSerializer` để cập nhật thông tin của thể loại phim và trả về đối tượng JsonResponse.
    - Nếu không tìm thấy thể loại phim có khóa chính phù hợp, chúng tôi sẽ trả về một đối tượng HttpResponse với mã trạng thái HTTP 404.
    - Nếu có bất kỳ lỗi nào khác xảy ra trong quá trình cập nhật thông tin của thể loại phim, chúng tôi sẽ trả về một đối tượng JsonResponse với mã trạng thái HTTP 400 và thông tin về lỗi.
    - Nếu thành công với phương thức DELETE, chúng tôi sẽ xóa thông tin của thể loại phim và trả về một đối tượng HttpResponse với mã trạng thái HTTP 204.
    - Để tìm thể loại phim cần thực hiện các thao tác, chúng tôi sử dụng phương thức `get()` của lớp `Genre` và xử lý ngoại lệ `DoesNotExist` nếu không tìm thấy thể loại phim phù hợp với khóa chính được cung cấp.
    """
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