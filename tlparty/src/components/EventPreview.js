import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './EventPreview.css'
import tl_background_old from '../img/tl_background_old.jpg';
import tlvsmad from '../img/tlvsmad.jpg';
import valorant_icon from '../img/valorant_icon.png';
import league_icon from '../img/league_icon.png';
import csgo_icon from '../img/csgo_icon.png';
import dota_icon from '../img/dota_icon.png';
import rainbowsix_icon from '../img/rainbowsix_icon.png';
import starcraft_icon from '../img/starcraft_icon.png';
import attendee_icon from '../img/attendee_icon.png';
import Modal from './Modal';
import EventModal from './EventModal';

export const GameIcon = (props) => {
    let Output;
    switch (props.game) {
        case 'League of Legends':
            Output = (<img src={league_icon} class="event-game-icon"/>);
            break;
        case 'Valorant':
            Output = (<img src={valorant_icon} class="event-game-icon"/>);
            break;
        case 'Dota 2':
            Output = (<img src={dota_icon} class="event-game-icon"/>);
            break;
        case 'Starcraft 2':
            Output = (<img src={starcraft_icon} class="event-game-icon"/>);
            break;
        case 'Counter-Strike: Global Offensive':
            Output = (<img src={csgo_icon} class="event-game-icon"/>);
            break;
        case 'Rainbow Six':
            Output = (<img src={rainbowsix_icon} class="event-game-icon"/>);
            break;
        default:
            Output = (null);
            break;
    }

    return Output;
};

export const EventPic = (props) => {
    let Output;
    switch (props.event_pic) {
        case 'tlvsmad':
            Output = (<img src={tlvsmad} class="event-pic"/>);
            break;
        default:
            Output = (<img src={tl_background_old} class="event-pic"/>);
            break;
    }

    return Output;
};


export default function EventPreview(props) {
    function openModal() {
        setIsModalOpen(!isModalOpen);
    }
    const [isModalOpen, setIsModalOpen] = useState(false);

    const { full_event } = props;
    console.log("LETS SEE IF I HAVE ACCESS: ", full_event);

    const dbGameCodeToEnglish = {
        "leagueoflegends": "League of Legends",
        "valorant": "Valorant",
        "dota2": "Dota 2",
        "starcraft2": "Starcraft 2",
        "counterstrike": "Counter-Strike: Global Offensive",
        "rainbowsix": "Rainbow Six",
    }

    function dateToDayMonth(dateString) {
        var days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
        var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
        const d = new Date(dateString);
        var dayName = days[d.getDay()];
        var month = months[d.getMonth()];
        var date = d.getDate();
        return dayName + " " + month + " " + date;
    }


    return (
        <div>
            <div class="event-preview-clickable-region" style={{cursor: "pointer"}} onClick={openModal}>
            <span style={{display: "inline-block"}} class="square">
                <EventPic {...props}/>
                <div class="event-preview-title-text">
                    {props.title}
                </div>
                <div class="box black-opaque-box">
                    <div class="people-box">
                        <img src={attendee_icon} class="event-game-icon"/>
                        {props.num_attendees}
                    </div>
                    <GameIcon {...props} />
                    <div class="event-time">
                        {dateToDayMonth(full_event["date_time"])}
                    </div>
                </div>
            </span>
            </div>
            <Modal isOpen={isModalOpen} setIsOpen={setIsModalOpen}>
                <EventModal
                    name={full_event["event_name"]}
                    host={full_event["contact_firstname"] + " " + full_event["contact_lastname"]}
                    liquipedia_pagename={full_event["game"]}
                    game={dbGameCodeToEnglish[full_event["video_game"]]}
                    location={full_event["location"]}
                    date={full_event["date_time"]}
                    vibes={full_event["vibes"]}
                    snacks={full_event["snacks"]}
                />
            </Modal>
        </div>
    );
}
