/**
This file is a part of the FuretUI project

   Copyright (C) 2017 Jean-Sebastien SUZANNE <jssuzanne@anybox.fr>

This Source Code Form is subject to the terms of the Mozilla Public License,
v. 2.0. If a copy of the MPL was not distributed with this file,You can
obtain one at http://mozilla.org/MPL/2.0/.
**/
import React from 'react';
import Base from './base';
import plugin from '../plugin';
import EditorInsertDriveFile from 'material-ui/svg-icons/editor/insert-drive-file';
import EditorModeEdit from 'material-ui/svg-icons/editor/mode-edit';
import ActionNoteAdd from 'material-ui/svg-icons/action/note-add';
import ActionDeleteForever from 'material-ui/svg-icons/action/delete-forever';
import NavigationArrowBack from 'material-ui/svg-icons/navigation/arrow-back';
import NavigationCancel from 'material-ui/svg-icons/navigation/cancel';
import ContentSave from 'material-ui/svg-icons/content/save';
import IconButton from 'material-ui/IconButton';
import {blue500, red500} from 'material-ui/styles/colors';
import DropdownMenu from './dropdown';
import translate from 'counterpart';
import {getNewID} from '../view';

/**
 * Add Icon for Form view
**/
plugin.set(['views', 'icon'], {Form: (props) => {
    return <EditorInsertDriveFile />;
}});

