/**
This file is a part of the FuretUI project

   Copyright (C) 2017 Jean-Sebastien SUZANNE <jssuzanne@anybox.fr>

This Source Code Form is subject to the terms of the Mozilla Public License,
v. 2.0. If a copy of the MPL was not distributed with this file,You can
obtain one at http://mozilla.org/MPL/2.0/.
**/
import Vue from 'vue';
import plugin from '../plugin';
import {dispatchAll} from '../store';
import {json_post, json_post_dispatch_all} from '../server-call';
import {getNewID} from '../view';
import _ from 'underscore';

/**
 * Add Icon for Form view
**/
export const FormViewIcon = Vue.component('furet-ui-form-view-icon', {
    template: '<i class="fa fa-file-o"></i>',
});

plugin.set(['views', 'icon'], {Form: 'furet-ui-form-view-icon'})

export const addNewDataId = (obj) => {
    obj.$router.push({
        name: obj.menuId ? 'space_menu_action_view_dataId' : 'space_action_view_dataId',
        params: {
            spaceId: obj.spaceId,
            menuId: obj.menuId,
            actionId: obj.actionId,
            viewId: obj.viewId,
            dataId: getNewID(obj.view.model),
            mode: 'new',
        }
    });
};
export const openModeDataId = (obj) => {
    obj.$router.push({
        name: obj.menuId ? 'space_menu_action_view_dataId' : 'space_action_view_dataId',
        params: {
            spaceId: obj.spaceId,
            menuId: obj.menuId,
            actionId: obj.actionId,
            viewId: obj.viewId,
            dataId: obj.dataId,
            mode: 'readwrite',
        }
    });
};
export const closeModeDataId = (obj) => {
    if (obj.view.onClose) {
        obj.$router.push({
            name: obj.menuId ? 'space_menu_action_view' : 'space_action_view',
            params: {
                spaceId: obj.spaceId,
                menuId: obj.menuId,
                actionId: obj.actionId,
                viewId: obj.view.onClose,
            }
        });
    }
};
export const cancelModeDataId = (obj) => {
    obj.$store.commit('CLEAR_CHANGE');
    if (obj.mode == 'new') {
        closeModeDataId(obj)
    } else {
        obj.$router.push({
            name: obj.menuId ? 'space_menu_action_view_dataId' : 'space_action_view_dataId',
            params: {
                spaceId: obj.spaceId,
                menuId: obj.menuId,
                actionId: obj.actionId,
                viewId: obj.viewId,
                dataId: obj.dataId,
                mode: 'readonly',
            }
        });
    }
};

