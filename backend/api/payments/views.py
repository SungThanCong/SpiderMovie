from django.shortcuts import render
from rest_framework.decorators import api_view
from django.http import HttpResponse, JsonResponse
from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework.permissions import IsAuthenticated
from payments.serializers import PurchaseSerializer
from payments.models import Purchase
from rest_framework.decorators import permission_classes, authentication_classes
from movies.models import Movie
import datetime
from payments.forms import PaymentForm
from payments.vnpay import vnpay
from payments.configs import settings
from django.shortcuts import redirect
from django.forms.models import model_to_dict
from django.utils import timezone
import json


@api_view(['GET'])
@permission_classes([IsAuthenticated])
@authentication_classes([JWTAuthentication])
def get_all_payment(request):
    try:
        payments = Purchase.objects.all()
        serializer = PurchaseSerializer(payments, many=True)
        return JsonResponse(serializer.data, safe=False)
    except Purchase.DoesNotExist:
        return HttpResponse("Not find",status=404)
    

@api_view(['GET'])
@permission_classes([IsAuthenticated])
@authentication_classes([JWTAuthentication])
def get_all_payment_user(request):
    try:
        user = request.user
        payments = Purchase.objects.all().filter(user__id=user.id)
        serializer = PurchaseSerializer(payments, many=True)
        return JsonResponse(serializer.data, safe=False, status=200)
    except Purchase.DoesNotExist:
        return HttpResponse("Not find",status=404)
    
@api_view(['POST'])
@permission_classes([IsAuthenticated])
@authentication_classes([JWTAuthentication])
def check_movie_and_user(request,idMovie):
    try:
        user = request.user
        check = Purchase.objects.filter(user__id=user.id, movie__id=idMovie)
        if check.exists():
            return HttpResponse("OK", status=200)
        else:
            return HttpResponse("Not find",status=404)
    except Purchase.DoesNotExist:
        return HttpResponse("Not find",status=404)
    
@api_view(['POST'])
@permission_classes([IsAuthenticated])
@authentication_classes([JWTAuthentication])
def create_receipt(request):
    try:
        user = request.user
        movies = json.loads(request.body)
        
        for item in movies['data']:
            check = Purchase.objects.filter(user__id=user.id, movie__id=movies['data'][str(item)]['id'])
            if check.exists():
                continue
            payment = Purchase(
                user = user,
                movie_id = movies['data'][str(item)]['id'],
                price = movies['data'][str(item)]['price'],
                time = timezone.now()
            )
            movie = Movie.objects.get(id=movies['data'][str(item)]['id'])
            movie.count_view += 1

            payment.save()

            movie.save()
        return JsonResponse(movies['data'], status=200, safe=False)
    except Purchase.DoesNotExist:
        return HttpResponse("Not find",status=404)
    
# def get_client_ip(request):
#     x_forwarded_for = request.META.get('HTTP_X_FORWARDED_FOR')
#     if x_forwarded_for:
#         ip = x_forwarded_for.split(',')[0]
#     else:
#         ip = request.META.get('REMOTE_ADDR')
#     return ip

# @api_view(['POST'])
# @permission_classes([IsAuthenticated])
# @authentication_classes([JWTAuthentication])
# def payment(request):
  
