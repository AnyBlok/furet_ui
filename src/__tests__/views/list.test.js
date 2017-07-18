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
import {ListView,
        X2MListView, deleteDataX2MDataId, updateValueX2M} from '../../views/list';
import '../../views/search';
import '../../fields';
import '../../space';

jest.mock('../../server-call')

const views = [
    {
        viewId: '1',
        viewType: 'List',
    },
    {
        viewId: '2',
        viewType: 'Thumbnail',
    },
    {
        viewId: '3',
        viewType: 'Form',
        unclickable: true,
    },
    {
        viewId: '4',
        viewType: 'Unknown',
    },
];

const view_list = {
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

const dataIds = ['1', '2', '3'];
const dataIds2 = ['1', '2', '3', 'newId'];

const data = {
    '1': {
        id: 1,
        name: 'Label 1',
        state: 'new',
        bool: true,
    },
    '2': {
        id: 2,
        name: 'Label 2',
        state: 'new',
        bool: true,
    },
    '3': {
        id: 3,
        name: 'Label 3',
        state: 'new',
        bool: true,
    },
    '4': {
        id: 4,
        name: 'Label 4',
        state: 'new',
        bool: true,
    },
};

const change = {
    '1': {
        id: 1,
        name: 'Label 1 bis',
        state: 'new',
        bool: false,
    },
};

describe('furet-ui-list-view component', () => {
    const renderer = require('vue-server-renderer').createRenderer();
    beforeEach(() => {
        store.dispatch('UNITEST_CLEAR');
        router.push({path: '/'});
    });
    it('Render without data', () => {
        const vm = new Vue({
            el: document.createElement('div'),
            store,
            router,
            i18n,
            render: h => h(ListView, {props: {
            }}),
        });
        renderer.renderToString(vm, (err, str) => {
            expect(str).toMatchSnapshot();
        });
    });
    it('Render with data 1', () => {
        const vm = new Vue({
            el: document.createElement('div'),
            store,
            router,
            i18n,
            render: h => h(ListView, {props: {
                view: view_list,
                dataIds,
            }}),
        });
        renderer.renderToString(vm, (err, str) => {
            expect(str).toMatchSnapshot();
        });
    });
    it('Render with data 2', () => {
        const vm = new Vue({
            el: document.createElement('div'),
            store,
            router,
            i18n,
            render: h => h(ListView, {props: {
                view: view_list,
                dataIds,
                data,
            }}),
        });
        renderer.renderToString(vm, (err, str) => {
            expect(str).toMatchSnapshot();
        });
    });
    it('Render with data 3', () => {
        const vm = new Vue({
            el: document.createElement('div'),
            store,
            router,
            i18n,
            render: h => h(ListView, {props: {
                view: view_list,
                dataIds,
                data,
                change,
            }}),
        });
        renderer.renderToString(vm, (err, str) => {
            expect(str).toMatchSnapshot();
        });
    });
});

describe('furet-ui-x2m-list-view component', () => {
    const renderer = require('vue-server-renderer').createRenderer();
    beforeEach(() => {
        store.dispatch('UNITEST_CLEAR');
        router.push({path: '/'});
    });
    it('Render without data 1', () => {
        const vm = new Vue({
            el: document.createElement('div'),
            store,
            router,
            i18n,
            render: h => h(X2MListView, {props: {
                view: view_list,
                views: [],
            }}),
        });
        renderer.renderToString(vm, (err, str) => {
            expect(str).toMatchSnapshot();
        });
    });
    it('Render without data 2', () => {
        const vm = new Vue({
            el: document.createElement('div'),
            store,
            router,
            i18n,
            render: h => h(X2MListView, {props: {
                view: view_list,
                views,
                dataIds,
            }}),
        });
        renderer.renderToString(vm, (err, str) => {
            expect(str).toMatchSnapshot();
        });
    });
    it('Render with data 1', () => {
        const vm = new Vue({
            el: document.createElement('div'),
            store,
            router,
            i18n,
            render: h => h(X2MListView, {props: {
                view: view_list,
                views,
            }}),
        });
        renderer.renderToString(vm, (err, str) => {
            expect(str).toMatchSnapshot();
        });
    });
    it('Render with data 2', () => {
        const vm = new Vue({
            el: document.createElement('div'),
            store,
            router,
            i18n,
            render: h => h(X2MListView, {props: {
                view: view_list,
                views,
                viewId: '1',
                dataIds: dataIds2,
                model: 'Test',
                data,
            }}),
        });
        renderer.renderToString(vm, (err, str) => {
            expect(str).toMatchSnapshot();
        });
    });
    it('Render with data 2', () => {
        const vm = new Vue({
            el: document.createElement('div'),
            store,
            router,
            i18n,
            render: h => h(X2MListView, {props: {
                view: view_list,
                views,
                viewId: '1',
                dataIds: dataIds2,
                model: 'Test',
                data,
                change,
            }}),
        });
        renderer.renderToString(vm, (err, str) => {
            expect(str).toMatchSnapshot();
        });
    });
    it('deleteDataX2MDataId', () => {
        const vm = new Vue({
            el: document.createElement('div'),
            store,
            router,
            i18n,
            template: '<div />',
        });
        deleteDataX2MDataId({
            view: view_list,
            dataIds,
            checkedRows: [{__dataId: '3'}],
            $emit: (key, value) => {
                expect(key).toBe('updateDataIds');
                chai.expect(value).to.deep.equal(['1', '2']);
            },
            $store: store,
        });
        expect(store.state.data.changes.Test['3']).toBe('DELETED');
    });
});
