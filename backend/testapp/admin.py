from django.contrib import admin

from .models import Event, PastEvent, UpcomingEvent, User

# Register your models here.
admin.site.register([Event, PastEvent, UpcomingEvent, User])