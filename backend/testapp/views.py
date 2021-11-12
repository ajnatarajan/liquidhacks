from django.http import HttpResponse
from django.shortcuts import render
from testapp.models import Event, UserEvent, User
from django.views.decorators.csrf import csrf_exempt


import os
import requests
import json
from datetime import datetime
import random


def index(request):
    r = requests.get('http://httpbin.org/status/418')
    return HttpResponse('<pre>' + r.text + '</pre>')


def detail(request, email_address):
    users = User.objects.filter(email_address=email_address)
    names = []
    for user in users:
        names.append(user.first_name + ' ' + user.last_name)
    return HttpResponse("there are {} matching users: {}".format(len(users), ''.join(names)))


def all(request):
    users = User.objects.all()
    names = [user.first_name + ' ' + user.last_name for user in users]
    return HttpResponse("List of all users: {}".format(', '.join(names)))


def omg(request):
    times = random.randint(1, 1000)
    return HttpResponse("OMG HI! " * times)


def getParams(request):
    params = dict()
    if request.method == 'GET':
        params = request.GET.dict()
    elif request.method == 'POST':
        params = request.POST.dict()

    return params


@csrf_exempt
def getUserEvents(request):
    params = getParams(request)

    if params:
        user_email = params['email_address'].strip('"')
        results = {
            "user_events": [
                ue.event_id for ue in UserEvent.objects.filter(
                    email_address=user_email
                )
            ]
        }

        return HttpResponse(json.dumps(results, indent=4, sort_keys=True, default=str))
    else:
        return HttpResponse("There are no user events")


@csrf_exempt
def getPastUserEvents(request):
    params = getParams(request)
    
    if params:
        user_email = params['email_address'].strip('"')
        events = [
            str(e.event_id) for e in UserEvent.objects.filter(
                email_address=user_email
            )
        ]
        past_events = []
        for event in events:
            if Event.objects.filter(event_id=event, date_time__lte=datetime.now()).exists():
                past_events.append(event)
        results = {"past_events": past_events}
        
        return HttpResponse(json.dumps(results, indent=4, sort_keys=True, default=str))
    else:
        return HttpResponse("There are no user events")


@csrf_exempt
def getUpcomingUserEvents(request):
    params = getParams(request)
    
    if params:
        user_email = params['email_address'].strip('"')
        events = [
            str(e.event_id) for e in UserEvent.objects.filter(
                email_address=user_email
            )
        ]
        upcoming_events = []
        for event in events:
            if Event.objects.filter(event_id=event, date_time__gt=datetime.now()).exists():
                upcoming_events.append(event)
        results = {"upcoming_events": upcoming_events}
        
        return HttpResponse(json.dumps(results, indent=4, sort_keys=True, default=str))
    else:
        return HttpResponse("There are no user events")


@csrf_exempt
def getEvent(request):
    params = getParams(request)

    if params:
        event_id = params['event_id'].strip('"')
        event = Event.objects.filter(event_id=event_id)[0]
        results = {
            'event': {
                'event_id': event.event_id,
                'event_name': event.event_name,
                'location': event.location,
                'game': event.game,
                'video_game': event.video_game,
                'image': event.image,
                'num_attendees': event.num_attendees,
                'date_time': event.date_time,
                'timezone': event.timezone,
                'vibes': event.vibes,
                'snacks': event.snacks,
                'contact_firstname': event.contact_firstname,
                'contact_lastname': event.contact_lastname,
                'contact_email': event.contact_email
            }
        }
        return HttpResponse(json.dumps(results, indent=4, sort_keys=True, default=str))
    else:
        return HttpResponse("There are no events")


@csrf_exempt
def getAllEvents(request):
    if request.method == 'GET':
        events = {
            'events': [{
                'event_id': e.event_id,
                'event_name': e.event_name,
                'location': e.location,
                'game': e.game,
                'video_game': e.video_game,
                'image': e.image,
                'num_attendees': e.num_attendees,
                'date_time': e.date_time,
                'timezone': e.timezone,
                'vibes': e.vibes,
                'snacks': e.snacks,
                'contact_firstname': e.contact_firstname,
                'contact_lastname': e.contact_lastname,
                'contact_email': e.contact_email
            } for e in Event.objects.all()]
        }
        return HttpResponse(json.dumps(events, indent=4, sort_keys=True, default=str))


