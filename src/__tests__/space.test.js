/**
This file is a part of the FuretUI project

   Copyright (C) 2017 Jean-Sebastien SUZANNE <jssuzanne@anybox.fr>

This Source Code Form is subject to the terms of the Mozilla Public License,
v. 2.0. If a copy of the MPL was not distributed with this file,You can
obtain one at http://mozilla.org/MPL/2.0/.
**/
import Vue from 'vue';
import Buefy from 'buefy';
Vue.use(Buefy, {defaultIconPack: 'fa',});
import {store} from '../store';
import {router} from '../routes';
import {i18n} from '../i18n';
import '../view';
import '../views';
import '../fields';
import {changeView, onClickBreadScrumb, onClickMenu, ViewSelector, SpaceMenu, Space} from '../space';

jest.mock('../server-call')
const menus = [
    {
        label: 'Customer',
        image: {'type': 'font-icon', 'value': 'fa-user'},
        actionId: '2',
        id: '1',
        submenus: [],
    },
    {
        label: 'Setting',
        image: {'type': 'font-icon', 'value': 'fa-user'},
        actionId: '',
        id: '2',
        submenus: [
            {
                label: 'Category',
                image: {'type': '', 'value': ''},
                actionId: '3',
                id: '3',
                submenus: [],
            },
            {
                label: 'Address',
                image: {'type': '', 'value': ''},
                actionId: '4',
                id: '4',
                submenus: [],
            },
        ],
    },
]

describe('View Selector component', () => {
    const renderer = require('vue-server-renderer').createRenderer();
    beforeEach(() => {
        store.dispatch('UNITEST_CLEAR');
        router.push({path: '/'});
    });
    it('Render', () => {
        const vm = new Vue({
            el: document.createElement('div'),
            store,
            router,
            i18n,
            render: h => h(Space, {params: {
                viewId: '1',
                views: [
                    {viewId: '1', type: 'List'},
                    {viewId: '2', type: 'Form', unclickable: true},
                ],
            }}),
        });
        renderer.renderToString(vm, (err, str) => {
            expect(str).toMatchSnapshot();
        });
    });
    it('Render unclickable selected', () => {
        const vm = new Vue({
            el: document.createElement('div'),
            store,
            router,
            i18n,
            render: h => h(Space, {params: {
                viewId: '2',
                views: [
                    {viewId: '1', type: 'List'},
                    {viewId: '2', type: 'Form', unclickable: true},
                ],
            }}),
        });
        renderer.renderToString(vm, (err, str) => {
            expect(str).toMatchSnapshot();
        });
    });
});

