import logo from '../assets/logo.svg';
import { Link } from 'react-router-dom';
import './Host.css';

export default function Host() {
  return (
    <div className="Host">
      <header className="Host-header">
        <img src={logo} className="Host-logo" alt="logo" />
        <p>
          Currently on <code>src/routes/Host.js</code>.
        </p>
        <Link to='/' className='Host-link'>Return home</Link>
      </header>
    </div>
  );
}
