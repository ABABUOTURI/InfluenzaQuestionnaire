from django.contrib import admin
from django.http import HttpResponse
from django.urls import path, include

# Simple home view function
def home(request):
    return HttpResponse("Welcome to Influenza Backend!")

urlpatterns = [
    path('', home),  # Home route
    path('admin/', admin.site.urls),  # Admin panel
    path("api/", include("kemriinfluenza.urls")),  # Ensure the app is correct
]
