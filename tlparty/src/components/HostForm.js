import './HostForm.css';
import React, { useState } from 'react';
import { Form, Row, Col } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Formik } from 'formik';
import * as Yup from 'yup';
import OurButton from '../components/OurButton';
import TagList from '../components/TagList';
import DropdownUsingAPI from '../components/DropdownUsingAPI';

const KeyCodes = {
  comma: 188,
  enter: [10, 13],
};

const delimiters = [...KeyCodes.enter, KeyCodes.comma];

export default function HostForm(props) {
  const [formFields, setFormFields] = useState({
    eventName: '',
    eventLocation: '',
    eventDateTime: new Date(), // TODO: Change to datetime format
    tags: [],
    tagInput: '',
    firstName: '',
    lastName: '',
    email: '',
    image: '',
    vaccinated: false,
  });

  const formSchema = Yup.object().shape({
    eventName: Yup.string().required('Event name is a required field'),
    eventLocation: Yup.string().required('Event location is a required field'),
    eventDateTime: Yup.date().required('Event time is a required field'),
    firstName: Yup.string().required('First name is a required field'),
    lastName: Yup.string().required('Last name is a required field'),
    email: Yup.string().email().required('Email is a required field'),
    vaccinated: Yup.bool().required().oneOf([true], 'Vaccination is required to keep TL fans safe :)'),
  });

  const [isKeyReleased, setIsKeyReleased] = useState(true);


  function handleFormSubmit() {
    setTimeout(() => {
      alert('Submitted to the "database"');
    }, 500);
    console.log('Form fields', formFields);
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

  const { dropdown_event_options } = props;

  const [video_game_option, setVideoGameOption] = useState("League of Legends");
  const [official_event_option, setOfficialEventOption] = useState("Not listed");

  // console.log(formFields, "FORM FIELDS");
  // console.log(official_event_option, "OFFICIAL EVENT");
  // console.log(video_game_option, "VIDEO GAME");

  function renderForm() {

    const video_game_options = ["League of Legends", "Valorant", "Dota 2", "Starcraft 2", "Counter-Strike: Global Offensive", "Rainbow Six"];
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
              <Form.Group className='mb-3' controlId="eventName">
                <Form.Label className="host-form-label">Event Name</Form.Label>
                <Form.Control
                  autoFocus
                  type="text"
                  className="host-form-input"
                  name='eventName'
                  placeholder='Gen vs TL Tiebreaker Worlds Day 7'
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
                <Form.Label className="host-form-label">Location</Form.Label>
                <Form.Control
                  autoFocus
                  type="text"
                  className="host-form-input"
                  name='eventLocation'
                  placeholder='Avery 215'
                  value={values.eventLocation}
                  onChange={(e) => {
                    handleChange(e);
                    setFormFields({...formFields, eventLocation: e.target.value});
                  }}
                  isInvalid={!!errors.eventLocation}
                />
                <Form.Control.Feedback className='host-form-error-msg' type='invalid'>{errors.eventLocation}</Form.Control.Feedback>
              </Form.Group>
              
              <Row className='mb-3 two-dropdowns'>
                <div className="one-dropdown">
                  <DropdownUsingAPI
                        options={video_game_options}
                        allowOther={false}
                        selection={video_game_option}
                        setSelection={setVideoGameOption}
                        title_text="Game"
                        className="host-form-label"
                        is_in_modal={true}
                  />
                </div>
                <div className="one-dropdown">
                    <DropdownUsingAPI
                        options={dropdown_event_options}
                        allowOther={true}
                        otherName="Not listed"
                        selection={official_event_option}
                        setSelection={setOfficialEventOption}
                        title_text="Official Event"
                        is_in_modal={true}
                    />
                </div>
              </Row>

              <Row className='mb-3'>
                <Form.Group as={Col} md={6} controlId="eventDateTime">
                  <Form.Label className="host-form-label">When</Form.Label>
                  <Form.Control
                    autoFocus
                    type="datetime-local"
                    className="host-form-input"
                    style={{cursor: "pointer"}}
                    name='eventDateTime'
                    placeholder='Event Time'
                    value={values.eventDateTime}
                    onChange={(e) => {
                      handleChange(e);
                      setFormFields({...formFields, eventDateTime: e.target.value});
                    }}
                    isInvalid={!!errors.eventDateTime}
                  />
                  <Form.Control.Feedback className='host-form-error-msg' type='invalid'>{errors.eventDateTime}</Form.Control.Feedback>
                </Form.Group>
                <Form.Group as={Col} md={6} controlId="eventPST">
                  <Form.Label className="host-form-label">Timezone</Form.Label>
                  <Form.Select className="host-form-input" aria-label="Default select example" style={{cursor: "pointer"}}>
                    <option>Select a timezone</option>
                    <option value="-12:00">(GMT -12:00) Eniwetok, Kwajalein</option>
                    <option value="-11:00">(GMT -11:00) Midway Island, Samoa</option>
                    <option value="-10:00">(GMT -10:00) Hawaii</option>
                    <option value="-09:50">(GMT -9:30) Taiohae</option>
                    <option value="-09:00">(GMT -9:00) Alaska</option>
                    <option value="-08:00" defaultValue="selected">(GMT -8:00) Pacific Time (US &amp; Canada)</option>
                    <option value="-07:00">(GMT -7:00) Mountain Time (US &amp; Canada)</option>
                    <option value="-06:00">(GMT -6:00) Central Time (US &amp; Canada), Mexico City</option>
                    <option value="-05:00">(GMT -5:00) Eastern Time (US &amp; Canada), Bogota, Lima</option>
                    <option value="-04:50">(GMT -4:30) Caracas</option>
                    <option value="-04:00">(GMT -4:00) Atlantic Time (Canada), Caracas, La Paz</option>
                    <option value="-03:50">(GMT -3:30) Newfoundland</option>
                    <option value="-03:00">(GMT -3:00) Brazil, Buenos Aires, Georgetown</option>
                    <option value="-02:00">(GMT -2:00) Mid-Atlantic</option>
                    <option value="-01:00">(GMT -1:00) Azores, Cape Verde Islands</option>
                    <option value="+00:00">(GMT) Western Europe Time, London, Lisbon, Casablanca</option>
                    <option value="+01:00">(GMT +1:00) Brussels, Copenhagen, Madrid, Paris</option>
                    <option value="+02:00">(GMT +2:00) Kaliningrad, South Africa</option>
                    <option value="+03:00">(GMT +3:00) Baghdad, Riyadh, Moscow, St. Petersburg</option>
                    <option value="+03:50">(GMT +3:30) Tehran</option>
                    <option value="+04:00">(GMT +4:00) Abu Dhabi, Muscat, Baku, Tbilisi</option>
                    <option value="+04:50">(GMT +4:30) Kabul</option>
                    <option value="+05:00">(GMT +5:00) Ekaterinburg, Islamabad, Karachi, Tashkent</option>
                    <option value="+05:50">(GMT +5:30) Bombay, Calcutta, Madras, New Delhi</option>
                    <option value="+05:75">(GMT +5:45) Kathmandu, Pokhara</option>
                    <option value="+06:00">(GMT +6:00) Almaty, Dhaka, Colombo</option>
                    <option value="+06:50">(GMT +6:30) Yangon, Mandalay</option>
                    <option value="+07:00">(GMT +7:00) Bangkok, Hanoi, Jakarta</option>
                    <option value="+08:00">(GMT +8:00) Beijing, Perth, Singapore, Hong Kong</option>
                    <option value="+08:75">(GMT +8:45) Eucla</option>
                    <option value="+09:00">(GMT +9:00) Tokyo, Seoul, Osaka, Sapporo, Yakutsk</option>
                    <option value="+09:50">(GMT +9:30) Adelaide, Darwin</option>
                    <option value="+10:00">(GMT +10:00) Eastern Australia, Guam, Vladivostok</option>
                    <option value="+10:50">(GMT +10:30) Lord Howe Island</option>
                    <option value="+11:00">(GMT +11:00) Magadan, Solomon Islands, New Caledonia</option>
                    <option value="+11:50">(GMT +11:30) Norfolk Island</option>
                    <option value="+12:00">(GMT +12:00) Auckland, Wellington, Fiji, Kamchatka</option>
                    <option value="+12:75">(GMT +12:45) Chatham Islands</option>
                    <option value="+13:00">(GMT +13:00) Apia, Nukualofa</option>
                    <option value="+14:00">(GMT +14:00) Line Islands, Tokelau</option>
                  </Form.Select>
                </Form.Group>
              </Row>
              <Form.Group className='mb-3' controlId='vibesList'>
                <Form.Label className="host-form-label">Vibes list</Form.Label>
                <TagList
                  className='host-form-tags'
                  tags={formFields.tags}
                  input={formFields.tagInput}
                  deleteTag={handleDeleteTag}
                  onChange={handleTagInput}
                  onKeyDown={handleTagInputKeyDown}
                  onKeyUp={handleTagInputKeyUp}
                  clearTags={handleClearTags}
                />
              </Form.Group>
              <Form.Group controlId="image" className="mb-3">
                  <Form.Label>Background image</Form.Label>
                  <Form.Control
                    type="file"
                    className="host-form-input"
                    name='image'
                    value={values.image}
                    onChange={(e) => {
                      handleChange(e);
                      setFormFields({...formFields, image: e.target.value});
                    }}
                  />
              </Form.Group>

              <Form.Label className="mt-3 host-form-title">Contact Information</Form.Label>
              <Row className="mb-3">
                <Form.Group as={Col} controlId="firstName">
                  <Form.Label className="host-form-label">First Name</Form.Label>
                  <Form.Control
                    autoFocus
                    type="text"
                    className="host-form-input"
                    name='firstName'
                    placeholder='TL'
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
                    placeholder='Blue'
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
                  placeholder='blue@teamliquid.com'
                  value={values.email}
                  onChange={(e) => {
                    handleChange(e);
                    setFormFields({...formFields, email: e.target.value});
                  }}
                  isInvalid={!!errors.email}
                />
                <Form.Control.Feedback className='host-form-error-msg' type='invalid'>{errors.email}</Form.Control.Feedback>
              </Form.Group>
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
              <OurButton type="submit" onClick={handleSubmit}>Submit</OurButton>
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

