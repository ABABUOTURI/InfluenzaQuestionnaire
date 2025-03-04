from django.http import HttpResponse
from django.contrib.auth import get_user_model
from rest_framework import viewsets, status
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response
from .models import Respondent, EducatorName, Topic
from .serializers import UserSerializer, RespondentSerializer, EducatorNameSerializer, TopicSerializer
from rest_framework import status
from rest_framework.decorators import api_view
from django.contrib.auth import authenticate

# Home View (Optional)
def home(request):
    return HttpResponse("Welcome to the home page!")

@api_view(['POST'])
def login_view(request):
    staff_no = request.data.get('staffNo')
    password = request.data.get('password')

    if not staff_no or not password:
        return Response({"error": "Staff number and password are required"}, status=status.HTTP_400_BAD_REQUEST)

    user = authenticate(username=staff_no, password=password)

    if user:
        return Response({"message": "Login successful"}, status=status.HTTP_200_OK)
    else:
        return Response({"error": "Invalid credentials"}, status=status.HTTP_401_UNAUTHORIZED)

# API ViewSets
class UserViewSet(viewsets.ModelViewSet):
    """
    Handles user creation with password hashing.
    """
    queryset = get_user_model().objects.all()
    serializer_class = UserSerializer
    permission_classes = [AllowAny]  # ✅ Allow anyone to create an account

    def create(self, request, *args, **kwargs):
        """
        Overriding the create method to handle user creation securely.
        """
        serializer = self.get_serializer(data=request.data)
        if serializer.is_valid():
            user = serializer.save()
            user.set_password(serializer.validated_data['password'])  # Hash password
            user.save()
            return Response({"message": "User created successfully"}, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class RespondentViewSet(viewsets.ModelViewSet):
    """
    Handles the creation and retrieval of Respondent data.
    """
    queryset = Respondent.objects.all()
    serializer_class = RespondentSerializer
    permission_classes = [IsAuthenticated]

class EducatorNameViewSet(viewsets.ModelViewSet):
    """
    Handles the creation and retrieval of Educator data.
    """
    queryset = EducatorName.objects.all()
    serializer_class = EducatorNameSerializer
    permission_classes = [IsAuthenticated]

class TopicViewSet(viewsets.ModelViewSet):
    """
    Handles the creation and retrieval of Topics.
    """
    queryset = Topic.objects.all()
    serializer_class = TopicSerializer
    permission_classes = [IsAuthenticated]
