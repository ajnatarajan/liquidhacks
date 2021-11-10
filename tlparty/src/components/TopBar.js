import tl_icon from '../img/tl_icon.png';
import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import OurButton from './OurButton';
import './TopBar.css';

export default function TopBar(props) {
  return(
    <header>
      <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC" crossorigin="anonymous"></link>
      <nav class="navbar navbar-expand-lg dark-theme py-3">
        <div class="container-fluid mx-4">
          <img class="tl_icon" src={tl_icon}/>
          <div class="tl_party">Team Liquid Party</div>
          <div class="top-bar-right-side-buttons">
            <OurButton type='button' onClick={props.on_click}>{props.button_text}</OurButton>
            <OurButton type='button' onClick={props.on_click_2}>{props.button_text_2}</OurButton>
          </div>
        </div>
      </nav>
    </header>
  );
}