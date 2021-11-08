import tl_background from './img/tl_background.png';
import './Landing.css';
import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import OurButton from './OurButton';
import TopBar from './TopBar';

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
            <OurButton text="JOIN THE PARTY"/>
        </div>
      </div>
    );
  }
}

class Landing extends React.Component {
  render() {
    return (
        <div className="landing">
            <TopBar />
            <LandingMainArea />
        </div>
    );
  }
}

export default Landing;
