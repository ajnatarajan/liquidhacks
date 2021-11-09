import tl_background from '../img/tl_background.png';
import './Landing.css';
import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import OurButton from './OurButton';
import TopBar from './TopBar';

function LandingMainArea() {
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
          <OurButton type='button' onClick={null}>JOIN THE PARTY</OurButton>
      </div>
    </div>
  );
}

export default function Landing() {
  return (
      <div className="landing">
          <TopBar button_text="SIGN UP"/>
          <LandingMainArea />
      </div>
  );
}
