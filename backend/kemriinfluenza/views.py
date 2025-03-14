# # import json
# # from django.http import JsonResponse
# # from django.http import HttpResponse
# # from django.contrib.auth import get_user_model
# # from rest_framework import viewsets, status
# # from rest_framework.permissions import AllowAny, IsAuthenticated
# # from rest_framework.response import Response
# # # from .models import Respondent, EducatorName, Topic
# # # from .serializers import UserSerializer, RespondentSerializer, EducatorNameSerializer, TopicSerializer
# # from rest_framework import status
# # from rest_framework.decorators import api_view
# # from django.contrib.auth import authenticate

# # from rest_framework.views import APIView
# # from rest_framework.response import Response
# # from rest_framework import status
# # from .models import Respondent, Topic, Educator
# # from .serializers import UserSerializer, RespondentSerializer, TopicSerializer, EducatorSerializer

# # # Home View (Optional)
# # def home(request):
# #     return HttpResponse("Welcome to the home page!")

# # @api_view(['POST'])
# # def login_view(request):
# #     staff_no = request.data.get('staffNo')
# #     password = request.data.get('password')

# #     if not staff_no or not password:
# #         return Response({"error": "Staff number and password are required"}, status=status.HTTP_400_BAD_REQUEST)

# #     user = authenticate(username=staff_no, password=password)

# #     if user:
# #         return Response({"message": "Login successful"}, status=status.HTTP_200_OK)
# #     else:
# #         return Response({"error": "Invalid credentials"}, status=status.HTTP_401_UNAUTHORIZED)

# # # API ViewSets
# # class UserViewSet(viewsets.ModelViewSet):
# #     """
# #     Handles user creation with password hashing.
# #     """
# #     queryset = get_user_model().objects.all()
# #     serializer_class = UserSerializer
# #     permission_classes = [AllowAny]  # ✅ Allow anyone to create an account

# #     def create(self, request, *args, **kwargs):
# #         """
# #         Overriding the create method to handle user creation securely.
# #         """
# #         serializer = self.get_serializer(data=request.data)
# #         if serializer.is_valid():
# #             user = serializer.save()
# #             user.set_password(serializer.validated_data['password'])  # Hash password
# #             user.save()
# #             return Response({"message": "User created successfully"}, status=status.HTTP_201_CREATED)
# #         return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

# # class SubmitFormView(APIView):
# #     def post(self, request, *args, **kwargs):
# #         print("Received Data:", json.dumps(request.data, indent=4))  # ✅ Log incoming data

# #         # Extract data from request
# #         respondent_data = {
# #             "id": request.data.get("serial_number", ""),
# #             # "date_of_data_collection": request.data.get("date_of_data_collection", ""),
# #             "age": request.data.get("age", ""),
# #             "relationship": request.data.get("relationship", ""),
# #             "guardian_occupation": request.data.get("guardian_occupation", ""),
# #             "guardian_education": request.data.get("guardian_education", ""),
# #             "respondent_religion": request.data.get("respondent_religion", ""),
# #             "family_size": request.data.get("family_size", ""),
# #             "has_siblings": request.data.get("has_siblings", ""),
# #             "siblings_have_partners": request.data.get("siblings_have_partners", ""),
# #             "gets_pocket_money": request.data.get("gets_pocket_money", ""),
# #             "pocket_money_adequate": request.data.get("pocket_money_adequate", ""),
# #             "financial_support": request.data.get("financial_support", ""),
# #             "guardian_visits": request.data.get("guardian_visits", ""),
# #             "alternative_visitor": request.data.get("alternative_visitor", ""),
# #             "access_to_reproductive_health_info": request.data.get("access_to_reproductive_health_info", ""),
# #             "information_adequate": request.data.get("information_adequate", "")
# #         }
        
# #         topic_data = request.data.get("topic_name", [])
# #         educator_data = request.data.get("educator_name", [])

# #         # Validate data
# #         if not respondent_data["id"]:
# #             return Response({"error": "Serial number is required"}, status=status.HTTP_400_BAD_REQUEST)

# #         # Save respondent
# #         respondent_serializer = RespondentSerializer(data=respondent_data)
# #         if respondent_serializer.is_valid():
# #             respondent = respondent_serializer.save()

# #             # Save topics
# #             for topic in topic_data:
# #                 topic_serializer = TopicSerializer(data={"topic_name": topic, "respondent": respondent.id})
# #                 if topic_serializer.is_valid():
# #                     topic_serializer.save()

# #             # Save educators
# #             for educator in educator_data:
# #                 educator_serializer = EducatorSerializer(data={"educator_name": educator, "respondent": respondent.id})
# #                 if educator_serializer.is_valid():
# #                     educator_serializer.save()

# #             return Response({'message': 'Form submitted successfully'}, status=status.HTTP_201_CREATED)
# #         else:
# #             return Response(respondent_serializer.errors, status=status.HTTP_400_BAD_REQUEST)
# # # class SubmitFormView(APIView):
# # #     def post(self, request, *args, **kwargs):
# # #         print("Received Data:", json.dumps(request.data, indent=4))  # ✅ Log incoming data

# # #         respondent_data = request.data.get('respondent')
# # #         topic_data = request.data.get('topic', [])
# # #         educator_data = request.data.get('educator_name', [])

# # #         if not respondent_data or not topic_data or not educator_data:
# # #             return Response({'error': 'Missing required fields'}, status=status.HTTP_400_BAD_REQUEST)
# # #     # def post(self, request, *args, **kwargs):
# # #     #     print("Received Data:", json.dumps(request.data, indent=4))  # Log full request data

# # #     #     respondent_data = request.data.get('respondent')
# # #     #     topic_data = request.data.get('topic', [])
# # #     #     educator_data = request.data.get('educator_name', [])

