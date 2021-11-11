from django.contrib import admin

from .models import Event, UserEvent, User

# Register your models here.
admin.site.register([Event, UserEvent, User])