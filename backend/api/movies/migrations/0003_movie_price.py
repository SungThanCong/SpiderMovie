# Generated by Django 4.2.1 on 2023-05-31 15:23

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('movies', '0002_movie_movie_intro_alter_movie_description'),
    ]

    operations = [
        migrations.AddField(
            model_name='movie',
            name='price',
            field=models.FloatField(default=0),
        ),
    ]
