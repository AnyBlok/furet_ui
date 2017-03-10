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

export class UUIDList extends BaseList {}
export class UUIDThumbnail extends BaseThumbnail {}
export class UUIDForm extends BaseForm {
    getInputProps () {
        const props = super.getInputProps();
        props.type = 'text';
        props.disabled = true;
        return props;
    }
}

plugin.set(['field', 'List'], {'UUID': UUIDList});
plugin.set(['field', 'Thumbnail'], {'UUID': UUIDThumbnail});
plugin.set(['field', 'Form'], {'UUID': UUIDForm});

export default {
    UUIDList,
    UUIDThumbnail,
    UUIDForm,
}
