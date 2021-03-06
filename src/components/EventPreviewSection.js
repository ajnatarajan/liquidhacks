import './EventPreviewSection.css'
import EventPreview from './EventPreview';

export default function EventPreviewSection(props) {

    const dbGameCodeToEnglish = {
        "leagueoflegends": "League of Legends",
        "valorant": "Valorant",
        "dota2": "Dota 2",
        "starcraft2": "Starcraft 2",
        "counterstrike": "Counter-Strike: Global Offensive",
        "rainbowsix": "Rainbow Six",
    }

    const { events } = props;
    
    return (
        <div className="event-listing-container">
            <div className="event-listing-title">
                {props.preview_section_title}
            </div>
            {props.children}
            <div className="event-listing-container-inner">
                {
                    (events.length > 0) ?
                    events.map(event => {
                        return (<EventPreview
                            key={event["event_id"]}
                            title={event["event_name"]}
                            game={dbGameCodeToEnglish[event["video_game"]]}
                            num_attendees={event["num_attendees"]}
                            date={event["date_time"].split(" ")[0]}
                            event_pic={event["image"]}
                            full_event={event} // need it for the modal
                        />)
                    }) :
                    <span style={{display: "inline-block"}} className="square empty">{props.placeholder_text}</span>
                }
                {/* <EventPreview title="LCS Opening Day Party" game="Valorant" num_attendees="12" date="Friday November 12" event_pic="tledm"/>
                <EventPreview title="LCS Opening Day Party" game="Valorant" num_attendees="12" date="Friday November 12" event_pic="tlvsmad"/>
                <EventPreview title="LCS Opening Day Party" game="Valorant" num_attendees="12" date="Friday November 12" event_pic="tledm"/>
                <EventPreview title="LCS Opening Day Party" game="Valorant" num_attendees="12" date="Friday November 12" event_pic="tlvsmad"/> */}
            </div>
        </div>
    );
}
