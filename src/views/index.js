/**
This file is a part of the FuretUI project

   Copyright (C) 2017 Jean-Sebastien SUZANNE <jssuzanne@anybox.fr>

This Source Code Form is subject to the terms of the Mozilla Public License,
v. 2.0. If a copy of the MPL was not distributed with this file,You can
obtain one at http://mozilla.org/MPL/2.0/.
**/
import React from 'react';
import './clients';
import './list';
import './thumbnail';
import './form';
import '../fields';
import {dispatchAll} from '../reducers';
import {connect} from 'react-redux'
import plugin from '../plugin';
import IconButton from 'material-ui/IconButton';
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

const mapDispatchToProps = (dispatch) => {
    return {
        dispatchAll: (data) => (dispatchAll(dispatch, data)),
        dispatch: dispatch,
    }
}

/**
 * Return a component with the wanted view, if no view the the return view will be the Unknown view
 *
 * @viewName: name of the wanted view
 *
**/
export const getClientView = (viewName) => {
    let view = plugin.get(['views', 'type', 'client', viewName]);
    if (!view) view = plugin.get(['views', 'Unknown']);
    const mapStateToProps = (state) => {
        return {
            viewName,
            global_state: state.global,
            client_state: state.client[viewName],
        };
    }
    const _mapDispatchToProps = (dispatch) => {
        const res = mapDispatchToProps(dispatch);
        return Object.assign({}, res, {
            client_dispatch: (obj) => {
                const data = Object.assign({type: 'UPDATE_VIEW_CLIENT', viewName}, obj);
                dispatch(data);
            },
        });
    };
    return React.createElement(connect(mapStateToProps, _mapDispatchToProps)(view), {key: 'client-' + viewName});
};


/**
 * Unknown icon for view selector
**/
plugin.set(['views', 'icon'], {Unknown: (props) => {
    return <AlertWarning />;
}});

/**
 * Return the Icon component which represent the standard view
 *
 * @type: typs of the standard view
 * @onClick: onClick callback on the Icon
 *
**/
export const getViewIcon = (type, onclick) => {
    let view = plugin.get(['views', 'icon', type]);
    if (!view) view = plugin.get(['views', 'icon', 'Unknown']);
    return (
        <IconButton
           iconStyle={{height: 24, width: 24}}
           style={{height: 36, width: 36, padding: 2}}
           onClick={onclick}
        >
            {React.createElement(view)};
        </IconButton>
    );
}

/**
 * Return the stanadrd view
 *
 * @viewType: type of the standard view
 * @viewd: (string) id of the view
 * @params: object
 *
**/
export const getView = (viewType, viewId, params) => {
    let view = plugin.get(['views', 'type', viewType]);
    if (!view) view = plugin.get(['views', 'Unknown']);
    const mapStateToProps = (state) => {
        const change = params.model ? state.change.current[params.model] || {}: {};
        const data = params.model ? state.data[params.model] || {}: {};
        const computed = params.model ? state.change.computed[params.model] || {} : {};
        return Object.assign(
            {viewType, viewId, data, change, computed}, 
            state.views[viewId], 
            params
        );
    }
    const _mapDispatchToProps = (dispatch) => {
        const res = mapDispatchToProps(dispatch);
        return Object.assign({}, res, {
            onChange: (dataId, fieldname, newValue) => {
                dispatch({
                    type: 'ON_CHANGE',
                    model: params.model,
                    dataId,
                    fieldname,
                    newValue,
                });
            },
            clearChange: () => {
                dispatch({type: 'CLEAR_CHANGE'});
            },
        });
    };
    return (
        <div style={{margin: 20}}>
            {React.createElement(connect(mapStateToProps, _mapDispatchToProps)(view), {key: 'client-' + viewType + '-' + viewId})}
        </div>
    );
};

export default {
    getClientView,
    getViewIcon,
    getView,
    Unknown,
}
