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
import translate from 'counterpart';

export class JsonList extends BaseList {
    getValue () {
        if (this.props.value)
            try {
                return JSON.stringify(JSON.parse(this.props.value),null,2); 
            } catch (e) {};
        return this.props.value;
    }
    getInputProps () {
        const props = super.getInputProps();
        delete props.className;
        delete props.value;
        props.style = {width: '100%', padding: 2, backgroundColor: 'white'};
        return props;
    }
    getInput () {
        const props = this.getInputProps();
        return <pre {...props} >{this.value}</pre>
    }
}
export class JsonThumbnail extends BaseThumbnail {
    getValue () {
        if (this.props.value)
            try {
                return JSON.stringify(JSON.parse(this.props.value),null,2); 
            } catch (e) {};
        return this.props.value;
    }
    getInputProps () {
        const props = super.getInputProps();
        delete props.className;
        delete props.value;
        props.style = {width: '100%', padding: 2, backgroundColor: 'white'};
        return props;
    }
    getInput () {
        const props = this.getInputProps();
        return <pre {...props} >{this.value}</pre>
    }
}
export class JsonForm extends BaseForm {
    getValue () {
        if (this.props.value)
            try {
                return JSON.stringify(JSON.parse(this.props.value),null,2); 
            } catch (e) {};
        return this.props.value;
    }
    updateThisData () {
        super.updateThisData();
        if (!this.props.readonly && !this.error) {
            try {
                JSON.parse(this.value);
            } catch (e) {
                this.error = translate('furetUI.fields.json.invalid', 
                                       {fallback: 'JSON format invalid'});
            }
        }
    }
    getInputPropsRO () {
        const props = this.getInputProps();
        delete props.className;
        delete props.value;
        props.style = {width: '100%', paddind: 2};
        return props;
    }
    getInputPropsRW () {
        const props = this.getInputProps();
        delete props.className;
        props.style = {width: '100%', height: '100%'};
        props.rows = this.value && this.value.split('\n').length;
        return props;
    }
    getInput () {
        if (this.props.readonly) {
            const props = this.getInputPropsRO();
            return <pre {...props} >{this.value}</pre>
        }
        const props = this.getInputPropsRW();
        return <textarea {...props} />
    }
}

plugin.set(['field', 'List'], {'Json': JsonList});
plugin.set(['field', 'Thumbnail'], {'Json': JsonThumbnail});
plugin.set(['field', 'Form'], {'Json': JsonForm});

export default {
    JsonList,
    JsonThumbnail,
    JsonForm,
}
