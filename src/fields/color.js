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
import { GithubPicker, SketchPicker } from 'react-color';

export class ColorList extends React.Component {
    render () {
        return (
            <div style={{width: '100%'}}>
                <span>{this.props.value}</span>
                <div style={{height: 20, 
                             width: 40, 
                             backgroundColor: this.props.value || 'white',
                             display: 'inline-block',
                             border: '1px solid black',
                             marginLeft: 10,
                             verticalAlign: 'middle',
                     }}
                />
            </div>
        );
    }
}

export class ColorThumbnail extends React.Component {
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
                    floatingLabelText={this.props.label}
                    floatingLabelStyle={{width: '60%'}}
                    style={{width: '60%'}}
                    disabled={true}
                    value={this.props.value}
                />
                <div style={{height: 20, 
                             width: '10%', 
                             display: 'inline-block',
                     }}
                />
                <div style={{height: 30, 
                             width: '30%', 
                             backgroundColor: this.props.value || 'white',
                             display: 'inline-block',
                             border: '1px solid black',
                             verticalAlign: 'middle',
                     }}
                />
            </div>
        );
    }
}

export class ColorForm extends React.Component {
    constructor (props) {
        super(props);
        this.state = {
            open: false,
            color: null,
        };
    }
    getPicker () {
        switch (this.props.picker) {
            case 'github':
                return (
                    <GithubPicker 
                        onChange={(c) => {
                            this.props.onChange(this.props.name, c.hex)}}
                    />
                );
            default:
                return (
                    <SketchPicker 
                        color={this.state.color || this.props.value}
                        onChange={(c) => {this.setState({color: c.hex})}}
                    />
                );
        }
    }
    handleToggle () {
        if (!this.props.readonly) {
            if (this.state.open && this.state.color) {
                this.props.onChange(this.props.name, this.state.color);
                this.setState({color: null});
            }
            this.setState({open: !this.state.open})
        }
    }
    render () {
        const required = Boolean(eval(this.props.required));
        let error = ''
        if (required && !this.props.readonly && !(this.state.color || this.props.value)) {
            error = 'This field is required';
        }
        const floatingLabelStyle = {width: '60%'};
        if (required && !this.props.readonly) floatingLabelStyle.color = indigo500;
        const fullWidth = Boolean(eval(this.props.fullwidth));
        return (
            <div
                testToggle={this.handleToggle.bind(this)}
                style={{width: fullWidth ? '100%' : 256,
                        height: 30,
                        display: 'inline-block',
                }}
            >
                <div style={{width: '30%',
                             height: 30,
                             display: 'inline-block',
                }}>
                    <div style={{height: 30, 
                                 width: '100%',
                                 backgroundColor: this.state.color || this.props.value || 'white',
                                 border: '1px solid black',
                                 verticalAlign: 'middle',
                         }}
                         onClick={this.handleToggle.bind(this)}
                    />
                    {this.state.open && 
                        <div style={{position: 'absolute', zIndex: 10000}}>
                            {this.getPicker()}
                        </div>
                    }
                </div>
                <div style={{height: 20, 
                             width: '10%', 
                             display: 'inline-block',
                     }}
                />
                <TextField
                    id={this.props.id}
                    floatingLabelText={this.props.label}
                    floatingLabelStyle={floatingLabelStyle}
                    style={{width: '60%'}}
                    disabled={this.props.readonly}
                    required={required}
                    value={this.state.color || this.props.value}
                    onChange={(e) => this.props.onChange(this.props.name, e.target.value)}
                    errorText={error}
                />
            </div>
        );
    }
}

plugin.set(['field', 'List'], {'Color': ColorList});
plugin.set(['field', 'Thumbnail'], {'Color': ColorThumbnail});
plugin.set(['field', 'Form'], {'Color': ColorForm});

export default {
    ColorList,
    ColorThumbnail,
    ColorForm,
}
