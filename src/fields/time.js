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
import TimeField from 'react-bootstrap-datetimepicker-seconds';

export class TimeList extends BaseList {}
export class TimeThumbnail extends BaseThumbnail {}

class TimeForm extends BaseForm {
    getInputPropsRW () {
        const props = this.getInputProps();
        delete props.value;
        delete props.className;
        props.inputFormat = 'HH:mm:ss';
        props.mode = 'time';
        if (this.value) {
            props.format = 'HH:mm:ss';
            props.dateTime = this.props.value;
        } else {
            props.defaultText = '';
        }
        props.onChange = (e) => {this.props.onChange(this.props.name, e)}
        return props;
    }
    updateThisData () {
        super.updateThisData()
        if (this.props.required && !this.props.readonly && (this.value == 'Invalid date' || this.props.value == 'Invalid date')) {
            this.error = translate('furetUI.fields.time.invalid', 
                                   {fallback: 'Invalid time'});
        }
    }
    getInput () {
        if (this.props.readonly) {
            return super.getInput();
        }
        const props = this.getInputPropsRW()
        return <TimeField {...props}/>
    }
}

plugin.set(['field', 'List'], {'Time': TimeList});
plugin.set(['field', 'Thumbnail'], {'Time': TimeThumbnail});
plugin.set(['field', 'Form'], {'Time': TimeForm});

export default {
    TimeList,
    TimeThumbnail,
    TimeForm,
}
