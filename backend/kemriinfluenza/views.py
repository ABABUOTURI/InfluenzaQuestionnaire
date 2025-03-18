

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
from django.db.models import Count
from .models import User
from django.db import models




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



class AgeDistributionView(APIView):
    def get(self, request):
        # Count the occurrences of each age
        data = SubmittedForm.objects.values('age').annotate(count=Count('age')).order_by('age')
        return JsonResponse(list(data), safe=False)
    
def get_age_distribution(request):
    data = SubmittedForm.objects.values('age').annotate(count=Count('age')).order_by('age')
    return JsonResponse(list(data), safe=False)


class EducationDistributionView(APIView):
    def get(self, request):
        # Count the occurrences of each age
        data = SubmittedForm.objects.values('guardian_education').annotate(count=Count('guardian_education')).order_by('guardian_education')
        return JsonResponse(list(data), safe=False)
    
def get_education_distribution(request):
    data = SubmittedForm.objects.values('guardian_education').annotate(count=Count('guardian_education')).order_by('guardian_education')
    return JsonResponse(list(data), safe=False)


class ReligionDistributionView(APIView):
    def get(self, request):
        # Count the occurrences of each age
        data = SubmittedForm.objects.values('respondent_religion').annotate(count=Count('respondent_religion')).order_by('respondent_religion')
        return JsonResponse(list(data), safe=False)
    
def get_religion_distribution(request):
    data = SubmittedForm.objects.values('respondent_religion').annotate(count=Count('respondent_religion')).order_by('respondent_religion')
    return JsonResponse(list(data), safe=False)

class FamilyDistributionView(APIView):
    def get(self, request):
        # Count the occurrences of each age
        data = SubmittedForm.objects.values('family_size').annotate(count=Count('family_size')).order_by('family_size')
        return JsonResponse(list(data), safe=False)
    
def get_family_distribution(request):
    data = SubmittedForm.objects.values('family_size').annotate(count=Count('family_size')).order_by('family_size')
    return JsonResponse(list(data), safe=False)

class FinancialDistributionView(APIView):
    def get(self, request):
        # Count the occurrences of each age
        data = SubmittedForm.objects.values('financial_support').annotate(count=Count('financial_support')).order_by('financial_support')
        return JsonResponse(list(data), safe=False)
    
def get_financial_distribution(request):
    data = SubmittedForm.objects.values('financial_support').annotate(count=Count('financial_support')).order_by('financial_support')
    return JsonResponse(list(data), safe=False)

class VisitorDistributionView(APIView):
    def get(self, request):
        # Count the occurrences of each age
        data = SubmittedForm.objects.values('alternative_visitor').annotate(count=Count('alternative_visitor')).order_by('alternative_visitor')
        return JsonResponse(list(data), safe=False)
    
def get_visitor_distribution(request):
    data = SubmittedForm.objects.values('alternative_visitor').annotate(count=Count('alternative_visitor')).order_by('alternative_visitor')
    return JsonResponse(list(data), safe=False)

class EducatorDistributionView(APIView):
    def get(self, request):
        # Count the occurrences of each age
        data = SubmittedForm.objects.values('educator_name').annotate(count=Count('educator_name')).order_by('educator_name')
        return JsonResponse(list(data), safe=False)
    
def get_educator_distribution(request):
    data = SubmittedForm.objects.values('educator_name').annotate(count=Count('educator_name')).order_by('educator_name')
    return JsonResponse(list(data), safe=False)

class TopicDistributionView(APIView):
    def get(self, request):
        # Count the occurrences of each age
        data = SubmittedForm.objects.values('topic_name').annotate(count=Count('topic_name')).order_by('topic_name')
        return JsonResponse(list(data), safe=False)
    
def get_topic_distribution(request):
    data = SubmittedForm.objects.values('topic_name').annotate(count=Count('topic_name')).order_by('topic_name')
    return JsonResponse(list(data), safe=False)




class RelationshipDistributionView(APIView):
    def get(self, request):
        # Count the occurrences of each age
        data = SubmittedForm.objects.values('relationship').annotate(count=Count('relationship')).order_by('relationship')
        return JsonResponse(list(data), safe=False)
    
