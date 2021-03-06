# Generated by Django 3.2.9 on 2021-11-11 20:23

import django.contrib.postgres.fields
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Event',
            fields=[
                ('event_id', models.UUIDField(primary_key=True, serialize=False)),
                ('event_name', models.CharField(max_length=100)),
                ('location', models.CharField(max_length=100)),
                ('game', models.TextField()),
                ('video_game', models.CharField(max_length=50)),
                ('image', models.ImageField(upload_to='')),
                ('num_attendees', models.IntegerField()),
                ('date_time', models.DateTimeField()),
                ('timezone', models.CharField(max_length=10)),
                ('vibes', django.contrib.postgres.fields.ArrayField(base_field=models.CharField(max_length=50), default=list, size=None)),
                ('snacks', django.contrib.postgres.fields.ArrayField(base_field=models.CharField(max_length=50), default=list, size=None)),
                ('contact_firstname', models.CharField(max_length=50)),
                ('contact_lastname', models.CharField(max_length=50)),
                ('contact_email', models.CharField(max_length=100)),
            ],
            options={
                'db_table': 'event',
            },
        ),
        migrations.CreateModel(
            name='User',
            fields=[
                ('email_address', models.CharField(max_length=100, primary_key=True, serialize=False)),
                ('first_name', models.CharField(blank=True, max_length=50, null=True)),
                ('last_name', models.CharField(blank=True, max_length=50, null=True)),
                ('phone_number', models.CharField(blank=True, max_length=50, null=True)),
                ('is_vaccinated', models.BooleanField()),
            ],
            options={
                'db_table': 'user',
            },
        ),
        migrations.CreateModel(
            name='UserEvent',
            fields=[
                ('email_address', models.CharField(max_length=100, primary_key=True, serialize=False)),
                ('event_id', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='testapp.event')),
            ],
            options={
                'db_table': 'user_event',
            },
        ),
    ]
