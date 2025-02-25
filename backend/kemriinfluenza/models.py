from django.db import models

class Questionnaire(models.Model):
    serial_number = models.CharField(max_length=50, unique=True)
    date_of_data_collection = models.DateField()

    def __str__(self):
        return f"Questionnaire {self.serial_number}"

class SocioEconomicDemographic(models.Model):
    questionnaire_ref = models.ForeignKey(Questionnaire, on_delete=models.CASCADE, related_name="socio_economic")
    age = models.IntegerField(default=0)
    relationship = models.CharField(max_length=255, default="Unknown")
    guardian_occupation = models.CharField(max_length=255, default="Unknown")
    guardian_education = models.CharField(max_length=255 , default="Unknown")
    respondent_religion = models.CharField(max_length=255, default="Unknown")
    family_size = models.IntegerField(default=0)
    has_siblings = models.BooleanField(default=False)
    siblings_have_partners = models.BooleanField(default=False)
    gets_pocket_money = models.BooleanField(default=False)
    pocket_money_adequate = models.BooleanField(default=False)
    financial_support = models.BooleanField(default=False)
    guardian_visits = models.BooleanField(default=False)
    alternative_visitor = models.CharField(max_length=255, blank=True, null=True)

    def __str__(self):
        return f"SocioEconomicDemographic for {self.questionnaire_ref.serial_number}"

class SourcesInformationSexualBehavior(models.Model):
    questionnaire_ref = models.ForeignKey(Questionnaire, on_delete=models.CASCADE, related_name="sexual_behavior")
    access_to_reproductive_health_info = models.CharField(max_length=255, default="Unknown")
    information_adequate = models.CharField(max_length=255, default="Unknown")
    educator_name = models.CharField(max_length=255, default="Unknown")
    topic_name = models.CharField(max_length=255, default="Unknown")

    def __str__(self):
        return f"Sexual Behavior Info for {self.questionnaire_ref.serial_number}"
