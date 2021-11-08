import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './OurButton.css'

export default function OurButton(props) {
    return (
        <button class="btn btn-join-the-party">{props.text}</button>
    );
}