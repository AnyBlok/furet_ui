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
import {red500, indigo500, darkBlack} from 'material-ui/styles/colors';
import transitions from 'material-ui/styles/transitions';
import {fade} from 'material-ui/utils/colorManipulator';
let RichTextEditor = null;
if (process.env.NODE_ENV == 'test') {
    RichTextEditor = () => {return <div />};
    RichTextEditor.createValueFromString = () => {return 'Test'};
} else {
    RichTextEditor = require('react-rte').default;
}

export class TextList extends React.Component {
    render () {
        return (
            <RichTextEditor
                value={RichTextEditor.createValueFromString(this.props.value || '', 'html')}
                readOnly={true}
            />
        );
    }
}

export class TextThumbnail extends React.Component {
    render () {
        return (
            <div>
                <label style={{
                    position: 'absolute',
                    lineHeight: '22px',
                    top: 38,
                    transition: transitions.easeOut(),
                    zIndex: 1, // Needed to display label above Chrome's autocomplete field background
                    transform: 'scale(0.75) translate(0, -28px)',
                    transformOrigin: 'left top',
                    pointerEvents: 'none',
                    userSelect: 'none',
                    color: fade(darkBlack, 0.3),
                    fontSize: 16,
                }}>
                    {this.props.label}
                </label>
                <div
                    style={{marginTop: 38}}
                >
                    <RichTextEditor
                        value={RichTextEditor.createValueFromString(this.props.value || '', 'html')}
                        readOnly={true}
                    />
                </div>
            </div>
        );
    }
}

export class TextForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: RichTextEditor.createValueFromString(props.value || '', 'html'),
        };
    }
    componentWillReceiveProps(nextProps) {
        if (nextProps.readonly != this.props.readonly) {
            this.setState({
                value: RichTextEditor.createValueFromString(nextProps.value || this.props.value || '', 'html'),
            });
        }
    }
    render () {
        const required = Boolean(eval(this.props.required));
        let error = ''
        if (required && !this.props.readonly && this.props.value == '<p><br></p>') {
            error = 'This field is required';
        }
        let color = darkBlack;
        if (this.props.readonly) color = fade(darkBlack, 0.3);
        else if (required) color = indigo500;
        const style = {};
        if (this.props.label) style.marginTop = 38;
        if (error) {
            style.border = 1;
            style.borderStyle = 'solid';
            style.borderColor = red500;
        }
        return (
            <div>
                <label style={{
                    position: 'absolute',
                    lineHeight: '22px',
                    top: 38,
                    transition: transitions.easeOut(),
                    zIndex: 1, // Needed to display label above Chrome's autocomplete field background
                    transform: 'scale(0.75) translate(0, -28px)',
                    transformOrigin: 'left top',
                    pointerEvents: 'none',
                    userSelect: 'none',
                    color,
                    fontSize: 16,
                }}>
                    {this.props.label}
                </label>
                <div
                    style={style}
                >
                    <RichTextEditor
                        value={this.state.value}
                        readOnly={this.props.readonly}
                        onChange={(value) => {
                            this.setState({value});
                            this.props.onChange(this.props.name, value.toString('html'))
                        }}
                    />
                </div>
                {error && <div style={{color: red500}}>{error}</div>}
            </div>
        );
    }
}

plugin.set(['field', 'List'], {'Text': TextList});
plugin.set(['field', 'Thumbnail'], {'Text': TextThumbnail});
plugin.set(['field', 'Form'], {'Text': TextForm});


export default {
    TextList,
    TextThumbnail,
    TextForm,

}
