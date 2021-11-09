import './Login.css';
import React, { useState } from 'react';
import { Form, Row, Col, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Formik } from 'formik';
import * as Yup from 'yup';
import OurButton from '../components/OurButton';
import TopBar from '../components/TopBar';


function LoginForm(props) {
    return (
        <div class="login-form-container">
            <div class="login-title-text">
                {props.title}
            </div>
            <div id="contact" class="login-info-outer-container">
                <form class="contact-us-form form-font">
                    <div class="mb-3">
                        <div class="form-group info-block">
                            <label for="email" class="input-label">Email address:</label>
                            <input type="email" class="form-control info-input page-background-theme" />
                        </div>
                    </div>
                    <div class="mb-3">
                        <div class="form-group info-block">
                            <label for="subject" class="input-label">Password:</label>
                            <input type="subject" class="form-control info-input page-background-theme" />
                        </div>
                    </div>
                    <div class="mb-3">
                        <OurButton type='button' onClick={null}>{props.submit_text}</OurButton>
                    </div>
                </form>
            </div>
        </div>
    );
}


export default function Login() {
    return (
        <div class="page-background-theme" style={{
            height: '100vh'
        }}>
            <TopBar button_text="Sign up"/>
            <LoginForm title="Login" submit_text="Submit"/>
        </div>
    );
}
