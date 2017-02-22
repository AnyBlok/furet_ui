import React from 'react';
import plugin from '../plugin';


plugin.set(['field'], {Unknown: (props) => {
    return <div>{props.value}</div>
}});
