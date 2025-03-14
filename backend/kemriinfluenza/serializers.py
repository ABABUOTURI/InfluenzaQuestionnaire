# # from django.contrib.auth import get_user_model  # ✅ Use get_user_model() for flexibility
# # from rest_framework import serializers
# # from .models import Respondent, Educator, Topic

# # User = get_user_model()  # ✅ Get the correct user model

# # # User Serializer
# # class UserSerializer(serializers.ModelSerializer):
# #     password = serializers.CharField(write_only=True) 

# #     class Meta:
# #         model = User
# #         fields = ['id', 'username', 'email', 'password']

# #     def create(self, validated_data):
# #         user = get_user_model().objects.create(
# #             username=validated_data['username'],  # ❗ Missing in frontend request
# #             email=validated_data.get('email', ''),
# #         )
# #         user.set_password(validated_data['password'])
# #         user.save()
# #         return user

# # class RespondentSerializer(serializers.ModelSerializer):
# #     class Meta:
# #         model = Respondent
# #         fields = '__all__'


# # class TopicSerializer(serializers.ModelSerializer):
# #     class Meta:
# #         model = Topic
# #         fields = ['topic_name', 'respondent']


# # class EducatorSerializer(serializers.ModelSerializer):
# #     class Meta:
# #         model = Educator
# #         fields = ['educator_name', 'respondent']

# # # # Respondent Serializer
# # # class RespondentSerializer(serializers.ModelSerializer):
# # #     """
# # #     Serializer for the Respondent model.
# # #     """
# # #     class Meta:
# # #         model = Respondent
# # #         fields = '__all__'  # Include all fields in the model

# # # # Educator Serializer
# # # class EducatorNameSerializer(serializers.ModelSerializer):
# # #     """
# # #     Serializer for the EducatorName model.
# # #     """
# # #     class Meta:
# # #         model = EducatorName
# # #         fields = '__all__'  # Include all fields

# # # # Topic Serializer
# # # class TopicSerializer(serializers.ModelSerializer):
# # #     """
# # #     Serializer for the Topic model.
# # #     """
# # #     class Meta:
# # #         model = Topic
# # #         fields = '__all__'  # Include all fields

# from rest_framework import serializers
# from .models import User, SubmittedForm

# class UserSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = User
#         fields = ['id', 'staff_no', 'email', 'password']
#         extra_kwargs = {'password': {'write_only': True}}

#     def create(self, validated_data):
#         # Hash the password before saving
#         user = User(**validated_data)
#         user.set_password(validated_data['password'])  # Ensure password hashing
#         user.save()
#         return user

# class SubmittedFormSerializer(serializers.ModelSerializer):
#     user = UserSerializer(read_only=True)  # Include user details in response

#     class Meta:
#         model = SubmittedForm
#         fields = '__all__'


from rest_framework import serializers
from .models import User, SubmittedForm
from .models import User
import re
from django.contrib.auth.hashers import make_password


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'staff_no', 'email', 'password']
        extra_kwargs = {
            'password': {'write_only': True},
            'email': {'required': True, 'allow_blank': False},  # Ensure email is required
        }
    def validate_email(self, value):
            """Ensure email starts with a letter and follows kemri.go.ke format."""
            regex = r'^[A-Za-z].*@kemri\.go\.ke$'
            if not re.match(regex, value):
                raise serializers.ValidationError("Email must start with a letter and be in the format example@kemri.go.ke.")
            return value

    def create(self, validated_data):
        """Hash password before saving the user."""
        validated_data['password'] = make_password(validated_data['password'])
        return super().create(validated_data)


class SubmittedFormSerializer(serializers.ModelSerializer):
    class Meta:
        model = SubmittedForm
        fields = '__all__'
