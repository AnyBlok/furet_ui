/**
This file is a part of the FuretUI project

   Copyright (C) 2017 Jean-Sebastien SUZANNE <jssuzanne@anybox.fr>

This Source Code Form is subject to the terms of the Mozilla Public License,
v. 2.0. If a copy of the MPL was not distributed with this file,You can
obtain one at http://mozilla.org/MPL/2.0/.
**/
import React from 'react';
import plugin from '../plugin';
import { GithubPicker, SketchPicker } from 'react-color';
import {BaseList, BaseThumbnail, BaseForm} from './base';

export class ColorList extends BaseList {
    getInput () {
        return (
            <div>
                <div style={{
                    height: 20, 
                    width: 20, 
                    backgroundColor: this.value || 'white',
                    border: '1px solid black',
                    display: 'inline-block',
                    marginRight: 10,
                }}/>
                {super.getInput()}
            </div>
        );
    }
}

export class ColorThumbnail extends BaseThumbnail {
    getInput () {
        return (
            <div>
                <div style={{
                    height: 20, 
                    width: 20, 
                    backgroundColor: this.value || 'white',
                    border: '1px solid black',
                    display: 'inline-block',
                    marginRight: 10,
                }}/>
                <div style={{
                    display: 'inline-block',
                }}>
                    {super.getInput()}
                </div>
            </div>
        );
    }
}

export class ColorForm extends BaseForm {
    constructor (props) {
        super(props);
        this.state = {
            open: false,
            color: null,
        };
    }
    getValue () {
        const value = this.state.color || this.props.value;
        if (value == null) return this.getNullValue();
        return value;
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
                        color={this.value}
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
    getInputProps () {
        const props = super.getInputProps();
        props.type = 'text';
        props.maxLength = "7";
        return props;
    }
    getInput () {
        return (
            <div className="input-group">
                <span className="input-group-addon">
                    <div 
                        onClick={this.handleToggle.bind(this)}
                        style={{
                        height: 20, 
                        width: 20, 
                        backgroundColor: this.value || 'white',
                        border: '1px solid black',
                    }}/>
                    {this.state.open && 
                        <div style={{position: 'absolute', 
                                     zIndex: 10000, 
                                     marginTop: 10}}
                        >
                            {this.getPicker()}
                        </div>
                    }
                </span>
                {super.getInput()}
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
