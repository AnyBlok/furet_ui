/**
This file is a part of the FuretUI project

   Copyright (C) 2017 Jean-Sebastien SUZANNE <jssuzanne@anybox.fr>

This Source Code Form is subject to the terms of the Mozilla Public License,
v. 2.0. If a copy of the MPL was not distributed with this file,You can
obtain one at http://mozilla.org/MPL/2.0/.
**/
import React from 'react';
import plugin from '../plugin';
import translate from 'counterpart';
import {BaseList, BaseThumbnail, BaseForm} from './base';
import DateTimeField from 'react-bootstrap-datetimepicker-seconds';

export class DateTimeList extends BaseList {
    getValue () {
        if (this.props.value) {
            const date = new Date(Date.parse(this.props.value));
            return translate.localize(date, {type: 'datetime', scope: 'furetUI'});
        }
        return null;
    }
}
export class DateTimeThumbnail extends BaseThumbnail {
    getValue () {
        if (this.props.value) {
            const date = new Date(Date.parse(this.props.value));
            return translate.localize(date, {type: 'datetime', scope: 'furetUI'});
        }
        return null;
    }
}

class DateTimeForm extends BaseForm {
    getValue () {
        if (this.props.value) {
            const date = new Date(Date.parse(this.props.value));
            return translate.localize(date, {type: 'datetime', scope: 'furetUI'});
        }
        return '';
    }
    getInputPropsRW () {
        const props = this.getInputProps();
        delete props.value;
        delete props.className;
        props.inputFormat = translate('furetUI.fields.datetime.format', {fallback: 'YYYY-MM-DDTHH:mm:ssZ'});
        if (this.value) {
            props.format = 'YYYY-MM-DDTHH:mm:ssZ';
            props.dateTime = this.props.value;
        }
        props.onChange = (e) => {this.props.onChange(this.props.name, e)}
        return props;
    }
    updateThisData () {
        super.updateThisData()
        if (this.required && !this.props.readonly && (this.value == 'Invalid date' || this.props.value == 'Invalid date')) {
            this.error = translate('furetUI.fields.datetime.invalid', 
                                   {fallback: 'Invalid date'});
        }
    }
    getInput () {
        if (this.props.readonly) {
            return super.getInput();
        }
        const props = this.getInputPropsRW()
        return <DateTimeField {...props}/>
    }
}

plugin.set(['field', 'List'], {'DateTime': DateTimeList});
plugin.set(['field', 'Thumbnail'], {'DateTime': DateTimeThumbnail});
plugin.set(['field', 'Form'], {'DateTime': DateTimeForm});

export default {
    DateTimeList,
    DateTimeThumbnail,
    DateTimeForm,
}
