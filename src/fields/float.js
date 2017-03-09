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

export class FloatList extends BaseList {
    getValue () {
        const rounding = this.props.step || '0.01';
        return Math.round(this.props.value / rounding) * rounding;
    }
}
export class FloatThumbnail extends BaseThumbnail {
    getValue () {
        const rounding = this.props.step || '0.01';
        return Math.round(this.props.value / rounding) * rounding;
    }
}
export class FloatForm extends BaseForm {
    getValue () {
        const rounding = this.props.step || '0.01';
        return Math.round(this.props.value / rounding) * rounding;
    }
    getInputProps () {
        const props = super.getInputProps();
        props.type = 'number';
        props.step= this.props.step || '0.01';
        return props;
    }
}

plugin.set(['field', 'List'], {'Float': FloatList});
plugin.set(['field', 'Thumbnail'], {'Float': FloatThumbnail});
plugin.set(['field', 'Form'], {'Float': FloatForm});
plugin.set(['field', 'List'], {'Decimal': FloatList});
plugin.set(['field', 'Thumbnail'], {'Decimal': FloatThumbnail});
plugin.set(['field', 'Form'], {'Decimal': FloatForm});

export default {
    FloatList,
    FloatThumbnail,
    FloatForm,
}
