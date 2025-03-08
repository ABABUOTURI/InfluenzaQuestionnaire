from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import home, UserViewSet, login_view, SubmitFormView
from kemriinfluenza.fastapi_app import app as fastapi_app
from django.http import HttpRequest
from fastapi.middleware.wsgi import WSGIMiddleware

router = DefaultRouter()
router.register(r'users', UserViewSet, basename='user')

urlpatterns = [
    path('', include(router.urls)),
    path('login/', login_view, name="login"),
    path('submit/', SubmitFormView.as_view(), name='submit_form'),
    path('fastapi/', WSGIMiddleware(fastapi_app)),  # Integrate FastAPI into Django
]
