
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
