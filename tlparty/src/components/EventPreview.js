import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './EventPreview.css'
import tl_background_old from '../img/tl_background_old.jpg';
import valorant_icon from '../img/valorant_icon.png';
import league_icon from '../img/league_icon.png';
import csgo_icon from '../img/csgo_icon.png';
import dota_icon from '../img/dota_icon.png';
import pubg_icon from '../img/pubg_icon.png';
import smash_icon from '../img/smash_icon.png';

export const GameIcon = (props) => {
    let Output;
    switch (props.game) {
        case 'Valorant':
            Output = (<img src={valorant_icon} class="event-game-icon"/>);
            break;
        case 'League':
            Output = (<img src={league_icon} class="event-game-icon"/>);
            break;
        case 'CSGO':
            Output = (<img src={csgo_icon} class="event-game-icon"/>);
            break;
        case 'Dota':
            Output = (<img src={dota_icon} class="event-game-icon"/>);
            break;
        case 'PUBG':
            Output = (<img src={pubg_icon} class="event-game-icon"/>);
            break;
        case 'Smash':
            Output = (<img src={smash_icon} class="event-game-icon"/>);
            break;
        default:
            Output = (null);
            break;
    }

    return Output;
};

export default function EventPreview(props) {
    return (
    <a href="#" class="event-preview-clickable-region">
        <span style={{display: "inline-block"}} class="square">
            <img src={tl_background_old} class="event-pic"/>
            <div class="event-preview-title-text">
                {props.title}
            </div>
            <div class="box black-opaque-box"/>
            <div>
                <div class="people-box">
                    {props.num_attendees}
                </div>
                <GameIcon {...props} />
                <div class="event-time">
                    {props.date}
                </div>
            </div>
        </span>
    </a>
    );
}
