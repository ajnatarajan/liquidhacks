import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './StaticTagList.css'


export default function StaticTagList(props) {
    return (
        <div>
            <div className='static-taglist-container'>
                {props.tags.map((tag) => (
                    <div className="static-taglist-tag" key={tag}>
                        {tag}
                    </div>
                ))}
            </div>
        </div>
    )
}