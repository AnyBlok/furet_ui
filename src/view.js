/**
This file is a part of the FuretUI project

   Copyright (C) 2017 Jean-Sebastien SUZANNE <jssuzanne@anybox.fr>

This Source Code Form is subject to the terms of the Mozilla Public License,
v. 2.0. If a copy of the MPL was not distributed with this file,You can
obtain one at http://mozilla.org/MPL/2.0/.
**/
import Vue from 'vue';
import plugin from './plugin';
import uuid from 'uuid/v1';
import _ from 'underscore';

export const getNewID = (model) => {
    return 'new-' + model + '-' + uuid();
}


const ViewMixin = {
    props: ['viewId', 'dataId'],
    computed: {
        view () {
            const views = this.$store.state.data.views;
            if (this.viewId) return views[String(this.viewId)] || {};
            return {};
        },
    },
}

/**
 * Return the stanadrd view
 *
**/
export const View = Vue.component('furet-ui-view', {
    props: ['spaceId', 'menuId', 'actionId', 'mode'],
    mixins: [ViewMixin],
    render: function(createElement) {
        let view = plugin.get(['views', 'type', this.view.viewType]);
        if (!view) view = plugin.get(['views', 'Unknown']).vue;
        return createElement(view, {
            props: {
                spaceId: this.spaceId,
                menuId: this.menuId,
                actionId: this.actionId,
                viewId: this.viewId,
                view: this.view,
                viewName: this.view.viewType,
                dataId: this.dataId,
                data: this.data,
                change: this.change,
                mode: this.mode,
            },
        });
    },
    computed: {
        model () {
            if (this.view) {
                return this.view.model;
            }
            return null;
        },
        data () {
            if (this.model) {
                let data = this.$store.state.data.data;
                let changes = this.$store.state.data.changes;

                if (this.dataId) {
                    data = (data[this.model]) ? data[this.model][String(this.dataId)] || {} : {};
                    changes = (changes[this.model]) ? changes[this.model][String(this.dataId)] || {} : {};
                    return Object.assign({}, data, changes);
                }
                if (this.view.dataIds && data[this.model]) {
                    const res = {};
                    _.each(this.view.dataIds, dataId => {
                        if (data[this.model] && data[this.model][dataId]) {
                            res[dataId] = data[this.model][dataId];
                        }
                    });
                    return res;
                }

                return data[this.model] || {};
            }
            if (this.dataId) return {};
            return [];
        },
        change () {
            if (this.dataId) {
                const changes = this.$store.state.data.changes;
                return (changes[this.model]) ? changes[this.model][String(this.dataId)] || {} : {};
            }
            return {};
        },
    },
});

/**
 * Return the stanadrd view for x2Many fields
 *
**/
export const X2MView = Vue.component('furet-ui-x2m-view', {
    props: ['model', 'views', 'dataIds', 'isReadonly', 'x2oField', 'x2oFieldId'],
    mixins: [ViewMixin],
    render: function(createElement) {
        let view = plugin.get(['views', 'x2m-type', this.view.viewType]);
        if (!view) view = plugin.get(['views', 'Unknown']).vue;
        return createElement(view, {
            props: {
                model: this.model,
                views: this.views,
                viewId: this.viewId,
                view: this.view,
                viewName: this.view.viewType,
                dataIds: this.dataIds,
                dataId: this.dataId,
                data: this.data,
                change: this.change,
                isReadonly: this.isReadonly,
                x2oField: this.x2oField,
                x2oFieldId: this.x2oFieldId,
            },
            on: {
                changeView: this.changeView,
                updateDataIds: this.updateDataIds,
            },
        });
    },
    computed: {
        data () {
            if (this.model) {
                let data = this.$store.state.data.data;
                let changes = this.$store.state.data.changes;

                if (this.dataId) {
                    data = (data[this.model]) ? data[this.model][String(this.dataId)] || {} : {};
                    if (changes[this.model] && changes[this.model][String(this.dataId)] != undefined) changes = changes[this.model][String(this.dataId)];
                    else if (changes.new && changes.new[this.model] && changes.new[this.model][String(this.dataId)] != undefined) changes = changes.new[this.model][String(this.dataId)];
                    else changes = {};
                    return Object.assign({}, data, changes);
                }
                const d = {};
                _.each(this.dataIds, dataId => {
                    const _data = (data[this.model]) ? data[this.model][String(dataId)] || {} : {};
                    let _changes = {};
                    if (changes[this.model] && changes[this.model][String(dataId)] != undefined) _changes = changes[this.model][String(dataId)];
                    else if (changes.new && changes.new[this.model] && changes.new[this.model][String(dataId)] != undefined) _changes = changes.new[this.model][String(dataId)];
                    d[dataId] = Object.assign({}, _data, _changes);
                });
                return d;
            }
            return {};
        },
        change () {
            if (this.dataId) {
                const changes = this.$store.state.data.changes;
                if (changes[this.model] && changes[this.model][String(this.dataId)] != undefined) return changes[this.model][String(this.dataId)];
                else if (changes.new && changes.new[this.model] && changes.new[this.model][String(this.dataId)] != undefined) return changes.new[this.model][String(this.dataId)];
            }
            return {};
        },
    },
    methods: {
        changeView (viewId, dataId) {
            this.$emit('changeView', viewId, dataId);
        },
        updateDataIds (dataIds) {
            this.$emit('updateDataIds', dataIds);
        },
    },
});


/**
 * Return the Icon component which represent the standard view
 *
 * @type: typs of the standard view
 *
**/
export const ViewIcon = Vue.component('furet-ui-view-icon', {
    props: ['type'],
    render: function(createElement) {
        let view = plugin.get(['views', 'icon', this.type]);
        if (!view) view = plugin.get(['views', 'icon', 'Unknown']);
        return createElement(view, {});
    }
});

/**
 * Return a component with the wanted view, if no view the the return view will be the Unknown view
 *
 * @viewName: name of the wanted view
 *
**/
export const CustomView = Vue.component('furet-ui-custom-view', {
    props: ['viewName'],
    render: function(createElement) {
        let view = plugin.get(['views', 'type', 'client', this.viewName]);
        if (!view) view = plugin.get(['views', 'Unknown']);
        if (view.vue) return createElement(view.vue, {props: {viewName: this.viewName}});
        else if (view.function) return view.function({
            createElement, store: this.$store, router: this.$router});
    }
});
