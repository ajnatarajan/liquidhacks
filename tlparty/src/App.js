import './App.css';
import Landing from './components/Landing';
import MainPage from './components/MainPage';
import React from 'react';
import { useAuth0 } from "@auth0/auth0-react";

export default function App() {
  const { isAuthenticated } = useAuth0();
  if (isAuthenticated) {
    return (
      <MainPage />
    );
  }
  return (
    <Landing />
  );
}
