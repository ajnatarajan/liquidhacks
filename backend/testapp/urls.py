from django.urls import path
from . import views

urlpatterns = [
    path('', views.index, name='index'),
    path('users/<email_address>/', views.detail, name='detail'),
    path('all/', views.all, name='all'),
    path('omg/', views.omg, name='omg'),
    path('getUserEvents/', views.getUserEvents, name='getUserEvents'),
    path('getEvent/', views.getEvent, name='getEvent'),
    path('getAllEvents/', views.getAllEvents, name='getAllEvents'),
    path('addEvent/', views.addEvent, name='addEvent'),
    path('addPastEvent/', views.addPastEvent, name='addPastEvent'),
    path('addUpcomingEvent/', views.addUpcomingEvent, name='addUpcomingEvent'),
    path('addUser/', views.addUser, name='addUser'),
]
