/**
This file is a part of the FuretUI project

   Copyright (C) 2017 Jean-Sebastien SUZANNE <jssuzanne@anybox.fr>

This Source Code Form is subject to the terms of the Mozilla Public License,
v. 2.0. If a copy of the MPL was not distributed with this file,You can
obtain one at http://mozilla.org/MPL/2.0/.
**/
import React from 'react';
import plugin from '../plugin';
import {BaseList, BaseThumbnail, BaseForm} from './base';

export class StringList extends BaseList {}
export class StringThumbnail extends BaseThumbnail {}
export class StringForm extends BaseForm {
    getInputProps () {
        const props = super.getInputProps();
        props.type = 'text';
        return props;
    }
}

plugin.set(['field', 'List'], {'String': StringList});
plugin.set(['field', 'Thumbnail'], {'String': StringThumbnail});
plugin.set(['field', 'Form'], {'String': StringForm});
plugin.set(['field', 'List'], {'UString': StringList});
plugin.set(['field', 'Thumbnail'], {'UString': StringThumbnail});
plugin.set(['field', 'Form'], {'UString': StringForm});

export default {
    StringList,
    StringThumbnail,
    StringForm,
}
