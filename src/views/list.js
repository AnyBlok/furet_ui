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
import _ from 'underscore';
import {ViewMultiMixin} from './common';
import {X2MViewMultiMixin} from './x2m-common';

/**
 * Add Icon for List view
**/
export const ListViewIcon = Vue.component('furet-ui-list-view-icon', {
    template: '<i class="fa fa-list"></i>',
});

plugin.set(['views', 'icon'], {List: 'furet-ui-list-view-icon'})

/**
 * List view
 *
**/
export const ListViewBase = Vue.component('furet-ui-list-view-base', {
    props: ['dataIds', 'data', 'change', 'view'],
    template: `
        <b-table
            v-bind:data="tableData"
            v-bind:narrowed="narrowed"
            v-bind:checkable="isCheckable"
            v-bind:mobile-cards="mobileCard"
            v-bind:paginated="paginated"
            v-bind:per-page="perPage"
            v-bind:selected.sync="selected"
            v-bind:checked-rows.sync="checkedRows"
            v-on:dblclick="selectRow"
            v-on:check="updateCheck"
        >
            <template scope="props">
                <b-table-column v-for="header in headers"
                    v-bind:key="header.name"
                    v-bind:field="header.name"
                    v-bind:label="header.label"
                    v-bind:width="header.width"
                    v-bind:numeric="header.numeric"
                    v-bind:sortable="header.sortable"
                >
                    <component 
                        v-bind:is="header.component" 
                        v-bind:row="props.row" 
                        v-bind:index="props.index" 
                        v-bind:header="header"
                    />
                </b-table-column>
            </template>
        </b-table>
    `,
    data: () => {
        return {
            selected: {},
            checkedRows: [],
            narrowed: true,
            mobileCard: true,
            paginated: true,
        };
    },
    computed: {
        tableData () {
            const dataIds = this.dataIds ? this.dataIds : _.keys(this.data || {});
            return _.map(dataIds, dataId => Object.assign(
                {__dataId: dataId}, 
                (this.data || {})[dataId], 
                (this.change || {})[dataId]
            ));
        },
        headers () {
            return this.view && this.view.headers || [];
        },
        isCheckable () {
            if (this.view) {
                return this.view.selectable;
            }
            return false;
        },
        perPage () {
            const defaultPerPage = 20;
            if (this.view) return this.view.perPage || defaultPerPage;
            return defaultPerPage;
        },
    },
    methods: {
        selectRow (row) {
            this.$emit('selectRow', row);
        },
        updateCheck (checkedList, row) {
            this.$emit('updateCheck', checkedList);
        },
    },
});

export const ListView = Vue.component('furet-ui-list-view', {
    mixins: [ViewMultiMixin],
    props: ['spaceId', 'menuId', 'actionId','viewId', 'view', 'dataId', 'dataIds', 'data', 'change'],
    template: `
        <div>
            <nav class="level">
                <div class="level-left">
                    <div class="field has-addons">
                        <p class="control" v-if="view && view.creatable">
                            <a  class="button"
                                v-on:click="addNew"
                            >
                                <span class="icon is-small">
                                    <i class="fa fa-plus"></i>
                                </span>
                                <span>{{$t('views.common.create')}}</span>
                            </a>
                        </p>
                        <p class="control" v-if="hasChecked && view && view.deletable">
                            <a class="button"
                               v-on:click="deleteData"
                            >
                                <span class="icon is-small">
                                    <i class="fa fa-trash"></i>
                                </span>
                                <span>{{$t('views.common.delete')}}</span>
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
                        <p class="control" 
                            v-if="hasChecked && view && (view.onSelect_buttons || []).length >0"
                        >
                            <b-dropdown>
                                <button class="button" slot="trigger">
                                    <span>{{$t('views.common.more')}}</span>
                                    <span class="icon is-small">
                                        <i class="fa fa-caret-down"></i>
                                    </span>
                                </button>
                                <b-dropdown-option 
                                    v-for="button in view.onSelect_buttons"
                                    v-bind:value="button.buttonId"
                                    v-bind:key="button.buttonId"
                                    v-on:change="selectMore(button.buttonId)"
                                >
                                    {{button.label}}
                                </b-dropdown-option>
                            </b-dropdown>
                        </p>
                    </div>
                </div>
                <div class="level-right">
                    <furet-ui-search-bar-view 
                        v-if="search.length > 0"
                        v-bind:search="search" 
                        v-bind:filter="filter"
                        v-bind:model="this.view.model"
                        v-on:updateFilter="updateFilter"
                    />
                </div>
            </nav>
            <furet-ui-list-view-base
                ref="listView"
                v-bind:dataId="dataId"
                v-bind:data="data"
                v-bind:change="change"
                v-bind:view="view"
                v-on:selectRow="selectEntry"
                v-on:updateCheck="updateCheck"
            />
        </div>
    `,
    data: () => {
        return {
            checkedRows: [],
            filter: [],
        };
    },
    computed: {
        hasChecked () {
            return this.checkedRows.length > 0;
        },
    },
    methods: {
        deleteData () {
            const dataIds = _.map(this.checkedRows, row => row.__dataId);
            json_post('/data/delete', {model: this.view.model, dataIds}, {
                onSuccess: (result) => {
                    dispatchAll(result)
                    this.getData()
                },
            });
        },
        updateCheck (checkedRows) {
            this.checkedRows = checkedRows;
        },
    }
});

plugin.set(['views', 'type'], {List: 'furet-ui-list-view'});

export const deleteDataX2MDataId = (obj) => {
    const removeIds = _.map(obj.checkedRows, row => row.__dataId);
    obj.$emit('updateDataIds', _.difference(obj.dataIds, removeIds));
    obj.$store.commit('UPDATE_CHANGE_X2M_DELETE', {
        model: obj.view.model,
        dataIds: removeIds,
    });
};

export const X2MListView = Vue.component('furet-ui-x2m-list-view', {
    mixins:[X2MViewMultiMixin],
    template: `
        <div>
            <nav class="level">
                <div class="level-left">
                    <div class="field has-addons" v-if="!isReadonly">
                        <p class="control" v-if="view && view.creatable">
                            <a  class="button"
                                v-on:click="addNew"
                            >
                                <span class="icon is-small">
                                    <i class="fa fa-plus"></i>
                                </span>
                                <span>{{$t('views.common.create')}}</span>
                            </a>
                        </p>
                        <p class="control" v-if="hasChecked && view && view.deletable">
                            <a class="button"
                               v-on:click="deleteData"
                            >
                                <span class="icon is-small">
                                    <i class="fa fa-trash"></i>
                                </span>
                                <span>{{$t('views.common.delete')}}</span>
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
            <furet-ui-list-view-base
                ref="listView"
                v-bind:dataIds="dataIds"
                v-bind:data="data"
                v-bind:change="change"
                v-bind:view="view"
                v-on:selectRow="selectEntry"
                v-on:updateCheck="updateCheck"
            />
        </div>
    `,
    data: () => {
        return {
            checkedRows: [],
        };
    },
    computed: {
        hasChecked () {
            return this.checkedRows.length > 0;
        },
    },
    methods: {
        deleteData () {
            deleteDataX2MDataId(this);
        },
        updateCheck (checkedRows) {
            this.checkedRows = checkedRows;
        },
    }
});

plugin.set(['views', 'x2m-type'], {List: 'furet-ui-x2m-list-view'});
