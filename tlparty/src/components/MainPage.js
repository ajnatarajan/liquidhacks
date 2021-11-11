import 'bootstrap/dist/css/bootstrap.min.css';
import React, {useCallback, useState, useEffect} from 'react';
import {useNavigate} from 'react-router-dom';
import TopBar from './TopBar';
import OurButton from './OurButton'
import Landing from './Landing'
import './MainPage.css'
import EventPreviewSection from './EventPreviewSection';
import Modal from './Modal';
import HostForm from './HostForm';
import { useAuth0 } from "@auth0/auth0-react";
import valorant_icon from '../img/valorant_icon.png';
import league_icon from '../img/league_icon.png';
import csgo_icon from '../img/csgo_icon.png';
import dota_icon from '../img/dota_icon.png';
import rainbowsix_icon from '../img/rainbowsix_icon.png';
import starcraft_icon from '../img/starcraft_icon.png';
import axios from 'axios';

function getUpcomingEvents(upcoming_dictionary, game) { // make our Liquipedia DB call here and store it
    const FormData = require('form-data');
    const fs = require('fs');
    require('dotenv').config();

    const formData = new FormData();
    formData.append("apikey", process.env.REACT_APP_API_KEY);
    formData.append("wiki", game);
    formData.append("limit", 5);
    formData.append("conditions", "([[opponent1::Team Liquid]] OR [[opponent2::Team Liquid]]) AND [[date::>2021-11-10 00:00:00]]");

    axios.post(
        'https://gentle-beyond-32691.herokuapp.com/https://api.liquipedia.net/api/v1/match',
        formData
    ).then(response => {
        upcoming_dictionary[game] = response.data.result;
    });
}

function MainPageMainArea(props) {
    function openModal() {
        setIsModalOpen(!isModalOpen);
    }

    const [isModalOpen, setIsModalOpen] = useState(false);
    const { logout } = useAuth0();
    const navigate = useNavigate();
    const goToProfile = useCallback(() => navigate('/profile'), [navigate]);
    const { setUpcomingEvents } = props;
    // Fetch the most recent API data every time the main page is reloaded
    let upcoming_dictionary = {};
    var games = ["leagueoflegends", "valorant", "dota2", "starcraft2","counterstrike","rainbowsix"];
    for(let i=0; i < games.length; i++) {
        getUpcomingEvents(upcoming_dictionary, games[i]);
    }
    useEffect(() => {
        setUpcomingEvents(upcoming_dictionary);
    }, []);

    return (
        <div class="page-background-theme" style={{height: '100vh'}}>
            {/* if you change returnTo, talk to Ajay. He needs to change something
            in his auth0 account otherwise this will break*/}
            <TopBar button_text="PROFILE" on_click={goToProfile} button_text_2="LOG OUT" on_click_2={() => logout({ returnTo: "http://localhost:3000" })}/>
            <EventPreviewSection preview_section_title="Events Near You">
                <OurButton type="button" onClick={getUpcomingEvents}> I want to host! </OurButton>
                <OurButton type="button" onClick={openModal}> Open modal </OurButton>

                <div class="game-filter-text-and-menu-bar">
                    <div class="main-page-game-text">
                        FILTER BY GAME
                    </div>
                    <div class="game-filter-menu-bar">

                        <button className="btn btn-main-page-game-icon-filter left">
                            <img src={valorant_icon} class="main-page-filter-game-icon"/>
                        </button>
                        <button className="btn btn-main-page-game-icon-filter">
                            <img src={league_icon} class="main-page-filter-game-icon"/>
                        </button>
                        <button className="btn btn-main-page-game-icon-filter">
                            <img src={csgo_icon} class="main-page-filter-game-icon"/>
                        </button>
                        <button className="btn btn-main-page-game-icon-filter">
                            <img src={dota_icon} class="main-page-filter-game-icon"/>
                        </button>
                        <button className="btn btn-main-page-game-icon-filter">
                            <img src={starcraft_icon} class="main-page-filter-game-icon"/>
                        </button>
                        <button className="btn btn-main-page-game-icon-filter right">
                            <img src={rainbowsix_icon} class="main-page-filter-game-icon"/>
                        </button>
                    </div>
                </div>
            </EventPreviewSection>
            <Modal title="Test Event" isOpen={isModalOpen} setIsOpen={setIsModalOpen}>
                <HostForm/>
            </Modal>
        </div>
    );
}


export default function MainPage() {
    const {isAuthenticated} = useAuth0();
    const [upcoming_events, setUpcomingEvents] = useState({});
    if (!isAuthenticated) {
        return <Landing />;
    }
    console.log("UPCOMING EVENTS: ", upcoming_events);
    return <MainPageMainArea setUpcomingEvents={setUpcomingEvents}/>;
}
