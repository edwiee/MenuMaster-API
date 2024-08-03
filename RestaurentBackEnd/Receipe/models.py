from datetime import timedelta

from django.db import models

# Create your models here.

class Recipes(models.Model):
    name = models.CharField(max_length=200)
    prep_time = models.CharField(max_length=10)
    # difficulty_choices = [
    #     ('Easy', 'Easy'),
    #     ('Medium', 'Medium'),
    #     ('Hard', 'Hard'),
    # ]
    # difficulty = models.CharField(choices=difficulty_choices, max_length=15, blank=True)
    # difficulty = models.CharField(max_length=10)
    # vegetarian_choices = {
    #     ('Non.Veg','Non.Veg'),
    #     ('Veg', 'Veg'),
    #     ('Both', 'Both')
    # }

    # vegetarian = models.CharField(choices=vegetarian_choices, max_length=15,blank=True)
    vegetarian = models.CharField(max_length=10)
    recipe_img = models.ImageField(upload_to='recipe')
    description = models.CharField(max_length=5000)