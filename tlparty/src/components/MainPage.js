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
import EventModal from './EventModal';

function getTodayInProperForm() {
    const today = new Date();
    const year = today.getFullYear();
    const month = today.getMonth() + 1;
    const day = today.getDate();
    const hour = today.getHours();
    const minute = today.getMinutes();
    const second = today.getSeconds();

    const dateString = year + "-" + month + "-" + day + " " + hour + ":" + minute + ":" + second;
    return dateString;
}
// This is for events from LIQUIPEDIA DB (NOT events that our users make)
function getUpcomingEvents(upcoming_dictionary, game, setFunction) { // make our Liquipedia DB call here and store it
    const FormData = require('form-data');
    const fs = require('fs');
    require('dotenv').config();

    const formData = new FormData();
    var date_condition = "[[date::>" + getTodayInProperForm() + "]]";
    formData.append("apikey", process.env.REACT_APP_API_KEY);
    formData.append("wiki", game);
    formData.append("limit", 10);
    formData.append("conditions", "([[opponent1::Team Liquid]] OR [[opponent2::Team Liquid]]) AND " + date_condition);

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
        setFunction({...upcoming_dictionary});
    });
}

function getAllUpcomingParties(setAllUpcomingParties) {
    fetch('/testapp/getAllEvents/',
    {
        method: "GET"
    }).then(response => response.json())
    .then(data => {
        data["events"].sort()
        setAllUpcomingParties(data["events"])
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
    const [dropdownSelection, setDropdownSelection] = useState("Any");
    const { logout } = useAuth0();
    const navigate = useNavigate();
    const goToProfile = useCallback(() => navigate('/profile'), [navigate]);
    const { setUpcomingEvents, setAllUpcomingParties } = props;
    const [activeGames, setActiveGames] = useState({
        valorant: true,
        leagueoflegends: true,
        dota2: true,
        starcraft2: true,
        rainbowsix: true,
        counterstrike: true,
    });

    // Fetch the most recent API data every time the main page is reloaded
    useEffect(() => {
        let upcoming_dictionary = {};
        var games = ["leagueoflegends", "valorant", "dota2", "starcraft2","counterstrike","rainbowsix"];
        for(let i=0; i < games.length; i++) {
            getUpcomingEvents(upcoming_dictionary, games[i], setUpcomingEvents);
        }
        getAllUpcomingParties(setAllUpcomingParties);
    }, []);

    // console.log("Upcoming Parties: ", props.upcomingParties);
    // console.log("Dropdown Selection: ", dropdownSelection);

    let filteredParties = [];
    for (const party of props.upcomingParties) {
        if (activeGames[party.video_game] && (dropdownSelection == "Any" || dropdownSelection == party.game)) {
            filteredParties.push(party);
        }
    }

    props.cleanedNames.sort();

    return (
        <div className="page-background-theme" style={{minHeight: '100vh'}}>
            {/* if you change returnTo, talk to Ajay. He needs to change something
            in his auth0 account otherwise this will break*/}
            <TopBar button_text="PROFILE" on_click={goToProfile} button_text_2="LOG OUT" on_click_2={() => logout({ returnTo: "http://localhost:3000" })}/>
            <EventPreviewSection preview_section_title="Events Near You" events={filteredParties}>
                <OurButton type="button" onClick={openModal}> I want to host! </OurButton>

                <div className="game-filter-text-and-menu-bar">
                    <div className="main-page-game-text">
                        FILTER BY GAME
                    </div>
                    <div className="game-filter-menu-bar">
                        <button className={"btn btn-main-page-game-icon-filter left " + (activeGames.valorant ? "active" : "")}
                        onClick={() => setActiveGames({...activeGames, valorant: !activeGames.valorant})}>
                            <img src={valorant_icon} className="main-page-filter-game-icon"/>
                        </button>
                        <button className={"btn btn-main-page-game-icon-filter " + (activeGames.leagueoflegends ? "active" : "")}
                        onClick={() => setActiveGames({...activeGames, leagueoflegends: !activeGames.leagueoflegends})}>
                            <img src={league_icon} className="main-page-filter-game-icon"/>
                        </button>
                        <button className={"btn btn-main-page-game-icon-filter " + (activeGames.dota2 ? "active" : "")}
                        onClick={() => setActiveGames({...activeGames, dota2: !activeGames.dota2})}>
                            <img src={dota_icon} className="main-page-filter-game-icon"/>
                        </button>
                        <button className={"btn btn-main-page-game-icon-filter " + (activeGames.starcraft2 ? "active" : "")}
                        onClick={() => setActiveGames({...activeGames, starcraft2: !activeGames.starcraft2})}>
                            <img src={starcraft_icon} className="main-page-filter-game-icon"/>
                        </button>
                        <button className={"btn btn-main-page-game-icon-filter " + (activeGames.rainbowsix ? "active" : "")}
                        onClick={() => setActiveGames({...activeGames, rainbowsix: !activeGames.rainbowsix})}>
                            <img src={rainbowsix_icon} className="main-page-filter-game-icon"/>
                        </button>
                        <button className={"btn btn-main-page-game-icon-filter right " + (activeGames.counterstrike ? "active" : "")}
                        onClick={() => setActiveGames({...activeGames, counterstrike: !activeGames.counterstrike})}>
                            <img src={csgo_icon} className="main-page-filter-game-icon"/>
                        </button>
                    </div>
                </div>
                <div className="event-filter-dropdown">
                    <DropdownUsingAPI
                        options={props.cleanedNames}
                        allowOther={true}
                        otherName="Any"
                        selection={dropdownSelection}
                        setSelection={setDropdownSelection}
                    />
                </div>
            </EventPreviewSection>
            <Modal
                isOpen={isModalOpen}
                setIsOpen={setIsModalOpen}
                title="Host an Event"
            >
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
    const [all_upcoming_parties, setAllUpcomingParties] = useState([]);
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
            <MainPageMainArea
                setUpcomingEvents={setUpcomingEvents}
                cleanedNames={cleaned_names}
                setAllUpcomingParties={setAllUpcomingParties}
                upcomingParties={all_upcoming_parties}
            />
        </div>
    );
}
