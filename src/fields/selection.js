/**
This file is a part of the FuretUI project

   Copyright (C) 2017 Jean-Sebastien SUZANNE <jssuzanne@anybox.fr>

This Source Code Form is subject to the terms of the Mozilla Public License,
v. 2.0. If a copy of the MPL was not distributed with this file,You can
obtain one at http://mozilla.org/MPL/2.0/.
**/
import React from 'react';
import plugin from '../plugin';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import {indigo500} from 'material-ui/styles/colors';


class SelectionList extends React.Component {
    render () {
        return (
            <span>{this.props.selections[this.props.value] || ''}</span>
        );
    }
}


class SelectionThumbnail extends React.Component {
    render () {
        return (
            <SelectField
                id={this.props.id}
                floatingLabelText={this.props.label}
                fullWidth={Boolean(eval(this.props.fullwidth))}
                disabled={true}
                value={this.props.value}
            >
                {_.map(JSON.parse(this.props.selections || '[]'), s => (
                    <MenuItem key={s[0]} value={s[0]} primaryText={s[1]} />
                ))}
            </SelectField>
        );
    }
}


class SelectionForm extends React.Component {
    render () {
        const required= Boolean(eval(this.props.required));
        let error = ''
        if (required && !this.props.readonly && !this.props.value) {
            error = 'This field is required';
        }
        const floatingLabelStyle = {};
        if (required && !this.props.readonly) floatingLabelStyle.color = indigo500;
        return (
            <SelectField
                id={this.props.id}
                floatingLabelText={this.props.label}
                floatingLabelStyle={floatingLabelStyle}
                fullWidth={Boolean(eval(this.props.fullwidth))}
                disabled={this.props.readonly}
                required={required}
                value={this.props.value}
                onChange={(e, key, payload) => this.props.onChange(this.props.name, payload)}
            >
                {_.map(JSON.parse(this.props.selections || '[]'), s => (
                    <MenuItem key={s[0]} value={s[0]} primaryText={s[1]} />
                ))}
            </SelectField>
        );
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
