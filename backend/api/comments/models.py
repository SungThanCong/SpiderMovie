from django.db import models
from django.contrib.auth.models import User
from django.core.validators import MaxValueValidator
from movies import models as movies_model


class Comment(models.Model):
    content = models.CharField(max_length=1000)
    post_time = models.DateTimeField(auto_now=False, auto_now_add=True)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    movie = models.ForeignKey(movies_model.Movie, on_delete=models.CASCADE)

    class Meta:
        db_table = 'comment'
        ordering = [models.functions.Cast('post_time', models.DateTimeField()).desc()]

class Rating(models.Model):
    rating = models.IntegerField(validators=[MaxValueValidator(10)])
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    movie = models.ForeignKey(movies_model.Movie, on_delete=models.CASCADE)

    class Meta:
        db_table = 'rating'