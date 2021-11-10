import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function DropdownUsingAPI() {
    var request = new XMLHttpRequest()
    request.open('POST', 'https://api.liquipedia.net/api/v1/match', true)
    return (
        <div>
            Hello!
        </div>
    );
}