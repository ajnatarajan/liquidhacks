import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import TopBar from './TopBar';
import OurButton from './OurButton'
import './MainPage.css'
import EventPreviewSection from './EventPreviewSection';
import valorant_icon from '../img/valorant_icon.png';
import league_icon from '../img/league_icon.png';
import csgo_icon from '../img/csgo_icon.png';
import dota_icon from '../img/dota_icon.png';
import pubg_icon from '../img/pubg_icon.png';
import smash_icon from '../img/smash_icon.png';

export default function MainPage() {

    return (
        <div class="page-background-theme" style={{height: '100vh'}}>
            <TopBar button_text="Profile"/>
            <EventPreviewSection preview_section_title="Events Near You">
                <div class="game-filter-text-and-menu-bar">
                    <div class="main-page-game-text">
                        Filter by game
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
                            <img src={pubg_icon} class="main-page-filter-game-icon"/>
                        </button>
                        <button className="btn btn-main-page-game-icon-filter right">
                            <img src={smash_icon} class="main-page-filter-game-icon"/>
                        </button>
                    </div>
                </div>
            </EventPreviewSection>
        </div>
    );
}
