from django.contrib import admin
from .models import Movie, Genre


class GenreAdmin(admin.ModelAdmin):
    list_display = ('name',)
    search_fields = ('name',)

    def formfield_for_foreignkey(self, db_field,request, **kwargs):
        if db_field.name == "genre":
            kwargs["queryset"] = Genre.objects.order_by('name')
            kwargs["to_field_name"] = "name"
        return super().formfield_for_foreignkey(db_field, request, **kwargs)

class MovieAdmin(admin.ModelAdmin):
    list_display = ('title','date_release')

admin.site.register(Movie,MovieAdmin)
admin.site.register(Genre, GenreAdmin)
