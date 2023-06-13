from rest_framework.permissions import BasePermission
from django.contrib.auth.models import User

class IsManagerUser(BasePermission):
    def has_permission(self, request, view):
        return request.user.is_authenticated and request.user.is_superuser