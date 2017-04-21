/**
This file is a part of the FuretUI project

   Copyright (C) 2017 Jean-Sebastien SUZANNE <jssuzanne@anybox.fr>

This Source Code Form is subject to the terms of the Mozilla Public License,
v. 2.0. If a copy of the MPL was not distributed with this file,You can
obtain one at http://mozilla.org/MPL/2.0/.
**/
import React from 'react';
import {dispatchAll} from './reducers';
import {connect} from 'react-redux'
import plugin from './plugin';
import IconButton from 'material-ui/IconButton';
import uuid from 'uuid/v1';

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
            onNew: () => {},
            onSave: (dataId, newData, fields) => {
                dispatch({
                    type: 'ON_SAVE', 
                    newData, 
                    dataId, 
                    model: params.model,
                    uuid: uuid(),
                    fields,
                });
                dispatch({type: 'TO_SEND'});
            },
            onDelete: (dataIds) => {
                dispatch({
                    type: 'ON_DELETE', 
                    dataIds, 
                    model: params.model,
                    uuid: uuid(),
                });
                dispatch({type: 'TO_SEND'});
            },
            changeView: (cause, actionId, viewId, params) => {
                dispatch({
                    type: 'UPDATE_ACTION_SELECT_VIEW',
                    actionId,
                    viewId,
                    params,
                })
            },
        });
    };
    const _mapDispatchToProps2 = (dispatch) => {
        const res = mapDispatchToProps(dispatch);
        return Object.assign({}, res, {
            onNew: (newId) => {
                const newValue = params.dataIds ? params.dataIds.slice(0) : [];
                newValue.push(newId);
                dispatch({
                    type: 'ON_CHANGE',
                    model: params.parentModel,
                    dataId: params.dataId,
                    fieldname: params.fieldName,
                    newValue,
                });
                if (params.many2oneField) {
                    dispatch({
                        type: 'ON_CHANGE',
                        model: params.model,
                        dataId: newId,
                        fieldname: params.many2oneField,
                        newValue: params.dataId,
                    });
                }
            },
            onChange: (dataId, fieldname, newValue, fields) => {
                dispatch({
                    type: 'ON_CHANGE',
                    model: params.model,
                    dataId,
                    fieldname,
                    newValue,
                    fields,
                });
            },
            onDelete: (dataIds) => {
                dispatch({
                    type: 'ON_CHANGE_DELETE', 
                    dataIds, 
                    model: params.model,
                });
            },
            changeView: (cause, actionId, viewId, params) => {
                switch (cause) {
                    case 'onEntrySelect':
                    case 'addNewEntry':
                        params.readonly = false;
                        break;
                }
                dispatch({
                    type: 'UPDATE_ACTION_SELECT_VIEW',
                    actionId,
                    viewId,
                    params,
                })
            },
        });
    };
    return (
        <div style={{margin: 20}}>
            {React.createElement(
                connect(mapStateToProps, params.dataId ? _mapDispatchToProps2 : _mapDispatchToProps)(view),
                {key: 'client-' + viewType + '-' + viewId}
            )}
        </div>
    );
};

export const getNewID = (model) => {
    return 'new-' + model + '-' + uuid();
}

export default {
    getClientView,
    getViewIcon,
    getView,
    getNewID,
}
