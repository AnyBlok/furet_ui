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
import '../views';
import '../fields';
import {store} from '../store';
import {router} from '../routes';
import {i18n} from '../i18n';
import {Menu, LeftMenu, RightMenu, selectCard} from '../menus';

jest.mock('../server-call')

describe('LeftMenu component', () => {
    beforeEach(() => {
        store.dispatch('UNITEST_CLEAR');
    });
    it('Render Left Menu with default value from store', () => {
        const renderer = require('vue-server-renderer').createRenderer();
        const vm = new Vue({
            el: document.createElement('div'),
            store,
            router,
            i18n,
            render: h => h(LeftMenu),
        });
        renderer.renderToString(vm, (err, str) => {
            expect(str).toMatchSnapshot();
        });
    });
    it('Render Left Menu with value from store', () => {
        const renderer = require('vue-server-renderer').createRenderer();
        const vm = new Vue({
            el: document.createElement('div'),
            store,
            router,
            i18n,
            render: h => h(LeftMenu),
        }).$mount();
        renderer.renderToString(vm, (err, str) => {
            expect(str).toMatchSnapshot();
        });
        store.commit({
            'type': 'UPDATE_LEFT_MENU',
            'value': {
                'label': 'Login',
                'image': {'type': 'font-icon', 'value': 'fa-user'},
            },
            'values': [
                {
                    'label': 'Login',
                    'image': {'type': 'font-icon', 'value': 'fa-user'},
                    'id': 'login',
                    'values': [
                        {
                            'label': 'Login',
                            'description': 'Log in to use the application',
                            'image': {'type': 'font-icon', 'value': 'fa-user'},
                            'type': 'client',
                            'id': 'Login',
                        },
                        {
                            'label': 'test',
                            'description': '',
                            'image': {'type': 'font-icon', 'value': 'fa-user'},
                            'type': 'client',
                            'id': 'Login',
                        },
                    ],
                },
            ],
        });
        renderer.renderToString(vm, (err, str) => {
            expect(str).toMatchSnapshot();
        });
    });
});

