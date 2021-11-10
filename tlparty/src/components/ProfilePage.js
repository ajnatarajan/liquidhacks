import './ProfilePage.css'
import React, {useState} from 'react';
import { useAuth0 } from "@auth0/auth0-react";
import Login from '../routes/Login';
import 'bootstrap/dist/css/bootstrap.min.css';
import UserInformation from './UserInformation';
import TopBar from './TopBar';
import EventPreviewSection from './EventPreviewSection';
import Landing from './Landing';

export default function ProfilePage(props) {
    const { logout, isAuthenticated } = useAuth0();
    if (!isAuthenticated) {
        return <Landing />
    }
    
    return (
        <div>
            <TopBar button_text="PROFILE" button_text_2="LOG OUT" on_click_2={() => logout({ returnTo: "http://localhost:3000" })}/>
            <div class="page-background-theme">
                <UserInformation
                    title="Profile"
                    submit_text="Update Information"
                    placeholder_name={props.user_name}
                    placeholder_email={props.user_email}
                    placeholder_phone={props.user_phone}
                />
                <EventPreviewSection preview_section_title="My Upcoming Events"/>
                <EventPreviewSection preview_section_title="Past Events"/>
            </div>
        </div>
    );
}