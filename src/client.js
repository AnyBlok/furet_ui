import React from 'react';
import ReactDOM from 'react-dom';
require('bootstrap-loader');
require("font-awesome-loader");
import injectTapEventPlugin from 'react-tap-event-plugin';
import {getMuiTheme, MuiThemeProvider} from 'material-ui/styles';
import {createStore, combineReducers} from 'redux';
import {Provider} from 'react-redux';
import lightBaseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';
import {json_post} from './server-call';
import {dispatchAll} from './reducers';
import reducers from './reducers';
import plugin from './plugin';
import './views';
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
const store = createStore(combineReducers(reducers));


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
export default FuretUI;
