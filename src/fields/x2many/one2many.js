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

plugin.set(['field', 'List'], {'One2Many': One2ManyList});
plugin.set(['field', 'Thumbnail'], {'One2Many': One2ManyThumbnail});

export default {
    One2ManyList,
    One2ManyThumbnail,
}
