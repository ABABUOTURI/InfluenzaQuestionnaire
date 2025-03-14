
# # from django.db import models
# # from django.core.validators import RegexValidator

# # class User(models.Model):
# #     staff_no = models.CharField(
# #         max_length=10,
# #         unique=True,
# #         validators=[
# #             RegexValidator(
# #                 regex=r'^(KM|CM|AD).*$', 
# #                 message="Staff number must start with KM, CM, or AD."
# #             )
# #         ]
# #     )
# #     email = models.EmailField(
# #         unique=True,
# #         validators=[
# #             RegexValidator(
# #                 regex=r'^A.*@kemri\.go\.ke$', 
# #                 message="Email must start with 'A' and end with '@kemri.go.ke'."
# #             )
# #         ]
# #     )
# #     password = models.CharField(max_length=255)

# #     class Meta:
# #         constraints = [
# #             models.CheckConstraint(
# #                 check=models.Q(staff_no__startswith='KM') | models.Q(staff_no__startswith='CM') | models.Q(staff_no__startswith='AD'),
# #                 name="staff_no_valid_prefix"
# #             )
# #         ]

# # class Respondent(models.Model):
# #     id = models.CharField(max_length=100, primary_key=True, null=False)
# #     age = models.IntegerField()
    
# #     relationship_choices = [
# #         ('Father and Mother', 'Father and Mother'),
# #         ('Mother only', 'Mother only'),
# #         ('Father only', 'Father only'),
# #         ('Relative', 'Relative')
# #     ]
# #     relationship = models.CharField(max_length=20, choices=relationship_choices)

# #     education_choices = [
# #         ('None', 'None'),
# #         ('Primary', 'Primary'),
# #         ('Secondary', 'Secondary'),
# #         ('Tertiary Education', 'Tertiary Education')
# #     ]
# #     guardian_education = models.CharField(max_length=20, choices=education_choices)

# #     religion_choices = [
# #         ('Catholic', 'Catholic'),
# #         ('Protestant', 'Protestant'),
# #         ('Muslim', 'Muslim'),
# #         ('SDA', 'SDA'),
# #         ('None', 'None')
# #     ]
# #     respondent_religion = models.CharField(max_length=15, choices=religion_choices)

# #     yes_no_choices = [('YES', 'YES'), ('NO', 'NO')]

# #     has_siblings = models.CharField(max_length=3, choices=yes_no_choices)
# #     gets_pocket_money = models.CharField(max_length=3, choices=yes_no_choices)

# #     def __str__(self):
# #         return self.name

# # class Educator(models.Model):
# #     EDUCATOR_CHOICES = [
# #         ("Teacher", "Teacher"),
# #         ("Parents", "Parents"),
# #         ("Health worker", "Health worker"),
# #         ("Friends", "Friends"),
# #         ("Radio/Magazine/TV", "Radio/Magazine/TV"),
# #     ]
# #     educator_name = models.CharField(max_length=200, unique=True, choices=EDUCATOR_CHOICES)

# #     def __str__(self):
# #         return self.educator_name

# # class RespondentEducator(models.Model):
# #     respondent = models.ForeignKey(Respondent, on_delete=models.CASCADE)
# #     educators = models.ManyToManyField(Educator)

# #     def __str__(self):
# #         return f"{self.respondent} - {', '.join([educator.educator_name for educator in self.educators.all()])}"

# # class Topic(models.Model):
# #     TOPIC_CHOICES = [
# #         ("Sexuality", "Sexuality"),
# #         ("Abstinence", "Abstinence"),
# #         ("Condoms", "Condoms"),
# #         ("HIV/STI", "HIV/STI"),
# #         ("Relationships", "Relationships"),
# #     ]
# #     topic_name = models.CharField(max_length=200, unique=True, choices=TOPIC_CHOICES)

# #     def __str__(self):
# #         return self.topic_name

# # class RespondentTopic(models.Model):
# #     respondent = models.ForeignKey(Respondent, on_delete=models.CASCADE)
# #     topics = models.ManyToManyField(Topic)

# #     def __str__(self):
# #         return f"{self.respondent} - {', '.join([topic.topic_name for topic in self.topics.all()])}"

# from django.db import models
# from django.core.validators import RegexValidator
# from django.utils.timezone import now

