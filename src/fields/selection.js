/**
This file is a part of the FuretUI project

   Copyright (C) 2017 Jean-Sebastien SUZANNE <jssuzanne@anybox.fr>

This Source Code Form is subject to the terms of the Mozilla Public License,
v. 2.0. If a copy of the MPL was not distributed with this file,You can
obtain one at http://mozilla.org/MPL/2.0/.
**/
import React from 'react';
import plugin from '../plugin';
import {BaseList, BaseThumbnail, BaseForm} from './base';
import Popover from 'material-ui/Popover';
import Menu from 'material-ui/Menu';
import MenuItem from 'material-ui/MenuItem';

export class SelectionList extends BaseList {
    getValue () {
        if ((this.props.selections || {})[this.props.value])
            return this.props.selections[this.props.value];
        return ' --- ';
    }
}
export class SelectionThumbnail extends BaseThumbnail {
    getValue () {
        const selections = {}
        _.each(JSON.parse(this.props.selections || '[]'), s => {
            selections[s[0]] = s[1];
        })
        return selections[this.props.value] || ' --- ';
    }
}
export class SelectionForm extends BaseForm {
    constructor(props) {
        super(props);
        this.state = {
            open: false,
        };
    }
    getValue () {
        const selections = {}
        _.each(JSON.parse(this.props.selections || '[]'), s => {
            selections[s[0]] = s[1];
        })
        return selections[this.props.value] || ' --- ';
    }
    getInputProps () {
        const props = super.getInputProps();
        props.type = 'text';
        props.disabled = true;
        if (!this.props.readonly) {
            props.onTouchTap = this.handleTouchTap.bind(this);
            props.style = {cursor: 'pointer', backgroundColor: 'white'};
        }
        return props;
    }
    handleTouchTap (event) {
        event.preventDefault();
        this.setState({open: true, anchorEl: event.currentTarget});
    }
    handleRequestClose () {
        this.setState({open: false});
    }
    updateThisData () {
        super.updateThisData();
        if (this.required && !this.props.readonly && this.value == ' --- ') {
            this.error = 'This field is required';
        }
    }
    getInput () {
        return (
            <div>
                {super.getInput()}
                <Popover
                    open={this.state.open}
                    anchorEl={this.state.anchorEl}
                    anchorOrigin={{horizontal: 'left', vertical: 'bottom'}}
                    targetOrigin={{horizontal: 'left', vertical: 'top'}}
                    onRequestClose={this.handleRequestClose.bind(this)}
                >
                    <Menu>
                        {_.map(JSON.parse(this.props.selections || '[]'), s => (
                            <MenuItem 
                                key={s[0]} 
                                value={s[0]} 
                                primaryText={s[1]} 
                                onClick={() => {
                                    this.props.onChange(this.props.name, s[0]);
                                    this.setState({open: false});
                                }}
                            />
                        ))}
                    </Menu>
                </Popover>
            </div>
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
