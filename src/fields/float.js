/**
This file is a part of the FuretUI project

   Copyright (C) 2017 Jean-Sebastien SUZANNE <jssuzanne@anybox.fr>

This Source Code Form is subject to the terms of the Mozilla Public License,
v. 2.0. If a copy of the MPL was not distributed with this file,You can
obtain one at http://mozilla.org/MPL/2.0/.
**/
import React from 'react';
import plugin from '../plugin';
import TextField from 'material-ui/TextField';
import {indigo500} from 'material-ui/styles/colors';

export class FloatList extends React.Component {
    render () {
        const rounding = this.props.step || '0.01',
              value = Math.round(this.props.value / rounding) * rounding;
        return (
            <span>{value}</span>
        );
    }
}

export class FloatThumbnail extends React.Component {
    render () {
        const rounding = this.props.step || '0.01',
              value = Math.round(this.props.value / rounding) * rounding;
        return (
            <TextField
                id={this.props.id}
                type='number'
                step={this.props.step || '0.01'}
                floatingLabelText={this.props.label}
                fullWidth={Boolean(eval(this.props.fullwidth))}
                disabled={true}
                value={value}
            />
        );
    }
}

export class FloatForm extends React.Component {
    render () {
        const required= Boolean(eval(this.props.required));
        const rounding = this.props.step || '0.01',
              value = Math.round(this.props.value / rounding) * rounding;
        let error = ''
        if (required && !this.props.readonly && !this.props.value) {
            error = 'This field is required';
        }
        const floatingLabelStyle = {};
        if (required && !this.props.readonly) floatingLabelStyle.color = indigo500;
        return (
            <TextField
                id={this.props.id}
                type='number'
                step={this.props.step || '0.01'}
                floatingLabelText={this.props.label}
                floatingLabelStyle={floatingLabelStyle}
                fullWidth={Boolean(eval(this.props.fullwidth))}
                disabled={this.props.readonly}
                required={Boolean(eval(this.props.required))}
                value={value}
                onChange={(e) => this.props.onChange(this.props.name, e.target.value)}
                errorText={error}
            />
        );
    }
}

plugin.set(['field', 'List'], {'Float': FloatList});
plugin.set(['field', 'Thumbnail'], {'Float': FloatThumbnail});
plugin.set(['field', 'Form'], {'Float': FloatForm});

export default {
    FloatList,
    FloatThumbnail,
    FloatForm,
}
