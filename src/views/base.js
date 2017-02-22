import React from 'react';
import {json_post} from '../server-call';
import {Parser, ProcessNodeDefinitions} from 'html-to-react';

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
        console.log('getField', viewType, fieldType, attribs, value)
        return <div>{value}</div>;
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
