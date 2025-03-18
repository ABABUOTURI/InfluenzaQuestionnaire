
from django.contrib import admin
from .models import User, SubmittedForm


@admin.register(User)
class UserAdmin(admin.ModelAdmin):
    list_display = ('id', 'staff_no', 'email')  # Display key user details
    search_fields = ('staff_no', 'email')  # Enable search by staff_no and email
    list_filter = ('staff_no',)  # Allow filtering by staff number prefix


@admin.register(SubmittedForm)
class SubmittedFormAdmin(admin.ModelAdmin):
    list_display = (
        'id', 'user', 'submission_time', 'age', 'relationship', 'family_size'
    )  # Display key fields
    search_fields = ('user__email', 'relationship', 'guardian_occupation')  # Search functionality
    list_filter = ('relationship', 'guardian_occupation', 'respondent_religion')  # Filters
    ordering = ('-submission_time',)  # Show latest submissions first
