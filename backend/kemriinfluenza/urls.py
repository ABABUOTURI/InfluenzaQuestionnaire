from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import home, UserViewSet,  login_view,  SubmitFormView

# Create a router and register viewsets
router = DefaultRouter()
router.register(r'users', UserViewSet, basename='user')
# router.register(r'respondents', RespondentViewSet)
# router.register(r'educator-names', EducatorNameViewSet)
# router.register(r'topics', TopicViewSet)

# Define urlpatterns
urlpatterns = [
    path('', include(router.urls)),  # API endpoints from viewsets
    path('login/', login_view, name="login"),  # Login endpoint
    path('submit/', SubmitFormView.as_view(), name='submit_form'),
]
