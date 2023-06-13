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
    description = models.TextField(null=True)
    background= models.ImageField(upload_to='images/background/',null=True)
    banner = models.ImageField(upload_to='images/banner/',null=True)
    source_link = models.FileField(upload_to='videos/movie/',null=True)
    trailer_link = models.FileField(upload_to='videos/trailer/',null=True)
    date_submit = models.DateField(auto_now=False, auto_now_add=True)
    date_release = models.DateField(null=True)
    count_view = models.IntegerField(default=0)
    is_showing = models.BooleanField(default=False)
    movie_length = models.CharField(max_length=100, null=True)
    age_recommend = models.IntegerField(null=True)
    movie_intro = models.TextField(null=True)
    genres = models.ManyToManyField(Genre)
    price = models.FloatField(default=0)
  
    class Meta:
        db_table = 'movie'
        ordering = [models.functions.Cast('date_release', models.DateTimeField()).desc()]

