# Generated by Django 5.0.6 on 2024-07-27 07:20

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('Receipe', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='recipes',
            name='vegetarian',
            field=models.CharField(max_length=200),
        ),
    ]
