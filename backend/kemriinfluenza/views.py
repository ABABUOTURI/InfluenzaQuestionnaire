from rest_framework import viewsets
from rest_framework.response import Response
from rest_framework import status
from django.shortcuts import get_object_or_404
from .models import Questionnaire, SocioEconomicDemographic, SourcesInformationSexualBehavior
from .serializers import (
    QuestionnaireSerializer, 
    SocioEconomicDemographicSerializer, 
    SourcesInformationSexualBehaviorSerializer
)

# View for Questionnaire
class QuestionnaireViewSet(viewsets.ModelViewSet):
    queryset = Questionnaire.objects.all()
    serializer_class = QuestionnaireSerializer

# View for SocioEconomicDemographic
class SocioEconomicDemographicViewSet(viewsets.ModelViewSet):
    queryset = SocioEconomicDemographic.objects.all()
    serializer_class = SocioEconomicDemographicSerializer

# View for Sources of Information and Sexual Behavior
class SourcesInformationSexualBehaviorViewSet(viewsets.ModelViewSet):
    queryset = SourcesInformationSexualBehavior.objects.all()
    serializer_class = SourcesInformationSexualBehaviorSerializer
