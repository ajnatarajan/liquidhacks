import './Modal.css'
import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import OurButton from './OurButton';
import close_icon from '../img/close_icon.png';

export default function UserInformation(props) {
    function toggleModal() {
        props.setIsOpen(!props.isOpen);
    }

    function modalClick(e) {
        e.stopPropagation();
    }

    return (
        <div class={"modal-overlay " + (props.isOpen ? "open" : "closed")} onClick={toggleModal}>
            <div class="modal-container" onClick={modalClick}>
                <div class="modal-title">{props.title}</div>
                <img class="modal-close" src={close_icon} onClick={toggleModal} />
                {props.children}
            </div>
        </div>
    );
}