export const FormView = Vue.component('furet-ui-form-view', {
    props: ['spaceId', 'menuId', 'actionId','viewId', 'view', 'dataId', 'mode', 'data', 'change'],
    template: `
        <div>
            <nav class="level">
                <div class="level-left">
                    <div class="field has-addons">
                        <p class="control" v-if="mode == 'readonly' && view && view.creatable">
                            <a  class="button"
                                v-on:click="addNew"
                            >
                                <span class="icon is-small">
                                    <i class="fa fa-plus"></i>
                                </span>
                                <span>{{$t('views.common.create')}}</span>
                            </a>
                        </p>
                        <p class="control" v-if="mode == 'readonly' && view && view.editable">
                            <a  class="button"
                                v-on:click="openMode"
                            >
                                <span class="icon is-small">
                                    <i class="fa fa-pencil"></i>
                                </span>
                                <span>{{$t('views.common.edit')}}</span>
                            </a>
                        </p>
                        <p class="control" v-if="mode == 'readonly' && view && view.deletable">
                            <a  class="button"
                                v-on:click="deleteData"
                            >
                                <span class="icon is-small">
                                    <i class="fa fa-trash"></i>
                                </span>
                                <span>{{$t('views.common.delete')}}</span>
                            </a>
                        </p>
                        <p class="control" v-if="mode == 'readonly'">
                            <a  class="button"
                                v-on:click="closeMode"
                            >
                                <span class="icon is-small">
                                    <i class="fa fa-times"></i>
                                </span>
                                <span>{{$t('views.common.close')}}</span>
                            </a>
                        </p>
                        <p class="control" v-if="mode != 'readonly'">
                            <a  class="button"
                                v-on:click="saveData"
                            >
                                <span class="icon is-small">
                                    <i class="fa fa-floppy-o"></i>
                                </span>
                                <span>{{$t('views.common.save')}}</span>
                            </a>
                        </p>
                        <p class="control" v-if="mode != 'readonly'">
                            <a  class="button"
                                v-on:click="cancelMode"
                            >
                                <span class="icon is-small">
                                    <i class="fa fa-times"></i>
                                </span>
                                <span v-if="mode == 'new'">{{$t('views.common.close')}}</span>
                                <span v-if="mode == 'readwrite'">{{$t('views.common.cancel')}}</span>
                            </a>
                        </p>
                        <p class="control" 
                            v-if="view && (view.buttons || []).length >0"
                        >
                            <b-dropdown>
                                <button class="button" slot="trigger">
                                    <span>{{$t('views.common.actions')}}</span>
                                    <span class="icon is-small">
                                        <i class="fa fa-caret-down"></i>
                                    </span>
                                </button>
                                <b-dropdown-option 
                                    v-for="button in view.buttons"
                                    v-bind:value="button.buttonId"
                                    v-bind:key="button.buttonId"
                                    v-on:change="selectAction(button.buttonId)"
                                >
                                    {{button.label}}
                                </b-dropdown-option>
                            </b-dropdown>
                        </p>
                    </div>
                </div>
            </nav>
            <section 
                class="box"
                v-bind:style="{'margin-bottom': '20px'}"
            >
                <component v-bind:is="form_card" v-bind:config="config"/>
            </section>
        </div>
    `,
    created: function () {
        if (this.view) this.getData();
    },
    computed: {
        config () {
            return {
                data: this.data,
                view: this.view,
                spaceId: this.spaceId,
                menuId: this.menuId,
                actionId: this.actionId,
                viewId: this.viewId,
                dataId: this.dataId,
                mode: this.mode,
                store_key: 'UPDATE_CHANGE',
            }
        },
        form_card () {
            if (this.view) {
                return {
                    template: this.view.template,
                    props: ['config'],
                };
            }
            return {
                template: '<div></div>'
            };
        },
    },
    methods: {
        getData () {
            json_post_dispatch_all('/data/read/' + this.dataId, {model: this.view.model, new: this.mode == 'new', fields: this.view.fields, viewId: this.viewId});
        },
        addNew () {
            addNewDataId(this);
        },
        openMode () {
            openModeDataId(this);
        },
        closeMode () {
            closeModeDataId(this);
        },
        cancelMode () {
            cancelModeDataId(this);
        },
        deleteData () {
            json_post_dispatch_all('/data/delete', {model: this.view.model, dataIds: [this.dataId], path: {spaceId: this.spaceId, menuId: this.menuId, actionId: this.actionId, viewId: this.view.onClose}});
        },
        saveData () {
            const changes = Object.assign({}, this.$store.state.data.changes)
            if (changes[this.view.model] && changes[this.view.model][this.dataId]) delete changes[this.view.model][this.dataId];
            json_post(
                this.mode == 'new' ? '/data/create' : '/data/update', 
                {
                    model: this.view.model,
                    dataId: this.dataId,
                    data: this.change,
                    changes,
                    fields: this.view.fields,
                    path: {
                        spaceId: this.spaceId,
                        menuId: this.menuId,
                        actionId: this.actionId,
                        viewId: this.viewId,
                    },
                },
                {
                    onSuccess: (result) => {
                        dispatchAll(result)
                        this.$store.commit('CLEAR_CHANGE');
                    },
                }
            )
        }
    }
});

plugin.set(['views', 'type'], {Form: 'furet-ui-form-view'});

