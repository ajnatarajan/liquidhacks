import logo from './assets/logo.svg';
import { Link } from 'react-router-dom';
import './App.css';
import Landing from './components/Landing';
import ProfilePage from './components/ProfilePage';
import EventPreview from './components/EventPreview';
import MainPage from './components/MainPage';
import Host from './routes/Host';

export default function App() {
  return (
    <MainPage />
  );
}