describe('RightMenu component', () => {
    beforeEach(() => {
        store.dispatch('UNITEST_CLEAR');
    });
    it('Render Right Menu with default value from store', () => {
        const renderer = require('vue-server-renderer').createRenderer();
        const vm = new Vue({
            el: document.createElement('div'),
            store,
            router,
            i18n,
            render: h => h(RightMenu),
        });
        renderer.renderToString(vm, (err, str) => {
            expect(str).toMatchSnapshot();
        });
    });
    it('Render Right Menu with value from store', () => {
        const renderer = require('vue-server-renderer').createRenderer();
        const vm = new Vue({
            el: document.createElement('div'),
            store,
            router,
            i18n,
            render: h => h(RightMenu),
        });
        renderer.renderToString(vm, (err, str) => {
            expect(str).toMatchSnapshot();
        });
        store.commit({
            'type': 'UPDATE_RIGHT_MENU',
            'value': {
                'label': 'Login',
                'image': {'type': 'font-icon', 'value': 'fa-user'},
            },
            'values': [
                {
                    'label': 'Login',
                    'image': {'type': 'font-icon', 'value': 'fa-user'},
                    'id': 'login',
                    'values': [
                        {
                            'label': 'Login',
                            'description': 'Log in to use the application',
                            'image': {'type': 'font-icon', 'value': 'fa-user'},
                            'type': 'client',
                            'id': 'Login',
                        },
                        {
                            'label': '',
                            'description': '',
                            'image': {'type': 'font-icon', 'value': 'fa-user'},
                            'type': 'client',
                            'id': 'Login',
                        },
                    ],
                },
            ],
        });
        renderer.renderToString(vm, (err, str) => {
            expect(str).toMatchSnapshot();
        });
    });
})
describe('Menu component', () => {
    beforeEach(() => {
        store.dispatch('UNITEST_CLEAR');
    });
    it('Render Menu with value from store open', () => {
        const renderer = require('vue-server-renderer').createRenderer();
        const vm = new Vue({
            el: document.createElement('div'),
            store,
            router,
            i18n,
            render: h => h(Menu, {props: {type: 'left', unittest_active: true}}),
        }).$mount();
        renderer.renderToString(vm, (err, str) => {
            expect(str).toMatchSnapshot();
        });
        store.commit({
            'type': 'UPDATE_LEFT_MENU',
            'value': {
                'label': 'Login',
                'image': {'type': 'font-icon', 'value': 'fa-user'},
            },
            'values': [
                {
                    'label': 'Login',
                    'image': {'type': 'font-icon', 'value': 'fa-user'},
                    'id': 'login',
                    'values': [
                        {
                            'label': 'Login',
                            'description': 'Log in to use the application',
                            'image': {'type': 'font-icon', 'value': 'fa-user'},
                            'type': 'client',
                            'id': 'Login',
                        },
                        {
                            'label': 'test',
                            'description': '',
                            'image': {'type': 'font-icon', 'value': 'fa-user'},
                            'type': 'client',
                            'id': 'Login',
                        },
                    ],
                },
            ],
        });
        renderer.renderToString(vm, (err, str) => {
            expect(str).toMatchSnapshot();
        });
    });
    it('Render Menu with value from store open and filtering', () => {
        const renderer = require('vue-server-renderer').createRenderer();
        const vm = new Vue({
            el: document.createElement('div'),
            store,
            router,
            i18n,
            render: h => h(Menu, {props: {type: 'left', unittest_active: true, unittest_search: 'test'}}),
        }).$mount();
        renderer.renderToString(vm, (err, str) => {
            expect(str).toMatchSnapshot();
        });
        store.commit({
            'type': 'UPDATE_LEFT_MENU',
            'value': {
                'label': 'Login',
                'image': {'type': 'font-icon', 'value': 'fa-user'},
            },
            'values': [
                {
                    'label': 'Login',
                    'image': {'type': 'font-icon', 'value': 'fa-user'},
                    'id': 'login',
                    'values': [
                        {
                            'label': 'Login',
                            'description': 'Log in to use the application',
                            'image': {'type': 'font-icon', 'value': 'fa-user'},
                            'type': 'client',
                            'id': 'Login',
                        },
                        {
                            'label': 'test',
                            'description': '',
                            'image': {'type': 'font-icon', 'value': 'fa-user'},
                            'type': 'client',
                            'id': 'Login',
                        },
                    ],
                },
            ],
        });
        renderer.renderToString(vm, (err, str) => {
            expect(str).toMatchSnapshot();
        });
    });
    it('Render Menu with value from store open and select custom view', () => {
        const renderer = require('vue-server-renderer').createRenderer();
        const vm = new Vue({
            el: document.createElement('div'),
            store,
            router,
            i18n,
            render: h => h(Menu, {props: {type: 'left', unittest_active: true}}),
        }).$mount();
        renderer.renderToString(vm, (err, str) => {
            expect(str).toMatchSnapshot();
        });
        store.commit({
            'type': 'UPDATE_LEFT_MENU',
            'value': {
                'label': 'Login',
                'image': {'type': 'font-icon', 'value': 'fa-user'},
            },
            'values': [
                {
                    'label': 'Login',
                    'image': {'type': 'font-icon', 'value': 'fa-user'},
                    'id': 'login',
                    'values': [
                        {
                            'label': 'Login',
                            'description': 'Log in to use the application',
                            'image': {'type': 'font-icon', 'value': 'fa-user'},
                            'type': 'client',
                            'id': 'Login',
                        },
                        {
                            'label': 'test',
                            'description': '',
                            'image': {'type': 'font-icon', 'value': 'fa-user'},
                            'type': 'client',
                            'id': 'Login',
                        },
                    ],
                },
            ],
        });
        renderer.renderToString(vm, (err, str) => {
            expect(str).toMatchSnapshot();
        });
        router.push({'path': '/'})
        expect(vm.$route.path).toBe('/');
        selectCard('left', router, store, {type: 'client', id: 'custom_view_id'});
        renderer.renderToString(vm, (err, str) => {
            expect(str).toMatchSnapshot();
        });
        expect(vm.$route.name).toBe('custom_view');
        expect(vm.$route.params.viewName).toBe('custom_view_id');
    });
    it('Render Menu with value from store open and select space', () => {
        const renderer = require('vue-server-renderer').createRenderer();
        const vm = new Vue({
            el: document.createElement('div'),
            store,
            router,
            i18n,
            render: h => h(Menu, {props: {type: 'left', unittest_active: true}}),
        }).$mount();
        renderer.renderToString(vm, (err, str) => {
            expect(str).toMatchSnapshot();
        });
        store.commit({
            'type': 'UPDATE_LEFT_MENU',
            'value': {
                'label': 'Login',
                'image': {'type': 'font-icon', 'value': 'fa-user'},
            },
            'values': [
                {
                    'label': 'Login',
                    'image': {'type': 'font-icon', 'value': 'fa-user'},
                    'id': 'login',
                    'values': [
                        {
                            'label': 'Login',
                            'description': 'Log in to use the application',
                            'image': {'type': 'font-icon', 'value': 'fa-user'},
                            'type': 'client',
                            'id': 'Login',
                        },
                        {
                            'label': 'test',
                            'description': '',
                            'image': {'type': 'font-icon', 'value': 'fa-user'},
                            'type': 'client',
                            'id': 'Login',
                        },
                    ],
                },
            ],
        });
        renderer.renderToString(vm, (err, str) => {
            expect(str).toMatchSnapshot();
        });
        router.push({'path': '/'})
        expect(vm.$route.path).toBe('/');
        store.commit('ADD_IN_BREADSCRUMB', {
            path: '/test',
            label: 'test',
            changes: {},
        });
        store.commit('REPLACE_CHANGE', {changes: {test: 1}})
        expect(vm.$store.state.global.breadscrumbs.length).toBe(1);
        expect(vm.$store.state.data.changes.test).toBe(1);
        selectCard('left', router, store, {type: 'space', id: 'spaceId', label: 'New Space', image: {type: 'font-icon', value: 'fa-trash'}});
        renderer.renderToString(vm, (err, str) => {
            expect(str).toMatchSnapshot();
        });
        expect(vm.$route.name).toBe('space');
        expect(vm.$route.params.spaceId).toBe('spaceId');
        expect(vm.$store.state.global.breadscrumbs.length).toBe(0);
        expect(vm.$store.state.data.changes.test).toBe(undefined);
    });
})
