# Generated by Django 3.2.9 on 2021-11-11 20:36

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('testapp', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='event',
            name='event_id',
            field=models.CharField(max_length=100, primary_key=True, serialize=False),
        ),
    ]