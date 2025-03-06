from django.contrib.auth import get_user_model  # ✅ Use get_user_model() for flexibility
from rest_framework import serializers
from .models import Respondent, Educator, Topic

User = get_user_model()  # ✅ Get the correct user model

# User Serializer
class UserSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True) 

    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'password']

    def create(self, validated_data):
        user = get_user_model().objects.create(
            username=validated_data['username'],  # ❗ Missing in frontend request
            email=validated_data.get('email', ''),
        )
        user.set_password(validated_data['password'])
        user.save()
        return user

class RespondentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Respondent
        fields = '__all__'


class TopicSerializer(serializers.ModelSerializer):
    class Meta:
        model = Topic
        fields = ['topic_name', 'respondent']


class EducatorSerializer(serializers.ModelSerializer):
    class Meta:
        model = Educator
        fields = ['educator_name', 'respondent']

# # Respondent Serializer
# class RespondentSerializer(serializers.ModelSerializer):
#     """
#     Serializer for the Respondent model.
#     """
#     class Meta:
#         model = Respondent
#         fields = '__all__'  # Include all fields in the model

# # Educator Serializer
# class EducatorNameSerializer(serializers.ModelSerializer):
#     """
#     Serializer for the EducatorName model.
#     """
#     class Meta:
#         model = EducatorName
#         fields = '__all__'  # Include all fields

# # Topic Serializer
# class TopicSerializer(serializers.ModelSerializer):
#     """
#     Serializer for the Topic model.
#     """
#     class Meta:
#         model = Topic
#         fields = '__all__'  # Include all fields
