# This is an auto-generated Django model module.
# You'll have to do the following manually to clean this up:
#   * Rearrange models' order
#   * Make sure each model has one field with primary_key=True
#   * Make sure each ForeignKey and OneToOneField has `on_delete` set to the desired behavior
#   * Remove `managed = False` lines if you wish to allow Django to create, modify, and delete the table
# Feel free to rename the models, but don't rename db_table values or field names.
from django.contrib.postgres.fields import ArrayField
from django.db import models


class Event(models.Model):
    event_id = models.UUIDField(primary_key=True)
    event_name = models.CharField(max_length=100)
    location = models.CharField(max_length=100)
    game = models.TextField()
    video_game = models.CharField(max_length=50)
    image = models.BinaryField()
    num_attendees = models.IntegerField()
    date_time = models.DateTimeField()
    timezone = models.CharField(max_length=10)
    vibes = ArrayField(
        models.CharField(max_length=50),
        default=list,
    )
    snacks = ArrayField(
        models.CharField(max_length=50),
        default=list,
    )
    contact_firstname = models.CharField(max_length=50)
    contact_lastname = models.CharField(max_length=50)
    contact_email = models.CharField(max_length=100)

    class Meta:
        db_table = 'event'
    
    def __str__(self):
        return self.event_name


class UserEvent(models.Model):
    email_address = models.CharField(primary_key=True, max_length=100)
    event_id = models.ForeignKey("Event", on_delete=models.CASCADE)

    class Meta:
        db_table = 'user_event'
    
    def __str__(self):
        return "{}, <{}>".format(self.event_id, self.email_address)


class User(models.Model):
    email_address = models.CharField(primary_key=True, max_length=100)
    first_name = models.CharField(max_length=50, blank=True, null=True)
    last_name = models.CharField(max_length=50, blank=True, null=True)
    phone_number = models.CharField(max_length=50, blank=True, null=True)
    is_vaccinated = models.BooleanField()

    class Meta:
        db_table = 'user'
    
    def __str__(self):
        return "{} {}, <{}>".format(
            self.first_name, self.last_name, self.email_address
        )
