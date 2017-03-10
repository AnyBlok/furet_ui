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

export class IntegerList extends BaseList {}
export class IntegerThumbnail extends BaseThumbnail {}
export class IntegerForm extends BaseForm {
    getInputProps () {
        const props = super.getInputProps();
        props.type = 'number';
        props.step = '1';
        return props;
    }
}

plugin.set(['field', 'List'], {'Integer': IntegerList});
plugin.set(['field', 'Thumbnail'], {'Integer': IntegerThumbnail});
plugin.set(['field', 'Form'], {'Integer': IntegerForm});
plugin.set(['field', 'List'], {'BigInteger': IntegerList});
plugin.set(['field', 'Thumbnail'], {'BigInteger': IntegerThumbnail});
plugin.set(['field', 'Form'], {'BigInteger': IntegerForm});
plugin.set(['field', 'List'], {'SmallInteger': IntegerList});
plugin.set(['field', 'Thumbnail'], {'SmallInteger': IntegerThumbnail});
plugin.set(['field', 'Form'], {'SmallInteger': IntegerForm});

export default {
    IntegerList,
    IntegerThumbnail,
    IntegerForm,
}
