/**
This file is a part of the FuretUI project

   Copyright (C) 2017 Jean-Sebastien SUZANNE <jssuzanne@anybox.fr>

This Source Code Form is subject to the terms of the Mozilla Public License,
v. 2.0. If a copy of the MPL was not distributed with this file,You can
obtain one at http://mozilla.org/MPL/2.0/.
**/
import React from 'react';
import ReactDOM from 'react-dom';
require("font-awesome-loader");
import 'react-select/dist/react-select.css';
import injectTapEventPlugin from 'react-tap-event-plugin';
import {getMuiTheme, MuiThemeProvider} from 'material-ui/styles';
import {createStore, combineReducers, applyMiddleware} from 'redux';
import {Provider} from 'react-redux';
import lightBaseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';
import {json_post} from './server-call';
import {dispatchAll} from './reducers';
import reducers, {send2Server} from './reducers';
import plugin from './plugin';
import './views';
import './fields';
import App from './app';

plugin.set([], {initData: (store) => {
    json_post('/init/required/data', {}, {
        onSuccess: (result) => {
            dispatchAll(store.dispatch, result);
        },
        onError: (error, response) => {
            console.error('call initial required data', error || response.body)
        },
        onComplete: (error, response) => {
            json_post('/init/optionnal/data', {}, {
                onSuccess: (result) => {
                    dispatchAll(store.dispatch, result);
                },
                onError: (error, response) => {
                    console.error('call initial optional data', error || response.body)
                },
            });
        },
    });
}});

injectTapEventPlugin();
const store = createStore(
    combineReducers(reducers), 
    applyMiddleware(send2Server)
);

class FuretUI extends React.Component {
    componentDidMount () {
        const initData = plugin.get(['initData']);
        if (initData) initData(store);
    }
    render () {
        return (
            <Provider store={store}>
                <MuiThemeProvider muiTheme={getMuiTheme(lightBaseTheme)}>
                    <App />
                </MuiThemeProvider>
            </Provider>
        );
    }
}

window.FuretUI = FuretUI;
window.React = React;
window.ReactDOM = ReactDOM;
window.plugin = plugin;
export default FuretUI;
