
from django.db import models
from django.core.validators import MinValueValidator, MaxValueValidator, RegexValidator
import django.utils.timezone
# from django.utils import timezone
import re


class User(models.Model):
    staff_no = models.CharField(
        max_length=10,
        unique=True,
        validators=[
            RegexValidator(
                regex=r'^(KM|CM|AD).*$',
                message="Staff number must start with KM, CM, or AD."
            )
        ]
    )
    email = models.EmailField(
        max_length=254,
        unique=True,
        validators=[
            RegexValidator(
                regex=r'^[A-Za-z].*@kemri\.go\.ke$',
                message="Email must start with a letter and end with '@kemri.go.ke'."
            )
        ]
    )
    password = models.CharField(max_length=255)

    def __str__(self):
        return self.staff_no


class SubmittedForm(models.Model):
    submission_time = models.DateTimeField(default=django.utils.timezone.now)
    serial_number = models.CharField(max_length=50, unique=True, blank=True)  # Unique serial number
    # date_of_data_collection = models.DateTimeField(default=timezone.now) 
    age = models.IntegerField(
        validators=[MinValueValidator(1), MaxValueValidator(30)]
    )

    relationship = models.CharField(
        choices=[
            ('Father and Mother', 'Father and Mother'),
            ('Mother only', 'Mother only'),
            ('Father only', 'Father only'),
            ('Relative', 'Relative')
        ],
        max_length=20
    )

    guardian_occupation = models.CharField(
        choices=[
            ('Farm Worker', 'Farm Worker'),
            ('Self Employed', 'Self Employed'),
            ('Employed by someone', 'Employed by someone'),
            ('Professional', 'Professional'),
            ('Other', 'Other')
        ],
        max_length=20
    )

    guardian_education = models.CharField(
        choices=[
            ('None', 'None'),
            ('Primary', 'Primary'),
            ('Secondary', 'Secondary'),
            ('Tertiary Education', 'Tertiary Education')
        ],
        max_length=20
    )

    respondent_religion = models.CharField(
        choices=[
            ('Catholic', 'Catholic'),
            ('Protestant', 'Protestant'),
            ('Muslim', 'Muslim'),
            ('SDA', 'SDA'),
            ('None', 'None')
        ],
        max_length=15
    )

    family_size = models.IntegerField(
        validators=[MinValueValidator(1), MaxValueValidator(20)]  # Assuming reasonable family size
    )

    has_siblings = models.CharField(
        choices=[('YES', 'YES'), ('NO', 'NO')],
        max_length=3
    )

    siblings_have_partners = models.CharField(
        choices=[('YES', 'YES'), ('NO', 'NO')],
        max_length=3,
        null=True,
        blank=True
    )

    gets_pocket_money = models.CharField(
        choices=[('YES', 'YES'), ('NO', 'NO')],
        max_length=3
    )

    pocket_money_adequate = models.CharField(
        choices=[('YES', 'YES'), ('NO', 'NO')],
        max_length=3,
        null=True,
        blank=True
    )

    financial_support = models.CharField(
        choices=[
            ('Relative', 'Relative'),
            ('Boyfriend', 'Boyfriend'),
            ('Grandparents', 'Grandparents'),
            ('Other friends', 'Other friends')
        ],
        max_length=20
    )

    guardian_visits = models.CharField(
        choices=[('YES', 'YES'), ('NO', 'NO')],
        max_length=3
    )

    alternative_visitor = models.CharField(
        choices=[
            ('Boyfriend', 'Boyfriend'),
            ('Relatives', 'Relatives'),
            ('Brothers/Sisters', 'Brothers/Sisters'),
            ('Man friend', 'Man friend'),
            ('None', 'None')
        ],
        max_length=20,
        null=True,
        blank=True
        
    )

    access_to_reproductive_health_info = models.CharField(
        choices=[('YES', 'YES'), ('NO', 'NO')],
        max_length=3
    )

    information_adequate = models.CharField(
        choices=[('YES', 'YES'), ('NO', 'NO')],
        max_length=3,
        null=True,
        blank=True
    )

    educator_name = models.JSONField(default=list, blank=True, null=True)
    topic_name = models.JSONField(default=list, blank=True, null=True)
    
    user = models.ForeignKey(User, on_delete=models.CASCADE, null=True, blank=True)


    def __str__(self):
        return f"Submission by {self.user.staff_no} on {self.submission_time}"
