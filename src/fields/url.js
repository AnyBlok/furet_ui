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
import ActionHome from 'material-ui/svg-icons/action/open-in-browser';
import {indigo500} from 'material-ui/styles/colors';


export class URLList extends React.Component {
    render () {
        return (
            <a href={this.props.value}>{this.props.value}</a>
        );
    }
}

export class URLThumbnail extends React.Component {
    render () {
        const fullWidth = Boolean(eval(this.props.fullwidth));
        return (
            <div
                style={{width: fullWidth ? '100%' : 256,
                        display: 'inline-block',
                }}
            >
                <TextField
                    id={this.props.id}
                    floatingLabelStyle={{width: '90%'}}
                    style={{width: '90%'}}
                    type='url'
                    floatingLabelText={this.props.label}
                    disabled={true}
                    value={this.props.value}
                />
                <a href={this.props.value} style={{width: '10%'}}><i className='fa fa-external-link fa-lg' /></a>
            </div>
        );
    }
}

export class URLForm extends React.Component {
    render () {
        if (this.props.readonly) return <URLThumbnail {...this.props} />
        const required= Boolean(eval(this.props.required));
        let error = ''
        if (required && !this.props.readonly && !this.props.value) {
            error = 'This field is required';
        } else {
            const reg = /^(http[s]?:\/\/){0,1}(www\.){0,1}[a-zA-Z0-9\.\-]+\.[a-zA-Z]{2,5}[\.]{0,1}/;
            if (!reg.test(this.props.value)) error = 'It is not an url';
        }
        const floatingLabelStyle = {};
        if (required) floatingLabelStyle.color = indigo500;
        return (
            <TextField
                id={this.props.id}
                floatingLabelText={this.props.label}
                floatingLabelStyle={floatingLabelStyle}
                fullWidth={Boolean(eval(this.props.fullwidth))}
                required={Boolean(eval(this.props.required))}
                value={this.props.value}
                onChange={(e) => this.props.onChange(this.props.name, e.target.value)}
                errorText={error}
            />
        );
    }
}

plugin.set(['field', 'List'], {'URL': URLList});
plugin.set(['field', 'Thumbnail'], {'URL': URLThumbnail});
plugin.set(['field', 'Form'], {'URL': URLForm});

export default {
    URLList,
    URLThumbnail,
    // StringForm,
}