describe('SpaceMenu component', () => {
    const renderer = require('vue-server-renderer').createRenderer();
    beforeEach(() => {
        store.dispatch('UNITEST_CLEAR');
        router.push({path: '/'});
    });
    it('Render', () => {
        const vm = new Vue({
            el: document.createElement('div'),
            store,
            router,
            i18n,
            render: h => h(SpaceMenu),
        });
        renderer.renderToString(vm, (err, str) => {
            expect(str).toMatchSnapshot();
        });
    });
    it('Render with submenu', () => {
        const vm = new Vue({
            el: document.createElement('div'),
            store,
            router,
            i18n,
            render: h => h(SpaceMenu, {props: {
                menuId: '1',
                menus,
                spaceId: '1',
            }}),
        });
        renderer.renderToString(vm, (err, str) => {
            expect(str).toMatchSnapshot();
        });
    });
    it('Render with submenu other selected menu', () => {
        const vm = new Vue({
            el: document.createElement('div'),
            store,
            router,
            i18n,
            render: h => h(SpaceMenu, {props: {
                menuId: '3',
                menus,
                spaceId: '1',
            }}),
        });
        renderer.renderToString(vm, (err, str) => {
            expect(str).toMatchSnapshot();
        });
    });
    it('Render change menu (with action)', () => {
        const vm = new Vue({
            el: document.createElement('div'),
            store,
            router,
            i18n,
            render: h => h(SpaceMenu)
        });
        store.commit({type: 'REPLACE_CHANGE', changes: {test: 1}});
        store.commit({
            type: 'ADD_IN_BREADSCRUMB',
            path: 'space/1/action/3',
            label: 'Action 3',
            changes: {action: 3}
        });
        store.commit({
            type: 'ADD_IN_BREADSCRUMB',
            path: 'space/1/action/4',
            label: 'Action 4',
            changes: {action: 4}
        });
        router.push({path: '/'});
        expect(store.state.data.changes.test).toBe(1);
        expect(store.state.global.breadscrumbs.length).toBe(2);
        expect(vm.$route.path).toBe('/');
        onClickMenu(router, '1', {id: '2', actionId: '3'})
        expect(store.state.data.changes.test).toBe(undefined);
        expect(vm.$route.path).toBe('/space/1/menu/2/action/3');
        expect(store.state.global.breadscrumbs.length).toBe(0);
    });
    it('Render change menu (without action)', () => {
        const vm = new Vue({
            el: document.createElement('div'),
            store,
            router,
            i18n,
            render: h => h(SpaceMenu)
        });
        store.commit({type: 'REPLACE_CHANGE', changes: {test: 1}});
        store.commit({
            type: 'ADD_IN_BREADSCRUMB',
            path: 'space/1/action/3',
            label: 'Action 3',
            changes: {action: 3}
        });
        store.commit({
            type: 'ADD_IN_BREADSCRUMB',
            path: 'space/1/action/4',
            label: 'Action 4',
            changes: {action: 4}
        });
        router.push({path: '/'});
        expect(store.state.data.changes.test).toBe(1);
        expect(store.state.global.breadscrumbs.length).toBe(2);
        expect(vm.$route.path).toBe('/');
        onClickMenu(router, '1', {id: '2'})
        expect(store.state.data.changes.test).toBe(undefined);
        expect(vm.$route.path).toBe('/');
        expect(store.state.global.breadscrumbs.length).toBe(0);
    });
});

