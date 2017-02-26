import React from 'react';
import plugin from '../plugin';
import './string';
import './selection';
import './date';


plugin.set(['field'], {Unknown: (props) => {
    return <div>{props.value}</div>
}});
