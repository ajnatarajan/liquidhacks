from django.http import HttpResponse
from django.shortcuts import render
from testapp.models import Event, PastEvent, UpcomingEvent, User
from testapp.serializers import (
    EventSerializer,
    PastEventSerializer,
    UpcomingEventSerializer,
    UserSerializer,
)
from rest_framework import generics

# Create your views here.

class EventListCreate(generics.ListCreateAPIView):
    queryset = Event.objects.all()
    serializer_class = EventSerializer


class PastEventListCreate(generics.ListCreateAPIView):
    queryset = PastEvent.objects.all()
    serializer_class = PastEventSerializer


class UpcomingEventListCreate(generics.ListCreateAPIView):
    queryset = UpcomingEvent.objects.all()
    serializer_class = UpcomingEventSerializer


class UserListCreate(generics.ListCreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer


def index(request):
    return HttpResponse("Hello, world. You're at the testapp index. Yay!")

def detail(request, email_address):
    return HttpResponse("You're looking at user %s." % email_address)

def results(request, email_address):
    response = "You're looking at the results of user %s."
    return HttpResponse(response % email_address)

def vote(request, email_address):
    return HttpResponse("You're voting on user %s." % email_address)


def user_detail(request, pk):
    user = User.objects.get(pk=pk)
    events = Event.objects.filter(pk=user.email_address)

    context = {
        "user": user,
        "events": events,
    }

    return render(request, "car_detail.html", context)

