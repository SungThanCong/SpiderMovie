from django.db import models
from django.core.validators import MaxValueValidator


class Genre(models.Model):
    id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=100)
    description = models.TextField()

    class Meta:
        db_table = 'genre'
        ordering = ['id']

class Movie(models.Model):
    title = models.CharField(max_length=255)
    total_rating = models.FloatField(validators=[MaxValueValidator(10)], default=0)
    description = models.TextField()
    banner = models.TextField()
    source_link = models.TextField()
    trailer_link = models.TextField()
    date_submit = models.DateField(auto_now=False, auto_now_add=True)
    date_release = models.DateField()
    count_view = models.IntegerField(default=0)
    is_showing = models.BooleanField(default=False)
    genres = models.ManyToManyField(Genre)
    class Meta:
        db_table = 'movie'
        ordering = [models.functions.Cast('date_release', models.DateTimeField()).desc()]

