import React from 'react';
import { Form, Row, Col } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './TagList.css'

import OurButton from './OurButton';


export default function TagList(props) {
    function hashCode(s){
        let hash = s.split("").reduce(function(a , b) {
            a = ((a << 5) - a) + b.charCodeAt(0);
            return a & a;
        }, 0);
        return hash;
    }

    const choices = ['#ffc100', '#c356ea', '#8ff243', '#71aef2', '#ea5645']
    const { tags, input, deleteTag, onKeyDown, onKeyUp, onChange, clearTags } = props;
    const hasNoTags = (tags.length === 0);
    return (
        <div>
            <div className={`taglist-container ${props.className}`}>
                {tags.map((tag, index) => {
                    let color = choices[hashCode(tag) % choices.length];
                    return (
                        <div
                            className='taglist-tag'
                            key={tag}
                            style={{
                                backgroundColor: color,
                                border: `1px solid ${color}`}}>
                            {tag}
                            <button type='button' onClick={() => deleteTag(index)}>x</button>
                        </div>
                    );
                })}
            </div>
            <Row className='taglist-input-row'>
                <Form.Group as={Col} md={hasNoTags ? 12 : 9}>
                    <Form.Control
                        className={props.className}
                        value={input}
                        placeholder={props.placeholderText}
                        onKeyDown={onKeyDown}
                        onChange={onChange}
                        onKeyUp={onKeyUp}
                    />
                </Form.Group>
                {tags.length ? (
                    <Form.Group as={Col} md={3}>
                        <div className='taglist-clear-button'>
                            <OurButton type="button" onClick={clearTags}>Clear</OurButton>
                        </div>
                    </Form.Group>
                ) : null}
            </Row>
        </div>
    )
}