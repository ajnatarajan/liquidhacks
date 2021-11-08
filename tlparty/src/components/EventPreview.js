import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './EventPreview.css'
import tl_background_old from '../img/tl_background_old.jpg';
import valorant_icon from '../img/valorant_icon.png';

class EventPreview extends React.Component {
    render() {
      return (
        <div onclick="location.href='#';" style={{cursor: "pointer"}} class="square">
            <img src={tl_background_old} class="event-pic"/>
            <div class="title-text">
                LCS Opening Day Party
            </div>
            <div class="box black-opaque-box"/>
            <div>
                <div class="people-box">
                    12
                </div>
                <img src={valorant_icon} class="event-game-icon"/>
                <div class="event-time">
                    Sunday November 25
                </div>
            </div>
            
        </div>
      );
    }
  }

export default EventPreview;