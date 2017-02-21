import React from 'react';
import {json_post} from '../server-call';

export default class extends React.Component {
    constructor(props) {
        super(props);
        this.json_post = json_post
    }
    getField(viewType, fieldType, value) {
        console.log('getField', viewType, fieldType, value)
        return value;
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
