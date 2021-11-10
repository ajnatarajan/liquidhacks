import './EventPreviewSection.css'
import UserInformation from './UserInformation';
import TopBar from './TopBar';
import EventPreview from './EventPreview';

export default function EventPreviewSection(props) {
    return (
        <div class="event-listing-container">
            <div class="event-listing-title">
                {props.preview_section_title}
            </div>
            {props.children}
            <div class="event-listing-container-inner">
                <EventPreview title="LCS Opening Day Party" game="Valorant" num_attendees="12" date="Friday November 12" event_pic="tledm"/>
                <EventPreview title="LCS Opening Day Party" game="Valorant" num_attendees="12" date="Friday November 12" event_pic="tlvsmad"/>
                <EventPreview title="LCS Opening Day Party" game="Valorant" num_attendees="12" date="Friday November 12" event_pic="tledm"/>
                <EventPreview title="LCS Opening Day Party" game="Valorant" num_attendees="12" date="Friday November 12" event_pic="tlvsmad"/>
            </div>
        </div>
    );
}
