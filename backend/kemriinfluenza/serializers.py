from rest_framework import serializers
from .models import Questionnaire, SocioEconomicDemographic, SourcesInformationSexualBehavior

# Questionnaire Serializer
class QuestionnaireSerializer(serializers.ModelSerializer):
    class Meta:
        model = Questionnaire
        fields = '__all__'

# SocioEconomicDemographic Serializer
class SocioEconomicDemographicSerializer(serializers.ModelSerializer):
    class Meta:
        model = SocioEconomicDemographic
        fields = '__all__'

# SourcesInformationSexualBehavior Serializer
class SourcesInformationSexualBehaviorSerializer(serializers.ModelSerializer):
    class Meta:
        model = SourcesInformationSexualBehavior
        fields = '__all__'
