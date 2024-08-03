from django.urls import path
from . import views

from .views import *

urlpatterns = [

    path('createRecipe/', createRecipe.as_view(), name = 'create-Recipe'),

    path('detailsRecipe/<int:pk>/', detailRecipe.as_view(), name = 'details-Recipe'),

    path('updateRecipe/<int:pk>/', updateRecipe.as_view(), name = 'update-Recipe'),

    path('deleteRecipe/<int:pk>/', deleteRecipe.as_view(), name = 'delete-Recipe'),

    path('searchRecipe/<str:name>/', searchRecipe.as_view(), name = 'search-Recipe'),



]