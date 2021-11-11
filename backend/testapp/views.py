from django.db.models.fields import EmailField
from django.http import HttpResponse
from django.shortcuts import render
from testapp.models import Event, PastEvent, UpcomingEvent, User


import os
import requests
import json
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


def getUserEvents(request):
    if request.method == 'GET':
        params = request.GET.dict()
        user_email = params['email'].strip('"')
        results = {
            "past_events": [pe.event_id for pe in PastEvent.objects.filter(email_address=user_email)],
            "upcoming_events": [ue.event_id for ue in UpcomingEvent.objects.filter(email_address=user_email)],
        }
        return HttpResponse(json.dumps(results))


def getEvent(request):
    if request.method == 'GET':
        params = request.GET.dict()
        event_id = params['event_id'].strip('"')
        events = Event.objects.filter(event_id=event_id)
        results = {
            'event': [{
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
            } for e in events]
        }
        return HttpResponse(json.dumps(results)) 


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
        return HttpResponse(json.dumps(events))


def addEvent(request):
    if request.method == 'GET':
        params = request.GET.dict()
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


def addPastEvent(request):
    if request.method == 'GET':
        params = request.GET.dict()
        clean_params = {key: params[key].strip('"') for key in params}
        if PastEvent.objects.filter(email_address=clean_params['email_address']).exists():
            print("{} already exists in the database".format(clean_params['email_address']))
        elif not Event.objects.filter(event_id=clean_params['event_id']).exists():
            print("Cannot add {} because event does not exist!".format(clean_params['event_id']))
        else:
            pe = PastEvent(
                email_address=clean_params['email_address'],
                event_id=clean_params['event_id'],
            )
            pe.save()
            print('{} was added to the database'.format(pe.__str__()))


def addUpcomingEvent(request):
    if request.method == 'GET':
        params = request.GET.dict()
        clean_params = {key: params[key].strip('"') for key in params}
        if UpcomingEvent.objects.filter(email_address=clean_params['email_address']).exists():
            print("{} already exists in the database".format(clean_params['email_address']))
        elif not Event.objects.filter(event_id=clean_params['event_id']).exists():
            print("Cannot add {} because event does not exist!".format(clean_params['event_id']))
        else:
            ue = UpcomingEvent(
                email_address=clean_params['email_address'],
                event_id=clean_params['event_id'],
            )
            ue.save()
            print('{} was added to the database'.format(ue.__str__()))


def addUser(request):
    if request.method == 'GET':
        params = request.GET.dict()
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
