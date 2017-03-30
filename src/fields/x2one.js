/**
This file is a part of the FuretUI project

   Copyright (C) 2017 Jean-Sebastien SUZANNE <jssuzanne@anybox.fr>

This Source Code Form is subject to the terms of the Mozilla Public License,
v. 2.0. If a copy of the MPL was not distributed with this file,You can
obtain one at http://mozilla.org/MPL/2.0/.
**/
import React from 'react';
import plugin from '../plugin';
import {connect} from 'react-redux'
import {BaseList, BaseThumbnail, BaseForm} from './base';
import Select from 'react-select';
import {dispatchAll} from '../reducers';
import {json_post} from '../server-call';
import _ from 'underscore'


class X2OLinkObj extends React.Component {
    onClick (event) {
        event.stopPropagation();
        this.props.addInBreadCrumb(
            this.props.currentActionId, this.props.model, this.props.actionId, this.props.value);
    }
    render () {
        return <a onClick={this.onClick.bind(this)}>{this.props.display_value}</a>
    }
}


const mapDispatchToProps = (dispatch) => {
    return {
        dispatchAll: (data) => (dispatchAll(dispatch, data)),
        addInBreadCrumb: (currentActionId, model, newActionId, value) => {
            json_post('/field/x2one/open', {
                    model,
                    actionId: newActionId,
                    value,
                }, {
                onSuccess: (results) => {
                    dispatchAll(dispatch, results)
                }
            });
            dispatch({
                type: 'ADD_CURRENTS',
                actionId: currentActionId,
            });
            if (newActionId) {
                dispatch({
                    type: 'UPDATE_ACTION_MANAGER_ADD_ACTION',
                    actionId: newActionId,
                });
                dispatch({
                    type: 'UPDATE_ACTION_SELECT_VIEW',
                    actionId: newActionId,
                    params: {
                        id: value,
                        readonly: false,
                    }
                });
            }
        },
    }
}


const mapStateToProps = (state, props) => {
    const data = props.model ? state.data[props.model] || {}: {};
    const computed = props.model ? state.change.computed[props.model] || {} : {};
    let value = '';
    let computed_data = Object.assign({}, data, computed);
    if (computed_data[props.value]) {
        if (computed_data[props.value][props.field]) {
            value = computed_data[props.value][props.field];
        }
    }
    return {
        display_value: value,
    }
}


const X2OLink = connect(mapStateToProps, mapDispatchToProps)(X2OLinkObj);

class X2OObj extends React.Component {
    onClick (event) {
        event.stopPropagation();
        this.props.addInBreadCrumb(
            this.props.currentActionId, this.props.model, this.props.actionId, this.props.value);
    }
    onChange (val) {
        let value = null;
        if (Array.isArray(val)) {
            // to nothing because the value is removed
        } else if (val) {
            value = val.value;
        }
        this.props.onChange(value);
    }
    callServer (inputValue) {
        json_post('/field/x2one/search', {
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
    renderSelect () {
        return (
            <Select
                disabled={this.props.disabled}
                value={this.props.value}
                options={this.props.options}
                onChange={this.onChange.bind(this)}
                onInputChange={this.onInputChange.bind(this)}
                onOpen={this.onOpen.bind(this)}
            />
        );
    }
    render () {
        if (this.props.value) {
            return (
                <div className="input-group">
                    {this.renderSelect()}
                    <span className="input-group-addon">
                        <i onClick={this.onClick.bind(this)}
                           className="fa fa-external-link fa-lg"></i>
                    </span>
                </div>
            );
        } else {
            return this.renderSelect();
        }
    }
}


const mapStateToProps2 = (state, props) => {
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


const X2O = connect(mapStateToProps2, mapDispatchToProps)(X2OObj);


export class X2OList extends BaseList {
    getInputProps () {
        const props = super.getInputProps();
        delete props.className;
        props.model = this.props.model;
        props.field = this.props.field;
        props.actionId = this.props.actionId;
        props.currentActionId = this.props.currentActionId;
        return props;
    }
    getInput () {
        const props = this.getInputProps()
        return <X2OLink {...props}/>
    }
}

export class X2OThumbnail extends BaseThumbnail {
    getInputProps () {
        const props = super.getInputProps();
        delete props.className;
        props.model = this.props.model;
        props.field = this.props.field;
        props.actionId = this.props.actionId;
        props.currentActionId = this.props.currentActionId;
        return props;
    }
    getInput () {
        const props = this.getInputProps()
        return (
            <div>
                <X2OLink {...props}/>
            </div>
        );
    }
}

export class X2OForm extends BaseForm {
    getInputProps () {
        const props = super.getInputProps();
        props.type = 'text';
        props.model = this.props.model;
        props.field = this.props.field;
        props.limit = this.props.limit
        props.currentActionId = this.props.currentActionId;
        props.actionId = this.props.actionId || this.props.actionid; // somme html attribute's name can be lower by the parser
        props.onChange = (e) => this.props.onChange(this.props.name, e);
        return props;
    }
    getInput() {
        const props = this.getInputProps();
        return <X2O {...props} />
    }
}

plugin.set(['field', 'List'], {'Many2One': X2OList});
plugin.set(['field', 'Thumbnail'], {'Many2One': X2OThumbnail});
plugin.set(['field', 'Form'], {'Many2One': X2OForm});
plugin.set(['field', 'List'], {'One2One': X2OList});
plugin.set(['field', 'Thumbnail'], {'One2One': X2OThumbnail});
plugin.set(['field', 'Form'], {'One2One': X2OForm});

export default {
    X2OList,
    X2OThumbnail,
    X2OForm,
}
