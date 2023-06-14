from django.urls import path
import manager.views

urlpatterns = [
    path('list_user/', manager.views.admin_get_all_user ),
    path('list_user/<int:id>', manager.views.admin_get_detai_user ),
    path('active_user/<int:id>', manager.views.admin_active_user),
    path('list_payment/',manager.views.admin_get_all_payment),
    path('list_payment/<int:id>', manager.views.admin_get_detail_payment),
    path('list_comment/', manager.views.admin_get_all_comment),
    
    path('delete_comment/<int:pk>', manager.views.admin_remove_comment),
    
]