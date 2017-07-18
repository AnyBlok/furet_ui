/**
This file is a part of the FuretUI project

   Copyright (C) 2017 Jean-Sebastien SUZANNE <jssuzanne@anybox.fr>

This Source Code Form is subject to the terms of the Mozilla Public License,
v. 2.0. If a copy of the MPL was not distributed with this file,You can
obtain one at http://mozilla.org/MPL/2.0/.
**/
import Vue from 'vue';
import Vuex from 'vuex';
import Buefy from 'buefy';
Vue.use(Buefy, {defaultIconPack: 'fa',});
import {store} from '../../store';
import {router} from '../../routes';
import {i18n} from '../../i18n';
import '../../view';
import '../../views';
import '../../fields';
import '../../space';
import {FieldListOne2Many, FieldThumbnailOne2Many, FieldFormOne2Many} from '../../fields/relationship/one2many'

jest.mock('../../server-call')

describe('One2Many list component', () => {
    const renderer = require('vue-server-renderer').createRenderer();
    beforeEach(() => {
        store.dispatch('UNITEST_CLEAR');
    });
    it('Render with data', () => {
        const vm = new Vue({
            el: document.createElement('div'),
            store,
            router,
            i18n,
            render: h => h(FieldListOne2Many, {props: {
                row: {fieldname: ['1']},
                header: {name: 'fieldname', model: 'Test', display: 'fields.name'},
            }}),
        });
        store.commit({
            type: 'UPDATE_DATA',
            model: 'Test',
            data: {'1': {name: 'Test'}},
        });
        renderer.renderToString(vm, (err, str) => {
            expect(str).toMatchSnapshot();
        });
    });
    it('Render without data 1', () => {
        const vm = new Vue({
            el: document.createElement('div'),
            store,
            router,
            i18n,
            render: h => h(FieldListOne2Many, {props: {
                row: {},
                header: {name: 'fieldname', model: 'Test', display: 'fields.name'},
            }}),
        });
        store.commit({
            type: 'UPDATE_DATA',
            model: 'Test',
            data: {'1': {name: 'Test'}},
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
            render: h => h(FieldListOne2Many, {props: {
                row: {fieldname: ['1']},
                header: {name: 'fieldname', model: 'Test', display: 'fields.name'},
            }}),
        });
        renderer.renderToString(vm, (err, str) => {
            expect(str).toMatchSnapshot();
        });
    });
    it('Render invisible is True', () => {
        const vm = new Vue({
            el: document.createElement('div'),
            store,
            router,
            i18n,
            render: h => h(FieldListOne2Many, {props: {
                row: {fieldname: ['1']},
                header: {name: 'fieldname', invisible: true, model: 'Test', display: 'fields.name'},
            }}),
        });
        store.commit({
            type: 'UPDATE_DATA',
            model: 'Test',
            data: {'1': {name: 'Test'}},
        });
        renderer.renderToString(vm, (err, str) => {
            expect(str).toMatchSnapshot();
        });
    });
    it('Render invisible is false', () => {
        const vm = new Vue({
            el: document.createElement('div'),
            store,
            router,
            i18n,
            render: h => h(FieldListOne2Many, {props: {
                row: {fieldname: ['1']},
                header: {name: 'fieldname', invisible: false, model: 'Test', display: 'fields.name'},
            }}),
        });
        store.commit({
            type: 'UPDATE_DATA',
            model: 'Test',
            data: {'1': {name: 'Test'}},
        });
        renderer.renderToString(vm, (err, str) => {
            expect(str).toMatchSnapshot();
        });
    });
    it('Render invisible condition is true', () => {
        const vm = new Vue({
            el: document.createElement('div'),
            store,
            router,
            i18n,
            render: h => h(FieldListOne2Many, {props: {
                row: {fieldname: ['1'], invisible: true},
                header: {name: 'fieldname', invisible: 'fields.invisible', model: 'Test', display: 'fields.name'},
            }}),
        });
        store.commit({
            type: 'UPDATE_DATA',
            model: 'Test',
            data: {'1': {name: 'Test'}},
        });
        renderer.renderToString(vm, (err, str) => {
            expect(str).toMatchSnapshot();
        });
    });
    it('Render invisible condition is false', () => {
        const vm = new Vue({
            el: document.createElement('div'),
            store,
            router,
            i18n,
            render: h => h(FieldListOne2Many, {props: {
                row: {fieldname: ['1'], invisible: false},
                header: {name: 'fieldname', invisible: 'fields.invisible', model: 'Test', display: 'fields.name'},
            }}),
        });
        store.commit({
            type: 'UPDATE_DATA',
            model: 'Test',
            data: {'1': {name: 'Test'}},
        });
        renderer.renderToString(vm, (err, str) => {
            expect(str).toMatchSnapshot();
        });
    });
    it('Render fieldcolor', () => {
        const vm = new Vue({
            el: document.createElement('div'),
            store,
            router,
            i18n,
            render: h => h(FieldListOne2Many, {props: {
                row: {fieldname: ['1']},
                header: {name: 'fieldname', fieldcolor: 'color', model: 'Test', display: 'fields.name'},
            }}),
        });
        store.commit({
            type: 'UPDATE_DATA',
            model: 'Test',
            data: {'1': {name: 'Test', color: '#123456'}},
        });
        renderer.renderToString(vm, (err, str) => {
            expect(str).toMatchSnapshot();
        });
    });
});

