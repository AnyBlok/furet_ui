/**
This file is a part of the FuretUI project

   Copyright (C) 2017 Jean-Sebastien SUZANNE <jssuzanne@anybox.fr>

This Source Code Form is subject to the terms of the Mozilla Public License,
v. 2.0. If a copy of the MPL was not distributed with this file,You can
obtain one at http://mozilla.org/MPL/2.0/.
**/
import React from 'react';
import plugin from '../plugin';
import './string';
import './selection';
import './date';
import './integer';
import './float';
import './url';
import './uuid';
import './sequence';
import './password';
import './color';
import './text';

/**
 * Unknown field, used only if the wanted field is not available
**/
plugin.set(['field'], {Unknown: (props) => {
    return <div>{props.value}</div>
}});

/**
 * return the component for viewType and fieldType
**/
export const getField = (viewType, fieldType, attribs, value) => {
    let field = plugin.get(['field', viewType, fieldType]);
    if (!field) {
        field = plugin.get(['field', 'Unknown']);
        console.log('getField', viewType, fieldType, attribs, value)
    }
    const id = 'view-type-' + viewType + '-field_type-' + fieldType + '-field-name-' + (attribs.name || '');
    return React.createElement(field, Object.assign({id}, attribs, {value}));
}

export default {
    getField,
}
