/**
This file is a part of the FuretUI project

   Copyright (C) 2017 Jean-Sebastien SUZANNE <jssuzanne@anybox.fr>

This Source Code Form is subject to the terms of the Mozilla Public License,
v. 2.0. If a copy of the MPL was not distributed with this file,You can
obtain one at http://mozilla.org/MPL/2.0/.
**/
import chai from 'chai';
import Vue from 'vue';
import Buefy from 'buefy';
Vue.use(Buefy, {defaultIconPack: 'fa',});
import {store} from '../../store';
import {router} from '../../routes';
import {i18n} from '../../i18n';
import {addNewMulti, selectEntryMulti} from '../../views/common';

jest.mock('../../server-call')

const view = {
    viewType: 'List',
    label: 'View : 1',
    creatable: true,
    deletable: true,
    selectable: true,
    onSelect: '3',
    model: 'Test',
    headers: [
        {
            name: 'id',
            label: 'ID',
            numeric: true,
            component: 'furet-ui-list-field-integer',
        },
        {
            name: 'name',
            label: 'Label',
            sortable: true,
            component: 'furet-ui-list-field-string',
        },
        {
            name: 'bool',
            label: 'Boolean',
            component: 'furet-ui-list-field-boolean',
        },
        {
            name: 'state',
            label: 'State',
            selections: {'new': 'New', 'started': 'Started', 'done': 'Done'},
            component: 'furet-ui-list-field-selection',
        },
    ],
    search: [],
    buttons: [],
    onSelect_buttons: [],
    fields: ["id", "name", "bool", "state"],
}

describe('ViewMixin mixin', () => {
    const renderer = require('vue-server-renderer').createRenderer();
    beforeEach(() => {
        store.dispatch('UNITEST_CLEAR');
        router.push({path: '/'});
    });
    it('addNewMulti 1', () => {
        const vm = new Vue({
            el: document.createElement('div'),
            store,
            router,
            i18n,
            template: '<div />',
        });
        router.push({path: '/'});
        expect(vm.$route.path).toBe('/');
        addNewMulti({
            view,
            $router: router,
            spaceId: '1',
            menuId: '2',
            actionId: '3',
        });
        expect(vm.$route.name).toBe('space_menu_action_view_dataId');
        chai.expect(vm.$route.params).to.deep.equal({
            spaceId: '1',
            menuId: '2',
            actionId: '3',
            viewId: '3',
            dataId: vm.$route.params.dataId,
            mode: 'new',
        });
    });
    it('addNewMulti 2', () => {
        const vm = new Vue({
            el: document.createElement('div'),
            store,
            router,
            i18n,
            template: '<div />',
        });
        router.push({path: '/'});
        expect(vm.$route.path).toBe('/');
        addNewMulti({
            view,
            $router: router,
            spaceId: '1',
            actionId: '3',
        });
        expect(vm.$route.name).toBe('space_action_view_dataId');
        chai.expect(vm.$route.params).to.deep.equal({
            spaceId: '1',
            menuId: undefined,
            actionId: '3',
            viewId: '3',
            dataId: vm.$route.params.dataId,
            mode: 'new',
        });
    });
    it('selectEntryMulti 1', () => {
        const vm = new Vue({
            el: document.createElement('div'),
            store,
            router,
            i18n,
            template: '<div />',
        });
        router.push({path: '/'});
        expect(vm.$route.path).toBe('/');
        selectEntryMulti({
            view,
            $router: router,
            spaceId: '1',
            menuId: '2',
            actionId: '3',
        }, {__dataId: '4'});
        expect(vm.$route.name).toBe('space_menu_action_view_dataId');
        chai.expect(vm.$route.params).to.deep.equal({
            spaceId: '1',
            menuId: '2',
            actionId: '3',
            viewId: '3',
            dataId: '4',
            mode: 'readonly',
        });
    });
    it('selectEntryMulti 2', () => {
        const vm = new Vue({
            el: document.createElement('div'),
            store,
            router,
            i18n,
            template: '<div />',
        });
        router.push({path: '/'});
        expect(vm.$route.path).toBe('/');
        selectEntryMulti({
            view,
            $router: router,
            spaceId: '1',
            actionId: '3',
        }, {__dataId: '4'});
        expect(vm.$route.name).toBe('space_action_view_dataId');
        chai.expect(vm.$route.params).to.deep.equal({
            spaceId: '1',
            menuId: undefined,
            actionId: '3',
            viewId: '3',
            dataId: '4',
            mode: 'readonly',
        });
    });
});
