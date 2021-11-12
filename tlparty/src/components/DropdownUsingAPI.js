import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './DropdownUsingAPI.css';
import { Form } from 'react-bootstrap';

export default function DropdownUsingAPI(props) {
    var options = props.options.slice();
    if (props.allowOther && options[0] !== props.otherName) { // prevent continuous fires of this appending to the front
        options.unshift(props.otherName)
    }

    const { selection, setSelection, title_text } = props;

    var event = (
        <Form noValidate className='dropdown-using-api my-3'>
            <Form.Group>
                <Form.Label className="main-page-game-text">{title_text}</Form.Label>
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
