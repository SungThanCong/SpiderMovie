from django.db import models
from django.contrib.auth.models import User
from movies import models as movies_model
# Create your models here.
class Purchase(models.Model):  
    user = models.ForeignKey(User, on_delete=models.CASCADE)  
    movie = models.ForeignKey(movies_model.Movie, on_delete=models.CASCADE)
    price = models.DecimalField(max_digits=8, decimal_places=2)
    time = models.DateTimeField(auto_now_add=True)

    class Meta:
        db_table = 'purchase'
        