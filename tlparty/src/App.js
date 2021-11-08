import logo from './assets/logo.svg';
import tl_background from './img/tl_background.png';
import tl_icon from './img/tl_icon.png';
import { Link } from 'react-router-dom';
import './App.css';
import React from 'react';
import Landing from './Landing';
import 'bootstrap/dist/css/bootstrap.min.css';
// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Currently on <code>src/App.js</code>.
//         </p>
//         <Link to='/host' className='App-link'>Visit <code>/host</code></Link>
//       </header>
//     </div>
//   );
// }

class TopBar extends React.Component {
  render() {
    return(
      <header>
        <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC" crossorigin="anonymous"></link>
        <nav class="navbar navbar-expand-lg dark-theme py-3">
          <div class="container-fluid mx-4">
            <img class="tl_icon" src={tl_icon}/>
            <div class="tl_party">Team Liquid Party</div>
            <button class="btn btn-join-the-party">Sign up</button>
          </div>
        </nav>
      </header>
      
    );
  }
}

class LandingMainArea extends React.Component {
  render() {
    return (
      <div class="main-area-container">
        <img class="tl_background" src={tl_background}/>
        <div class="title-text">
          Team Liquid Party
        </div>
        <div class="one-liner">
          Discover in-person esports watch parties near you
        </div>
        <div class="main-button-position">
          <button class="btn btn-join-the-party">
            JOIN THE PARTY
          </button>
        </div>
      </div>
    );
  }
}

class App extends React.Component {
  render() {
    return (
        <div className="landing">
            <TopBar />
            <LandingMainArea />
        </div>
    );
  }
}

export default App;
