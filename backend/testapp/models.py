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

    event_id (primary key)
    event_name
    location
    game (from Liquipedia DB)
    video_game
    image
    num_attendees
    date_time
    timezone
    vibes
    snacks
    contact_firstname
    contact_lastname
    contact_email

'''

class Event(models.Model):
    VALORANT = 'VAL'
    LEAGUE = 'LOL'
    CSGO = 'CSG'
    DOTA = 'DOT'
    PUBG = 'PUB'
    SMASH = 'SMA'
    GAME_CHOICES = [
        (VALORANT, 'Valorant'),
        (LEAGUE, 'League'),
        (CSGO, 'CSGO'),
        (DOTA, 'Dota'),
        (PUBG, 'PUBG'),
        (SMASH, 'Smash')
    ]
    
    event_id = models.AutoField(primary_key=True)
    event_name = models.CharField(max_length=100)
    event_location = models.CharField(max_length=100)
    event_datetime = models.DateTimeField()
    event_vibes = ArrayField(
        models.CharField(max_length=50),
        default=list,
    )
    host_email=models.EmailField(max_length=50)
    host_first_name = models.CharField(max_length=50)
    host_last_name = models.CharField(max_length=50)
    num_attendees = models.IntegerField()
    game_type = models.CharField(
        max_length=3,
        choices=GAME_CHOICES,
    )