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

const safe_eval = (condition, fields) => {
    const now = Date.now(),
          toDate = (v) => new Date(v);
    let res = false;
    try {
        res = eval(condition) ? true : false;
    } catch (e) {};
    return res;
}

/**
 * List view
 *
**/
export const ListViewBase = Vue.component('furet-ui-list-view-base', {
    props: ['dataIds', 'data', 'change', 'view'],
    created: function () {
        if (this.view && (this.dataIds || []).length  == 0) this.getData();
    },
    template: `
        <b-table
            v-bind:data="tableData"
            v-bind:loading="loading"
            v-bind:paginated="paginated"
            v-bind:backend-pagination="backend_pagination"
            v-bind:total="view.total"
            v-bind:per-page="perPage"
            v-on:page-change="onPageChange"
            v-bind:backend-sorting="backend_sorting"
            v-bind:default-sort-direction="defaultSortOrder"
            v-bind:default-sort="(sortField && [sortField, sortOrder]) || view && view.default_sort"
            v-on:sort="onSort"
            v-bind:narrowed="narrowed"
            v-bind:checkable="isCheckable"
            v-bind:mobile-cards="mobileCard"
            v-bind:selected.sync="selected"
            v-bind:checked-rows.sync="checkedRows"
            v-on:dblclick="selectRow"
            v-on:check="updateCheck"
            v-bind:style="{overflowX: 'auto'}"
            v-bind:row-class="rowClass"
        >
             <template slot-scope="props" slot="header">
                <b-tooltip 
                    v-bind:active="!!props.column.meta" 
                    v-bind:label="props.column.meta" 
                    position="is-bottom"
                    dashed
                >
                    {{ props.column.label }}
                </b-tooltip>
            </template>
            <template slot-scope="props">
                <b-table-column v-for="header in headers"
                    v-bind:key="header.name"
                    v-bind:field="header.name"
                    v-bind:label="header.label"
                    v-bind:width="header.width"
                    v-bind:numeric="header.numeric"
                    v-bind:sortable="header.sortable"
                    v-bind:centered="header.centered"
                    v-bind:meta="header.tooltip"
                >
                    <component 
                        v-bind:is="header.component" 
                        v-bind:row="props.row" 
                        v-bind:index="props.index" 
                        v-bind:header="header"
                    />
                </b-table-column>
            </template>
            <div slot="empty" v-if="view && view.empty">
                <div v-html="view.empty" />
            </div>
        </b-table>
    `,
    data: () => {
        return {
            loading: false,
            paginated: true,
            backend_pagination: true,
            page: 1,
            total: 100,
            backend_sorting: true,
            sortField: null,
            sortOrder: 'desc',
            defaultSortOrder: 'desc',
            selected: {},
            checkedRows: [],
            narrowed: true,
            mobileCard: true,
        };
    },
    computed: {
        tableData () {
            const dataIds = this.dataIds ? this.dataIds : _.keys(this.data || {});
            console.log(' ==> ', dataIds, this.dataIds)
            debugger
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
        rowClass (row, index) {
            const view = this.view;
            let res = '';
            if (view && view.colors) {
                if (view.colors.danger && safe_eval(view.colors.danger, row)) res = 'furetui-list-danger';
                else if (view.colors.warning && safe_eval(view.colors.warning, row)) res = 'furetui-list-warning';
                else if (view.colors.success && safe_eval(view.colors.success, row)) res = 'furetui-list-success';
                else if (view.colors.info && safe_eval(view.colors.info, row)) res = 'furetui-list-info';
                else if (view.colors.primary && safe_eval(view.colors.danger, row)) res = 'furetui-list-primary';
                else {
                    const keys = _.without(_.keys(view.colors), 'danger', 'warning', 'success', 'info', 'primary');
                    _.each(keys, key => {
                        if (safe_eval(view.colors[key], row)) res = 'furetui-list-' + key
                    })
                }
            }
            return res;
        },
        getData() {
            this.$emit(
                'need_update_data', 
                {
                    offset: (this.page - 1) * this.perPage,
                    sort: (this.sortField && [this.sortField, this.sortOrder]) || this.view && this.view.default_sort,
                    limit: this.perPage,
                }
            )
        },
        onPageChange(page) {
            this.page = page;
            this.getData()
        },
        onSort(field, order) {
            this.sortField = field
            this.sortOrder = order
            this.getData()
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
                                <b-dropdown-item 
                                    v-for="button in view.buttons"
                                    v-bind:value="button.buttonId"
                                    v-bind:key="button.buttonId"
                                    v-on:click="selectAction(button)"
                                >
                                    {{button.label}}
                                </b-dropdown-item>
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
                                <b-dropdown-item 
                                    v-for="button in view.onSelect_buttons"
                                    v-bind:value="button.buttonId"
                                    v-bind:key="button.buttonId"
                                    v-on:click="selectMore(button)"
                                >
                                    {{button.label}}
                                </b-dropdown-item>
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
                v-on:need_update_data="getData"
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
        selectMore (button) {
            const dataIds = _.map(this.checkedRows, row => row.__dataId);
            json_post_dispatch_all(
                '/button/' + button.buttonId, 
                {dataIds, viewId: this.viewId, model: this.view.model, options: button.options});
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