/**
 * Form view
 *
**/
export class Form extends Base {
    constructor(props) {
        super(props);
        const id = props.params && props.params.id || null;
        this.state = {readonly: true, id, new: props.params && props.params.new || false};
    }
    call_server () {
        this.json_post(
            '/form/get', 
            {
                model: this.props.model,
                id: this.state.id,
                new: this.state.new,
                viewId: this.props.viewId,
                fields: this.props.fields,
            },
            {
                onSuccess: (results) => {
                    this.props.dispatchAll(results);
                },
            },
        );
    }
    /**
     * call by create action
    **/
    addNewEntry () {
        const id = getNewID(this.props.model);
        this.setState({readonly: false, id, new: true}, () => {
            this.call_server(id);
            this.props.changeView(
                'addNewEntry', this.props.actionId, this.props.viewId, {
                    id,
                    returnView: this.props.params && this.props.params.returnView,
                    readonly: false,
                    new: true,
                });
        });
        this.props.onNew(id);
    }
    /**
     * Close the current view and route to previous view
    **/
    returnPreviousView() {
        const viewId = (this.props.params && this.props.params.returnView) || this.props.onSelect;
        if (viewId) {
            this.getView(viewId);
            this.props.changeView(
                'returnPreviousView', this.props.actionId, viewId, {}
            );
        }
    }
    /**
     * call by delete button
    **/
    removeEntry () {
        this.props.onDelete([this.state.id]);
        this.returnPreviousView();
    }
    /**
     * call by save button
    **/
    saveEntry () {
        this.props.onSave(this.state.id, this.state.new, this.props.fields);
        this.setState({readonly: true, new: false}, () => {
            this.props.changeView(
                'saveEntry', this.props.actionId, this.props.viewId, {
                    id: this.state.id,
                    returnView: this.props.params && this.props.params.returnView,
                    readonly: true,
                    new: false,
                });
        });
    }
    componentWillReceiveProps(nextProps) {
        if (nextProps.params && (nextProps.params.new || !this.state.new || nextProps.params.id != this.state.id)) {
            const state = {}
            if (nextProps.params.readonly != undefined) state.readonly = nextProps.params.readonly;
            if (nextProps.params.id != undefined) state.id = nextProps.params.id;
            this.setState(state);
        }
    }
    /**
     * Render the template of the form view
    **/
    renderGetReadonly (attribs, data) {
        return this.state.readonly || this.props.parentReadonly || this.renderSafeEval(attribs.readonly, data);
    }
    renderGetOnchange () {
        const self = this;
        return (fieldname, newValue) => {
            self.props.onChange(self.state.id, fieldname, newValue, self.props.fields);
        }
    }
    renderTemplate (template) {
        if (!template) return null;
        const data = Object.assign(
            {}, 
            this.props.data && this.props.data[this.state.id],
            this.props.computed && this.props.computed[this.state.id],
            this.props.change && this.props.change[this.state.id]
        );
        return super.renderTemplate(template, 'Form', data, this.state.id);
    }
    /**
     * Render the buttons
    **/
    renderButton () {
        return (
            <div className="row">
                { !this.state.readonly && !this.props.parentModel && 
                    <div className="col-xs-1 col-sm-1 col-md-1 col-lg-1"
                         style={{paddingLeft: 0, paddingRight: 0}}
                    >
                        <IconButton
                            onClick={this.saveEntry.bind(this)}
                            tooltip={translate('furetUI.views.common.save', {fallback: 'Save'})}
                            iconStyle={{
                                width: 36,
                                height: 36,
                            }}
                            style={{
                                width: 48,
                                height: 48,
                            }}
                        >
                            <ContentSave color={blue500} />
                        </IconButton>
                    </div>
                }
                { ((this.props.creatable && this.state.readonly) || this.props.parentModel) && !this.props.parentReadonly &&
                    <div className="col-xs-1 col-sm-1 col-md-1 col-lg-1"
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
                { this.props.editable && this.state.readonly &&
                    <div className="col-xs-1 col-sm-1 col-md-1 col-lg-1"
                         style={{paddingLeft: 0, paddingRight: 0}}
                    >
                        <IconButton
                            onClick={() => this.setState({readonly: false})}
                            tooltip={translate('furetUI.views.common.edit', {fallback: 'Edit'})}
                            iconStyle={{
                                width: 36,
                                height: 36,
                            }}
                            style={{
                                width: 48,
                                height: 48,
                            }}
                        >
                            <EditorModeEdit color={blue500} />
                        </IconButton>
                    </div>
                }
                { !this.state.readonly && !this.props.parentModel &&
                    <div className="col-xs-1 col-sm-1 col-md-1 col-lg-1"
                         style={{paddingLeft: 0, paddingRight: 0}}
                    >
                        <IconButton
                            onClick={() => {
                                this.props.clearChange();
                                if (this.state.new) {
                                    this.returnPreviousView();
                                } else {
                                    this.setState({readonly: true});
                                }
                            }}
                            tooltip={translate('furetUI.views.common.cancel', {fallback: 'Cancel'})}
                            iconStyle={{
                                width: 36,
                                height: 36,
                            }}
                            style={{
                                width: 48,
                                height: 48,
                            }}
                        >
                            <NavigationCancel color={red500} />
                        </IconButton>
                    </div>
                }
                { ((this.props.deletable && this.state.readonly) || this.props.parentModel) && !this.props.parentReadonly &&
                    <div className="col-xs-1 col-sm-1 col-md-1 col-lg-1"
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
                { (this.state.readonly || this.props.parentModel) && 
                    <div className="col-xs-1 col-sm-1 col-md-1 col-lg-1"
                         style={{paddingLeft: 0, paddingRight: 0}}
                    >
                        <IconButton
                            onClick={this.returnPreviousView.bind(this)}
                            tooltip={translate('furetUI.views.common.close', {fallback: 'Close'})}
                            iconStyle={{
                                width: 36,
                                height: 36,
                            }}
                            style={{
                                width: 48,
                                height: 48,
                            }}
                        >
                            <NavigationArrowBack />
                        </IconButton>
                    </div>
                }
                { (this.props.buttons || []).length != 0 &&  !this.props.parentModel && 
                    <div className="col-xs-4 col-sm-4 col-md-4 col-lg-4">
                        <DropdownMenu 
                            label={translate('furetUI.views.common.actions', {fallback: 'Actions'})}
                            menus={this.props.buttons} 
                        />
                    </div>
                }
            </div>
        )
    }
    render () {
        return (
            <div>
                <div className="row">
                    <div className="col-xs-12 col-sm-8 col-md-8 col-lg-9">
                        {this.renderButton()}
                    </div>
                    <div className="col-xs-12 col-sm-4 col-md-4 col-lg-3">
                        {this.state.readonly && this.props.selector}
                    </div>
                </div>
                <div className="row">
                    {this.renderTemplate(this.props.template)}
                </div>
            </div>
        )
    }
}

plugin.set(['views', 'type'], {Form})

export default Form
