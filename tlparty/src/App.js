import logo from './assets/logo.svg';
import { Link } from 'react-router-dom';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Currently on <code>src/App.js</code>.
        </p>
        <Link to='/host' className='App-link'>Visit <code>/host</code></Link>
      </header>
    </div>
  );
}

export default App;
