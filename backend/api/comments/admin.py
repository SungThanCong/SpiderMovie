from django.contrib import admin
from .models import Comment, Rating

class CommentAdmin(admin.ModelAdmin):
    list_display = ('user','movie','content','post_time')
   
class RatingAdmin(admin.ModelAdmin):
    list_display = ('user','movie','rating')
# Register your models here.
admin.site.register(Comment, CommentAdmin)
admin.site.register(Rating, RatingAdmin)