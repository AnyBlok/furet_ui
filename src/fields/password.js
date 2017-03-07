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
import _ from 'underscore';

export class PasswordList extends React.Component {
    render () {
        const value = _.map(this.props.value || [], a => ('*')).join('');
        return (
            <span>{value}</span>
        );
    }
}

export class PasswordThumbnail extends React.Component {
    render () {
        return (
            <TextField
                id={this.props.id}
                type="password"
                floatingLabelText={this.props.label}
                fullWidth={Boolean(eval(this.props.fullwidth))}
                disabled={true}
                value={this.props.value}
            />
        );
    }
}

export class PasswordForm extends React.Component {
    render () {
        const required = Boolean(eval(this.props.required));
        let error = ''
        if (required && !this.props.readonly && !this.props.value) {
            error = 'This field is required';
        }
        const floatingLabelStyle = {};
        if (required && !this.props.readonly) floatingLabelStyle.color = indigo500;
        return (
            <TextField
                id={this.props.id}
                type="password"
                floatingLabelText={this.props.label}
                fullWidth={Boolean(eval(this.props.fullwidth))}
                floatingLabelStyle={floatingLabelStyle}
                disabled={this.props.readonly}
                required={Boolean(eval(this.props.required))}
                value={this.props.value}
                onChange={(e) => this.props.onChange(this.props.name, e.target.value)}
                errorText={error}
            />
        );
    }
}

plugin.set(['field', 'List'], {'Password': PasswordList});
plugin.set(['field', 'Thumbnail'], {'Password': PasswordThumbnail});
plugin.set(['field', 'Form'], {'Password': PasswordForm});

export default {
    PasswordList,
    PasswordThumbnail,
    PasswordForm,
}
