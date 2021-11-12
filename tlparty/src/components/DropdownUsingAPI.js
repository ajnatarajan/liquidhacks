import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import './DropdownUsingAPI.css';
import { Form, Row, Col, Button } from 'react-bootstrap';

export default function DropdownUsingAPI(props) {
    if (props.allowOther && props.options[0] != props.otherName) { // prevent continuous fires of this appending to the front
        props.options.unshift(props.otherName)
    }

    var event = (
        <Form noValidate className='dropdown-using-api my-3'>
            <Form.Group>
                <Form.Label className="main-page-game-text">FILTER BY EVENT</Form.Label>
                <Form.Select className="host-form-input" aria-label="Default select example">
                    {
                        props.options.map(val => {
                            return (<option value={val}>{val}</option>)
                        })
                    }
                </Form.Select>
            </Form.Group>
        </Form>
    );
    // console.log(props.options, "OY");
    // for(let i = 0; i < props.options.length; i++) {
    //     var name = props.options[i]
    //     console.log(name);
    //     event.options[event.options.length] = new Option(name, name);
    // }
    return event;
}
