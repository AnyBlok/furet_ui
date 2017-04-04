/**
This file is a part of the FuretUI project

   Copyright (C) 2017 Jean-Sebastien SUZANNE <jssuzanne@anybox.fr>

This Source Code Form is subject to the terms of the Mozilla Public License,
v. 2.0. If a copy of the MPL was not distributed with this file,You can
obtain one at http://mozilla.org/MPL/2.0/.
**/
import Base from './base';
import React from 'react';
import ActionNoteAdd from 'material-ui/svg-icons/action/note-add';
import ActionDeleteForever from 'material-ui/svg-icons/action/delete-forever';
import IconButton from 'material-ui/IconButton';
import {blue500, red500} from 'material-ui/styles/colors';
import RaisedButton from 'material-ui/RaisedButton';
import AutoComplete from 'material-ui/AutoComplete';
import Chip from 'material-ui/Chip';
import DropdownMenu from './dropdown';
import translate from 'counterpart';
import {getNewID} from '../view';
import _ from 'underscore';


/**
 * Base view for view which render multi value
**/
export class Multi extends Base {
    constructor (props) {
        super(props);
        const search = {};
        _.each(props.search || [], s => {
            if (s.default) search[s.key] = [s.default];
        });
        this.state = {
            selectedIds: [],
            change: {},
            search: _.keys(search).length != 0 ? search : null,
            searchText: '',
        };
    }
    componentWillReceiveProps(nextProps) {
        if (this.state.search == null) {
            const search = {};
            _.each(nextProps.search || [], s => {
                if (s.default) search[s.key] = [s.default];
            });
            this.updateSearchQuery(search);
        }
    }
    /**
     * Action call when the create button is clicked
    **/
    addNewEntry () {
        if (this.props.onSelect) {
            this.getView(this.props.onSelect);
            this.props.changeView(
                'addNewEntry', this.props.actionId, this.props.onSelect, {
                    id: getNewID(this.props.model), 
                    readonly: false, 
                    returnView: this.props.viewId,
                    new: true,
                }
            );
        }
    }
    /**
     * Action call when the remove button is clicked
    **/
    removeEntry () {
        this.props.onDelete(this.state.selectedIds);
    }
    /**
     * Render the button near search box
    **/
    renderSearchBarButton () {
        return (
            <div className="row">
                { this.props.creatable &&
                    <div className="col-xs-2 col-sm-2 col-md-2 col-lg-2"
                         style={{paddingLeft: 0, paddingRight: 0}}
                    >
                        <IconButton
                            onClick={this.addNewEntry.bind(this)}
                            tooltip={translate('furetUI.views.common.create', {fallback: 'Create'})}
                            iconStyle={{
                                width: 36,
                                height: 36,
                            }}
                            style={{
                                width: 48,
                                height: 48,
                            }}
                        >
                            <ActionNoteAdd color={blue500} />
                        </IconButton>
                    </div>
                }
                { this.state.selectedIds.length != 0 && this.props.deletabe &&
                    <div className="col-xs-2 col-sm-2 col-md-2 col-lg-2"
                         style={{paddingLeft: 0, paddingRight: 0}}
                    >
                        <IconButton
                            onClick={this.removeEntry.bind(this)}
                            tooltip={translate('furetUI.views.common.delete', {fallback: 'Delete'})}
                            iconStyle={{
                                width: 36,
                                height: 36,
                            }}
                            style={{
                                width: 48,
                                height: 48,
                            }}
                        >
                            <ActionDeleteForever color={red500} />
                        </IconButton>
                    </div>
                }
                { (this.props.buttons || []).length != 0 && !this.props.parentModel && 
                    <div className="col-xs-4 col-sm-4 col-md-4 col-lg-4"
                         style={{paddingLeft: 10, paddingRight: 0}}
                    >
                        <DropdownMenu 
                            label={translate('furetUI.views.common.actions', {fallback: 'Actions'})}
                            menus={this.props.buttons} 
                        />
                    </div>
                }
                { this.state.selectedIds.length != 0 && this.props.onSelect_buttons && !this.props.parentModel && 
                    <div className="col-xs-4 col-sm-4 col-md-4 col-lg-4"
                         style={{paddingLeft: 0, paddingRight: 0}}
                    >
                        <DropdownMenu 
                            label={translate('furetUI.views.common.more', {fallback: 'More'})}
                            menus={this.props.onSelect_buttons} 
                            selectedIds={this.state.selectedIds}
                        />
                    </div>
                }
            </div>
        )
    }
    /**
     * Update the searchText value in state
    **/
    onUpdateInput (val) {
        this.setState({searchText: val});
    }
    /**
     * Update chip componnents
    **/
    updateSearchQuery (search) {
        const self = this;
        this.setState({search}, () => {
            self.call_server();
        });
    }
    /**
     * Change view when an entry has selected
    **/
    onEntrySelect(id) {
        if (this.props.onSelect) {
            this.getView(this.props.onSelect);
            this.props.changeView(
                'onEntrySelect', this.props.actionId, this.props.onSelect, {
                    id, 
                    returnView: this.props.viewId,
                }
            );
        }
    }
    /**
     * Add new chip in search box
    **/
    onNewRequest (val) {
        const search = Object.assign({}, this.state.search),
              index = val.text.indexOf(' : '),
              value = val.text.slice(index + 3);
        if (value) {
            if (! search[val.value]) search[val.value] = [];
            search[val.value].push(value);
            this.setState({searchText: ''});
            this.updateSearchQuery(search)
        }
    }
    /**
     * Remove chip in search box
    **/
    onRequestDelete (key) {
        const search = Object.assign({}, this.state.search)
        if (search[key]) delete search[key];
        this.updateSearchQuery(search)
    }
    /**
     * Render search bar
    **/
    renderSearchBar () {
        const tags = [],
              choices=[];
        _.each(this.state.search || {}, (values, key) => {
            const label = _.find(this.props.search, s => (s.key == key)).label;
            tags.push(
                <li key={key}>
                    <Chip onRequestDelete={() => {this.onRequestDelete(key)}}>
                        {label + ' : ' + values.join(', ')}
                    </Chip>
                </li>
            );
        });
        _.each(this.props.search || [], s => {
            choices.push({text: s.label + ' : ' + this.state.searchText, value: s.key});
        });

        return (
            <div className="row">
                <div className="col-xs-12 col-sm-4 col-md-4 col-lg-3">
                    {!this.props.parentReadonly && this.renderSearchBarButton()}
                </div>
                <div className="col-xs-12 col-sm-4 col-md-4 col-lg-6">
                    { !this.props.parentModel && 
                     <ul className="list-inline"
                         style={{
                             border: '2px solid gray',
                             WebkitBorderRadius: '10px',
                             MozBorderRadius: '10px',
                             borderRadius: '10px'
                         }}
                     >
                         <li>
                             <ul className="list-inline">
                                 {tags}
                             </ul>
                         </li>
                         <li>
                             <AutoComplete
                                 id='searchText'
                                 filter={AutoComplete.caseInsensitiveFilter}
                                 onNewRequest={this.onNewRequest.bind(this)}
                                 onUpdateInput={this.onUpdateInput.bind(this)}
                                 dataSource={choices}
                                 searchText={this.state.searchText}
                                 fullWidth={true}
                             />
                         </li>
                     </ul>
                    }
                </div>
                <div className="col-xs-12 col-sm-4 col-md-4 col-lg-3">
                    { !this.props.parentModel && this.props.selector}
                </div>
            </div>
        );
    }
}

export default Multi
