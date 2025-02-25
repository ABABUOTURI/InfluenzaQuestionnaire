from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import (
    QuestionnaireViewSet, 
    SocioEconomicDemographicViewSet, 
    SourcesInformationSexualBehaviorViewSet
)

router = DefaultRouter()
router.register(r'questionnaires', QuestionnaireViewSet)
router.register(r'socioeconomic', SocioEconomicDemographicViewSet)
router.register(r'sexualbehavior', SourcesInformationSexualBehaviorViewSet)

urlpatterns = [
    path('api/', include(router.urls)),  # This will expose API endpoints
]
