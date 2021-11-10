from django.db import models
from django.contrib.postgres.fields import ArrayField

# Create your models here.
'''
    eventName: '',
    eventLocation: '',
    eventDateTime: new Date(), // TODO: Change to datetime format
    eventVibes: '',
    firstName: '',
    lastName: '',
    email: '',
    terms: false,
'''

class Event(models.Model):
    GAME_CHOICES = ['Valorant', 'League', 'CSGO', 'Dota', 'PUBG', 'Smash']
    
    event_name = models.CharField()
    event_location = models.CharField()
    event_datetime = models.DateTimeField()
    event_vibes = ArrayField(
        models.CharField()
    )
    host_email=models.EmailField()
    host_first_name = models.CharField()
    host_last_name = models.CharField()
    num_attendees = models.IntegerField()
    game_type = models.CharField(
        choices=GAME_CHOICES
    )