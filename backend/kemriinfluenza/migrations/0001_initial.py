# Generated by Django 5.0.12 on 2025-03-04 07:12

import django.core.validators
import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Respondent',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('date_of_data_collection', models.DateTimeField(auto_now_add=True)),
                ('age', models.IntegerField()),
                ('relationship', models.CharField(choices=[('Father and Mother', 'Father and Mother'), ('Mother only', 'Mother only'), ('Father only', 'Father only'), ('Relative', 'Relative')], max_length=20)),
                ('guardian_occupation', models.CharField(choices=[('farm worker', 'farm worker'), ('self employed', 'self employed'), ('employed by someone', 'employed by someone'), ('professional', 'professional'), ('other state', 'other state')], max_length=30)),
                ('guardian_education', models.CharField(choices=[('None', 'None'), ('primary', 'primary'), ('secondary', 'secondary'), ('tertiary education', 'tertiary education')], max_length=20)),
                ('respondent_religion', models.CharField(choices=[('catholic', 'catholic'), ('protestant', 'protestant'), ('muslim', 'muslim'), ('SDA', 'SDA'), ('none', 'none')], max_length=15)),
                ('family_size', models.IntegerField()),
                ('has_siblings', models.CharField(choices=[('Yes', 'Yes'), ('No', 'No')], max_length=3)),
                ('siblings_have_partners', models.CharField(blank=True, choices=[('Yes', 'Yes'), ('No', 'No')], max_length=3, null=True)),
                ('gets_pocket_money', models.CharField(choices=[('Yes', 'Yes'), ('No', 'No')], max_length=3)),
                ('pocket_money_adequate', models.CharField(blank=True, choices=[('Yes', 'Yes'), ('No', 'No')], max_length=3, null=True)),
                ('financial_support', models.CharField(choices=[('Relative', 'Relative'), ('boyfriend', 'boyfriend'), ('grandparents', 'grandparents'), ('other friends', 'other friends')], max_length=15)),
                ('guardian_visits', models.CharField(choices=[('Yes', 'Yes'), ('No', 'No')], max_length=3)),
                ('alternative_visitor', models.CharField(blank=True, choices=[('Boyfriend', 'Boyfriend'), ('relatives', 'relatives'), ('brothers/sisters', 'brothers/sisters'), ('Man friend', 'Man friend')], max_length=20, null=True)),
                ('access_to_reproductive_health_info', models.CharField(choices=[('Yes', 'Yes'), ('No', 'No')], max_length=3)),
                ('information_adequate', models.CharField(blank=True, choices=[('Yes', 'Yes'), ('No', 'No')], max_length=3, null=True)),
            ],
        ),
        migrations.CreateModel(
            name='User',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('staff_no', models.CharField(max_length=10, unique=True, validators=[django.core.validators.RegexValidator(message='Staff number must start with KM, CM, or AD.', regex='^(KM|CM|AD).*$')])),
                ('email', models.EmailField(max_length=254, unique=True, validators=[django.core.validators.RegexValidator(message="Email must start with 'A%' and end with '@kemri.go.ke'.", regex='^A%.*@kemri\\.go\\.ke$')])),
                ('password', models.CharField(max_length=255)),
            ],
        ),
        migrations.CreateModel(
            name='EducatorName',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('educator_name', models.CharField(choices=[('Teacher', 'Teacher'), ('parents', 'parents'), ('health worker', 'health worker'), ('friends', 'friends'), ('radio/Magazine/TV', 'radio/Magazine/TV')], max_length=20)),
                ('respondent', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='kemriinfluenza.respondent')),
            ],
        ),
        migrations.CreateModel(
            name='Topic',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('topic_name', models.CharField(choices=[('Sexuality', 'Sexuality'), ('Abstinence', 'Abstinence'), ('Condoms', 'Condoms'), ('STI/HIV', 'STI/HIV'), ('RELATIONSHIPS', 'RELATIONSHIPS')], max_length=20)),
                ('respondent', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='kemriinfluenza.respondent')),
            ],
        ),
        migrations.AddConstraint(
            model_name='user',
            constraint=models.CheckConstraint(check=models.Q(('staff_no__startswith', 'KM'), ('staff_no__startswith', 'CM'), ('staff_no__startswith', 'AD'), _connector='OR'), name='staff_no_valid_prefix'),
        ),
        migrations.AddConstraint(
            model_name='user',
            constraint=models.CheckConstraint(check=models.Q(('email__regex', '^A%.*@kemri\\.go\\.ke$')), name='email_valid_domain'),
        ),
    ]
