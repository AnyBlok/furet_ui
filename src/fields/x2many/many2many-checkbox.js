/**
This file is a part of the FuretUI project

   Copyright (C) 2017 Jean-Sebastien SUZANNE <jssuzanne@anybox.fr>

This Source Code Form is subject to the terms of the Mozilla Public License,
v. 2.0. If a copy of the MPL was not distributed with this file,You can
obtain one at http://mozilla.org/MPL/2.0/.
**/
import React from 'react';
import plugin from '../../plugin';
import {connect} from 'react-redux'
import {BaseForm} from '../base';
import {dispatchAll} from '../../reducers';
import {json_post} from '../../server-call';
import _ from 'underscore';

class M2MObj extends React.Component {
    onChange (event, id) {
        const values = (this.props.value || []).slice(0);
        const index = values.indexOf(id);
        if (event.target.checked) {
            if (index == -1) values.push(id);
        } else {
            if (index != -1) values.splice(index, 1);
        }
        this.props.onChange(values);
    }
    componentDidMount () {
        json_post('/field/x2x/search', {
                model: this.props.model,
                field: this.props.field,
                limit: null,
                value: '',
            }, {
            onSuccess: (results) => {
                this.props.dispatchAll(results)
            }
        });
    }
    render () {
        return (
            <div className="row">
                {_.map(this.props.display_values, value => (
                    <div key={"M2M-" + this.props.model + '-' + value.value}
                         className={this.props.checkbox_class || ''}
                    >
                        <span>
                            <input type="checkbox" 
                                   checked={value.checked}
                                   disabled={this.props.disabled}
                                   onChange={(event) => this.onChange(event, value.value)}
                            />
                            {value.label}
                        </span>
                    </div>
                ))}
            </div>
        );
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        dispatchAll: (data) => (dispatchAll(dispatch, data)),
    }
}


export const mapStateToProps = (state, props) => {
    const data = props.model ? state.data[props.model] || {}: {};
    const computed = props.model ? state.change.computed[props.model] || {} : {};
    let values = [];
    let computed_data = Object.assign({}, data, computed);
    _.each(_.keys(computed_data), value => {
        let label = value;
        if (computed_data[value][props.field]) {
            label = computed_data[value][props.field];
        }
        const checked = props.value.indexOf(value) != -1;
        values.push({value, label, checked});
    });
    return {
        display_values: values,
    }
}


const M2M = connect(mapStateToProps, mapDispatchToProps)(M2MObj);


export class M2MCheckBoxForm extends BaseForm {
    getInputProps () {
        const props = super.getInputProps();
        props.model = this.props.model;
        props.field = this.props.field;
        props.checkbox_class = this.props.checkbox_class;
        props.onChange = (e) => this.props.onChange(this.props.name, e);
        return props;
    }
    getInput() {
        const props = this.getInputProps();
        return <M2M {...props} />
    }
}

plugin.set(['field', 'Form'], {'Many2ManyCheckBox': M2MCheckBoxForm});

export default {
    M2MCheckBoxForm,
}
