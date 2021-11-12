import './Login.css';
import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import OurButton from '../components/OurButton';
import TopBar from '../components/TopBar';
import { useAuth0 } from "@auth0/auth0-react";

function LoginForm() {
    const { loginWithRedirect } = useAuth0();

    return (
        <div className="login-form-container">
            <div className="login-title-text">
                Login
            </div>
            <div id="contact" className="login-info-outer-container">
                <form className="contact-us-form form-font">
                    <div className="mb-3">
                        <div className="form-group info-block">
                            <label for="email" className="input-label">Username:</label>
                            <input type="text" className="form-control info-input page-background-theme"/>
                        </div>
                    </div>
                    <div className="mb-3">
                        <div className="form-group info-block">
                            <label for="email" className="input-label">Email address:</label>
                            <input type="text" className="form-control info-input page-background-theme"/>
                        </div>
                    </div>
                    <div className="mb-3">
                        <div className="form-group info-block">
                            <label for="subject" className="input-label">Password:</label>
                            <input type="password" className="form-control info-input page-background-theme"/>
                        </div>
                    </div>
                    <div className="mb-3">
                        <OurButton onClick={() => loginWithRedirect()}>Log In</OurButton>
                    </div>
                </form>
            </div>
        </div>
    );
}


export default function Login() {
    return (
        <div className="page-background-theme" style={{
            minHeight: '100vh'
        }}>
            <TopBar button_text="Sign up"/>
            <LoginForm/>
        </div>
    );
}
