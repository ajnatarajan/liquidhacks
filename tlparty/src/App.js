import logo from './assets/logo.svg';
import { Link } from 'react-router-dom';
import './App.css';
import Landing from './components/Landing';
import ProfilePage from './components/ProfilePage';
import EventPreview from './components/EventPreview';

export default function App() {
  return (
    <ProfilePage user_name="Ajay" user_email="ajnatarajan@gmail.com" user_phone="626-353-8000"/>
  );
}