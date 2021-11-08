import './ProfilePage.css'
import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import UserInformation from './UserInformation';
import TopBar from './TopBar';
import EventPreviewSection from './EventPreviewSection';

export default function ProfilePage(props) {
    return (
        <div>
            <TopBar button_text="Profile"/>
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