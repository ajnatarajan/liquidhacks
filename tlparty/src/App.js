import logo from './assets/logo.svg';
import { Link } from 'react-router-dom';
import './App.css';
import Landing from './components/Landing';
import EventPreview from './components/EventPreview'

function App() {
  return (
    <EventPreview title="LCS Opening Day Party" date="Friday November 12" num_attendees="12" game="Valorant"/>
  );
}

export default App;