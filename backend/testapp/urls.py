from django.urls import path
from . import views

urlpatterns = [
    path('', views.index, name='index'),
    path('users/<email_address>/', views.detail, name='detail'),
    path('all/', views.all, name='all'),
    path('omg/', views.omg, name='omg'),
    path('getUserEvents/', views.getUserEvents, name='getUserEvents'),
    path('getEvent/', views.getEvent, 'getEvent'),
    path('getAllEvents/', views.getAllEvents, 'getAllEvents'),
    path('addEvent/', views.addEvent, 'addEvent'),
    path('addPastEvent/', views.addPastEvent, 'addPastEvent'),
    path('addUpcomingEvent/', views.addUpcomingEvent, 'addUpcomingEvent'),
    path('addUser/', views.addUser, name='addUser'),
]
