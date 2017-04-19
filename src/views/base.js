/**
This file is a part of the FuretUI project

   Copyright (C) 2017 Jean-Sebastien SUZANNE <jssuzanne@anybox.fr>

This Source Code Form is subject to the terms of the Mozilla Public License,
v. 2.0. If a copy of the MPL was not distributed with this file,You can
obtain one at http://mozilla.org/MPL/2.0/.
**/
import React from 'react';
import {json_post} from '../server-call';
import {Parser, ProcessNodeDefinitions} from 'html-to-react';
import plugin from '../plugin';
import {getField} from '../field';

export const processNodeDefinitions = new ProcessNodeDefinitions(React);


/**
 * Base class to render standard view
 *
**/
export default class extends React.Component {
    constructor(props) {
        super(props);
        this.json_post = json_post;
    }
    /**
     * Templating html2react validation method
    **/
    isValidNode () {
        return true
    }
    /**
     * Render a field for the view
    **/
    getField(viewType, fieldType, attribs, data) {
        attribs.currentActionId = this.props.actionId;
        attribs.currentModel = this.props.model;
        attribs.data = data;
        return getField(viewType, fieldType, attribs, data[attribs.name] || null);
    }
    /**
     * Render template html2react for template come from the server
    **/
    renderTemplate (template, processingInstructions) {
        const htmlToReactParser = new Parser();
        const _template = template.replace(/(\r\n|\n|\r)/gmi,"").trim();
        return htmlToReactParser.parseWithInstructions(
            _template, this.isValidNode.bind(this), processingInstructions
        );
    }
    getView (viewId) {
        json_post('/view/' + viewId, {}, {
            onSuccess: (results) => {
                this.props.dispatchAll(results)
            }
        });
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
