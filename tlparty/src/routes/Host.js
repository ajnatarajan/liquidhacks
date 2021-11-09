import './Host.css';
import React, { useState } from 'react';
import { Form, Row, Col, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Formik } from 'formik';
import * as Yup from 'yup';
import OurButton from '../components/OurButton';


export default function Host() {
  const [formFields, setFormFields] = useState({
    eventName: '',
    eventLocation: '',
    eventTime: new Date(), // TODO: Change to datetime format
    eventDate: new Date(), // TODO: Change to datetime format
    firstName: '',
    lastName: '',
    email: '',
    terms: false,
  });

  const formSchema = Yup.object().shape({
    eventName: Yup.string().required('Event name is a required field'),
    eventLocation: Yup.string().required('Event location is a required field'),
    eventTime: Yup.date().required('Event time is a required field'),
    eventDate: Yup.date().required('Event date is a required field'),
    firstName: Yup.string().required('First name is a required field'),
    lastName: Yup.string().required('Last name is a required field'),
    email: Yup.string().email().required('Email is a required field'),
    terms: Yup.bool().required().oneOf([true], 'Terms must be accepted'),
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
    return (
      <div className='host-form-container'>
        <Formik
          validationSchema={formSchema}
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
              <Form.Label className="mt-3 host-form-title">Event Details</Form.Label>
              <Form.Group className='mb-3' controlId="eventName">
                <Form.Label className="host-form-label">Event Name</Form.Label>
                <Form.Control
                  autoFocus
                  type="text"
                  className="host-form-input"
                  name='eventName'
                  placeholder='Event Name'
                  value={values.eventName}
                  onChange={(e) => {
                    handleChange(e);
                    setFormFields({...formFields, eventName: e.target.value});
                  }}
                  isInvalid={!!errors.eventName}
                />
                <Form.Control.Feedback className='host-form-error-msg' type='invalid'>{errors.eventName}</Form.Control.Feedback>
              </Form.Group>
              <Form.Group className='mb-3' controlId="eventLocation">
                <Form.Label className="host-form-label">Event Location</Form.Label>
                <Form.Control
                  autoFocus
                  type="text"
                  className="host-form-input"
                  name='eventLocation'
                  placeholder='Event Location'
                  value={values.eventLocation}
                  onChange={(e) => {
                    handleChange(e);
                    setFormFields({...formFields, eventLocation: e.target.value});
                  }}
                  isInvalid={!!errors.eventLocation}
                />
                <Form.Control.Feedback className='host-form-error-msg' type='invalid'>{errors.eventLocation}</Form.Control.Feedback>
              </Form.Group>
              <Row className="mb-3">
                <Form.Group as={Col} controlId="eventDate">
                  <Form.Label className="host-form-label">Event Date</Form.Label>
                  <Form.Control
                    autoFocus
                    type="date"
                    className="host-form-input"
                    name='eventDate'
                    placeholder='Event Date'
                    value={values.eventDate}
                    onChange={(e) => {
                      handleChange(e);
                      setFormFields({...formFields, eventDate: e.target.value});
                    }}
                    isInvalid={!!errors.eventDate}
                  />
                  <Form.Control.Feedback className='host-form-error-msg' type='invalid'>{errors.eventDate}</Form.Control.Feedback>
                </Form.Group>
                <Form.Group as={Col} controlId="eventTime">
                  <Form.Label className="host-form-label">Event Time</Form.Label>
                  <Form.Control
                    autoFocus
                    type="time"
                    className="host-form-input"
                    name='eventTime'
                    placeholder='Event Time'
                    value={values.eventTime}
                    onChange={(e) => {
                      handleChange(e);
                      setFormFields({...formFields, eventTime: e.target.value});
                    }}
                    isInvalid={!!errors.eventTime}
                  />
                  <Form.Control.Feedback className='host-form-error-msg' type='invalid'>{errors.eventTime}</Form.Control.Feedback>
                </Form.Group>
              </Row>
              <Form.Label className="mt-3 host-form-title">Contact Information</Form.Label>
              <Row className="mb-3">
                <Form.Group as={Col} controlId="firstName">
                  <Form.Label className="host-form-label">First Name</Form.Label>
                  <Form.Control
                    autoFocus
                    type="text"
                    className="host-form-input"
                    name='firstName'
                    placeholder='First Name'
                    value={values.firstName}
                    onChange={(e) => {
                      handleChange(e);
                      setFormFields({...formFields, firstName: e.target.value});
                    }}
                    isInvalid={!!errors.firstName}
                  />
                  <Form.Control.Feedback className='host-form-error-msg' type='invalid'>{errors.firstName}</Form.Control.Feedback>
                </Form.Group>
                <Form.Group as={Col} controlId="lastName">
                  <Form.Label className="host-form-label">Last Name</Form.Label>
                  <Form.Control
                    autoFocus
                    type="text"
                    className="host-form-input"
                    name='lastName'
                    placeholder='Last Name'
                    value={values.lastName}
                    onChange={(e) => {
                      handleChange(e);
                      setFormFields({...formFields, lastName: e.target.value});
                    }}
                    isInvalid={!!errors.lastName}
                  />
                  <Form.Control.Feedback className='host-form-error-msg' type='invalid'>{errors.lastName}</Form.Control.Feedback>
                </Form.Group>
              </Row>
              <Form.Group className='mb-3' controlId="email">
                <Form.Label className="host-form-label">Email</Form.Label>
                <Form.Control
                  autoFocus
                  type="email"
                  className="host-form-input"
                  name='email'
                  placeholder='Email'
                  value={values.email}
                  onChange={(e) => {
                    handleChange(e);
                    setFormFields({...formFields, email: e.target.value});
                  }}
                  isInvalid={!!errors.email}
                />
                <Form.Control.Feedback className='host-form-error-msg' type='invalid'>{errors.email}</Form.Control.Feedback>
              </Form.Group>
              <Form.Group className="mb-3" controlId="terms">
                <Form.Check
                  required
                  name="terms"
                  label="Agree to terms and conditions"
                  className="host-form-input"
                  value={values.terms}
                  onChange={handleChange}
                  isInvalid={!!errors.terms}
                  feedback={errors.terms}
                  feedbackType="invalid"
                />
              </Form.Group>
              <OurButton type="submit" onClick={handleSubmit}>Submit</OurButton>
            </Form>
          )}
        </Formik>
      </div>
    );
  }


  return (

    <div className="Host">
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        backgroundColor: 'black',
        color: 'white'}}>
        <div className='my-3'>
          <OurButton type='button' onClick={handleHostButtonClick}>
            Host a watch party!
          </OurButton>
        </div>
      </div>
      {showForm ? renderForm() : null}
    </div>
  );
}