export const addNewX2MDataId = (obj) => {
    const newId = getNewID(obj.view.model)
    const dataIds = obj.dataIds.slice(0);
    dataIds.push(newId);
    const values = {dataId: newId};
    if (obj.x2oField != undefined) values[obj.x2oField] = obj.x2oFieldId;
    obj.updateValueX2M(newId, values, true);
    obj.$emit('updateDataIds', dataIds);
    obj.$emit('changeView', obj.viewId, newId);
};
export const deleteDataX2MDataId = (obj) => {
    const dataIds = obj.dataIds.slice(0);
    const index = dataIds.indexOf(obj.dataId);
    dataIds.splice(index, 1);
    obj.$emit('updateDataIds', dataIds);
    obj.$store.commit('UPDATE_CHANGE_X2M_DELETE', {
        model: obj.view.model,
        dataIds: [obj.dataId],
    });
    if (obj.view.onClose) obj.$emit('changeView', obj.view.onClose);
    else obj.$emit('changeView', obj.viewId, dataIds.length ? dataIds[0] : null);
}
export const updateValueX2M = (obj, dataId, values, create) => {
    if (create) obj.$store.commit('CREATE_CHANGE_X2M', {model: obj.view.model, dataId});
    _.each(_.keys(values), fieldname => {
        obj.$store.commit('UPDATE_CHANGE_X2M', {
            model: obj.view.model,
            dataId,
            fieldname,
            value: values[fieldname],
        });
    });
};

export const X2MFormView = Vue.component('furet-ui-x2m-form-view', {
    props: ['model', 'views', 'viewId', 'view', 'dataIds', 'dataId', 'data', 'change', 'isReadonly', 'x2oField', 'x2oFieldId'],
    template: `
        <div>
            <nav class="level">
                <div class="level-left">
                    <div class="field has-addons">
                        <p class="control" v-if="!isReadonly && view && view.creatable">
                            <a  class="button"
                                v-on:click="addNew"
                            >
                                <span class="icon is-small">
                                    <i class="fa fa-plus"></i>
                                </span>
                                <span>{{$t('views.common.create')}}</span>
                            </a>
                        </p>
                        <p class="control" v-if="!isReadonly && view && view.deletable">
                            <a  class="button"
                                v-on:click="deleteData"
                            >
                                <span class="icon is-small">
                                    <i class="fa fa-trash"></i>
                                </span>
                                <span>{{$t('views.common.delete')}}</span>
                            </a>
                        </p>
                        <p class="control">
                            <a  class="button"
                                v-on:click="closeMode"
                            >
                                <span class="icon is-small">
                                    <i class="fa fa-times"></i>
                                </span>
                                <span>{{$t('views.common.close')}}</span>
                            </a>
                        </p>
                    </div>
                </div>
                <div class="level-right">
                    <furet-ui-view-selector
                        v-bind:views="views"
                        v-bind:viewId="viewId"
                        v-on:changeView="changeView"
                    />
                </div>
            </nav>
            <section 
                class="box"
                v-bind:style="{'margin-bottom': '10px'}"
            >
                <component v-bind:is="form_card" v-bind:config="config"/>
            </section>
        </div>
    `,
    created: function () {
        const changes = this.$store.state.data.changes.new || {};
        const newIds = _.keys(changes[this.model] || {});
        json_post_dispatch_all('/list/x2m/get', {model: this.model, fields: this.view.fields, dataIds: _.filter(this.dataIds, dataId => newIds.indexOf(dataId) == -1)});
    },
    computed: {
        config () {
            return {
                data: this.data,
                view: this.view,
                viewId: this.viewId,
                dataId: this.dataId,
                mode: this.isReadonly ? 'readonly' : 'readwrite',
                store_key: 'UPDATE_CHANGE_X2M',
            }
        },
        form_card () {
            if (this.view) {
                return {
                    template: this.view.template,
                    props: ['config'],
                };
            }
            return {
                template: '<div></div>'
            };
        },
    },
    methods: {
        addNew () {
            addNewX2MDataId(this);
        },
        closeMode () {
            if (this.view.onClose) {
                this.$emit('changeView', this.view.onClose);
            }
        },
        deleteData () {
            deleteDataX2MDataId(this);
        },
        changeView(viewId) {
            this.$emit('changeView', viewId);
        },
        updateValueX2M(dataId, values, create) {
            updateValueX2M(this, dataId, values, create);
        },
    }
});

plugin.set(['views', 'x2m-type'], {Form: 'furet-ui-x2m-form-view'});
