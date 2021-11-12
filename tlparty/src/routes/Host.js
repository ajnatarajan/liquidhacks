import './Host.css';
import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import OurButton from '../components/OurButton';
import HostForm from '../components/HostForm';

export default function Host() {
    const [showForm, setShowForm] = useState(false);

    function handleHostButtonClick() {
        setShowForm(!showForm);
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
            <div style={{
                margin: '0 25vw',
            }}>
                {showForm ? <HostForm /> : null}
            </div>
        </div>
    );
}