describe('Space component', () => {
    const renderer = require('vue-server-renderer').createRenderer();
    beforeEach(() => {
        store.dispatch('UNITEST_CLEAR');
        router.push({path: '/'});
    });
    it('Render', () => {
        const vm = new Vue({
            el: document.createElement('div'),
            store,
            router,
            i18n,
            render: h => h(Space),
        });
        renderer.renderToString(vm, (err, str) => {
            expect(str).toMatchSnapshot();
        });
    });
    it('Render display left menu (close)', () => {
        const vm = new Vue({
            el: document.createElement('div'),
            store,
            router,
            i18n,
            render: h => h(Space, {props: {
                spaceId: '1',
                menuId: '1',
                actionId: '1',
                viewId: '1',
            }}),
        });
        store.commit({
            type: 'UPDATE_SPACE',
            spaceId: '1',
            left_menu: menus,
            right_menu: [],
        });
        store.commit({                                                                       
            type: 'UPDATE_ACTION',
            actionId: '1',
            label: 'Action : 1',
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
        });
        renderer.renderToString(vm, (err, str) => {
            expect(str).toMatchSnapshot();
        });
    });
    it('Render display left menu (open)', () => {
        const vm = new Vue({
            el: document.createElement('div'),
            store,
            router,
            i18n,
            render: h => h(Space, {props: {
                spaceId: '1',
                menuId: '1',
                actionId: '1',
                viewId: '1',
                defaultOpenLeft: true,
            }}),
        });
        store.commit({
            type: 'UPDATE_SPACE',
            spaceId: '1',
            left_menu: menus,
            right_menu: [],
        });
        store.commit({                                                                       
            type: 'UPDATE_ACTION',
            actionId: '1',
            label: 'Action : 1',
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
        });
        renderer.renderToString(vm, (err, str) => {
            expect(str).toMatchSnapshot();
        });
    });
    it('Render display right menu (close)', () => {
        const vm = new Vue({
            el: document.createElement('div'),
            store,
            router,
            i18n,
            render: h => h(Space, {props: {
                spaceId: '1',
                menuId: '1',
                actionId: '1',
                viewId: '1',
            }}),
        });
        store.commit({
            type: 'UPDATE_SPACE',
            spaceId: '1',
            left_menu: [],
            right_menu: menus,
        });
        store.commit({                                                                       
            type: 'UPDATE_ACTION',
            actionId: '1',
            label: 'Action : 1',
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
        });
        renderer.renderToString(vm, (err, str) => {
            expect(str).toMatchSnapshot();
        });
    });
    it('Render display right menu (open)', () => {
        const vm = new Vue({
            el: document.createElement('div'),
            store,
            router,
            i18n,
            render: h => h(Space, {props: {
                spaceId: '1',
                menuId: '1',
                actionId: '1',
                viewId: '1',
                defaultOpenRight: true,
            }}),
        });
        store.commit({
            type: 'UPDATE_SPACE',
            spaceId: '1',
            left_menu: [],
            right_menu: menus,
        });
        store.commit({                                                                       
            type: 'UPDATE_ACTION',
            actionId: '1',
            label: 'Action : 1',
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
        });
        renderer.renderToString(vm, (err, str) => {
            expect(str).toMatchSnapshot();
        });
    });
    it('Render breadscrumb', () => {
        const vm = new Vue({
            el: document.createElement('div'),
            store,
            router,
            i18n,
            render: h => h(Space, {props: {
                spaceId: '1',
                menuId: '1',
                actionId: '1',
                viewId: '1',
            }}),
        });
        store.commit({
            type: 'UPDATE_SPACE',
            spaceId: '1',
            left_menu: [],
            right_menu: [],
        });
        store.commit({                                                                       
            type: 'UPDATE_ACTION',
            actionId: '1',
            label: 'Action : 1',
            views: [
                {
                    viewId: '1',
                    type: 'List',
                },
            ],
        });
        renderer.renderToString(vm, (err, str) => {
            expect(str).toMatchSnapshot();
        });
        store.commit({
            type: 'ADD_IN_BREADSCRUMB',
            path: 'space/1/action/2',
            label: 'Action 2',
            changes: {action: 2}
        });
        renderer.renderToString(vm, (err, str) => {
            expect(str).toMatchSnapshot();
        });
        store.commit({
            type: 'ADD_IN_BREADSCRUMB',
            path: 'space/1/action/3',
            label: 'Action 3',
            changes: {action: 3}
        });
        store.commit({
            type: 'ADD_IN_BREADSCRUMB',
            path: 'space/1/action/4',
            label: 'Action 4',
            changes: {action: 4}
        });
        renderer.renderToString(vm, (err, str) => {
            expect(str).toMatchSnapshot();
        });
        expect(store.state.global.breadscrumbs.length).toBe(3);
        onClickBreadScrumb(router, store, {position: 1, changes: {action: 2}, path: '/space/1/action/2'})
        expect(store.state.global.breadscrumbs.length).toBe(1);
        renderer.renderToString(vm, (err, str) => {
            expect(str).toMatchSnapshot();
        });
    });
    it('Render change view without menuId', () => {
        const vm = new Vue({
            el: document.createElement('div'),
            store,
            router,
            i18n,
            render: h => h(Space)
        });
        store.commit({type: 'REPLACE_CHANGE', changes: {test: 1}});
        router.push({path: '/'});
        expect(store.state.data.changes.test).toBe(1);
        expect(vm.$route.path).toBe('/');
        changeView(router, store, '1', null, '3', '4')
        expect(store.state.data.changes.test).toBe(undefined);
        expect(vm.$route.path).toBe('/space/1/action/3/view/4');
    });
    it('Render change view with menuId', () => {
        const vm = new Vue({
            el: document.createElement('div'),
            store,
            router,
            i18n,
            render: h => h(Space)
        });
        store.commit({type: 'REPLACE_CHANGE', changes: {test: 1}});
        router.push({path: '/'});
        expect(store.state.data.changes.test).toBe(1);
        expect(vm.$route.path).toBe('/');
        changeView(router, store, '1', '2', '3', '4')
        expect(store.state.data.changes.test).toBe(undefined);
        expect(vm.$route.path).toBe('/space/1/menu/2/action/3/view/4');
    });
});
