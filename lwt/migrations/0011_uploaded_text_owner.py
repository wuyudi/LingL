# Generated by Django 3.2.4 on 2021-06-24 17:07

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('lwt', '0010_remove_myuser_is_subscribed'),
    ]

    operations = [
        migrations.AddField(
            model_name='uploaded_text',
            name='owner',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL),
        ),
    ]
