/**
This file is a part of the FuretUI project

   Copyright (C) 2017 Jean-Sebastien SUZANNE <jssuzanne@anybox.fr>

This Source Code Form is subject to the terms of the Mozilla Public License,
v. 2.0. If a copy of the MPL was not distributed with this file,You can
obtain one at http://mozilla.org/MPL/2.0/.
**/
import './clients';
import './list';
import './thumbnail';
import './form';
import React from 'react';
import plugin from '../plugin';
import AlertWarning from 'material-ui/svg-icons/alert/warning';
import translate from 'counterpart';

/**
 * Unknown view, use if no view found
 *
 * props:
 *  @selector: Component used by the view
 *  @viewName: Name of the custom view which is not available
 *  @viewType: Name of the standard view which is not available
 *
**/
export class Unknown extends React.Component {
    render () {
        return (
            <div>
                <div className="row">
                    <div className="col-xs-12 col-sm-8 col-md-8 col-lg-9">
                    </div>
                    <div className="col-xs-12 col-sm-4 col-md-4 col-lg-3">
                        {this.props.selector || null}
                    </div>
                </div>
                <div className="container">
                    <h1>{translate('furetUI.views.unknown.title', {name: this.props.viewName || this.props.viewType, fallback: 'The wanted view "%(name)s" is unknown'})}</h1>
                    <p>
                        {translate('furetUI.views.unknown.message', {fallback: 'Report this message to the administrator'})}
                    </p>
                </div>
            </div>
        );
    }
}

plugin.set(['views'], {Unknown});

/**
 * Unknown icon for view selector
**/
plugin.set(['views', 'icon'], {Unknown: (props) => {
    return <AlertWarning />;
}});

export default {
    Unknown,
}
