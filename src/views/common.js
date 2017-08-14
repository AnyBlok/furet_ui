/**
This file is a part of the FuretUI project

   Copyright (C) 2017 Jean-Sebastien SUZANNE <jssuzanne@anybox.fr>

This Source Code Form is subject to the terms of the Mozilla Public License,
v. 2.0. If a copy of the MPL was not distributed with this file,You can
obtain one at http://mozilla.org/MPL/2.0/.
**/
import {json_post_dispatch_all} from '../server-call';
import {getNewID} from '../view';

export const addNewMulti = (obj) => {
    if (obj.view.onSelect) {
        obj.$router.push({
            name: obj.menuId ? 'space_menu_action_view_dataId' : 'space_action_view_dataId',
            params: {
                spaceId: obj.spaceId,
                menuId: obj.menuId,
                actionId: obj.actionId,
                viewId: obj.view.onSelect,
                dataId: getNewID(obj.view.model),
                mode: 'new',
            }
        });
    }
};
export const selectEntryMulti = (obj, card) => {
    if (obj.view.onSelect) {
        obj.$router.push({
            name: obj.menuId ? 'space_menu_action_view_dataId' : 'space_action_view_dataId',
            params: {
                spaceId: obj.spaceId,
                menuId: obj.menuId,
                actionId: obj.actionId,
                viewId: obj.view.onSelect,
                dataId: card.__dataId,
                mode: 'readonly',
            }
        });
    }
}

export const ViewMultiMixin = {
    props: ['spaceId', 'menuId', 'actionId','viewId', 'view', 'dataId', 'dataIds', 'data', 'change'],
    created: function () {
        if (this.view) this.getData();
    },
    computed: {
        search () {
            if (this.view) {
                return this.view.search;
            }
            return [];
        },
    },
    methods: {
        getData () {
            json_post_dispatch_all('/data/read', {model: this.view.model, filter: this.filter, fields: this.view.fields, viewId: this.viewId});
        },
        updateFilter(filter) {
            this.filter = filter;
            this.getData();
        },
        addNew () {
            addNewMulti(this);
        },
        selectEntry (entry) {
            selectEntryMulti(this, entry);
        },
        selectAction (button) {
            json_post_dispatch_all(
                '/button/' + button.buttonId, 
                {viewId: this.viewId, model: this.view.model, options: button.options});
        },
    },
}

export const GroupMixin = {
    props: ['invisible'],
    render (h) {
        if (this.isInvisible) return null;
        return h('div', {props: this.$props}, this.$slots.default);
    },
}

export const ButtonMixin = {
    props: ['invisible', 'disabled', 'buttonId', 'options', 'viewId', 'model', 'icon'],
    render (h) {
        if (this.isInvisible) return null;
        const props = Object.assign({}, this.$props, {disabled: this.isDisabled})
        const children = [];
        if (this.icon) {
            children.push(h('span', {'class': 'icon'}, [h('i', {'class': 'fa ' + this.icon})]));
        }
        children.push(h('span', this.$slots.default));
        return h('a', {props, 'class': {button: true}, on: {click: this.onClick}}, children);
    },
    methods: {
        onClick (event) {
            event.stopPropagation();
            json_post_dispatch_all(
                '/button/' + this.buttonId, 
                {viewId: this.viewId, model: this.model, options: this.options, dataIds: [this.dataId]});
        },
    },
};