def get_relationship_distribution(request):
    data = SubmittedForm.objects.values('relationship').annotate(count=Count('relationship')).order_by('relationship')
    return JsonResponse(list(data), safe=False)

class OccupationDistributionView(APIView):
    def get(self, request):
        # Count the occurrences of each age
        data = SubmittedForm.objects.values('guardian_occupation').annotate(count=Count('guardian_occupation')).order_by('guardian_occupation')
        return JsonResponse(list(data), safe=False)
    
def get_occupation_distribution(request):
    data = SubmittedForm.objects.values('guardian_occupation').annotate(count=Count('guardian_occupation')).order_by('guardian_occupation')
    return JsonResponse(list(data), safe=False)

class SiblingsDistributionView(APIView):
    def get(self, request):
        # Count the occurrences of each age
        data = SubmittedForm.objects.values('has_siblings').annotate(count=Count('has_siblings')).order_by('has_siblings')
        return JsonResponse(list(data), safe=False)
    
def get_siblings_distribution(request):
    data = SubmittedForm.objects.values('has_siblings').annotate(count=Count('has_siblings')).order_by('has_siblings')
    return JsonResponse(list(data), safe=False)

class PartnersDistributionView(APIView):
    def get(self, request):
        # Count the occurrences of each age
        data = SubmittedForm.objects.values('siblings_have_partners').annotate(count=Count('siblings_have_partners')).order_by('siblings_have_partners')
        return JsonResponse(list(data), safe=False)
    
def get_partners_distribution(request):
    data = SubmittedForm.objects.values('siblings_have_partners').annotate(count=Count('siblings_have_partners')).order_by('siblings_have_partners')
    return JsonResponse(list(data), safe=False)

class PocketmoneyDistributionView(APIView):
    def get(self, request):
        # Count the occurrences of each age
        data = SubmittedForm.objects.values('gets_pocket_money').annotate(count=Count('gets_pocket_money')).order_by('gets_pocket_money')
        return JsonResponse(list(data), safe=False)
    
def get_pocketmoney_distribution(request):
    data = SubmittedForm.objects.values('gets_pocket_money').annotate(count=Count('gets_pocket_money')).order_by('gets_pocket_money')
    return JsonResponse(list(data), safe=False)

class MoneyadequateDistributionView(APIView):
    def get(self, request):
        # Count the occurrences of each age
        data = SubmittedForm.objects.values('pocket_money_adequate').annotate(count=Count('pocket_money_adequate')).order_by('pocket_money_adequate')
        return JsonResponse(list(data), safe=False)
    
def get_moneyadequate_distribution(request):
    data = SubmittedForm.objects.values('pocket_money_adequate').annotate(count=Count('pocket_money_adequate')).order_by('pocket_money_adequate')
    return JsonResponse(list(data), safe=False)

class GuardianvisitsDistributionView(APIView):
    def get(self, request):
        # Count the occurrences of each age
        data = SubmittedForm.objects.values('guardian_visits').annotate(count=Count('guardian_visits')).order_by('guardian_visits')
        return JsonResponse(list(data), safe=False)
    
def get_guardianvisits_distribution(request):
    data = SubmittedForm.objects.values('guardian_visits').annotate(count=Count('guardian_visits')).order_by('guardian_visits')
    return JsonResponse(list(data), safe=False)

class AccessDistributionView(APIView):
    def get(self, request):
        # Count the occurrences of each age
        data = SubmittedForm.objects.values('access_to_reproductive_health_info').annotate(count=Count('access_to_reproductive_health_info')).order_by('access_to_reproductive_health_info')
        return JsonResponse(list(data), safe=False)
    
def get_access_distribution(request):
    data = SubmittedForm.objects.values('access_to_reproductive_health_info').annotate(count=Count('access_to_reproductive_health_info')).order_by('access_to_reproductive_health_info')
    return JsonResponse(list(data), safe=False)

class InfoDistributionView(APIView):
    def get(self, request):
        # Count the occurrences of each age
        data = SubmittedForm.objects.values('information_adequate').annotate(count=Count('information_adequate')).order_by('information_adequate')
        return JsonResponse(list(data), safe=False)
    
def get_info_distribution(request):
    data = SubmittedForm.objects.values('information_adequate').annotate(count=Count('information_adequate')).order_by('information_adequate')
    return JsonResponse(list(data), safe=False)