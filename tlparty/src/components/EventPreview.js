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
            Output = (<img src={league_icon} className="event-game-icon" alt="League of Legends logo" />);
            break;
        case 'Valorant':
            Output = (<img src={valorant_icon} className="event-game-icon" alt="Valorant logo" />);
            break;
        case 'Dota 2':
            Output = (<img src={dota_icon} className="event-game-icon" alt="Dota 2 logo" />);
            break;
        case 'Starcraft 2':
            Output = (<img src={starcraft_icon} className="event-game-icon" alt="Starcraft 2 logo" />);
            break;
        case 'Counter-Strike: Global Offensive':
            Output = (<img src={csgo_icon} className="event-game-icon" alt="CSGO logo" />);
            break;
        case 'Rainbow Six':
            Output = (<img src={rainbowsix_icon} className="event-game-icon" alt="Rainbow Six logo" />);
            break;
        default:
            Output = (null);
            break;
    }

    return Output;
};

export const EventPic = ({ event_pic }) => {
    let Output;
    switch (event_pic) {
        case 'tlvsmad':
            Output = (<img src={'../img/tlvsmad.jpg'} className="event-pic" alt="tlvsmad pic" />);
            break;
        default:
            Output = (<img src={'../img/tl_background_old.jpg'} className="event-pic" alt="default pic" />);
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
            <div className="event-preview-clickable-region" style={{cursor: "pointer"}} onClick={openModal}>
            <span style={{display: "inline-block", backgroundImage: `url(${tl_background_old})`}} className="square">
                <div className="event-preview-title-text">
                    {props.title}
                </div>
                <div className="box black-opaque-box">
                    <div className="people-box">
                        <img src={attendee_icon} className="event-game-icon" alt="event game icon" />
                        {props.num_attendees}
                    </div>
                    <GameIcon {...props} />
                    <div className="event-time">
                        {dateToDayMonth(full_event["date_time"])}
                    </div>
                </div>
            </span>
            </div>
            <Modal isOpen={isModalOpen} setIsOpen={setIsModalOpen} title={full_event["event_name"]}>
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
