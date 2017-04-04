/**
This file is a part of the FuretUI project

   Copyright (C) 2017 Jean-Sebastien SUZANNE <jssuzanne@anybox.fr>

This Source Code Form is subject to the terms of the Mozilla Public License,
v. 2.0. If a copy of the MPL was not distributed with this file,You can
obtain one at http://mozilla.org/MPL/2.0/.
**/
import React from 'react';
import {dispatchAll} from './reducers';
import {connect} from 'react-redux';
import {ActionManager} from './action';
import {getClientView} from './views';
import IconButton from 'material-ui/IconButton';
import IconMenu from 'material-ui/svg-icons/navigation/menu';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import Divider from 'material-ui/Divider';
import {List, ListItem} from 'material-ui/List';
import Picture from './picture';
import {green500} from 'material-ui/styles/colors';
import {Toolbar, ToolbarGroup} from 'material-ui/Toolbar';
import {json_post} from './server-call';
import translate from 'counterpart';
import Loading from './loading';

/**
 * Render a specific space
 *
 * @spaceId: (string, required) id of the space to render
 *
**/
class SpaceCpt extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            left_menu: false,
            right_menu: false,
        }
    }
    /**
     * transform menus definition to one component
     *
     * @menus: array of object, definition of the structure
     * @menuId: current menu rendered
     *
    **/
    renderMenu (menus, menuId) {
        const res = [];
        let has_menu = false;
        _.each(menus, menu => {
            const props = {};
            if ((menu.submenus || []).length != 0) {
                const submenu = this.renderMenu(menu.submenus, menuId);
                props.initiallyOpen=submenu.has_menu;
                props.nestedItems=submenu.menus;
                if (submenu.has_menu) has_menu = true;
            }
            if (menu.id == menuId) {
                has_menu = true;
                props.style = {color: green500};
            }
            if (menu.actionId || menu.custom_view) {
                props.onClick = () => {
                    if (menu.actionId) {
                        json_post('/action/' + menu.actionId, {}, {
                            onSuccess: (results) => {
                                this.props.dispatchAll(results)
                            }
                        });
                    }
                    this.props.dispatchAll([
                        {
                            type: 'UPDATE_SPACE',
                            spaceId: this.props.spaceId,
                            menuId: menu.id,
                            actionId: menu.actionId || '',
                            custom_view: menu.custom_view || '',
                        },
                        {
                            type: 'RESET_ACTION_MANAGER'
                        },
                        {
                            type: 'CLEAR_ALL_CHANGES'
                        },
                    ]);
                }
            }
            res.push(
                <ListItem
                    key={'menu-' + menu.id}
                    primaryText={menu.label}
                    leftIcon={<Picture {...menu.image} />}
                    {...props}
                />
            );
        });
        return {menus: res, has_menu};
    }
    /**
     * Render A Drawer
     *
     * @menus: array of object, definition of the structure
     * @state: key in the state to indicate if it is right_menu or left_menu
     * @menuId: current menu rendered
     *
    **/
    renderDrawer(menus, state, menuId) {
        if ((menus || []).length == 0) return null;
        return (
            <div>
                <IconButton
                    onClick={() => {
                        const val = {};
                        val[state] = true;
                        this.setState(val);
                    }}
                    iconStyle={{width: 40, height: 40}}
                >
                    <IconMenu/>
                </IconButton>
                <Drawer
                    openSecondary={state == 'right_menu'}
                    open={this.state[state]}
                >
                    <MenuItem onClick={() => {
                        const val = {};
                        val[state] = false;
                        this.setState(val);
                    }}
                    >
                        {translate('furetUI.space.close', {fallback: 'Close'})}
                    </MenuItem>
                    <Divider />
                    <List>
                        {this.renderMenu(menus, menuId).menus}
                    </List>
                </Drawer>
            </div>
        );
    }
    /**
     * Render children in function of redux storage
    **/
    getEntryPointApp () {
        const res = [],
              space_state = this.props.space_state,
              left_menu = this.renderDrawer(space_state.left_menu, 'left_menu', space_state.menuId),
              right_menu = this.renderDrawer(space_state.right_menu, 'right_menu', space_state.menuId);
        if (this.props.space_state.actionId) {
            res.push(
                <ActionManager
                    key={this.props.space_state.actionId}
                    actionId={this.props.space_state.actionId}
                    left_menu={left_menu}
                    right_menu={right_menu}
                />
            );
        } else if (this.props.space_state.custom_view) {
            res.push(
                <Toolbar key={"toolbar-space-" + this.props.spaceId}>
                    <ToolbarGroup firstChild={true}>
                        {left_menu}
                    </ToolbarGroup>
                    <ToolbarGroup>
                        {right_menu}
                    </ToolbarGroup>
                </Toolbar>
            );
            res.push(getClientView(this.props.space_state.custom_view));
        }
        return res;
    }
    render () {
        if (!this.props.space_state) return <Loading />
        return (<div>{this.getEntryPointApp()}</div>);
    }
}

SpaceCpt.propTypes = {
    spaceId: React.PropTypes.string.isRequired,
};

const mapStateToProps = (state, props) => {
    return {
        space_state: state.spaces[String(props.spaceId)],
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        dispatchAll: (data) => (dispatchAll(dispatch, data)),
        dispatch: dispatch,
    }
}

export const Space = connect(mapStateToProps, mapDispatchToProps)(SpaceCpt);
export default Space;
