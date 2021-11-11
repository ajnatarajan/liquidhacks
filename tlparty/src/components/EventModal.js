import './EventModal.css';
import React, { useState } from 'react';
import { Form, Row, Col } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Formik } from 'formik';
import OurButton from '../components/OurButton';
import StaticTagList from './StaticTagList';

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
              <Form.Label className="mt-3 host-form-title">{props.name}</Form.Label>
              <Form.Group className='mb-3'>
                <Form.Label className="host-form-label">Host: {props.host}</Form.Label>
              </Form.Group>
              <Form.Group className='mb-3'>
                <Form.Label className="host-form-label">Game: {props.game}</Form.Label>
              </Form.Group>
              <Form.Group className='mb-3'>
                <Form.Label className="host-form-label">Location: {props.location}</Form.Label>
              </Form.Group>
              <Form.Group className='mb-3'>
                <Form.Label className="host-form-label">Date: {props.date}</Form.Label>
              </Form.Group>

              <Form.Group className='mb-3'>
                <Form.Label className="host-form-label">Vibes:</Form.Label>
                <Form.Label className="host-form-tags"> <StaticTagList tags={props.vibes}/> </Form.Label>
              </Form.Group>

              <Form.Group className='mb-3'>
                <Form.Label className="host-form-label">Snacks:</Form.Label>
                <Form.Label className="host-form-tags"> <StaticTagList tags={props.snacks}/> </Form.Label>
              </Form.Group>
              
              <Form.Group className="mb-3" controlId="vaccinated">
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

            <div class='flexbox'>
                <Form.Group as={Col} md={9}>
                    <Form.Control
                        autoFocus
                        type="text"
                        className="short-input-box"
                        name='firstName'
                        placeholder='Bringing a snack?'
                        value={values.firstName}
                        onChange={(e) => {
                        handleChange(e);
                        setFormFields({...formFields, firstName: e.target.value});
                        }}
                        isInvalid={!!errors.firstName}
                    />
                    <Form.Control.Feedback className='host-form-error-msg' type='invalid'>{errors.firstName}</Form.Control.Feedback>
                </Form.Group>
                <Form.Group as={Col} md={9}>
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

    <div className="EventModal">
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