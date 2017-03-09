/**
This file is a part of the FuretUI project

   Copyright (C) 2017 Jean-Sebastien SUZANNE <jssuzanne@anybox.fr>

This Source Code Form is subject to the terms of the Mozilla Public License,
v. 2.0. If a copy of the MPL was not distributed with this file,You can
obtain one at http://mozilla.org/MPL/2.0/.
**/
import React from 'react';
import {indigo500, red500} from 'material-ui/styles/colors';

class Base extends React.Component {
    getLabelProps () {
        const props = {
            htmlFor: this.props.id,
        }
        return props;
    }
    getLabel () {
        const props = this.getLabelProps();
        return <label {...props}>{this.props.label || ' '}</label>
    }
    getInputProps () {
        const props = {
            className: "form-control",
            id: this.props.id, 
            value: this.props.value,
        };
        return props;
    }
    getInput () {
        const props = this.getInputProps();
        return <input {...props}/>
    }
    getProps () {
        return {
            className: 'form-group',
        }
    }
    updateThisData () {
        this.required = Boolean(eval(this.props.required));
        this.error = ''
        if (this.required && !this.props.readonly && !this.props.value) {
            this.error = 'This field is required';
        }
    }
    getError () {
        if (this.error) {
            return (
                <div>
                    <span style={{color: red500}}>{this.error}</span>
                </div>
            );
        }
        return null;
    }
    render () {
        this.updateThisData();
        const props = this.getProps();
        return (
            <div {...props}>
                {this.getLabel()}
                {this.getInput()}
                {this.getError()}
            </div>
        );
    }
}

export class BaseList extends Base {
    getProps () {
        return {}
    }
    getLabel () {
        return null;
    }
    getInput () {
        return <span>{this.props.value}</span>
    }
    getError () {
        return null;
    }
}

export class BaseThumbnail extends Base {
    getInput () {
        return (
            <div>
                <span>{this.props.value}</span>
            </div>
        )
    }
    getError () {
        return null;
    }
}

export class BaseForm extends Base {
    getLabelProps () {
        const props = super.getLabelProps();
        props.style = {}
        if (this.required) props.style.color = indigo500;
        return props;
    }
    getInputProps () {
        const props = super.getInputProps();
        props.disabled = this.props.readonly;
        props.onChange = (e) => this.props.onChange(this.props.name, e.target.value);
        return props;
    }
}

export default {
    BaseList,
    BaseThumbnail,
    BaseForm,
}
