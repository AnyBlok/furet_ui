import React from 'react';
import {json_post} from '../server-call';
import {Parser, ProcessNodeDefinitions} from 'html-to-react';
import plugin from '../plugin';

export const processNodeDefinitions = new ProcessNodeDefinitions(React);



export default class extends React.Component {
    constructor(props) {
        super(props);
        this.json_post = json_post;
    }
    isValidNode () {
        return true
    }
    getField(viewType, fieldType, attribs, value) {
        let field = plugin.get(['field', viewType, fieldType, attribs.name]);
        if (!field) {
            field = plugin.get(['field', 'Unknown']);
            console.log('getField', viewType, fieldType, attribs, value)
        }
        return React.createElement(field, Object.assign({}, attribs, {value}));
    }
    renderTemplate (template, processingInstructions) {
        const htmlToReactParser = new Parser();
        const _template = template.replace(/(\r\n|\n|\r)/gmi,"").trim();
        return htmlToReactParser.parseWithInstructions(
            _template, this.isValidNode.bind(this), processingInstructions
        );
    }
    call_server () {}
    componentDidMount () {
        this.call_server();
    }
    render () {
        return (
            <div>
                <div className="row">
                    {this.props.selector}
                </div>
                Base view
            </div>
        );
    }
}
