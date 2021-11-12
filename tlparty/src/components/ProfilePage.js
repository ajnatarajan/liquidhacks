import './ProfilePage.css'
import React, {useCallback, useState, useEffect} from 'react';
import {useNavigate} from 'react-router-dom';
import { useAuth0 } from "@auth0/auth0-react";
import 'bootstrap/dist/css/bootstrap.min.css';
import TopBar from './TopBar';
import EventPreviewSection from './EventPreviewSection';
import Landing from './Landing';


async function getUserEventsHelper(eventIds) {
    const events = []
    for await (const eventId of eventIds) {
        const eventParams = {'event_id': eventId}
        events.push(await fetch('/api/getEvent/',
        {
            method: "POST",
            body: new URLSearchParams(eventParams),
        }).then(response => response.json())
        .then(data => {return data['event']}));
    }
    return events;
}


async function getPastUserEvents(emailAddress, setPastEvents) {
    const params = {'email_address': emailAddress};
    const pastEventIds = await fetch('/api/getPastUserEvents/',
    {
        method: "POST",
        body: new URLSearchParams(params),
    }).then(response => response.json())
    .then(data => {return data['past_events']});

    setPastEvents(await getUserEventsHelper(pastEventIds));
}


async function getUpcomingUserEvents(emailAddress, setUpcomingEvents) {
    const params = {'email_address': emailAddress};
    const upcomingEventIds = await fetch('/api/getUpcomingUserEvents/',
    {
        method: "POST",
        body: new URLSearchParams(params),
    }).then(response => response.json())
    .then(data => {return data['upcoming_events']});

    setUpcomingEvents(await getUserEventsHelper(upcomingEventIds));
}


function MainProfilePage(props) {
    const navigate = useNavigate();
    const goToProfile = useCallback(() => navigate('/profile'), [navigate]);

    const [pastEvents, setPastEvents] = useState([]);
    const [upcomingEvents, setUpcomingEvents] = useState([]);

    const { user, logout } = props;

    useEffect(() => {
        getPastUserEvents(user.name, setPastEvents);
        getUpcomingUserEvents(user.name, setUpcomingEvents);
    }, [user.name]);

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
                <EventPreviewSection events={upcomingEvents} preview_section_title="My Upcoming Events" placeholder_text="No upcoming events!"/>
                <EventPreviewSection events={pastEvents} preview_section_title="Past Events" placeholder_text="No past events!"/>
            </div>
        </div>
    );
}

export default function ProfilePage(props) {
    const { logout, user, isAuthenticated } = useAuth0();
    if (!isAuthenticated) {
        return <Landing />
    }
    return <MainProfilePage {...props} user={user} logout={logout} />
}
