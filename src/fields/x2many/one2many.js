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
import {BaseList, BaseThumbnail, BaseForm} from '../base';
import Chip from 'material-ui/Chip';
import _ from 'underscore';
import {mapDispatchToProps} from '../x2one';
import {Action} from '../../action';
import {json_post} from '../../server-call';


class One2ManyLinkObj extends React.Component {
    onClick (value) {
        this.props.addInBreadCrumb(
            this.props.currentActionId, this.props.model, this.props.actionId, value);
    }
    render () {
        return (
            <div style={{display: 'flex', flexWrap: 'wrap'}}>
                {_.map(this.props.display_values, value => (
                    <div
                        key={'m2m-' + this.props.model + '-' + value.value}
                    >
                        <a 
                              onClick={(event) => {
                                  event.stopPropagation();
                                  this.onClick(value.value);
                              }}
                        >{value.label}</a>
                        <span>,</span>
                    </div>
                ))}
            </div>
        )
    }
}


export const mapStateToProps = (state, props) => {
    const data = props.model ? state.data[props.model] || {}: {};
    const computed = props.model ? state.change.computed[props.model] || {} : {};
    let values = [];
    let computed_data = Object.assign({}, data, computed);
    _.each(props.value, value => {
        let label = value;
        if (computed_data[value]) {
            if (computed_data[value][props.field]) {
                label = computed_data[value][props.field];
            }
        }
        values.push({value, label});
    });
    return {
        display_values: values,
    }
}


const One2ManyLink = connect(mapStateToProps, mapDispatchToProps)(One2ManyLinkObj);

export class One2ManyList extends BaseList {
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
        return <One2ManyLink {...props}/>
    }
}

export class One2ManyThumbnail extends BaseThumbnail {
    getInputProps () {
        const props = super.getInputProps();
        delete props.className;
        props.model = this.props.model;
        props.field = this.props.field;
        props.actionId = this.props.actionId || this.props.actionid;
        props.currentActionId = this.props.currentActionId;
        return props;
    }
    getInput () {
        const props = this.getInputProps()
        return (
            <div>
                <One2ManyLink {...props}/>
            </div>
        );
    }
}

class One2ManyCpt extends React.Component {
    componentDidMount () {
        json_post('/field/x2x/open', {
                model: this.props.model,
                actionId: this.props.actionId,
                value: this.props.value,
            }, {
            onSuccess: (results) => {
                this.props.dispatchAll(results)
            }
        });
    }
    render () {
        const action = this.props.action_data[this.props.actionId] || {};
        return (
            <Action
                actionId={this.props.actionId}
                dataId={this.props.dataId}
                dataIds={this.props.value}
                views={action ? action.views : []}
                viewId={action ? action.viewId : ''}
                model={this.props.model}
                fieldName={this.props.fieldName}
                parentModel={this.props.parentModel}
                parentReadonly={this.props.parentReadonly}
                many2oneField={this.props.many2oneField}
            />
        );
    }
}

const mapStateToProps2 = (state) => {
    return state.action_manager;
}

const One2Many = connect(mapStateToProps2, mapDispatchToProps)(One2ManyCpt);

export class One2ManyForm extends BaseForm {
    getInputProps () {
        const props = super.getInputProps();
        delete props.className;
        props.model = this.props.model
        props.actionId = this.props.actionId || this.props.actionid;
        props.currentActionId = this.props.currentActionId;
        props.dataId = this.props.dataId;
        props.fieldName = this.props.name;
        props.parentModel = this.props.currentModel;
        props.parentReadonly = this.props.readonly;
        props.many2oneField = this.props.many2oneField || this.props.many2onefield;
        return props;
    }
    getInput () {
        const props = this.getInputProps();
        return <One2Many {...props} />
    }
}

plugin.set(['field', 'List'], {'One2Many': One2ManyList});
plugin.set(['field', 'Thumbnail'], {'One2Many': One2ManyThumbnail});
plugin.set(['field', 'Form'], {'One2Many': One2ManyForm});

export default {
    One2ManyList,
    One2ManyThumbnail,
    One2ManyForm,
}
