/**
This file is a part of the FuretUI project

   Copyright (C) 2017 Jean-Sebastien SUZANNE <jssuzanne@anybox.fr>

This Source Code Form is subject to the terms of the Mozilla Public License,
v. 2.0. If a copy of the MPL was not distributed with this file,You can
obtain one at http://mozilla.org/MPL/2.0/.
**/
import React from 'react';
import { connect } from 'react-redux'
import {dispatchAll} from './reducers';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import _ from 'underscore';
import {Card, CardHeader, CardText} from 'material-ui/Card';
import Picture from './picture';
import {json_post} from './server-call';
import translate from 'counterpart';

/**
 * Render a Dialog box, with thumbnail menu and search box to filter thumbnail
 *
 * the props come from redx store
 *
 * and the click on a thumbnail change the redux store
 *
**/
class BaseMenu extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false,
            searchText: '',
        };
    }
    /**
     * Open the Dialog box
    **/
    handleOpen () {
        this.setState({open: true});
    };
    /**
     * Close the Dialog box
    **/
    handleClose () {
        this.setState({open: false});
    };
    /**
     * Update the redux store when a card is selected
     *
    **/
    selectCard (card) {
        switch (card.type) {
            case 'client':
                this.props.dispatch({
                    type: 'UPDATE_GLOBAL',
                    custom_view: card.id,
                });
                break;
            case 'space':
                json_post('/space/' + card.id, {}, {
                    onSuccess: (results) => {
                        this.props.dispatchAll(results)
                    }
                });
                this.props.dispatch({
                    type: 'UPDATE_GLOBAL',
                    spaceId: card.id,
                });
                this.props.dispatch_menu({
                    value: {
                        label: card.label,
                        image: card.image,
                    },
                });
                break;
        }
        this.handleClose();
    }
    render() {
        if (!this.props.value.label) return null;
        const actions = [
            <FlatButton
                label={translate('furetUI.menus.close', {fallback: 'Close'})}
                primary={true}
                onTouchTap={this.handleClose.bind(this)}
            />,
        ];
        const re = new RegExp(this.state.searchText, 'i');
        return (
            <div>
                <FlatButton label={this.props.value.label} 
                            icon={<Picture {...this.props.value.image} style={{height:48, width: 48}} iconSize='fa-3x'/>}
                            onTouchTap={this.handleOpen.bind(this)}
                />
                <Dialog
                    actions={actions}
                    modal={false}
                    open={this.state.open}
                    onRequestClose={this.handleClose.bind(this)}
                    autoScrollBodyContent={true}
                    contentStyle={{width: '95%', maxWidth: 'none'}}
                    title={
                        <div className="input-group">
                            <span className="input-group-addon">
                                <i className="glyphicon glyphicon-search"></i>
                            </span>
                            <input 
                                type="text" 
                                className="form-control" 
                                placeholder={translate('furetUI.menus.search', {fallback: 'Search ...'})}
                                value={this.state.searchText}
                                onChange={(e) => {this.setState({searchText: e.target.value})}}
                            />
                        </div>
                    }
                >
                    {_.map(this.props.values, group => (
                        <fieldset
                            key={group.id}
                        >
                            <legend style={{color: 'gray'}}><Picture {...group.image} iconSize='fa-lg'/>{group.label}</legend>
                            <div className="row">
                                {_.map(group.values || [], card => {
                                    const test_label = re.test(card.label),
                                          test_description = re.test(card.description);
                                    if (test_label || test_description)
                                        return (
                                            <div className="col-xs-12 col-sm-6 col-md-4 col-lg-3"
                                                 key={card.id}
                                            >
                                                <Card 
                                                    onClick={() => {this.selectCard(card)}}
                                                    style={{minHeight: 120, marginBottom: 10}}
                                                >
                                                    <CardHeader
                                                        title={card.label}
                                                        subtitle={card.description}
                                                        avatar={<Picture {...card.image} style={{height: 48, width: 48}} iconSize='fa-3x'/>}
                                                    />
                                                </Card>
                                            </div>
                                        );
                                    return null;
                                })}
                            </div>
                        </fieldset>
                    ))}
                </Dialog>
            </div>
        );
    }
}

const getComponent = (key) => {
    const mapStateToProps = (state) => {
        const _state = state[key + 'menu'];
        return {
            key,
            value: _state.value,
            values: _state.values,
            url: 'appbar/' + key + '/dialog',
        }
    }
    
    const mapDispatchToProps = (dispatch, props) => {
        return {
            dispatchAll: (data) => (dispatchAll(dispatch, data)),
            dispatch: dispatch,
            dispatch_menu: (obj) => {
                dispatch(Object.assign({type: 'UPDATE_' + key.toUpperCase() + '_MENU'}, obj));
            },
        }
    }
    return connect(mapStateToProps, mapDispatchToProps)(BaseMenu);
}

export const RightMenu = getComponent('right');
export const LeftMenu = getComponent('left');

export default {
    RightMenu,
    LeftMenu,
}
