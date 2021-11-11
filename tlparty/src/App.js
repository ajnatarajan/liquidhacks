import logo from './assets/logo.svg';
import { Link } from 'react-router-dom';
import './App.css';
import Landing from './components/Landing';
import ProfilePage from './components/ProfilePage';
import EventPreview from './components/EventPreview';
import MainPage from './components/MainPage';
import Host from './routes/Host';
import Login from './routes/Login';
import React, {useState} from 'react';
import { useAuth0 } from "@auth0/auth0-react";
import EventModal from './components/EventModal';

export default function App() {
  const { isAuthenticated } = useAuth0();
  if (isAuthenticated) {
    return (
      <MainPage />
    );
  }
  return (
    <EventModal
      name="Event Name"
      host="me"
      game="csgo"
      location="somewhere"
      date="tmrw sometime pst lol"
      vibes={["this", "category", "is", "deadass", "stupid"]}
      snacks={["pogger", "wogger", "logger"]}
    />
    // <MainPage />
    // <Host />
  );
}
