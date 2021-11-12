import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './DropdownUsingAPI.css';
import { Form } from 'react-bootstrap';

export default function DropdownUsingAPI(props) {
    var options = props.options.slice();
    if (props.allowOther && options[0] !== props.otherName) { // prevent continuous fires of this appending to the front
        options.unshift(props.otherName)
    }

    const { selection, setSelection, title_text, is_in_modal } = props;

    var event = (
        <Form.Group className='dropdown-using-api my-3'>
            <Form.Label className={is_in_modal ? "modal-text-label" : "main-page-game-text"}>{title_text}</Form.Label>
            <Form.Control
                className="host-form-input"
                aria-label="Default select example"
                style={{cursor: "pointer"}}
                as="select"
                value={selection}
                onChange={e => {
                    setSelection(e.target.value);
                }}
            >
                {
                    options.map((val, idx) => {
                        return (<option key={idx} value={val}>{val}</option>)
                    })
                }
            </Form.Control>
        </Form.Group>
    );
    return event;
}
