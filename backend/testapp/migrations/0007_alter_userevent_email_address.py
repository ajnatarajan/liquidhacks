# Generated by Django 3.2.9 on 2021-11-12 01:30

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('testapp', '0006_alter_event_image'),
    ]

    operations = [
        migrations.AlterField(
            model_name='userevent',
            name='email_address',
            field=models.ForeignKey(max_length=100, on_delete=django.db.models.deletion.CASCADE, primary_key=True, serialize=False, to='testapp.user'),
        ),
    ]
