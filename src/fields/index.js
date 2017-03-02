import React from 'react';
import plugin from '../plugin';
import './string';
import './selection';
import './date';


plugin.set(['field'], {Unknown: (props) => {
    return <div>{props.value}</div>
}});

export const getField = (viewType, fieldType, attribs, value) => {
    let field = plugin.get(['field', viewType, fieldType]);
    if (!field) {
        field = plugin.get(['field', 'Unknown']);
        console.log('getField', viewType, fieldType, attribs, value)
    }
    return React.createElement(field, Object.assign({}, attribs, {value}));
}

export default {
    getField,
}
