

from django.urls import path
from .views import UserListCreateView, UserDetailView, RegisterUserView, SubmittedFormListCreateView, SubmittedFormDetailView, LoginView
from .views import AgeDistributionView, EducationDistributionView, ReligionDistributionView, FamilyDistributionView, FinancialDistributionView, VisitorDistributionView, EducatorDistributionView, TopicDistributionView, RelationshipDistributionView,OccupationDistributionView, SiblingsDistributionView,PartnersDistributionView, PocketmoneyDistributionView, MoneyadequateDistributionView, GuardianvisitsDistributionView, AccessDistributionView, InfoDistributionView

urlpatterns = [
    path('users/', UserListCreateView.as_view(), name='user-list-create'),
    path('login/', LoginView, name='login'),
    path('users/<int:pk>/', UserDetailView.as_view(), name='user-detail'),
    path('users/register/', RegisterUserView.as_view(), name='register-user'),  # ✅ Add this line

    path('forms/', SubmittedFormListCreateView.as_view(), name='form-list-create'),
    path('forms/<int:pk>/', SubmittedFormDetailView.as_view(), name='form-detail'),

    path('age-distribution/', AgeDistributionView.as_view(), name='age-distribution'),
    path('education-distribution/', EducationDistributionView.as_view(), name='education-distribution'),
    path('religion-distribution/', ReligionDistributionView.as_view(), name='religion-distribution'),
    path('family-distribution/', FamilyDistributionView.as_view(), name='family-distribution'),
    path('financial-distribution/', FinancialDistributionView.as_view(), name='financial-distribution'),
    path('visitor-distribution/', VisitorDistributionView.as_view(), name='visitor-distribution'),
    path('educator-distribution/', EducatorDistributionView.as_view(), name='educator-distribution'),
    path('topic-distribution/', TopicDistributionView.as_view(), name='topic-distribution'),

    path('relationship-distribution/', RelationshipDistributionView.as_view(), name='relationship-distribution'),
    path('occupation-distribution/', OccupationDistributionView.as_view(), name='occupation-distribution'),
    path('siblings-distribution/', SiblingsDistributionView.as_view(), name='siblings-distribution'),
    path('partners-distribution/', PartnersDistributionView.as_view(), name='partners-distribution'),
    path('pocketmoney-distribution/', PocketmoneyDistributionView.as_view(), name='pocketmoney-distribution'),
    path('moneyadequate-distribution/', MoneyadequateDistributionView.as_view(), name='moneyadequate-distribution'),
    path('guardianvisits-distribution/', GuardianvisitsDistributionView.as_view(), name='guardianvisits-distribution'),
    path('access-distribution/', AccessDistributionView.as_view(), name='access-distribution'),
    path('info-distribution/', InfoDistributionView.as_view(), name='info-distribution'),
]



