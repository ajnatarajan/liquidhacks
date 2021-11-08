import logo from '../assets/logo.svg';
import {
  Link,
  useHistory,
} from 'react-router-dom';
import './Host.css';
import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function Host() {
  const [fields, setFields] = useState({
    eventName: "",
    eventLocation: "",
    eventTime: "", // TODO: Change to datetime format
    eventDate: "", // TODO: Change to datetime format
    firstName: "",
    lastName: "",
    email: "",
  });
  const [showForm, setShowForm] = useState(true); // true for debugging purpose
  const [isLoading, setIsLoading] = useState(false);

  /*
  function validateForm() {
    return (
      fields.email.length > 0 &&
      fields.password.length > 0 &&
      fields.password === fields.confirmPassword
    );
  }

  function validateConfirmationForm() {
    return fields.confirmationCode.length > 0;
  }
  */

  function handleHostButtonClick() {
    console.log(showForm);
    setShowForm(!showForm);
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setIsLoading(true);

    // setNewUser("test");

    setIsLoading(false);
  }

  function renderForm() {
    return (
      <Form onSubmit={handleSubmit}>
        <Form.Group className='mb-3 mx-3' controlId="eventName">
          <Form.Label>Event Name</Form.Label>
          <Form.Control
            autoFocus
            type="text"
            placeholder="Enter Event Name"
            value={fields.eventName}
            onChange={setFields}
          />
        </Form.Group>
        <Form.Group className='mb-3 mx-3' controlId="eventLocation">
          <Form.Label>Event Location</Form.Label>
          <Form.Control
            autoFocus
            type="text"
            value={fields.eventLocation}
            onChange={setFields}
          />
        </Form.Group>
        <Form.Group className='mb-3 mx-3' controlId="eventDate">
          <Form.Label>Event Date</Form.Label>
          <Form.Control
            autoFocus
            type="email"
            value={fields.eventDate}
            onChange={setFields}
          />
        </Form.Group>
        <Form.Group className='mb-3 mx-3' controlId="eventTime">
          <Form.Label>Event Time</Form.Label>
          <Form.Control
            type="password"
            value={fields.eventTime}
            onChange={setFields}
          />
        </Form.Group>
        <Form.Group className='mb-3 mx-3' controlId="firstName">
          <Form.Label>First Name</Form.Label>
          <Form.Control
            type="text"
            onChange={handleFieldChange}
            value={fields.firstName}
          />
        </Form.Group>
        <Form.Group className='mb-3 mx-3' controlId="lastName">
          <Form.Label>Last Name</Form.Label>
          <Form.Control
            type="text"
            onChange={handleFieldChange}
            value={fields.lastName}
          />
        </Form.Group>
        <Form.Group className='mb-3 mx-3' controlId="firstName">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            onChange={handleFieldChange}
            value={fields.email}
          />
        </Form.Group>
      </Form>
    );
  }
  
  return (
    <div className="Host">
      <div className="Host-header">
        <img src={logo} className="Host-logo" alt="logo" />
        <p>
          Currently on <code>src/routes/Host.js</code>.
        </p>
        <button
          type="button"
          className="host-button"
          onClick={handleHostButtonClick}>
            Click me!
        </button>
        <Link to='/' className='Host-link'>Return home</Link>
      </div>
      {showForm ? renderForm() : null}
    </div>
  );
}
