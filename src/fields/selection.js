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
import Select from 'react-select';
import translate from 'counterpart';

export class SelectionList extends BaseList {
    getValue () {
        if ((this.props.selections || {})[this.props.value])
            return this.props.selections[this.props.value];
        return ' --- ';
    }
}
export class SelectionThumbnail extends BaseThumbnail {
    getValue () {
        const selections = {}
        _.each(JSON.parse(this.props.selections || '[]'), s => {
            selections[s[0]] = s[1];
        })
        return selections[this.props.value] || ' --- ';
    }
}
export class SelectionForm extends BaseForm {
    onChange (val) {
        let value = null;
        if (Array.isArray(val)) {
            // to nothing because the value is removed
        } else if (val) {
            value = val.value;
        }
        this.props.onChange(this.props.name, value);
    }
    getInputProps () {
        const props = super.getInputProps();
        delete props.className;
        props.options = _.map(JSON.parse(this.props.selections || '[]'), s => ({value: s[0], label: s[1]}));
        props.noResultsText = translate('furetUI.fields.common.no-found', {fallback: 'No results found'});
        return props;
    }
    getInput () {
        const props = this.getInputProps();
        return <Select {...props} onChange={this.onChange.bind(this)}/>
    }
}

plugin.set(['field', 'List'], {'Selection': SelectionList});
plugin.set(['field', 'Thumbnail'], {'Selection': SelectionThumbnail});
plugin.set(['field', 'Form'], {'Selection': SelectionForm});

export default {
    SelectionList,
    SelectionThumbnail,
    SelectionForm,
}
