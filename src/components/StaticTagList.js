import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './StaticTagList.css'


export default function StaticTagList(props) {
    function hashCode(s){
        let hash = s.split("").reduce(function(a , b) {
            a = ((a << 5) - a) + b.charCodeAt(0);
            return a & a;
        }, 0);
        return hash;
    }
    const choices = ['#ffc100', '#c356ea', '#8ff243', '#71aef2', '#ea5645'];
    return (
        <div>
            <div className='static-taglist-container'>
                {props.tags.map((tag, index) => {
                    let color = choices[hashCode(tag) % choices.length];
                    return (
                        <div
                            className='static-taglist-tag'
                            key={tag}
                            style={{
                                backgroundColor: color,
                                border: `1px solid ${color}`}}>
                            {tag}
                        </div>
                    );
                })}
            </div>
        </div>
    )
}