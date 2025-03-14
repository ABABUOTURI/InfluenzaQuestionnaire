# # from django.contrib import admin
# # from django.contrib.auth.models import User
# # from django.contrib.auth.admin import UserAdmin
# # from .models import Respondent, Educator, Topic


# # # Unregister the default User model
# # admin.site.unregister(User)

# # # Register a custom version of User model (if needed)
# # @admin.register(User)
# # class CustomUserAdmin(UserAdmin):
# #     pass  # Customize as needed

# # # Register other models
# # admin.site.register(Respondent)
# # admin.site.register(Educator)
# # admin.site.register(Topic)

# from django.contrib import admin
# from .models import User, SubmittedForm

# class UserAdmin(admin.ModelAdmin):
#     list_display = ('staff_no', 'email')  # Display these fields in the admin panel
#     search_fields = ('staff_no', 'email')  # Enable search by staff_no and email
#     list_filter = ('staff_no',)  # Filter by staff_no prefix (KM, CM, AD)

# class SubmittedFormAdmin(admin.ModelAdmin):
#     list_display = ('user', 'submission_time', 'age', 'relationship', 'guardian_education')
#     search_fields = ('user__staff_no', 'user__email')  # Search by staff number and email
#     list_filter = ('submission_time', 'relationship', 'guardian_education', 'respondent_religion')

# # Register models
# admin.site.register(User, UserAdmin)
# admin.site.register(SubmittedForm, SubmittedFormAdmin)


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
