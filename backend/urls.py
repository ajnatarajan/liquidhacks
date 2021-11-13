"""backend URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/3.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
import os
from django.contrib import admin
from django.urls import path, include, re_path
from django.conf.urls.static import static
from django.conf import settings
from django.views.generic import TemplateView
from backend.settings import BASE_DIR

from testapp import views

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include('testapp.urls')),
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
    path('', TemplateView.as_view(template_name='index.html'))
]

urlpatterns = urlpatterns + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)