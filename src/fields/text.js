/**
This file is a part of the FuretUI project

   Copyright (C) 2017 Jean-Sebastien SUZANNE <jssuzanne@anybox.fr>

This Source Code Form is subject to the terms of the Mozilla Public License,
v. 2.0. If a copy of the MPL was not distributed with this file,You can
obtain one at http://mozilla.org/MPL/2.0/.
**/
import React from 'react';
import plugin from '../plugin';
import {BaseList, BaseThumbnail, BaseForm} from './base';
import translate from 'counterpart';

/** CFor unit test **/
let RichTextEditor = null;
if (process.env.NODE_ENV == 'test') {
    RichTextEditor = () => {return <div />};
    RichTextEditor.createValueFromString = () => {return 'Test'};
} else {
    RichTextEditor = require('react-rte').default;
}
/** CFor unit test **/

export class TextList extends BaseList {
    getInput () {
        return (
            <RichTextEditor
                value={RichTextEditor.createValueFromString(this.value || '', 'html')}
                readOnly={true}
            />
        );
    }
}

export class TextThumbnail extends BaseThumbnail {
    getInput () {
        return (
            <RichTextEditor
                id={this.props.id}
                value={RichTextEditor.createValueFromString(this.value || '', 'html')}
                readOnly={true}
            />
        );
    }
}

export class TextForm extends BaseForm {
    constructor(props) {
        super(props);
        this.state = {
            value: RichTextEditor.createValueFromString(props.value || '', 'html'),
        };
    }
    componentWillReceiveProps(nextProps) {
        if (nextProps.readonly !== this.props.readonly) {
            this.setState({
                value: RichTextEditor.createValueFromString(nextProps.value || this.props.value || '', 'html'),
            });
        }
        else if (nextProps.readonly && this.props.value != nextProps.value) {
            this.setState({
                value: RichTextEditor.createValueFromString(nextProps.value || this.props.value || '', 'html'),
            });
        }
    }
    updateThisData () {
        super.updateThisData();
        if (this.required && !this.props.readonly && this.value == '<p><br></p>') {
            this.error = translate('furetUI.fields.common.required', 
                                   {fallback: 'This field is required'});
        }
    }
    getInput () {
        return (
            <RichTextEditor
                value={this.state.value}
                readOnly={this.props.readonly}
                onChange={(value) => {
                    this.setState({value});
                    this.props.onChange(this.props.name, value.toString('html'))
                }}
            />
        );
    }
}

plugin.set(['field', 'List'], {'Text': TextList});
plugin.set(['field', 'Thumbnail'], {'Text': TextThumbnail});
plugin.set(['field', 'Form'], {'Text': TextForm});
plugin.set(['field', 'List'], {'uText': TextList});
plugin.set(['field', 'Thumbnail'], {'uText': TextThumbnail});
plugin.set(['field', 'Form'], {'uText': TextForm});


export default {
    TextList,
    TextThumbnail,
    TextForm,

}
