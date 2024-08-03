from rest_framework import serializers
from .models import  *

class RecipeSerializer(serializers.ModelSerializer):

    recipe_img = serializers.ImageField(required=False)
    class Meta:
        model =Recipes
        fields = '__all__'
