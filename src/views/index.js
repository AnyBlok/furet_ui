import React from 'react';
import './clients';
import './list';
import './thumbnail';
import './form';
import {dispatchAll} from '../reducers';
import {connect} from 'react-redux'
import plugin from '../plugin';
import IconButton from 'material-ui/IconButton';
import AlertWarning from 'material-ui/svg-icons/alert/warning';

class Unknown extends React.Component {
    render () {
        return (
            <div className="container">
                {this.props.selector || null}
                <h1>The wanted client view "{this.props.viewName || this.props.viewType}" is unknown</h1>
                <p>
                    Report this message to the administrator
                </p>
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


plugin.set(['views', 'icon'], {Unknown: (props) => {
    return <AlertWarning />;
}});

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

export const getView = (viewType, viewId, params) => {
    let view = plugin.get(['views', 'type', viewType]);
    if (!view) view = plugin.get(['views', 'Unknown']);
    const mapStateToProps = (state) => {
        const data = params.model ? state.data[params.model] : {};
        return Object.assign(
            {viewType, viewId, data}, 
            state.views[viewId], 
            params
        );
    }
    return (
        <div style={{margin: 20}}>
            {React.createElement(connect(mapStateToProps, mapDispatchToProps)(view), {key: 'client-' + viewType + '-' + viewId})}
        </div>
    );
};

export default {
    getClientView,
    getViewIcon,
    getView,
}
