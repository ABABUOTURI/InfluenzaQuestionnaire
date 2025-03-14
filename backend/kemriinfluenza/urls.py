# # from django.urls import path, include
# # from rest_framework.routers import DefaultRouter
# # from .views import home, UserViewSet, login_view, SubmitFormView
# # from kemriinfluenza.fastapi_app import app as fastapi_app
# # from django.http import HttpRequest
# # from fastapi.middleware.wsgi import WSGIMiddleware

# # router = DefaultRouter()
# # router.register(r'users', UserViewSet, basename='user')

# # urlpatterns = [
# #     path('', include(router.urls)),
# #     path('login/', login_view, name="login"),
# #     path('submit/', SubmitFormView.as_view(), name='submit_form'),
# #     path('fastapi/', WSGIMiddleware(fastapi_app)),  # Integrate FastAPI into Django
# # ]

# from django.urls import path
# from .views import UserRegisterView, UserLoginView, SubmittedFormListCreateView, SubmittedFormDetailView

# urlpatterns = [
#     path('api/register/', UserRegisterView.as_view(), name='user-register'),
#     path('api/login/', UserLoginView.as_view(), name='user-login'),
#     path('api/forms/', SubmittedFormListCreateView.as_view(), name='form-list-create'),
#     path('api/forms/<int:pk>/', SubmittedFormDetailView.as_view(), name='form-detail'),
# ]

from django.urls import path
from .views import UserListCreateView, UserDetailView, RegisterUserView, SubmittedFormListCreateView, SubmittedFormDetailView, LoginView

urlpatterns = [
    path('users/', UserListCreateView.as_view(), name='user-list-create'),
    path('login/', LoginView, name='login'),
    path('users/<int:pk>/', UserDetailView.as_view(), name='user-detail'),
    path('users/register/', RegisterUserView.as_view(), name='register-user'),  # ✅ Add this line

    path('forms/', SubmittedFormListCreateView.as_view(), name='form-list-create'),
    path('forms/<int:pk>/', SubmittedFormDetailView.as_view(), name='form-detail'),
]

