import './EventModal.css';
import React, { useState } from 'react';
import { Form } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Formik } from 'formik';
import * as Yup from 'yup';
import OurButton from '../components/OurButton';
import StaticTagList from './StaticTagList';
import FormData from 'form-data';
import TagList from '../components/TagList'

import user_icon from '../img/user_icon.svg';
import gamepad_icon from '../img/gamepad_icon.svg';
import location_icon from '../img/location_icon.svg';
import event_icon from '../img/event_icon.svg';
import date_icon from '../img/date_icon.svg';
import heart_icon from '../img/heart_icon.svg';
import snacks_icon from '../img/snacks_icon.svg';
import { useAuth0 } from "@auth0/auth0-react";

const KeyCodes = {
    comma: 188,
    enter: [10, 13],
};

const delimiters = [...KeyCodes.enter, KeyCodes.comma];


export default function EventModal(props) {
    const { user } = useAuth0();
    const [formFields, setFormFields] = useState({
        snacks: [],
        snacksInput: '',
        vaccinated: false,
    });

    const formSchema = Yup.object().shape({
        vaccinated: Yup.bool().required().oneOf([true], 'Vaccination is required to keep TL fans safe :)'),
    })

    const [isKeyReleased, setIsKeyReleased] = useState(true);

    function handleDeleteSnack(index) {
        setFormFields({...formFields, snacks: formFields.snacks.filter((snack, i) => i !== index)});
    }

    function handleSnacksInput(e) {
        setFormFields({...formFields, snacksInput: e.target.value});
    }
    
    function handleSnacksInputKeyDown(e) {
        const trimmedInput = formFields.snacksInput.trim();
        if (delimiters.includes(e.keyCode) && trimmedInput.length && !formFields.snacks.includes(trimmedInput)) {
            e.preventDefault();
            setFormFields({...formFields, snacks: [...formFields.snacks, trimmedInput], snacksInput: ''});
        }

        if (e.key === "Backspace" && !formFields.snacksInput.length && formFields.snacks.length && isKeyReleased) {
            e.preventDefault();
            const snacksCopy = [...formFields.snacks];
            const poppedSnack = snacksCopy.pop();

            setFormFields({...formFields, snacks: snacksCopy, snacksInput: poppedSnack});
            console.log('popping');
        }

        setIsKeyReleased(false);
    }

    function handleSnacksInputKeyUp() {
        setIsKeyReleased(true);
    }

    function handleClearSnacks() {
        setFormFields({...formFields, snacks: []});
    }

    async function addUser(user_email) {
        const formData = new FormData()
        formData.append("email_address", user_email);
        formData.append("first_name", "dummy");
        formData.append("last_name", "dummy");
        formData.append("phone_number", "dummy");
        formData.append("is_vaccinated", "True");

        const requestOptions = {
            method: "POST",
            body: formData,
        }
        const response = await fetch('/api/addUser/', requestOptions);
        console.log("added user: ", user_email);
        console.log(response.status, "FIRST RESPONSE");
        if (!(response.status === 200 || response.status === 201)) {
            alert("Something unexpected happened :(. Please try again");
        }
    }

    async function addUserEvent(user_email, event_id) {
        const formData = new FormData()
        formData.append("email_address", user_email);
        formData.append("event_id", event_id);

        const requestOptions = {
            method: "POST",
            body: formData,
        }

        const response = await fetch('/api/addUserEvent/', requestOptions);
        console.log("added user event: ", user_email, event_id);
        console.log(response.status, "USER EVENT RESPONSE");
        if (!(response.status === 200 || response.status === 201)) {
            alert("Something unexpected happened :(. Please try again");
        }

    }

    async function handleFormSubmitForReal() {
        
        const formData = new FormData();
        formData.append("event_id", props.eventId);
        console.log('attendees', props.numAttendees)
        formData.append("num_attendees", parseInt(props.numAttendees) + 1);
        formData.append("snacks", "{" + Array.from(new Set([...props.snacks, ...formFields.snacks])).toString() + "}");

        const requestOptions = {
            method: "POST",
            body: formData,
        }

        await addUser(user.email);

        await addUserEvent(user.email, props.eventId);

        const response = await fetch('/api/editEvent/', requestOptions);
        console.log(response.status, "SECOND RESPONSE");
        if (response.status === 200 || response.status === 201) {
            props.setIsOpen(false);
            alert("You're on the list! Party on 🎉");
        } else {
            // Something happened o_o
            alert("Something unexpected happened :(. Please try again");
        }
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
            <div className='event-modal-container'>
            <Formik
                validationSchema={formSchema}
                validateOnChange={false}
                validateOnBlur={false}
                onSubmit={handleFormSubmitForReal}
                initialValues={formFields}
            >
            {({
                handleSubmit,
                handleChange,
                values,
                errors,
            }) => (
                <Form noValidate className='event-modal my-3' onSubmit={handleSubmit}>
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
                            className="event-modal-input"
                            value={values.vaccinated}
                            onChange={(e) => {
                                handleChange(e);
                                setFormFields({...formFields, vaccinated: !formFields.vaccinated})
                            }}
                            isInvalid={!!errors.vaccinated}
                            feedback={errors.vaccinated}
                            feedbackType="invalid"
                        />
                    </Form.Group>

                    <div className='event-modal-flexbox'>
                        <Form.Group className="event-text-input">
                            <TagList
                                className='event-modal-tags'
                                tags={formFields.snacks}
                                input={formFields.snacksInput}
                                deleteTag={handleDeleteSnack}
                                onChange={handleSnacksInput}
                                onKeyDown={handleSnacksInputKeyDown}
                                onKeyUp={handleSnacksInputKeyUp}
                                clearTags={handleClearSnacks}
                                placeholder='Bringing any snacks? 😎'
                            />
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
