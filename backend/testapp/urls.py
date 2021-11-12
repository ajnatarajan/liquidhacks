from django.urls import path
from . import views

urlpatterns = [
    path('', views.index, name='index'),
    path('users/<email_address>/', views.detail, name='detail'),
    path('all/', views.all, name='all'),
    path('omg/', views.omg, name='omg'),
    path('getUserEvents/', views.getUserEvents, name='getUserEvents'),
    path('getPastUserEvents/', views.getPastUserEvents, name='getPastUserEvents'),
    path('getUpcomingUserEvents/', views.getUpcomingUserEvents, name='getUpcomingUserEvents'),
    path('getEvent/', views.getEvent, name='getEvent'),
    path('getAllEvents/', views.getAllEvents, name='getAllEvents'),
    path('getAllPastEvents/', views.getAllPastEvents, name='getAllPastEvents'),
    path('getAllUpcomingEvents/', views.getAllUpcomingEvents, name='getAllUpcomingEvents'),
    path('editEvent/', views.editEvent, name='editEvent'),
    path('addEvent/', views.addEvent, name='addEvent'),
    path('addUserEvent/', views.addUserEvent, name='addUserEvent'),
    path('addUser/', views.addUser, name='addUser'),
]
