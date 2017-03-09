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

export class SequenceList extends BaseList {}
export class SequenceThumbnail extends BaseThumbnail {}
export class SequenceForm extends BaseForm {
    getInputProps () {
        const props = super.getInputProps();
        props.type = 'text';
        props.disabled = true;
        return props;
    }
}

plugin.set(['field', 'List'], {'Sequence': SequenceList});
plugin.set(['field', 'Thumbnail'], {'Sequence': SequenceThumbnail});
plugin.set(['field', 'Form'], {'Sequence': SequenceForm});

export default {
    SequenceList,
    SequenceThumbnail,
    SequenceForm,
}
