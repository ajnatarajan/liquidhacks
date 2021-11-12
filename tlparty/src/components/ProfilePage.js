import './ProfilePage.css'
import React, {useCallback} from 'react';
import {useNavigate} from 'react-router-dom';
import { useAuth0 } from "@auth0/auth0-react";
import 'bootstrap/dist/css/bootstrap.min.css';
import UserInformation from './UserInformation';
import TopBar from './TopBar';
import EventPreviewSection from './EventPreviewSection';
import Landing from './Landing';

export default function ProfilePage(props) {
    const { logout, user, isAuthenticated } = useAuth0();
    const navigate = useNavigate();
    const goToProfile = useCallback(() => navigate('/profile'), [navigate]);
    if (!isAuthenticated) {
        return <Landing />
    }
    // user.name contains email_address
    // need pastEvents and upcomingEvents
    const pastEvents = [];
    const upcomingEvents = [];
    const params = {'email_address': user.name}
    console.log('params', params);
    console.log(fetch('/testapp/getPastUserEvents/', {
        body: new URLSearchParams(params),
        method: 'post',
    }));


    return (
        <div className="page-background-theme" style={{minHeight: '100vh'}}>
            {/* if you change returnTo, talk to Ajay. He needs to change something
            in his auth0 account otherwise this will break*/}
            <TopBar button_text="PROFILE" on_click={goToProfile} button_text_2="LOG OUT" on_click_2={() => logout({ returnTo: "http://localhost:3000" })}/>
            <div>
                {/* <UserInformation
                    title="Profile"
                    submit_text="Update Information"
                    placeholder_name={props.user_name}
                    placeholder_email={user.email}
                    placeholder_phone={props.user_phone}
                /> */}
                <h1 style={{color: 'white'}}>Welcome {user.name}</h1>
                <EventPreviewSection events={pastEvents} preview_section_title="My Upcoming Events"/>
                <EventPreviewSection events={upcomingEvents} preview_section_title="Past Events"/>
            </div>
        </div>
    );
}