#     # form = PaymentForm(request.POST)
#     # if form.is_valid():
#     #     order_type = form.cleaned_data['order_type']
#     #     order_id = form.cleaned_data['order_id']
#     #     amount = form.cleaned_data['amount']
#     #     order_desc = form.cleaned_data['order_desc']
#     #     bank_code = form.cleaned_data['bank_code']
#     #     language = form.cleaned_data['language']
#     amount = request.data.get('amount')
#     ipaddr = get_client_ip(request)
#     # Build URL Payment
#     vnp = vnpay()
#     vnp.requestData['vnp_Version'] = '2.1.0'
#     vnp.requestData['vnp_Command'] = 'pay'
#     vnp.requestData['vnp_TmnCode'] = settings.VNPAY_TMN_CODE
#     vnp.requestData['vnp_Amount'] = str(float(amount) * 100 * 23600)
#     vnp.requestData['vnp_CurrCode'] = 'VND'
#     vnp.requestData['vnp_TxnRef'] = "pay"+datetime.datetime.now().strftime('%Y%m%d%H%M%S')
#     vnp.requestData['vnp_OrderInfo'] = request.user.id
#     vnp.requestData['vnp_OrderType'] =  "other"
#     vnp.requestData['vnp_CreateDate'] = datetime.datetime.now().strftime('%Y%m%d%H%M%S')
#     vnp.requestData['vnp_IpAddr'] = ipaddr
#     vnp.requestData['vnp_ReturnUrl'] = settings.VNPAY_RETURN_URL
#     vnpay_payment_url = vnp.get_payment_url(settings.VNPAY_PAYMENT_URL, settings.VNPAY_HASH_SECRET_KEY)
#     object = {"url": vnpay_payment_url}
#     return redirect(vnpay_payment_url)



# def payment_ipn(request):
#     inputData = request.GET
#     if inputData:
#         vnp = vnpay()
#         vnp.responseData = inputData.dict()
#         order_id = inputData['vnp_TxnRef']
#         amount = inputData['vnp_Amount']
#         order_desc = inputData['vnp_OrderInfo']
#         vnp_TransactionNo = inputData['vnp_TransactionNo']
#         vnp_ResponseCode = inputData['vnp_ResponseCode']
#         vnp_TmnCode = inputData['vnp_TmnCode']
#         vnp_PayDate = inputData['vnp_PayDate']
#         vnp_BankCode = inputData['vnp_BankCode']
#         vnp_CardType = inputData['vnp_CardType']
#         if vnp.validate_response(settings.VNPAY_HASH_SECRET_KEY):
#             # Check & Update Order Status in your Database
#             # Your code here
#             firstTimeUpdate = True
#             totalAmount = True
#             if totalAmount:
#                 if firstTimeUpdate:
#                     if vnp_ResponseCode == '00':
#                         print('Payment Success. Your code implement here')
#                     else:
#                         print('Payment Error. Your code implement here')

#                     # Return VNPAY: Merchant update success
#                     result = JsonResponse({'RspCode': '00', 'Message': 'Confirm Success'})
#                 else:
#                     # Already Update
#                     result = JsonResponse({'RspCode': '02', 'Message': 'Order Already Update'})
#             else:
#                 # invalid amount
#                 result = JsonResponse({'RspCode': '04', 'Message': 'invalid amount'})
#         else:
#             # Invalid Signature
#             result = JsonResponse({'RspCode': '97', 'Message': 'Invalid Signature'})
#     else:
#         result = JsonResponse({'RspCode': '99', 'Message': 'Invalid request'})

#     return result


# def payment_return(request):
#     inputData = request.GET
#     if inputData:
#         vnp = vnpay()
#         vnp.responseData = inputData.dict()
#         order_id = inputData['vnp_TxnRef']
#         amount = int(inputData['vnp_Amount']) / 100
#         order_desc = inputData['vnp_OrderInfo']
#         vnp_TransactionNo = inputData['vnp_TransactionNo']
#         vnp_ResponseCode = inputData['vnp_ResponseCode']
#         vnp_TmnCode = inputData['vnp_TmnCode']
#         vnp_PayDate = inputData['vnp_PayDate']
#         vnp_BankCode = inputData['vnp_BankCode']
#         vnp_CardType = inputData['vnp_CardType']
#         if vnp.validate_response(settings.VNPAY_HASH_SECRET_KEY):
#             if vnp_ResponseCode == "00":
#                 HttpResponse("Thành công", status=200)
#             else:
#                 HttpResponse("Không thành công", status=400)
#         else:
#             HttpResponse("Lỗi", status=400)

#     else:
#         HttpResponse("Lỗi", status=400)
            