import React from 'react';


//import {Parser, ProcessNodeDefinitions} from 'html-to-react';
//
//const processNodeDefinitions = new ProcessNodeDefinitions(React);
//const htmlInput = '<div><h1>Title</h1><p>A paragraph</p><ul><li><field type="plop"/></li><li><field type="titi"/></li></ul></div>';
//const processingInstructions = [
//    {
//        // Custom <h1> processing
//        shouldProcessNode: function(node) {
//            return node.name === 'field';
//        },
//        processNode: function(node, children) {
//            return <div>{node.attribs['type']}</div>
//        }
//    }, {
//        // Anything else
//        shouldProcessNode: function(node) {
//            return true;
//        },
//        processNode: processNodeDefinitions.processDefaultNode
//    }
//];
//
//const isValidNode = () => {return true};

// export default class App extends React.Component {
//     render () {
//         const htmlToReactParser = new Parser();
//         const reactElement = htmlToReactParser.parseWithInstructions(htmlInput, isValidNode, processingInstructions);
//         return reactElement;
//     }
// }

var injectTapEventPlugin = require("react-tap-event-plugin");
injectTapEventPlugin();

import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import AppBar from 'material-ui/AppBar';
import FlatButton from 'material-ui/FlatButton';
import DialogExampleSimple from './LeftMenu';


import { createStore } from 'redux';
import { combineReducers } from 'redux'
function todoApp1(state = [], action) {
    return state
}
const todoApp = combineReducers({todoApp1});
let store = createStore(todoApp)

import {Provider} from 'react-redux';

window.onload = () => {
    console.log('==> plop')
}


export default class App extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            appbar_title: '',
            login: '',
        };
    }

    render () {
        return (
            <Provider store={store}>
                <MuiThemeProvider muiTheme={getMuiTheme(darkBaseTheme)}>
                    <AppBar
                        title={this.state.appbar_title}
                        iconElementLeft={<DialogExampleSimple />}
                        iconElementRight={<FlatButton >{this.state.login || 'Login'}</FlatButton>}
                    />
                </MuiThemeProvider>
            </Provider>
        );
    }
}
