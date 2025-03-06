from django.db import models
from django.core.validators import RegexValidator


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
        unique=True,
        validators=[
            RegexValidator(
                regex=r'^A%.*@kemri\.go\.ke$', 
                message="Email must start with 'A%' and end with '@kemri.go.ke'."
            )
        ]
    )
    password = models.CharField(max_length=255)

    class Meta:
        constraints = [
            models.CheckConstraint(
                check=models.Q(staff_no__startswith='KM') | models.Q(staff_no__startswith='CM') | models.Q(staff_no__startswith='AD'),
                name="staff_no_valid_prefix"
            ),
            models.CheckConstraint(
                check=models.Q(email__regex=r'^A%.*@kemri\.go\.ke$'),
                name="email_valid_domain"
            )
        ]

# class Respondent(models.Model):
#     id = models.CharField(max_length=100, primary_key=True, null=False)
#     date_of_data_collection = models.DateField(auto_now_add=True, blank=True)
#     age = models.IntegerField()
#     relationship = models.CharField(max_length=100)
#     guardian_occupation = models.CharField(max_length=100)
#     guardian_education = models.CharField(max_length=100)
#     respondent_religion = models.CharField(max_length=100)
#     family_size = models.IntegerField()
#     has_siblings = models.BooleanField()
#     siblings_have_partners = models.BooleanField()
#     gets_pocket_money = models.BooleanField()
#     pocket_money_adequate = models.BooleanField()

#     def __str__(self):
#         return self.serial_number


# class Topic(models.Model):
#     topic_name = models.CharField(max_length=200)
#     respondent = models.ForeignKey(Respondent, on_delete=models.CASCADE)

#     def __str__(self):
#         return self.topic_name


# class Educator(models.Model):
#     respondent = models.ForeignKey(Respondent, on_delete=models.CASCADE)
#     educator_name = models.CharField(max_length=200)

#     def __str__(self):
#         return self.educator_name

class Respondent(models.Model):
    id = models.CharField(max_length=100, primary_key=True, null=False)
    date_of_data_collection = models.DateField(auto_now_add=True, blank=True)
    age = models.IntegerField()
    relationship_choices = [
        ('Father and mother', 'Father and Mother'),
        ('Mother only', 'Mother only'),
        ('Father only', 'Father only'),
        ('Relative', 'Relative')
    ]
    relationship = models.CharField(max_length=20, choices=relationship_choices)

    occupation_choices = [
        ('Farm worker', 'Farm worker'),
        ('Self employed', 'Self employed'),
        ('Employed by someone', 'Employed by someone'),
        ('Professional', 'Professional'),
        ('Other state', 'Other state')
    ]
    guardian_occupation = models.CharField(max_length=30, choices=occupation_choices)

    education_choices = [
        ('None', 'None'),
        ('Primary', 'Primary'),
        ('Secondary', 'Secondary'),
        ('Tertiary Education', 'Tertiary Education')
    ]
    guardian_education = models.CharField(max_length=20, choices=education_choices)

    religion_choices = [
        ('Catholic', 'Catholic'),
        ('Protestant', 'Protestant'),
        ('Muslim', 'Muslim'),
        ('SDA', 'SDA'),
        ('None', 'None')
    ]
    respondent_religion = models.CharField(max_length=15, choices=religion_choices)

    family_size = models.IntegerField()

    yes_no_choices = [('YES', 'YES'), ('NO', 'NO')]

    has_siblings = models.CharField(max_length=3, choices=yes_no_choices)
    siblings_have_partners = models.CharField(max_length=3, choices=yes_no_choices, null=True, blank=True)
    gets_pocket_money = models.CharField(max_length=3, choices=yes_no_choices)
    pocket_money_adequate = models.CharField(max_length=3, choices=yes_no_choices, null=True, blank=True)

    financial_support_choices = [
        ('Relative', 'Relative'),
        ('Boyfriend', 'Boyfriend'),
        ('Grandparents', 'Grandparents'),
        ('Other friends', 'Other friends')
    ]
    financial_support = models.CharField(max_length=50, choices=financial_support_choices, null=True, blank=True)

    guardian_visits = models.CharField(max_length=3, choices=yes_no_choices)

    alternative_visitor_choices = [
        ('Boyfriend', 'Boyfriend'),
        ('Relatives', 'Relatives'),
        ('Brothers/Sisters', 'Brothers/Sisters'),
        ('Man friend', 'Man friend'),
        ('None', 'None')
    ]
    alternative_visitor = models.CharField(max_length=20, choices=alternative_visitor_choices, null=True, blank=True)

    # access_to_reproductive_health_info = models.CharField(max_length=3, choices=yes_no_choices)
    access_to_reproductive_health_info = models.CharField(max_length=3, choices=yes_no_choices, default='No')
    information_adequate = models.CharField(max_length=3, choices=yes_no_choices, default='No')

    def __str__(self):
        return self.serial_number

class Educator(models.Model):
    name = models.CharField(max_length=50, unique=True, null=True, blank=True
                            )  # Store each educator type uniquely

    def __str__(self):
        return self.name

class RespondentEducator(models.Model):
    respondent = models.ForeignKey(Respondent, on_delete=models.CASCADE)
    educator = models.ForeignKey(Educator, on_delete=models.CASCADE)

    def __str__(self):
        return f"{self.respondent} - {self.educator}"

class Topic(models.Model):
    name = models.CharField(max_length=50,unique=True, null=True, blank=True)  # Store each topic uniquely

    def __str__(self):
        return self.name

class RespondentTopic(models.Model):
    respondent = models.ForeignKey(Respondent, on_delete=models.CASCADE)
    topic = models.ForeignKey(Topic, on_delete=models.CASCADE)

    def __str__(self):
        return f"{self.respondent} - {self.topic}"
