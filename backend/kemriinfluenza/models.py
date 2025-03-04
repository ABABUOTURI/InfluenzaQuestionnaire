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


class Respondent(models.Model):
    date_of_data_collection = models.DateTimeField(auto_now_add=True)
    age = models.IntegerField()
    relationship_choices = [
        ('Father and Mother', 'Father and Mother'),
        ('Mother only', 'Mother only'),
        ('Father only', 'Father only'),
        ('Relative', 'Relative')
    ]
    relationship = models.CharField(max_length=20, choices=relationship_choices)

    occupation_choices = [
        ('farm worker', 'farm worker'),
        ('self employed', 'self employed'),
        ('employed by someone', 'employed by someone'),
        ('professional', 'professional'),
        ('other state', 'other state')
    ]
    guardian_occupation = models.CharField(max_length=30, choices=occupation_choices)

    education_choices = [
        ('None', 'None'),
        ('primary', 'primary'),
        ('secondary', 'secondary'),
        ('tertiary education', 'tertiary education')
    ]
    guardian_education = models.CharField(max_length=20, choices=education_choices)

    religion_choices = [
        ('catholic', 'catholic'),
        ('protestant', 'protestant'),
        ('muslim', 'muslim'),
        ('SDA', 'SDA'),
        ('none', 'none')
    ]
    respondent_religion = models.CharField(max_length=15, choices=religion_choices)

    family_size = models.IntegerField()
    yes_no_choices = [('Yes', 'Yes'), ('No', 'No')]

    has_siblings = models.CharField(max_length=3, choices=yes_no_choices)
    siblings_have_partners = models.CharField(max_length=3, choices=yes_no_choices, null=True, blank=True)
    gets_pocket_money = models.CharField(max_length=3, choices=yes_no_choices)
    pocket_money_adequate = models.CharField(max_length=3, choices=yes_no_choices, null=True, blank=True)

    financial_support_choices = [
        ('Relative', 'Relative'),
        ('boyfriend', 'boyfriend'),
        ('grandparents', 'grandparents'),
        ('other friends', 'other friends')
    ]
    financial_support = models.CharField(max_length=15, choices=financial_support_choices)

    guardian_visits = models.CharField(max_length=3, choices=yes_no_choices)
    
    alternative_visitor_choices = [
        ('Boyfriend', 'Boyfriend'),
        ('relatives', 'relatives'),
        ('brothers/sisters', 'brothers/sisters'),
        ('Man friend', 'Man friend')
    ]
    alternative_visitor = models.CharField(max_length=20, choices=alternative_visitor_choices, null=True, blank=True)

    access_to_reproductive_health_info = models.CharField(max_length=3, choices=yes_no_choices)
    information_adequate = models.CharField(max_length=3, choices=yes_no_choices, null=True, blank=True)


class EducatorName(models.Model):
    respondent = models.ForeignKey(Respondent, on_delete=models.CASCADE)
    educator_choices = [
        ('Teacher', 'Teacher'),
        ('parents', 'parents'),
        ('health worker', 'health worker'),
        ('friends', 'friends'),
        ('radio/Magazine/TV', 'radio/Magazine/TV')
    ]
    educator_name = models.CharField(max_length=20, choices=educator_choices)


class Topic(models.Model):
    respondent = models.ForeignKey(Respondent, on_delete=models.CASCADE)
    topic_choices = [
        ('Sexuality', 'Sexuality'),
        ('Abstinence', 'Abstinence'),
        ('Condoms', 'Condoms'),
        ('STI/HIV', 'STI/HIV'),
        ('RELATIONSHIPS', 'RELATIONSHIPS')
    ]
    topic_name = models.CharField(max_length=20, choices=topic_choices)
