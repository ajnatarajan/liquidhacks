import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './OurButton.css'

class OurButton extends React.Component {
    render() {
        return (
            <button class="btn btn-join-the-party">{this.props.text}</button>
        );
    }
}

export default OurButton;