# # #     #     if not respondent_data or not topic_data or not educator_data:
# # #     #         return Response({'error': 'Missing required fields'}, status=status.HTTP_400_BAD_REQUEST)

# # #         respondent_serializer = RespondentSerializer(data=respondent_data)
# # #         if respondent_serializer.is_valid():
# # #             respondent = respondent_serializer.save()

# # #             topic_errors = []
# # #             for topic in topic_data:
# # #                 topic_serializer = TopicSerializer(data={'topic_name': topic, 'respondent': respondent.id})
# # #                 if topic_serializer.is_valid():
# # #                     topic_serializer.save()
# # #                 else:
# # #                     topic_errors.append(topic_serializer.errors)

# # #             educator_errors = []
# # #             for educator in educator_data:
# # #                 educator_serializer = EducatorSerializer(data={'educator_name': educator, 'respondent': respondent.id})
# # #                 if educator_serializer.is_valid():
# # #                     educator_serializer.save()
# # #                 else:
# # #                     educator_errors.append(educator_serializer.errors)

# # #             if topic_errors or educator_errors:
# # #                 return Response({'topic_errors': topic_errors, 'educator_errors': educator_errors},
# # #                                 status=status.HTTP_400_BAD_REQUEST)

# # #             return Response({'message': 'Form submitted successfully'}, status=status.HTTP_201_CREATED)
# # #         else:
# # #             print("Validation Errors:", respondent_serializer.errors)  # Log validation errors
# # #             return Response(respondent_serializer.errors, status=status.HTTP_400_BAD_REQUEST)

# # # # class RespondentViewSet(viewsets.ModelViewSet):
# # #     """
# # #     Handles the creation and retrieval of Respondent data.
# # #     """
# # #     queryset = Respondent.objects.all()
# # #     serializer_class = RespondentSerializer
# # #     permission_classes = [IsAuthenticated]

# # # class EducatorNameViewSet(viewsets.ModelViewSet):
# # #     """
# # #     Handles the creation and retrieval of Educator data.
# # #     """
# # #     queryset = EducatorName.objects.all()
# # #     serializer_class = EducatorNameSerializer
# # #     permission_classes = [IsAuthenticated]

# # # class TopicViewSet(viewsets.ModelViewSet):
# # #     """
# # #     Handles the creation and retrieval of Topics.
# # #     """
# # #     queryset = Topic.objects.all()
# # #     serializer_class = TopicSerializer
# # #     permission_classes = [IsAuthenticated]

# from rest_framework import generics, permissions
# from rest_framework.response import Response
# from rest_framework.views import APIView
# from django.contrib.auth.hashers import check_password
# from .models import User, SubmittedForm
# from .serializers import UserSerializer, SubmittedFormSerializer

# # User Registration API
# class UserRegisterView(generics.CreateAPIView):
#     queryset = User.objects.all()
#     serializer_class = UserSerializer
#     permission_classes = [permissions.AllowAny]

# # User Login API
# class UserLoginView(APIView):
#     permission_classes = [permissions.AllowAny]

#     def post(self, request):
#         email = request.data.get('email')
#         password = request.data.get('password')
#         user = User.objects.filter(email=email).first()

#         if user and check_password(password, user.password):
#             return Response({'message': 'Login successful', 'user_id': user.id})
#         return Response({'error': 'Invalid credentials'}, status=400)

# # List and Create Form Submissions
# class SubmittedFormListCreateView(generics.ListCreateAPIView):
#     queryset = SubmittedForm.objects.all()
#     serializer_class = SubmittedFormSerializer
#     permission_classes = [permissions.IsAuthenticated]

#     def perform_create(self, serializer):
#         serializer.save(user=self.request.user)

# # Retrieve, Update, and Delete Form Submissions
# class SubmittedFormDetailView(generics.RetrieveUpdateDestroyAPIView):
#     queryset = SubmittedForm.objects.all()
#     serializer_class = SubmittedFormSerializer
#     permission_classes = [permissions.IsAuthenticated]

from django.contrib.auth import authenticate
from rest_framework import generics, status
from rest_framework.response import Response
from rest_framework.views import APIView
from django.contrib.auth.hashers import make_password
from .models import User, SubmittedForm
from .serializers import UserSerializer, SubmittedFormSerializer
from django.contrib.auth.hashers import check_password
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
import json
from .models import User




# User Registration View
class RegisterUserView(APIView):
    def post(self, request):
        data = request.data.copy()
        if 'password' in data:
            data['password'] = make_password(data['password'])  # Hash password

        serializer = UserSerializer(data=data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    

@csrf_exempt
def LoginView(request):
    if request.method == "POST":
        try:
            data = json.loads(request.body)
            staff_no = data.get("staffNo")
            password = data.get("password")

            # Check if user exists in the database
            user = User.objects.filter(staff_no=staff_no).first()

            if user and check_password(password, user.password):
                return JsonResponse({"message": "Login Successful!", "status": "success"})
            else:
                return JsonResponse({"message": "Invalid staff number or password.", "status": "error"}, status=400)

        except Exception as e:
            return JsonResponse({"message": f"An error occurred: {str(e)}", "status": "error"}, status=500)

    return JsonResponse({"message": "Invalid request method.", "status": "error"}, status=405)

# User API Views
class UserListCreateView(generics.ListCreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer

class UserDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer

# SubmittedForm API Views
class SubmittedFormListCreateView(generics.ListCreateAPIView):
    queryset = SubmittedForm.objects.all()
    serializer_class = SubmittedFormSerializer

def perform_create(self, serializer):
    serializer.save(user=self.request.user) 

class SubmittedFormDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = SubmittedForm.objects.all()
    serializer_class = SubmittedFormSerializer

