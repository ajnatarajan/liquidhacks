import './EventModal.css';
import React, { useState } from 'react';
import { Form, Row, Col } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Formik } from 'formik';
import OurButton from '../components/OurButton';
import StaticTagList from './StaticTagList';
import TagList from '../components/TagList';

const KeyCodes = {
    comma: 188,
    enter: [10, 13],
};
  
const delimiters = [...KeyCodes.enter, KeyCodes.comma];

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

  const [isKeyReleased, setIsKeyReleased] = useState(true);

  function handleFormSubmit() {
    setTimeout(() => {
      alert('Submitted to the "database"');
    }, 500);
    console.log('Form fields', formFields);
  }

  function handleHostButtonClick() {
    setShowForm(!showForm);
  }

  function handleDeleteTag(index) {
    setFormFields({...formFields, tags: formFields.tags.filter((tag, i) => i !== index)});
    console.log('HELP why am I deleting something');
  }

  function handleTagInput(e) {
    setFormFields({...formFields, tagInput: e.target.value});
  }

  function handleTagInputKeyDown(e) {
    const trimmedInput = formFields.tagInput.trim();
    if (delimiters.includes(e.keyCode) && trimmedInput.length && !formFields.tags.includes(trimmedInput)) {
      e.preventDefault();
      setFormFields({...formFields, tags: [...formFields.tags, trimmedInput], tagInput: ''});
      console.log('adding', trimmedInput);
    }

    if (e.key === "Backspace" && !formFields.tagInput.length && formFields.tags.length && isKeyReleased) {
      e.preventDefault();
      const tagsCopy = [...formFields.tags];
      const poppedTag = tagsCopy.pop();
  
      setFormFields({...formFields, tags: tagsCopy, tagInput: poppedTag});
      console.log('popping');
    }

    setIsKeyReleased(false);
  }

  function handleTagInputKeyUp() {
    setIsKeyReleased(true);
  }

  function handleClearTags() {
    setFormFields({...formFields, tags: []});
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
                <Form.Label className="host-form-label">Snax:</Form.Label>
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

            <Form.Group className='mb-3' controlId='vibesList'>
                <TagList
                className='host-form-tags'
                tags={formFields.tags}
                input={formFields.tagInput}
                deleteTag={handleDeleteTag}
                onChange={handleTagInput}
                onKeyDown={handleTagInputKeyDown}
                onKeyUp={handleTagInputKeyUp}
                clearTags={handleClearTags}
                placeholderText={"Bringing any snacks?"}
                />
            </Form.Group>

            <div class='flexbox'>
                <OurButton type="submit" onClick={handleSubmit}>Submit</OurButton>
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