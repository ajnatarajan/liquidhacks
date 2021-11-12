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
        <div className={"modal-overlay " + (props.isOpen ? "open" : "closed")} onClick={toggleModal}>
            <div className="modal-container" onClick={modalClick}>
                <div className="modal-title">{props.title}</div>
                <img className="modal-close" src={close_icon} onClick={toggleModal} />
                {props.children}
            </div>
        </div>
    );
}
