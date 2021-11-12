import tl_background from '../img/tl_background.png';
import './Landing.css';
import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import OurButton from './OurButton';
import TopBar from './TopBar';
import { useAuth0 } from "@auth0/auth0-react";

function LandingMainArea() {
  const { loginWithRedirect } = useAuth0();
  return (
    <div className="main-area-container">
      <img className="tl_background" src={tl_background}/>
      <div className="title-text">
        TL PARTY
      </div>
      <div className="one-liner">
        Discover in-person esports watch parties near you
      </div>
      <div className="main-button-position">
          <OurButton type='button' onClick={() => loginWithRedirect()}>JOIN THE PARTY</OurButton>
      </div>
    </div>
  );
}

export default function Landing() {
  const { loginWithRedirect } = useAuth0();
  return (
      <div className="landing">
          <TopBar button_text="LOG IN" on_click={() => loginWithRedirect()} button_text_2="SIGN UP" on_click_2={() => loginWithRedirect()}/>
          <LandingMainArea />
      </div>
  );
}
