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

export class SequenceList extends React.Component {
    render () {
        return (
            <span>{this.props.value}</span>
        );
    }
}

export class SequenceThumbnail extends React.Component {
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

export class SequenceForm extends SequenceThumbnail {}

plugin.set(['field', 'List'], {'Sequence': SequenceList});
plugin.set(['field', 'Thumbnail'], {'Sequence': SequenceThumbnail});
plugin.set(['field', 'Form'], {'Sequence': SequenceForm});

export default {
    SequenceList,
    SequenceThumbnail,
    SequenceForm,
}
