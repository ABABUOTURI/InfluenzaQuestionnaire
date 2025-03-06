from django.contrib import admin
from django.contrib.auth.models import User
from django.contrib.auth.admin import UserAdmin
from .models import Respondent, Educator, Topic

# Unregister the default User model
admin.site.unregister(User)

# Register a custom version of User model (if needed)
@admin.register(User)
class CustomUserAdmin(UserAdmin):
    pass  # Customize as needed

# Register other models
admin.site.register(Respondent)
admin.site.register(Educator)
admin.site.register(Topic)
