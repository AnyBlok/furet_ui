/**
This file is a part of the FuretUI project

   Copyright (C) 2017 Jean-Sebastien SUZANNE <jssuzanne@anybox.fr>

This Source Code Form is subject to the terms of the Mozilla Public License,
v. 2.0. If a copy of the MPL was not distributed with this file,You can
obtain one at http://mozilla.org/MPL/2.0/.
**/
import React from 'react';
import {connect} from 'react-redux'
import {RightMenu, LeftMenu} from './menus';
import AppBar from 'material-ui/AppBar';
import {getClientView} from './views';
import Space from './space';


class App extends React.Component {
    /**
     * Render children of the application, it may be:
     *  - space
     *  - custom view
     *
    **/
    getEntryPointApp () {
        const res = [];
        if (this.props.spaceId) {
            res.push(<Space key={'space-' + this.props.spaceId} spaceId={this.props.spaceId} />);
        }
        if (this.props.custom_view) {
            res.push(getClientView(this.props.custom_view));
        }
        return res;
    }
    render () {
        return (
            <div>
                <AppBar
                    title={this.props.title}
                    iconElementLeft={<LeftMenu />}
                    iconElementRight={<RightMenu />}
                />
                {this.getEntryPointApp()}
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return state.global;
}

const mapDispatchToProps = (dispatch) => {
    return {}
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
