from django.contrib import admin
from .models import Purchase

# Register your models here.
class AdminPurchase(admin.ModelAdmin):
    list_display = ('user','movie','price','time')
   
admin.site.register(Purchase, AdminPurchase)