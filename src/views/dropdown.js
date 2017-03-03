/**
This file is a part of the FuretUI project

   Copyright (C) 2017 Jean-Sebastien SUZANNE <jssuzanne@anybox.fr>

This Source Code Form is subject to the terms of the Mozilla Public License,
v. 2.0. If a copy of the MPL was not distributed with this file,You can
obtain one at http://mozilla.org/MPL/2.0/.
**/
import React from 'react';
import Popover from 'material-ui/Popover';
import Menu from 'material-ui/Menu';
import MenuItem from 'material-ui/MenuItem';
import RaisedButton from 'material-ui/RaisedButton';

/**
 * Render Dropdown button
 *
 * props:
 *  @label: label of the button
 *  @menus: array of object to describe items [{buttonId (string), label (string)}, ...]
 *
**/
export default class extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false,
        };
    }
    /**
     * Open the dropdown
    **/
    handleTouchTap (event) {
        event.preventDefault();
        this.setState({
            open: true,
            anchorEl: event.currentTarget,
        });
    }
    /**
     * Close the dropdown
    **/
    handleRequestClose () {
        this.setState({open: false});
    }
    callAction (buttonId) {
        console.log('callAction', this.props.label, buttonId, this.props.selectedIds) 
        this.handleRequestClose();
    }
    render() {
        return (
            <div
                testHandleTouchTap={() => {this.handleTouchTap({preventDefault: () => {}})}}
                testHandleRequestClose={this.handleRequestClose.bind(this)}
            >
                <RaisedButton
                    fullWidth={true}
                    onClick={this.handleTouchTap.bind(this)}
                    label={this.props.label}
                    style={{
                        marginTop: 10,
                    }}
                />
                <Popover
                    open={this.state.open}
                    anchorEl={this.state.anchorEl}
                    anchorOrigin={{horizontal: 'left', vertical: 'bottom'}}
                    targetOrigin={{horizontal: 'left', vertical: 'top'}}
                    onRequestClose={this.handleRequestClose.bind(this)}
                >
                    <Menu>
                        {_.map(this.props.menus, menu => (
                            <MenuItem 
                                key={menu.buttonId}
                                primaryText={menu.label} 
                                onClick={() => {this.callAction(menu.buttonId)}}
                            />
                        ))}
                    </Menu>
                </Popover>
            </div>
        );
    }
}

