import './Login.css';
import React, { useState } from 'react';
import { Form, Row, Col, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Formik } from 'formik';
import * as Yup from 'yup';
import OurButton from '../components/OurButton';
import TopBar from '../components/TopBar';
import { useAuth0 } from "@auth0/auth0-react";

function LoginForm() {
    const { loginWithRedirect } = useAuth0();

    return (
        <div class="login-form-container">
            <div class="login-title-text">
                Login
            </div>
            <div id="contact" class="login-info-outer-container">
                <form class="contact-us-form form-font">
                    <div class="mb-3">
                        <div class="form-group info-block">
                            <label for="email" class="input-label">Username:</label>
                            <input type="text" class="form-control info-input page-background-theme"/>
                        </div>
                    </div>
                    <div class="mb-3">
                        <div class="form-group info-block">
                            <label for="email" class="input-label">Email address:</label>
                            <input type="text" class="form-control info-input page-background-theme"/>
                        </div>
                    </div>
                    <div class="mb-3">
                        <div class="form-group info-block">
                            <label for="subject" class="input-label">Password:</label>
                            <input type="password" class="form-control info-input page-background-theme"/>
                        </div>
                    </div>
                    <div class="mb-3">
                        <OurButton onClick={() => loginWithRedirect()}>Log In</OurButton>
                    </div>
                </form>
            </div>
        </div>
    );
}


export default function Login() {
    return (
        <div class="page-background-theme" style={{
            minHeight: '100vh'
        }}>
            <TopBar button_text="Sign up"/>
            <LoginForm/>
        </div>
    );
}
