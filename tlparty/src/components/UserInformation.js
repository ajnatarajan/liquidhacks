import './UserInformation.css'
import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import OurButton from './OurButton';

class UserInformation extends React.Component {
    render() {
        return (
            <div>
                <div class="profile-title-text">
                    {this.props.title}
                </div>
                <div id="contact" class="profile-info-outer-container">
                    <form class="contact-us-form form-font">
                        <div class="mb-3">
                            <div class="form-group info-block">
                                <label for="name" class="input-label">Name:</label>
                                <input type="name" class="form-control info-input page-background-theme" id="user-name" placeholder={this.props.placeholder_name}/>
                            </div>
                        </div>
                        <div class="mb-3">
                            <div class="form-group info-block">
                                <label for="email" class="input-label">Email address:</label>
                                <input type="email" class="form-control info-input page-background-theme" id="user-email" placeholder={this.props.placeholder_email}/>
                            </div>
                        </div>
                        <div class="mb-3">
                            <div class="form-group info-block">
                                <label for="subject" class="input-label">Phone Number:</label>
                                <input type="subject" class="form-control info-input page-background-theme" id="user-phone" placeholder={this.props.placeholder_phone}/>
                            </div>
                        </div>
                        <div class="mb-3">
                            <div class="form-group info-block">
                            <div class="form-check">
                                <input class="form-check-input" type="checkbox" value="" id="flexCheckChecked" checked/>
                                <label class="form-check-label input-label" for="flexCheckChecked">
                                    I have received 2 doses of the COVID-19 Vaccine
                                </label>
                            </div>
                            </div>
                        </div>
                        <div class="mb-3">
                            <OurButton text={this.props.submit_text}/>
                        </div>
                    </form>
                </div>
            </div>
        );
    }
}

export default UserInformation;