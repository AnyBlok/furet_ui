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
import './datetime';
import './time';
import './integer';
import './float';
import './url';
import './uuid';
import './sequence';
import './password';
import './color';
import './text';
import './boolean';
import './json';
import './x2one';
import './x2many';
import './largebinary';

/**
 * Unknown field, used only if the wanted field is not available
**/
plugin.set(['field'], {Unknown: (props) => {
    return <div>{props.value}</div>
}});