describe('One2Many Thumbnail component', () => {
    const renderer = require('vue-server-renderer').createRenderer();
    beforeEach(() => {
        store.dispatch('UNITEST_CLEAR');
    });
    it('Render', () => {
        const vm = new Vue({
            el: document.createElement('div'),
            store,
            router,
            i18n,
            render: h => h(FieldThumbnailOne2Many, {props: {
                data: {fieldname: ['1']},
                name: 'fieldname',
                model: 'Test',
                display: 'fields.name',
            }}),
        });
        store.commit({
            type: 'UPDATE_DATA',
            model: 'Test',
            data: {'1': {name: 'Test'}},
        });
        renderer.renderToString(vm, (err, str) => {
            expect(str).toMatchSnapshot();
        });
    });
    it('Render without data 1', () => {
        const vm = new Vue({
            el: document.createElement('div'),
            store,
            router,
            i18n,
            render: h => h(FieldThumbnailOne2Many, {props: {
                data: {},
                name: 'fieldname',
                model: 'Test',
                display: 'fields.name',
            }}),
        });
        store.commit({
            type: 'UPDATE_DATA',
            model: 'Test',
            data: {'1': {name: 'Test'}},
        });
        renderer.renderToString(vm, (err, str) => {
            expect(str).toMatchSnapshot();
        });
    });
    it('Render without data 1', () => {
        const vm = new Vue({
            el: document.createElement('div'),
            store,
            router,
            i18n,
            render: h => h(FieldThumbnailOne2Many, {props: {
                data: {fieldname: 1},
                name: 'fieldname',
                model: 'Test',
                display: 'fields.name',
            }}),
        });
        renderer.renderToString(vm, (err, str) => {
            expect(str).toMatchSnapshot();
        });
    });
    it('Render invisible is True', () => {
        const vm = new Vue({
            el: document.createElement('div'),
            store,
            router,
            i18n,
            render: h => h(FieldThumbnailOne2Many, {props: {
                data: {fieldname: ['1']},
                name: 'fieldname',
                invisible: true,
                model: 'Test',
                display: 'fields.name',
            }}),
        });
        store.commit({
            type: 'UPDATE_DATA',
            model: 'Test',
            data: {'1': {name: 'Test'}},
        });
        renderer.renderToString(vm, (err, str) => {
            expect(str).toMatchSnapshot();
        });
    });
    it('Render invisible is false', () => {
        const vm = new Vue({
            el: document.createElement('div'),
            store,
            router,
            i18n,
            render: h => h(FieldThumbnailOne2Many, {props: {
                data: {fieldname: ['1']},
                name: 'fieldname',
                invisible: false,
                model: 'Test',
                display: 'fields.name',
            }}),
        });
        store.commit({
            type: 'UPDATE_DATA',
            model: 'Test',
            data: {'1': {name: 'Test'}},
        });
        renderer.renderToString(vm, (err, str) => {
            expect(str).toMatchSnapshot();
        });
    });
    it('Render invisible condition is true', () => {
        const vm = new Vue({
            el: document.createElement('div'),
            store,
            router,
            i18n,
            render: h => h(FieldThumbnailOne2Many, {props: {
                data: {fieldname: ['1'], invisible: true},
                name: 'fieldname',
                invisible: 'fields.invisible',
                model: 'Test',
                display: 'fields.name',
            }}),
        });
        store.commit({
            type: 'UPDATE_DATA',
            model: 'Test',
            data: {'1': {name: 'Test'}},
        });
        renderer.renderToString(vm, (err, str) => {
            expect(str).toMatchSnapshot();
        });
    });
    it('Render invisible condition is false', () => {
        const vm = new Vue({
            el: document.createElement('div'),
            store,
            router,
            i18n,
            render: h => h(FieldThumbnailOne2Many, {props: {
                data: {fieldname: ['1'], invisible: false},
                name: 'fieldname',
                invisible: 'fields.invisible',
                model: 'Test',
                display: 'fields.name',
            }}),
        });
        store.commit({
            type: 'UPDATE_DATA',
            model: 'Test',
            data: {'1': {name: 'Test'}},
        });
        renderer.renderToString(vm, (err, str) => {
            expect(str).toMatchSnapshot();
        });
    });
    it('Render label', () => {
        const vm = new Vue({
            el: document.createElement('div'),
            store,
            router,
            i18n,
            render: h => h(FieldThumbnailOne2Many, {props: {
                data: {fieldname: ['1']},
                name: 'fieldname',
                label: 'The label',
                model: 'Test',
                display: 'fields.name',
            }}),
        });
        store.commit({
            type: 'UPDATE_DATA',
            model: 'Test',
            data: {'1': {name: 'Test'}},
        });
        renderer.renderToString(vm, (err, str) => {
            expect(str).toMatchSnapshot();
        });
    });
    it('Render tooltip up', () => {
        const vm = new Vue({
            el: document.createElement('div'),
            store,
            router,
            i18n,
            render: h => h(FieldThumbnailOne2Many, {props: {
                data: {fieldname: ['1']},
                name: 'fieldname',
                tooltip: 'The tooltip',
                model: 'Test',
                display: 'fields.name',
            }}),
        });
        store.commit({
            type: 'UPDATE_DATA',
            model: 'Test',
            data: {'1': {name: 'Test'}},
        });
        renderer.renderToString(vm, (err, str) => {
            expect(str).toMatchSnapshot();
        });
    });
    it('Render tooltip left', () => {
        const vm = new Vue({
            el: document.createElement('div'),
            store,
            router,
            i18n,
            render: h => h(FieldThumbnailOne2Many, {props: {
                data: {fieldname: ['1']},
                name: 'fieldname',
                tooltip: 'The left tooltip',
                tooltip_position: 'is-left',
                model: 'Test',
                display: 'fields.name',
            }}),
        });
        store.commit({
            type: 'UPDATE_DATA',
            model: 'Test',
            data: {'1': {name: 'Test'}},
        });
        renderer.renderToString(vm, (err, str) => {
            expect(str).toMatchSnapshot();
        });
    });
    it('Render with fieldcolor', () => {
        const vm = new Vue({
            el: document.createElement('div'),
            store,
            router,
            i18n,
            render: h => h(FieldThumbnailOne2Many, {props: {
                data: {fieldname: ['1']},
                name: 'fieldname',
                model: 'Test',
                display: 'fields.name',
                fieldcolor: 'color',
            }}),
        });
        store.commit({
            type: 'UPDATE_DATA',
            model: 'Test',
            data: {'1': {name: 'Test', color: '#123456'}},
        });
        Vue.nextTick(() => {
            renderer.renderToString(vm, (err, str) => {
                expect(str).toMatchSnapshot();
            });
        });
    });
});
describe('One2Many Form component', () => {
    const renderer = require('vue-server-renderer').createRenderer();
    beforeEach(() => {
        store.dispatch('UNITEST_CLEAR');
        store.commit({
            type: 'UPDATE_VIEW',
            viewId: '1',
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
        });
    });
    it('Render', () => {
        const vm = new Vue({
            el: document.createElement('div'),
            store,
            router,
            i18n,
            render: h => h(FieldFormOne2Many, {props: {
                config: {data: {fieldname: ['1']}},
                name: 'fieldname',
                model: 'Test',
                views: [
                    {
                        viewId: '1',
                        type: 'List',
                    },
                    {
                        viewId: '2',
                        type: 'Thumbnail',
                    },
                    {
                        viewId: '3',
                        type: 'Form',
                        unclickable: true,
                    },
                ],
            }}),
        });
        store.commit({
            type: 'UPDATE_DATA',
            model: 'Test',
            data: {'1': {name: 'Test'}, '2': {name: 'Test 2'}, '3': {name: 'Test 3'}},
        });
        renderer.renderToString(vm, (err, str) => {
            expect(str).toMatchSnapshot();
        });
    });
    it('Render without data 1', () => {
        const vm = new Vue({
            el: document.createElement('div'),
            store,
            router,
            i18n,
            render: h => h(FieldFormOne2Many, {props: {
                config: {data: {}},
                name: 'fieldname',
                model: 'Test',
                display: 'fields.name',
            }}),
        });
        store.commit({
            type: 'UPDATE_DATA',
            model: 'Test',
            data: {'1': {name: 'Test'}, '2': {name: 'Test 2'}, '3': {name: 'Test 3'}},
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
            render: h => h(FieldFormOne2Many, {props: {
                config: {data: {fieldname: ['1']}},
                name: 'fieldname',
                model: 'Test',
                display: 'fields.name',
            }}),
        });
        renderer.renderToString(vm, (err, str) => {
            expect(str).toMatchSnapshot();
        });
    });
    it('Render invisible is True', () => {
        const vm = new Vue({
            el: document.createElement('div'),
            store,
            router,
            i18n,
            render: h => h(FieldFormOne2Many, {props: {
                config: {data: {fieldname: ['1']}},
                name: 'fieldname',
                invisible: true,
                model: 'Test',
                display: 'fields.name',
            }}),
        });
        store.commit({
            type: 'UPDATE_DATA',
            model: 'Test',
            data: {'1': {name: 'Test'}, '2': {name: 'Test 2'}, '3': {name: 'Test 3'}},
        });
        renderer.renderToString(vm, (err, str) => {
            expect(str).toMatchSnapshot();
        });
    });
    it('Render invisible is false', () => {
        const vm = new Vue({
            el: document.createElement('div'),
            store,
            router,
            i18n,
            render: h => h(FieldFormOne2Many, {props: {
                config: {data: {fieldname: ['1']}},
                name: 'fieldname',
                invisible: false,
                model: 'Test',
                display: 'fields.name',
            }}),
        });
        store.commit({
            type: 'UPDATE_DATA',
            model: 'Test',
            data: {'1': {name: 'Test'}, '2': {name: 'Test 2'}, '3': {name: 'Test 3'}},
        });
        renderer.renderToString(vm, (err, str) => {
            expect(str).toMatchSnapshot();
        });
    });
    it('Render invisible condition is true', () => {
        const vm = new Vue({
            el: document.createElement('div'),
            store,
            router,
            i18n,
            render: h => h(FieldFormOne2Many, {props: {
                config: {data: {fieldname: ['1'], invisible: true}},
                name: 'fieldname',
                invisible: 'fields.invisible',
                model: 'Test',
                display: 'fields.name',
            }}),
        });
        store.commit({
            type: 'UPDATE_DATA',
            model: 'Test',
            data: {'1': {name: 'Test'}, '2': {name: 'Test 2'}, '3': {name: 'Test 3'}},
        });
        renderer.renderToString(vm, (err, str) => {
            expect(str).toMatchSnapshot();
        });
    });
    it('Render invisible condition is false', () => {
        const vm = new Vue({
            el: document.createElement('div'),
            store,
            router,
            i18n,
            render: h => h(FieldFormOne2Many, {props: {
                config: {data: {fieldname: ['1'], invisible: false}},
                name: 'fieldname',
                invisible: 'fields.invisible',
                model: 'Test',
                display: 'fields.name',
            }}),
        });
        store.commit({
            type: 'UPDATE_DATA',
            model: 'Test',
            data: {'1': {name: 'Test'}, '2': {name: 'Test 2'}, '3': {name: 'Test 3'}},
        });
        renderer.renderToString(vm, (err, str) => {
            expect(str).toMatchSnapshot();
        });
    });
    it('Render label', () => {
        const vm = new Vue({
            el: document.createElement('div'),
            store,
            router,
            i18n,
            render: h => h(FieldFormOne2Many, {props: {
                config: {data: {fieldname: ['1']}},
                name: 'fieldname',
                label: 'The label',
                model: 'Test',
                display: 'fields.name',
            }}),
        });
        store.commit({
            type: 'UPDATE_DATA',
            model: 'Test',
            data: {'1': {name: 'Test'}, '2': {name: 'Test 2'}, '3': {name: 'Test 3'}},
        });
        renderer.renderToString(vm, (err, str) => {
            expect(str).toMatchSnapshot();
        });
    });
    it('Render tooltip up', () => {
        const vm = new Vue({
            el: document.createElement('div'),
            store,
            router,
            i18n,
            render: h => h(FieldFormOne2Many, {props: {
                config: {data: {fieldname: ['1']}},
                name: 'fieldname',
                tooltip: 'The tooltip',
                model: 'Test',
                display: 'fields.name',
            }}),
        });
        store.commit({
            type: 'UPDATE_DATA',
            model: 'Test',
            data: {'1': {name: 'Test'}, '2': {name: 'Test 2'}, '3': {name: 'Test 3'}},
        });
        renderer.renderToString(vm, (err, str) => {
            expect(str).toMatchSnapshot();
        });
    });
    it('Render tooltip left', () => {
        const vm = new Vue({
            el: document.createElement('div'),
            store,
            router,
            i18n,
            render: h => h(FieldFormOne2Many, {props: {
                config: {data: {fieldname: ['1']}},
                name: 'fieldname',
                tooltip: 'The left tooltip',
                tooltip_position: 'is-left',
                model: 'Test',
                display: 'fields.name',
            }}),
        });
        store.commit({
            type: 'UPDATE_DATA',
            model: 'Test',
            data: {'1': {name: 'Test'}, '2': {name: 'Test 2'}, '3': {name: 'Test 3'}},
        });
        renderer.renderToString(vm, (err, str) => {
            expect(str).toMatchSnapshot();
        });
    });
    it('Render mode readonly by config', () => {
        const vm = new Vue({
            el: document.createElement('div'),
            store,
            router,
            i18n,
            render: h => h(FieldFormOne2Many, {props: {
                config: {data: {fieldname: ['1']}, mode: 'readonly'},
                name: 'fieldname',
                model: 'Test',
                display: 'fields.name',
            }}),
        });
        store.commit({
            type: 'UPDATE_DATA',
            model: 'Test',
            data: {'1': {name: 'Test'}, '2': {name: 'Test 2'}, '3': {name: 'Test 3'}},
        });
        renderer.renderToString(vm, (err, str) => {
            expect(str).toMatchSnapshot();
        });
    });
    it('Render mode readonly param', () => {
        const vm = new Vue({
            el: document.createElement('div'),
            store,
            router,
            i18n,
            render: h => h(FieldFormOne2Many, {props: {
                config: {data: {fieldname: ['1']}},
                name: 'fieldname',
                readonly: true,
                model: 'Test',
                display: 'fields.name',
            }}),
        });
        store.commit({
            type: 'UPDATE_DATA',
            model: 'Test',
            data: {'1': {name: 'Test'}, '2': {name: 'Test 2'}, '3': {name: 'Test 3'}},
        });
        renderer.renderToString(vm, (err, str) => {
            expect(str).toMatchSnapshot();
        });
    });
    it('Render mode readonly conditional param', () => {
        const vm = new Vue({
            el: document.createElement('div'),
            store,
            router,
            i18n,
            render: h => h(FieldFormOne2Many, {props: {
                config: {data: {fieldname: ['1'], readonly: true}},
                name: 'fieldname',
                readonly: 'fields.readonly',
                model: 'Test',
                display: 'fields.name',
            }}),
        });
        store.commit({
            type: 'UPDATE_DATA',
            model: 'Test',
            data: {'1': {name: 'Test'}, '2': {name: 'Test 2'}, '3': {name: 'Test 3'}},
        });
        renderer.renderToString(vm, (err, str) => {
            expect(str).toMatchSnapshot();
        });
    });
    it('Render required', () => {
        const vm = new Vue({
            el: document.createElement('div'),
            store,
            router,
            i18n,
            render: h => h(FieldFormOne2Many, {props: {
                config: {data: {fieldname: ['1']}},
                name: 'fieldname',
                required: true,
                model: 'Test',
                display: 'fields.name',
            }}),
        });
        store.commit({
            type: 'UPDATE_DATA',
            model: 'Test',
            data: {'1': {name: 'Test'}, '2': {name: 'Test 2'}, '3': {name: 'Test 3'}},
        });
        renderer.renderToString(vm, (err, str) => {
            expect(str).toMatchSnapshot();
        });
    });
    it('Render required conditionnal', () => {
        const vm = new Vue({
            el: document.createElement('div'),
            store,
            router,
            i18n,
            render: h => h(FieldFormOne2Many, {props: {
                config: {data: {fieldname: ['1'], required: true}},
                name: 'fieldname',
                required: 'fields.required',
                model: 'Test',
                display: 'fields.name',
            }}),
        });
        store.commit({
            type: 'UPDATE_DATA',
            model: 'Test',
            data: {'1': {name: 'Test'}, '2': {name: 'Test 2'}, '3': {name: 'Test 3'}},
        });
        renderer.renderToString(vm, (err, str) => {
            expect(str).toMatchSnapshot();
        });
    });
    it('Render required without value', () => {
        const vm = new Vue({
            el: document.createElement('div'),
            store,
            router,
            i18n,
            render: h => h(FieldFormOne2Many, {props: {
                config: {data: {}},
                name: 'fieldname',
                required: true,
                model: 'Test',
                display: 'fields.name',
            }}),
        });
        store.commit({
            type: 'UPDATE_DATA',
            model: 'Test',
            data: {'1': {name: 'Test'}, '2': {name: 'Test 2'}, '3': {name: 'Test 3'}},
        });
        renderer.renderToString(vm, (err, str) => {
            expect(str).toMatchSnapshot();
        });
    });
});
