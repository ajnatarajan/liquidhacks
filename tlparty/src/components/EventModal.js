import './EventModal.css';
import React, { useState } from 'react';
import { Form, Col } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Formik } from 'formik';
import OurButton from '../components/OurButton';
import StaticTagList from './StaticTagList';

import user_icon from '../img/user_icon.svg';
import gamepad_icon from '../img/gamepad_icon.svg';
import location_icon from '../img/location_icon.svg';
import event_icon from '../img/event_icon.svg';
import date_icon from '../img/date_icon.svg';
import heart_icon from '../img/heart_icon.svg';
import snacks_icon from '../img/snacks_icon.svg';


export default function EventModal(props) {
    const [formFields, setFormFields] = useState({
        eventName: '',
        eventLocation: '',
        eventDateTime: new Date(), // TODO: Change to datetime format
        tags: [],
        tagInput: '',
        firstName: '',
        lastName: '',
        email: '',
        vaccinated: false,
    });

    const [showForm, setShowForm] = useState(false);

    function handleFormSubmit() {
        setTimeout(() => {
            alert('Submitted to the "database"');
        }, 500);
        console.log('Form fields', formFields);
    }

    function handleHostButtonClick() {
        setShowForm(!showForm);
    }

    function renderForm() {
        function dateToDayMonthTime(dateString) {
            var days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
            var months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
            const d = new Date(dateString);
            var dayName = days[d.getDay()];
            var month = months[d.getMonth()];
            var date = d.getDate();

            var strTime = d.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true });

            // return dayName + " " + month + " " + date + " @ " + strTime;
            return month + " " + date + " @ " + strTime;
        }

        return (
            <div className='host-form-container'>
            <Formik
                validateOnChange={false}
                validateOnBlur={false}
                onSubmit={handleFormSubmit}
                initialValues={formFields}
            >
            {({
                handleSubmit,
                handleChange,
                values,
                errors,
            }) => (

                <Form noValidate className='host-form my-3' onSubmit={handleSubmit}>
                    <div className="event-section">
                        <img className="event-section-icon" src={user_icon} />
                        <div className="event-section-text">
                            <div className="event-section-title">Host</div>
                            <div className="event-section-content">{props.host}</div>
                        </div>
                    </div>

                    <div className="event-section">
                        <img className="event-section-icon" src={gamepad_icon} />
                        <div className="event-section-text">
                            <div className="event-section-title">Game</div>
                            <div className="event-section-content">{props.game}</div>
                        </div>
                    </div>

                    <div className="event-section full">
                        <img className="event-section-icon" src={event_icon} />
                        <div className="event-section-text">
                            <div className="event-section-title">Event</div>
                            <div className="event-section-content">{props.liquipedia_pagename}</div>
                        </div>
                    </div>

                    <div className="event-section">
                        <img className="event-section-icon" src={location_icon} />
                        <div className="event-section-text">
                            <div className="event-section-title">Location</div>
                            <div className="event-section-content">{props.location}</div>
                        </div>
                    </div>

                    <div className="event-section">
                        <img className="event-section-icon" src={date_icon} />
                        <div className="event-section-text">
                            <div className="event-section-title">Date</div>
                            <div className="event-section-content">{dateToDayMonthTime(props.date)}</div>
                        </div>
                    </div>

                    <div className="event-section full">
                        <img className="event-section-icon" src={heart_icon} />
                        <div className="event-section-text">
                            <div className="event-section-title">Vibes</div>
                            <div className="event-section-content">
                                <StaticTagList tags={props.vibes}/>
                            </div>
                        </div>
                    </div>

                    <div className="event-section full">
                        <img className="event-section-icon" src={snacks_icon} />
                        <div className="event-section-text">
                            <div className="event-section-title">Snacks</div>
                            <div className="event-section-content">
                                <StaticTagList tags={props.snacks}/>
                            </div>
                        </div>
                    </div>

                    <Form.Group className="mb-3 vaccine-container" controlId="vaccinated">
                        <Form.Check
                            required
                            name="vaccinated"
                            label="I have received 2 doses of the COVID-19 vaccine"
                            className="host-form-input"
                            value={values.vaccinated}
                            onChange={handleChange}
                            isInvalid={!!errors.vaccinated}
                            feedback={errors.vaccinated}
                            feedbackType="invalid"
                        />
                    </Form.Group>

                    <div className='flexbox'>
                        <Form.Group className="event-text-input">
                            <Form.Control
                                autoFocus
                                type="text"
                                className="short-input-box"
                                name='firstName'
                                placeholder='What snack are you bringing?'
                                value={values.firstName}
                                onChange={(e) => {
                                    handleChange(e);
                                    setFormFields({...formFields, firstName: e.target.value});
                                }}
                                isInvalid={!!errors.firstName}
                            />
                            <Form.Control.Feedback className='host-form-error-msg' type='invalid'>{errors.firstName}</Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group className="event-submit">
                            <OurButton type="submit" onClick={handleSubmit}>Register</OurButton>
                        </Form.Group>
                    </div>
                </Form>
            )}
            </Formik>
            </div>
        );
    }

    return (
        renderForm()
    );
}
