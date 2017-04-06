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
import Select from 'react-select';
import {dispatchAll} from '../../reducers';
import {json_post} from '../../server-call';
import _ from 'underscore';
import translate from 'counterpart';

class M2MObj extends React.Component {
    onChange (val) {
        let value = null;
        if (Array.isArray(val)) {
            value = _.map(val, v => v.value);
        }
        this.props.onChange(value);
    }
    callServer (inputValue) {
        json_post('/field/x2x/search', {
                model: this.props.model,
                field: this.props.field,
                limit: this.props.limit,
                value: inputValue,
            }, {
            onSuccess: (results) => {
                this.props.dispatchAll(results)
            }
        });
    }
    onInputChange (inputValue) {
        this.callServer(inputValue);
    }
    onOpen () {
        this.callServer(null);
    }
    render () {
        return (
            <Select
                disabled={this.props.disabled}
                value={this.props.value}
                options={this.props.options}
                onChange={this.onChange.bind(this)}
                onInputChange={this.onInputChange.bind(this)}
                onOpen={this.onOpen.bind(this)}
                multi={true}
                noResultsText={translate('furetUI.fields.many2many-tags.no-found', 
                                         {fallback: 'No results found'})}
            />
        );
    }
}


const mapDispatchToProps = (dispatch) => {
    return {
        dispatchAll: (data) => (dispatchAll(dispatch, data)),
    }
}


const mapStateToProps = (state, props) => {
    const data = props.model ? state.data[props.model] || {}: {};
    const computed = props.model ? state.change.computed[props.model] || {} : {};
    const computed_data = Object.assign({}, data, computed);
    const options = [];
    _.each(_.keys(computed_data), id => {
        options.push({value: id, label: computed_data[id][props.field] || ''});
    });
    return {
        options,
    }
}


const M2M = connect(mapStateToProps, mapDispatchToProps)(M2MObj);


export class M2MCheckBoxForm extends BaseForm {
    getInputProps () {
        const props = super.getInputProps();
        props.type = 'text';
        props.model = this.props.model;
        props.field = this.props.field;
        props.limit = this.props.limit
        props.onChange = (e) => this.props.onChange(this.props.name, e);
        return props;
    }
    getInput() {
        const props = this.getInputProps();
        return <M2M {...props} />
    }
}

plugin.set(['field', 'Form'], {'Many2ManyTags': M2MCheckBoxForm});

export default {
    M2MCheckBoxForm,
}
