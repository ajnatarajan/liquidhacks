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
    return (
        <div>
            {/* if you change returnTo, talk to Ajay. He needs to change something
            in his auth0 account otherwise this will break*/}
            <TopBar button_text="PROFILE" on_click={goToProfile} button_text_2="LOG OUT" on_click_2={() => logout({ returnTo: "http://localhost:3000" })}/>
            <div class="page-background-theme">
                <UserInformation
                    title="Profile"
                    submit_text="Update Information"
                    placeholder_name={props.user_name}
                    placeholder_email={user.email}
                    placeholder_phone={props.user_phone}
                />
                <EventPreviewSection preview_section_title="My Upcoming Events"/>
                <EventPreviewSection preview_section_title="Past Events"/>
            </div>
        </div>
    );
}