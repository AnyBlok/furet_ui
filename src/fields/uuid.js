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

export class UUIDList extends React.Component {
    render () {
        return (
            <span>{this.props.value}</span>
        );
    }
}

export class UUIDThumbnail extends React.Component {
    render () {
        return (
            <TextField
                id={this.props.id}
                floatingLabelText={this.props.label}
                fullWidth={Boolean(eval(this.props.fullwidth))}
                disabled={true}
                value={this.props.value}
            />
        );
    }
}

export class UUIDForm extends UUIDThumbnail {}

plugin.set(['field', 'List'], {'UUID': UUIDList});
plugin.set(['field', 'Thumbnail'], {'UUID': UUIDThumbnail});
plugin.set(['field', 'Form'], {'UUID': UUIDForm});

export default {
    UUIDList,
    UUIDThumbnail,
    UUIDForm,
}
