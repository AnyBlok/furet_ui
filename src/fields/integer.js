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

export class IntegerList extends React.Component {
    render () {
        return (
            <span>{this.props.value}</span>
        );
    }
}

export class IntegerThumbnail extends React.Component {
    render () {
        return (
            <TextField
                id={this.props.id}
                type='number'
                step='1'
                floatingLabelText={this.props.label}
                fullWidth={Boolean(eval(this.props.fullwidth))}
                disabled={true}
                value={this.props.value}
            />
        );
    }
}

export class IntegerForm extends React.Component {
    render () {
        const required= Boolean(eval(this.props.required));
        let error = ''
        if (required && !this.props.readonly && !this.props.value) {
            error = 'This field is required';
        }
        return (
            <TextField
                id={this.props.id}
                type='number'
                step='1'
                floatingLabelText={this.props.label}
                fullWidth={Boolean(eval(this.props.fullwidth))}
                disabled={this.props.readonly}
                required={Boolean(eval(this.props.required))}
                value={this.props.value}
                onChange={(e) => this.props.onChange(this.props.name, e.target.value)}
                errorText={error}
            />
        );
    }
}

plugin.set(['field', 'List'], {'Integer': IntegerList});
plugin.set(['field', 'Thumbnail'], {'Integer': IntegerThumbnail});
plugin.set(['field', 'Form'], {'Integer': IntegerForm});
plugin.set(['field', 'List'], {'BigInteger': IntegerList});
plugin.set(['field', 'Thumbnail'], {'BigInteger': IntegerThumbnail});
plugin.set(['field', 'Form'], {'BigInteger': IntegerForm});

export default {
    IntegerList,
    IntegerThumbnail,
    IntegerForm,
}
