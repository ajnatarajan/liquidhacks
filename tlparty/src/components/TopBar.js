import tl_icon from '../img/tl_icon.png';
import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import OurButton from './OurButton';
import './TopBar.css';


export default function TopBar(props) {
  return(
    <header>
      <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC" crossOrigin="anonymous"></link>
      <nav className="navbar navbar-expand-lg dark-theme py-3">
        <div className="container-fluid mx-4">
          <a href="/home">
            <img className="tl_icon" src={tl_icon} alt="Team Liquid icon ^_^"/>
          </a>
          <div className="tl_party">TL PARTY</div>
          <div className="top-bar-right-side-buttons">
            <OurButton type='button' onClick={props.on_click}>{props.button_text}</OurButton>
            <OurButton type='button' onClick={props.on_click_2}>{props.button_text_2}</OurButton>
          </div>
        </div>
      </nav>
    </header>
  );
}