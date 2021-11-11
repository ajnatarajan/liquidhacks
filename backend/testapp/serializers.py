from rest_framework import serializers
from .models import Event, PastEvent, UpcomingEvent, User

class EventSerializer(serializers.ModelSerializer):
    class Meta:
        model = Event
        fields = (
            'event_id',
            'event_name',
            'location',
            'game',
            'video_game',
            'image',
            'num_attendees',
            'date_time',
            'timezone',
            'vibes',
            'snacks',
            'contact_firstname',
            'contact_lastname',
            'contact_email',
        )


class PastEventSerializer(serializers.ModelSerializer):
    class Meta:
        model = PastEvent
        fields = ('email_address', 'event_id')


class UpcomingEventSerializer(serializers.ModelSerializer):
    class Meta:
        model = UpcomingEvent
        fields = ('email_address', 'event_id')


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = (
            'email_address',
            'first_name',
            'last_name',
            'phone_number',
            'is_vaccinated',
        )