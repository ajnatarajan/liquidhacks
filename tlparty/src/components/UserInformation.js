import './UserInformation.css'
import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import OurButton from './OurButton';

export default function UserInformation(props) {
    return (
        <div>
            <div className="profile-title-text">
                {props.title}
            </div>
            <div id="contact" className="profile-info-outer-container">
                <form className="contact-us-form form-font">
                    <div className="mb-3">
                        <div className="form-group info-block">
                            <label for="name" className="input-label">Name:</label>
                            <input type="name" className="form-control info-input page-background-theme" id="user-name" placeholder={props.placeholder_name}/>
                        </div>
                    </div>
                    <div className="mb-3">
                        <div className="form-group info-block">
                            <label for="email" className="input-label">Email address:</label>
                            <input type="email" className="form-control info-input page-background-theme" id="user-email" placeholder={props.placeholder_email} disabled/>
                        </div>
                    </div>
                    <div className="mb-3">
                        <div className="form-group info-block">
                            <label for="subject" className="input-label">Phone Number:</label>
                            <input type="subject" className="form-control info-input page-background-theme" id="user-phone" placeholder={props.placeholder_phone}/>
                        </div>
                    </div>
                    <div className="mb-3">
                        <div className="form-group info-block">
                        <div className="form-check">
                            <input className="form-check-input" type="checkbox" value="" id="flexCheckChecked" checked/>
                            <label className="form-check-label input-label" for="flexCheckChecked">
                                I have received 2 doses of the COVID-19 Vaccine
                            </label>
                        </div>
                        </div>
                    </div>
                    <div className="mb-3">
                        <OurButton type='button' onClick={null}>{props.submit_text}</OurButton>
                    </div>
                </form>
            </div>
        </div>
    );
}