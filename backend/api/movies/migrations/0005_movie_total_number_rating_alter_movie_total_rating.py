# Generated by Django 4.2.1 on 2023-06-14 07:54

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('movies', '0004_alter_movie_genres'),
    ]

    operations = [
        migrations.AddField(
            model_name='movie',
            name='total_number_rating',
            field=models.IntegerField(default=0),
        ),
        migrations.AlterField(
            model_name='movie',
            name='total_rating',
            field=models.IntegerField(default=0),
        ),
    ]
