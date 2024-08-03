import requests
from django.core.paginator import Paginator, EmptyPage, InvalidPage
from django.shortcuts import render, redirect
from rest_framework.permissions import AllowAny
from .forms import RecipeForm
from .models import *
from rest_framework import generics
from .serializers import RecipeSerializer
from django.contrib import messages


# Create your views here.
class createRecipe(generics.ListCreateAPIView):
    queryset = Recipes.objects.all()
    serializer_class = RecipeSerializer
    permission_classes = [AllowAny]


class detailRecipe(generics.RetrieveAPIView):
    queryset = Recipes.objects.all()
    serializer_class = RecipeSerializer


class updateRecipe(generics.RetrieveUpdateAPIView):
    queryset = Recipes.objects.all()
    serializer_class = RecipeSerializer


class deleteRecipe(generics.DestroyAPIView):
    queryset = Recipes.objects.all()
    serializer_class = RecipeSerializer


class searchRecipe(generics.ListAPIView):
    queryset = Recipes.objects.all()
    serializer_class = RecipeSerializer

    def get_queryset(self):
        Name = self.kwargs.get('name')
        return Recipes.objects.filter(name__icontains = Name)


# def createRecipeView(request):
#
#     if request.method == 'POST':
#         form = RecipeForm(request.POST, request.FILES)
#         if form.is_valid():
#             try:
#                 form.save()
#                 api_url = 'http://127.0.0.1:8000/createRecipe/'
#                 data = form.cleaned_data
#                 print(data)
#
#                 response = requests.post(api_url, data=data, files = {"recipe_img":request.FILES["recipe_img"]})
#
#                 if response.status_code == 400:
#                     messages.success(request, 'Item Added SuccessFully')
#                     return redirect('/')
#                 else:
#                     messages.error(request, f'Error{response.status_code}')
#             except requests.RequestException as e:
#                 messages.error(request, f'Error During API Request{str(e)}')
#         else:
#             messages.error(request, 'Error Founded 404')
#
#     else:
#         form = RecipeForm()
#
#     return render(request, 'createRecipeView.html', {'form':form})
#
# def updateRecipeView(request, id):
#     api_url = f'http://127.0.0.1:8000/detailsRecipe/{id}/'
#     response = requests.get(api_url)
#     if response.status_code == 200:
#         data = response.json()
#         ingredients = data['description'].split('.')
#     return render (request, 'updateRecipeView.html', {'recipes':data,'ingredients':ingredients})
#
#
# def updateRecipeDetail(request, id):
#     if request.method == 'POST':
#         Name = request.POST['name']
#         Prep_time = request.POST['prep_time']
#         Difficulty = request.POST['difficulty']
#         Vegetarian = request.POST['vegetarian', 'false']
#         if Vegetarian == 'true':
#             Vegetarian = True
#         else:
#             Vegetarian = False
#         print('Image Url', request.FILES.get('recipe_img'))
#         Description = request.POST['description']
#         api_url = f'http://127.0.0.1:8000/updateRecipe/{id}/'
#         data ={
#             'name': Name,
#             'prep_time':Prep_time,
#             'difficulty': Difficulty,
#             'vegetarian': Vegetarian,
#             'description': Description
#         }
#
#         files = {'recipe_img':request.FILES.get('recipe_img')}
#         response = requests.put(api_url, data=data, files=files)
#
#         if response.status_code == 200:
#             messages.success(request, 'Item Updated !!!')
#             return redirect('/')
#         else:
#             messages.error(request, f'Error Occurred While Updating: {response.status_code}')
#
#     return render(request, 'updateRecipeDetail.html')
#
# def index(request):
#     if request.method == 'POST':
#         search = request.POST['search']
#
#         api_url = f'http://127.0.0.1:8000/searchRecipe/{search}/'
#         try:
#             response =  requests.get(api_url)
#             print(response.status_code)
#
#             if response.status_code == 200:
#                 data = response.json()
#             else:
#                 data = None
#         except requests.RequestException as e:
#             data = None
#
#         return render(request, 'index1.html', {'data':data})
#
#     else:
#         api_url = 'http://127.0.0.1:8000/createRecipe/'
#
#         try:
#             response = requests.get(api_url)
#
#             if response.status_code ==  200:
#                 data = response.json()
#                 original_data = data
#
#                 paginator = Paginator(original_data, 6)
#                 try:
#                     page = int(request.GET.get('page',1))
#                 except:
#                     page = 1
#
#                 try:
#                     recipes = paginator.page(page)
#                 except(EmptyPage, InvalidPage):
#                     recipes = Paginator.page(paginator.num_pages)
#
#                     context = {
#                         'original_data':original_data,
#                         'recipes':recipes
#                     }
#                     return render(request, 'index1.html', {'context':context})
#             else:
#                 return render(request, 'index1.html', {'error_message' : f'Error:{response.status_code}'})
#
#         except requests.RequestException as e:
#             return render(request, 'index1.html', {'error_message': f'Error: {str(e)}'})
#
#     return render(request, 'index1.html')
#
#
# def fetchRecipe(request, id):
#     api_url = f'http://127.0.0.1:8000/detailsRecipe/{id}/'
#     response = requests.get(api_url)
#     if response.status_code == 200:
#         data = response.json()
#         ingredients = data['description'].split('.')
#         return render(request, 'recipeFetch.html', {'recipes': data, 'ingredients': ingredients})
#
#     return render(request, 'recipeFetch.html')
#
#
# def deleRecipe(request, id):
#
#     api_url = f'http://127.0.0.1:8000/deleteRecipe/{id}/'
#     response = requests.delete(api_url)
#
#     if response.status_code == 200:
#         print(f'Item with id{id} has been Deleted !!')
#     else:
#         print(f'Failed to delete item. status code {response.status_code}')
#     return redirect('/')
#
#
#
#
#
# def item(request):
#     return render(request, 'item.html')