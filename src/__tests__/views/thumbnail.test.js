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
import {ThumbnailView, X2MThumbnailView, updateValueX2M, ThumbnailGroup} from '../../views/thumbnail';
import '../../views/search';
import '../../fields';
import '../../space';

jest.mock('../../server-call')

const views = [
    {
        viewId: '1',
        viewType: 'Thumbnail',
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

const view_thumbnail = {
    viewId: '1',
    viewType: 'Thumbnail',
    label: 'View : 2',
    creatable: true,
    onSelect: '3',
    model: 'Test',
    search: [],
    template: `
        <div class="columns is-multiline is-mobile">
            <div class="column is-4">
                <furet-ui-thumbnail-field-boolean
                    v-bind:data="card"
                    name="bool"
                    label="Boolean"
                />
            </div>
            <div class="column is-8">
                <furet-ui-thumbnail-field-string
                    v-bind:data="card"
                    name="name"
                    label="Label"
                />
            </div>
            <div class="column is-6">
                <furet-ui-thumbnail-field-selection
                    v-bind:data="card"
                    name="state"
                    label="State"
                    v-bind:selections="{'new': 'New'}"
                />
            </div>
            <div class="column is-6">
                <furet-ui-thumbnail-field-integer
                    v-bind:data="card"
                    name="id"
                    label="ID"
                />
            </div>
        </div>
    `,
    buttons: [],
    fields: ["id", "name", "bool", "state", "color"],
}

const dataIds = ['1', '2', '3'];
const dataIds2 = ['1', '2', '3', 'newId'];

const data = {
    '1': {
        id: 1,
        name: 'Label 1',
        state: 'new',
        bool: true,
        color: '#123456',
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
        color: '',
    },
    '4': {
        id: 4,
        name: 'Label 4',
        state: 'new',
        bool: true,
        color: '#789ABC',
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

describe('furet-ui-thumbnail-view component', () => {
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
            render: h => h(ThumbnailView, {props: {
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
            render: h => h(ThumbnailView, {props: {
                view: view_thumbnail,
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
            render: h => h(ThumbnailView, {props: {
                view: view_thumbnail,
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
            render: h => h(ThumbnailView, {props: {
                view: view_thumbnail,
                dataIds,
                data,
                change,
            }}),
        });
        renderer.renderToString(vm, (err, str) => {
            expect(str).toMatchSnapshot();
        });
    });
    it('Render with data border fieldcolor', () => {
        const vm = new Vue({
            el: document.createElement('div'),
            store,
            router,
            i18n,
            render: h => h(ThumbnailView, {props: {
                view: Object.assign({border_fieldcolor: 'fields.color'}, view_thumbnail),
                dataIds: ['1', '2', '3', '4'],
                data,
                change,
            }}),
        });
        renderer.renderToString(vm, (err, str) => {
            expect(str).toMatchSnapshot();
        });
    });
    it('Render with data background fieldcolor', () => {
        const vm = new Vue({
            el: document.createElement('div'),
            store,
            router,
            i18n,
            render: h => h(ThumbnailView, {props: {
                view: Object.assign({background_fieldcolor: 'fields.color'}, view_thumbnail),
                dataIds: ['1', '2', '3', '4'],
                data,
                change,
            }}),
        });
        renderer.renderToString(vm, (err, str) => {
            expect(str).toMatchSnapshot();
        });
    });
});

describe('furet-ui-x2m-thumbnail-view component', () => {
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
            render: h => h(X2MThumbnailView, {props: {
                view: view_thumbnail,
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
            render: h => h(X2MThumbnailView, {props: {
                view: view_thumbnail,
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
            render: h => h(X2MThumbnailView, {props: {
                view: view_thumbnail,
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
            render: h => h(X2MThumbnailView, {props: {
                view: view_thumbnail,
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
            render: h => h(X2MThumbnailView, {props: {
                view: view_thumbnail,
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
    it('Render with data border fieldcolor', () => {
        const vm = new Vue({
            el: document.createElement('div'),
            store,
            router,
            i18n,
            render: h => h(X2MThumbnailView, {props: {
                view: Object.assign({border_fieldcolor: 'fields.color'}, view_thumbnail),
                views,
                viewId: '1',
                dataIds: ['1', '2', '3', '4'],
                model: 'Test',
                data,
                change,
            }}),
        });
        renderer.renderToString(vm, (err, str) => {
            expect(str).toMatchSnapshot();
        });
    });
    it('Render with data background fieldcolor', () => {
        const vm = new Vue({
            el: document.createElement('div'),
            store,
            router,
            i18n,
            render: h => h(X2MThumbnailView, {props: {
                view: Object.assign({background_fieldcolor: 'fields.color'}, view_thumbnail),
                views,
                viewId: '1',
                dataIds: ['1', '2', '3', '4'],
                model: 'Test',
                data,
                change,
            }}),
        });
        renderer.renderToString(vm, (err, str) => {
            expect(str).toMatchSnapshot();
        });
    });
});

describe('furet-ui-thumbnail-group component', () => {
    const renderer = require('vue-server-renderer').createRenderer();
    beforeEach(() => {
        store.dispatch('UNITEST_CLEAR');
        router.push({path: '/'});
    });
    it('Render visible', () => {
        const vm = new Vue({
            el: document.createElement('div'),
            store,
            router,
            i18n,
            template: `
                <furet-ui-thumbnail-group
                    v-bind:data="{fieldname: false}"
                    invisible="fields.fieldname"
                >
                    <span>Test</span>
                </furet-ui-thumbnail-group>
            `,
        });
        renderer.renderToString(vm, (err, str) => {
            expect(str).toMatchSnapshot();
        });
    });
    it('Render invisible', () => {
        const vm = new Vue({
            el: document.createElement('div'),
            store,
            router,
            i18n,
            template: `
                <furet-ui-thumbnail-group
                    v-bind:data="{fieldname: true}"
                    invisible="fields.fieldname"
                >
                    <span>Test</span>
                </furet-ui-thumbnail-group>
            `,
        });
        renderer.renderToString(vm, (err, str) => {
            expect(str).toMatchSnapshot();
        });
    });
});

describe('furet-ui-thumbnail-button component', () => {
    const renderer = require('vue-server-renderer').createRenderer();
    beforeEach(() => {
        store.dispatch('UNITEST_CLEAR');
        router.push({path: '/'});
    });
    it('Render visible', () => {
        const vm = new Vue({
            el: document.createElement('div'),
            store,
            router,
            i18n,
            template: `
                <furet-ui-thumbnail-button
                    v-bind:data="{fieldname: false}"
                    invisible="fields.fieldname"
                    label="The label"
                />
            `,
        });
        renderer.renderToString(vm, (err, str) => {
            expect(str).toMatchSnapshot();
        });
    });
    it('Render invisible', () => {
        const vm = new Vue({
            el: document.createElement('div'),
            store,
            router,
            i18n,
            template: `
                <furet-ui-thumbnail-button
                    v-bind:data="{fieldname: true}"
                    invisible="fields.fieldname"
                    label="The label"
                />
            `,
        });
        renderer.renderToString(vm, (err, str) => {
            expect(str).toMatchSnapshot();
        });
    });
});
