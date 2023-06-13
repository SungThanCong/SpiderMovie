from django.urls import path
from authentication.views import RegisterView, UserInfoView
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
import authentication.views

urlpatterns = [
    path('token/', authentication.views.UserTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('admin/token/', authentication.views.AdminTokenObtainPairView.as_view(), name="admin_token_obtain_pair"),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('register/', RegisterView.as_view(), name='auth_register'),
    path('getInfo/', UserInfoView.as_view(),name='user_info')

]