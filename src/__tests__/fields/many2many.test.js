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
import {FieldListMany2Many, FieldThumbnailMany2Many, 
        FieldFormMany2ManyTags, 
        FieldFormMany2ManyCheckbox, onChangeM2M} from '../../fields/relationship/many2many'

jest.mock('../../server-call')

describe('Many2Many list component', () => {
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
            render: h => h(FieldListMany2Many, {props: {
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
            render: h => h(FieldListMany2Many, {props: {
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
            render: h => h(FieldListMany2Many, {props: {
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
            render: h => h(FieldListMany2Many, {props: {
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
            render: h => h(FieldListMany2Many, {props: {
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
            render: h => h(FieldListMany2Many, {props: {
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
            render: h => h(FieldListMany2Many, {props: {
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
            render: h => h(FieldListMany2Many, {props: {
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

describe('Many2Many Thumbnail component', () => {
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
            render: h => h(FieldThumbnailMany2Many, {props: {
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
            render: h => h(FieldThumbnailMany2Many, {props: {
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
            render: h => h(FieldThumbnailMany2Many, {props: {
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
            render: h => h(FieldThumbnailMany2Many, {props: {
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
            render: h => h(FieldThumbnailMany2Many, {props: {
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
            render: h => h(FieldThumbnailMany2Many, {props: {
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
            render: h => h(FieldThumbnailMany2Many, {props: {
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
            render: h => h(FieldThumbnailMany2Many, {props: {
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
            render: h => h(FieldThumbnailMany2Many, {props: {
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
            render: h => h(FieldThumbnailMany2Many, {props: {
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
            render: h => h(FieldThumbnailMany2Many, {props: {
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
describe('Many2ManyTags Form component', () => {
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
            render: h => h(FieldFormMany2ManyTags, {props: {
                config: {data: {fieldname: ['1']}},
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
    it('Render with selection available', () => {
        const vm = new Vue({
            el: document.createElement('div'),
            store,
            router,
            i18n,
            render: h => h(FieldFormMany2ManyTags, {props: {
                config: {data: {fieldname: ['1']}},
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
    it('Render with filtering selection available', () => {
        const vm = new Vue({
            el: document.createElement('div'),
            store,
            router,
            i18n,
            render: h => h(FieldFormMany2ManyTags, {props: {
                config: {data: {fieldname: ['1']}},
                name: 'fieldname',
                model: 'Test',
                display: 'fields.name',
                defaultIds: ['1', '2'],
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
    it('Render with filtering selection available 2', () => {
        const vm = new Vue({
            el: document.createElement('div'),
            store,
            router,
            i18n,
            render: h => h(FieldFormMany2ManyTags, {props: {
                config: {data: {fieldname: ['1']}},
                name: 'fieldname',
                model: 'Test',
                display: 'fields.name',
                defaultValue: 'Test 3',
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
            render: h => h(FieldFormMany2ManyTags, {props: {
                config: {data: {}},
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
    it('Render without data 2', () => {
        const vm = new Vue({
            el: document.createElement('div'),
            store,
            router,
            i18n,
            render: h => h(FieldFormMany2ManyTags, {props: {
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
            render: h => h(FieldFormMany2ManyTags, {props: {
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
            render: h => h(FieldFormMany2ManyTags, {props: {
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
            render: h => h(FieldFormMany2ManyTags, {props: {
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
            render: h => h(FieldFormMany2ManyTags, {props: {
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
            render: h => h(FieldFormMany2ManyTags, {props: {
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
            render: h => h(FieldFormMany2ManyTags, {props: {
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
            render: h => h(FieldFormMany2ManyTags, {props: {
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
            data: {'1': {name: 'Test'}},
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
            render: h => h(FieldFormMany2ManyTags, {props: {
                config: {data: {fieldname: ['1']}, mode: 'readonly'},
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
    it('Render mode readonly param', () => {
        const vm = new Vue({
            el: document.createElement('div'),
            store,
            router,
            i18n,
            render: h => h(FieldFormMany2ManyTags, {props: {
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
            data: {'1': {name: 'Test'}},
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
            render: h => h(FieldFormMany2ManyTags, {props: {
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
            data: {'1': {name: 'Test'}},
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
            render: h => h(FieldFormMany2ManyTags, {props: {
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
            data: {'1': {name: 'Test'}},
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
            render: h => h(FieldFormMany2ManyTags, {props: {
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
            data: {'1': {name: 'Test'}},
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
            render: h => h(FieldFormMany2ManyTags, {props: {
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
            data: {'1': {name: 'Test'}},
        });
        renderer.renderToString(vm, (err, str) => {
            expect(str).toMatchSnapshot();
        });
    });
    it('Render placeholder', () => {
        const vm = new Vue({
            el: document.createElement('div'),
            store,
            router,
            i18n,
            render: h => h(FieldFormMany2ManyTags, {props: {
                config: {data: {}},
                name: 'fieldname',
                placeholder: 'The placeholder',
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
    it('Render icon', () => {
        const vm = new Vue({
            el: document.createElement('div'),
            store,
            router,
            i18n,
            render: h => h(FieldFormMany2ManyTags, {props: {
                config: {data: {}},
                name: 'fieldname',
                icon: 'user',
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
            render: h => h(FieldThumbnailMany2Many, {props: {
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
        renderer.renderToString(vm, (err, str) => {
            expect(str).toMatchSnapshot();
        });
    });
});
describe('Many2ManyCheckbox Form component', () => {
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
            render: h => h(FieldFormMany2ManyCheckbox, {props: {
                config: {data: {fieldname: ['1']}},
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
    it('Render without data 1', () => {
        const vm = new Vue({
            el: document.createElement('div'),
            store,
            router,
            i18n,
            render: h => h(FieldFormMany2ManyCheckbox, {props: {
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
            render: h => h(FieldFormMany2ManyCheckbox, {props: {
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
            render: h => h(FieldFormMany2ManyCheckbox, {props: {
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
            render: h => h(FieldFormMany2ManyCheckbox, {props: {
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
            render: h => h(FieldFormMany2ManyCheckbox, {props: {
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
            render: h => h(FieldFormMany2ManyCheckbox, {props: {
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
            render: h => h(FieldFormMany2ManyCheckbox, {props: {
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
            render: h => h(FieldFormMany2ManyCheckbox, {props: {
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
            render: h => h(FieldFormMany2ManyCheckbox, {props: {
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
            render: h => h(FieldFormMany2ManyCheckbox, {props: {
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
            render: h => h(FieldFormMany2ManyCheckbox, {props: {
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
            render: h => h(FieldFormMany2ManyCheckbox, {props: {
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
            render: h => h(FieldFormMany2ManyCheckbox, {props: {
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
            render: h => h(FieldFormMany2ManyCheckbox, {props: {
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
            render: h => h(FieldFormMany2ManyCheckbox, {props: {
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
    it('Render fieldcolor', () => {
        const vm = new Vue({
            el: document.createElement('div'),
            store,
            router,
            i18n,
            render: h => h(FieldFormMany2ManyCheckbox, {props: {
                config: {data: {fieldname: ['1']}},
                name: 'fieldname',
                icon: 'user',
                model: 'Test',
                display: 'fields.name',
                fieldcolor: 'color',
            }}),
        });
        store.commit({
            type: 'UPDATE_DATA',
            model: 'Test',
            data: {'1': {name: 'Test', color: '#123456'}, '2': {name: 'Test 2', color: ''}, '3': {name: 'Test 3'}},
        });
        renderer.renderToString(vm, (err, str) => {
            expect(str).toMatchSnapshot();
        });
    });
});
describe('onChangeM2M', () => {
    it('add one value with init value is empty', () => {
        const values = onChangeM2M({data: {fieldname: []}}, 'fieldname', '1', true);
        expect(String(values)).toBe(String(['1']));
    });
    it('add one value with init value', () => {
        const values = onChangeM2M({data: {fieldname: ['1']}}, 'fieldname', '2', true);
        expect(String(values)).toBe(String(['1', '2']));
    });
    it('remove one value with init value 1', () => {
        const values = onChangeM2M({data: {fieldname: ['1', '2']}}, 'fieldname', '2', false);
        expect(String(values)).toBe(String(['1']));
    });
    it('remove one value with init value 2', () => {
        const values = onChangeM2M({data: {fieldname: ['1']}}, 'fieldname', '1', false);
        expect(String(values)).toBe(String([]));
    });
    it('remove one value without init', () => {
        const values = onChangeM2M({data: {fieldname: []}}, 'fieldname', '1', false);
        expect(String(values)).toBe(String([]));
    });
});