# class User(models.Model):
#     staff_no = models.CharField(
#         max_length=10,
#         unique=True,
#         validators=[
#             RegexValidator(
#                 regex=r'^(KM|CM|AD).*$', 
#                 message="Staff number must start with KM, CM, or AD."
#             )
#         ]
#     )
#     email = models.EmailField(
#         unique=True,
#         validators=[
#             RegexValidator(
#                 regex=r'^A.*@kemri\.go\.ke$', 
#                 message="Email must start with 'A' and end with '@kemri.go.ke'."  
#             )
#         ]
#     )
#     password = models.CharField(max_length=255)  # Store hashed passwords

#     def __str__(self):
#         return f"{self.staff_no} - {self.email}"

# class SubmittedForm(models.Model):
#     user = models.ForeignKey(User, on_delete=models.CASCADE)  # Track staff submitting the form
#     submission_time = models.DateTimeField(default=now)  # Auto capture timestamp

#     # Form Fields
#     age = models.IntegerField()
    
#     RELATIONSHIP_CHOICES = [
#         ('Father and Mother', 'Father and Mother'),
#         ('Mother only', 'Mother only'),
#         ('Father only', 'Father only'),
#         ('Relative', 'Relative')
#     ]
#     relationship = models.CharField(max_length=20, choices=RELATIONSHIP_CHOICES)

#     EDUCATION_CHOICES = [
#         ('None', 'None'),
#         ('Primary', 'Primary'),
#         ('Secondary', 'Secondary'),
#         ('Tertiary Education', 'Tertiary Education')
#     ]
#     guardian_education = models.CharField(max_length=20, choices=EDUCATION_CHOICES)

#     RELIGION_CHOICES = [
#         ('Catholic', 'Catholic'),
#         ('Protestant', 'Protestant'),
#         ('Muslim', 'Muslim'),
#         ('SDA', 'SDA'),
#         ('None', 'None')
#     ]
#     respondent_religion = models.CharField(max_length=15, choices=RELIGION_CHOICES)

#     YES_NO_CHOICES = [('YES', 'YES'), ('NO', 'NO')]
#     has_siblings = models.CharField(max_length=3, choices=YES_NO_CHOICES)
#     gets_pocket_money = models.CharField(max_length=3, choices=YES_NO_CHOICES)

#     EDUCATOR_CHOICES = [
#         ("Teacher", "Teacher"),
#         ("Parents", "Parents"),
#         ("Health worker", "Health worker"),
#         ("Friends", "Friends"),
#         ("Radio/Magazine/TV", "Radio/Magazine/TV"),
#     ]
#     educator = models.CharField(max_length=200, choices=EDUCATOR_CHOICES)

#     TOPIC_CHOICES = [
#         ("Sexuality", "Sexuality"),
#         ("Abstinence", "Abstinence"),
#         ("Condoms", "Condoms"),
#         ("HIV/STI", "HIV/STI"),
#         ("Relationships", "Relationships"),
#     ]
#     topic = models.CharField(max_length=200, choices=TOPIC_CHOICES)

#     def __str__(self):
#         return f"Form by {self.user.staff_no} on {self.submission_time}"


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
        max_length=3
    )

    pocket_money_adequate = models.CharField(
        choices=[('YES', 'YES'), ('NO', 'NO')],
        max_length=3
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
        max_length=20
    )

    access_to_reproductive_health_info = models.CharField(
        choices=[('YES', 'YES'), ('NO', 'NO')],
        max_length=3
    )

    information_adequate = models.CharField(
        choices=[('YES', 'YES'), ('NO', 'NO')],
        max_length=3
    )

    educator_name = models.CharField(
        choices=[
            ('Teacher', 'Teacher'),
            ('Parents', 'Parents'),
            ('Health worker', 'Health worker'),
            ('Friends', 'Friends'),
            ('Radio/Magazine/TV', 'Radio/Magazine/TV')
        ],
        max_length=200
    )

    topic_name = models.CharField(
        choices=[
            ('Sexuality', 'Sexuality'),
            ('Abstinence', 'Abstinence'),
            ('Condoms', 'Condoms'),
            ('HIV/STI', 'HIV/STI'),
            ('Relationships', 'Relationships')
        ],
        max_length=200
    )

    # user = models.ForeignKey(User, on_delete=models.CASCADE)
    user = models.ForeignKey(User, on_delete=models.CASCADE, null=True, blank=True)


    def __str__(self):
        return f"Submission by {self.user.staff_no} on {self.submission_time}"
