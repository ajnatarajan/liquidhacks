# Generated by Django 3.2.9 on 2021-11-12 01:37

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('testapp', '0008_auto_20211111_1733'),
    ]

    operations = [
        migrations.AlterUniqueTogether(
            name='userevent',
            unique_together={('email_address', 'event_id')},
        ),
    ]