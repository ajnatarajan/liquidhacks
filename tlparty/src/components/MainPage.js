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
import DropdownUsingAPI from './DropdownUsingAPI';

function getUpcomingEvents(upcoming_dictionary, game, setFunction) { // make our Liquipedia DB call here and store it
    const FormData = require('form-data');
    const fs = require('fs');
    require('dotenv').config();

    const formData = new FormData();
    formData.append("apikey", process.env.REACT_APP_API_KEY);
    formData.append("wiki", game);
    formData.append("limit", 10);
    formData.append("conditions", "([[opponent1::Team Liquid]] OR [[opponent2::Team Liquid]]) AND [[date::>2021-11-10 00:00:00]]");

    // axios.post(
    //     'https://gentle-beyond-32691.herokuapp.com/https://api.liquipedia.net/api/v1/match',
    //     formData
    // )

    fetch('https://gentle-beyond-32691.herokuapp.com/https://api.liquipedia.net/api/v1/match',
    {
        body: formData,
        method: "post"
    }).then(response => response.json())
    .then(data => {
        upcoming_dictionary[game] = Array.from(data.result);
        // console.log(Array.from(data.result), "ARRAY");
        setFunction({...upcoming_dictionary});
    });
}

function MainPageMainArea(props) {
    function openModal() {
        setIsModalOpen(!isModalOpen);
    }

    function toggleActiveGame(e) {
        console.log(e);
        switch(e) {
            case "valorant":
                setActiveGames({valorant: !activeGames.valorant});
                break;

        }
    }

    const [isModalOpen, setIsModalOpen] = useState(false);
    const { logout } = useAuth0();
    const navigate = useNavigate();
    const goToProfile = useCallback(() => navigate('/profile'), [navigate]);
    const { setUpcomingEvents } = props;
    const [activeGames, setActiveGames] = useState({
        valorant: false,
        league: false,
        csgo: false,
        dota: false,
        starcraft: false,
        rainbowsix: false,
    });

    // Fetch the most recent API data every time the main page is reloaded
    useEffect(() => {
        let upcoming_dictionary = {};
        var games = ["leagueoflegends", "valorant", "dota2", "starcraft2","counterstrike","rainbowsix"];
        for(let i=0; i < games.length; i++) {
            getUpcomingEvents(upcoming_dictionary, games[i], setUpcomingEvents);
        }
    }, []);

    console.log("CLEANED EVENTS INSIDE: ", props.cleanedNames);

    return (
        <div class="page-background-theme" style={{minHeight: '100vh'}}>
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
                        <button className={"btn btn-main-page-game-icon-filter left " + (activeGames.valorant ? "active" : "")}
                        onClick={() => setActiveGames({...activeGames, valorant: !activeGames.valorant})}>
                            <img src={valorant_icon} class="main-page-filter-game-icon"/>
                        </button>
                        <button className={"btn btn-main-page-game-icon-filter " + (activeGames.league ? "active" : "")}
                        onClick={() => setActiveGames({...activeGames, league: !activeGames.league})}>
                            <img src={league_icon} class="main-page-filter-game-icon"/>
                        </button>
                        <button className={"btn btn-main-page-game-icon-filter " + (activeGames.csgo ? "active" : "")}
                        onClick={() => setActiveGames({...activeGames, csgo: !activeGames.csgo})}>
                            <img src={csgo_icon} class="main-page-filter-game-icon"/>
                        </button>
                        <button className={"btn btn-main-page-game-icon-filter " + (activeGames.dota ? "active" : "")}
                        onClick={() => setActiveGames({...activeGames, dota: !activeGames.dota})}>
                            <img src={dota_icon} class="main-page-filter-game-icon"/>
                        </button>
                        <button className={"btn btn-main-page-game-icon-filter " + (activeGames.starcraft ? "active" : "")}
                        onClick={() => setActiveGames({...activeGames, starcraft: !activeGames.starcraft})}>
                            <img src={starcraft_icon} class="main-page-filter-game-icon"/>
                        </button>
                        <button className={"btn btn-main-page-game-icon-filter right " + (activeGames.rainbowsix ? "active" : "")}
                        onClick={() => setActiveGames({...activeGames, rainbowsix: !activeGames.rainbowsix})}>
                            <img src={rainbowsix_icon} class="main-page-filter-game-icon"/>
                        </button>
                    </div>
                </div>
                <div class="event-filter-dropdown">
                    <DropdownUsingAPI options={props.cleanedNames} allowOther={true} otherName="Any"/>
                </div>
            </EventPreviewSection>
            <Modal title="Test Event" isOpen={isModalOpen} setIsOpen={setIsModalOpen}>
                <HostForm/>
            </Modal>
        </div>
    );
}

function clean_pagename(pagename) {
    var one = pagename.replaceAll("/", " ");
    var two = one.replaceAll("_", " ");
    return two;
}


export default function MainPage() {
    const {isAuthenticated} = useAuth0();
    const [upcoming_events, setUpcomingEvents] = useState({});
    var cleaned_event_names = [];
    if (!isAuthenticated) {
        return <Landing />;
    }

    var cleaned_names = []
    let gameCodeToName = {
        "counterstrike": "CSGO",
        "dota2": "DOTA",
        "leagueoflegends": "LoL",
        "rainbowsix": "R6",
        "starcraft2": "SC2",
        "valorant": "VAL"
    };
    for (var game_code in upcoming_events) {
        upcoming_events[game_code].forEach((event, index) => {
            var opp1 = event["opponent1"];
            var opp2 = event["opponent2"];
            var pagename = event["pagename"]
            var event_name = [gameCodeToName[game_code], "-", opp1, "vs.", opp2, ":", clean_pagename(pagename)];
            cleaned_names.push(event_name.reduce(function(pre, next) {
                return pre + ' ' + next;
            }));
        });
    }

    return  (
        <div>
            <MainPageMainArea setUpcomingEvents={setUpcomingEvents} cleanedNames={cleaned_names}/>
        </div>
    );
}