@csrf_exempt
def getAllPastEvents(request):
    if request.method == 'GET':
        events = {
            'events': [{
                'event_id': e.event_id,
                'event_name': e.event_name,
                'location': e.location,
                'game': e.game,
                'video_game': e.video_game,
                'image': e.image,
                'num_attendees': e.num_attendees,
                'date_time': e.date_time,
                'timezone': e.timezone,
                'vibes': e.vibes,
                'snacks': e.snacks,
                'contact_firstname': e.contact_firstname,
                'contact_lastname': e.contact_lastname,
                'contact_email': e.contact_email
            } for e in Event.objects.filter(date_time__lte=datetime.now())]
        }
        return HttpResponse(json.dumps(events, indent=4, sort_keys=True, default=str))


@csrf_exempt
def getAllUpcomingEvents(request):
    if request.method == 'GET':
        events = {
            'events': [{
                'event_id': e.event_id,
                'event_name': e.event_name,
                'location': e.location,
                'game': e.game,
                'video_game': e.video_game,
                'image': e.image,
                'num_attendees': e.num_attendees,
                'date_time': e.date_time,
                'timezone': e.timezone,
                'vibes': e.vibes,
                'snacks': e.snacks,
                'contact_firstname': e.contact_firstname,
                'contact_lastname': e.contact_lastname,
                'contact_email': e.contact_email
            } for e in Event.objects.filter(date_time__gt=datetime.now())]
        }
        return HttpResponse(json.dumps(events, indent=4, sort_keys=True, default=str))


@csrf_exempt
def addEvent(request):
    params = getParams(request)
    clean_params = {key: params[key].strip('"') for key in params}
    if Event.objects.filter(event_id=clean_params['event_id']).exists():
        print("{} already exists in the database".format(clean_params['event_id']))
    else:
        e = Event(
            event_id=clean_params['event_id'],
            event_name=clean_params['event_name'],
            location=clean_params['location'],
            game=clean_params['game'],
            video_game=clean_params['video_game'],
            image=clean_params['image'],
            num_attendees=clean_params['num_attendees'],
            date_time=clean_params['date_time'],
            timezone=clean_params['timezone'],
            vibes=clean_params['vibes'],
            snacks=clean_params['snacks'],
            contact_firstname=clean_params['contact_firstname'],
            contact_lastname=clean_params['contact_lastname'],
            contact_email=clean_params['contact_email'],
        )
        e.save()
        print('{} was added to the database'.format(e.__str__()))


@csrf_exempt
def addUserEvent(request):
    params = getParams(request)
    clean_params = {key: params[key].strip('"') for key in params}
    if UserEvent.objects.filter(email_address=clean_params['email_address']).exists():
        print("{} already exists in the database".format(clean_params['email_address']))
    elif not Event.objects.filter(event_id=clean_params['event_id']).exists():
        print("Cannot add {} because event does not exist!".format(clean_params['event_id']))
    else:
        ue = UserEvent(
            email_address=clean_params['email_address'],
            event_id=clean_params['event_id'],
        )
        ue.save()
        print('{} was added to the database'.format(ue.__str__()))


@csrf_exempt
def addUser(request):
    params = getParams(request)
    clean_params = {key: params[key].strip('"') for key in params}
    if User.objects.filter(email_address=clean_params['email_address']).exists():
        print("{} already exists in the database".format(clean_params['email_address']))
    else:
        u = User(
            email_address=clean_params['email_address'],
            first_name=clean_params['first_name'],
            last_name=clean_params['last_name'],
            phone_number=clean_params['phone_number'],
            is_vaccinated=clean_params['is_vaccinated'],
        )
        u.save()
        print('{} was added to the database'.format(u.__str__()))
