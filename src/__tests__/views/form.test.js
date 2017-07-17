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
import {FormView, addNewDataId, openModeDataId, closeModeDataId, cancelModeDataId,
        X2MFormView, addNewX2MDataId, updateValueX2M, deleteDataX2MDataId} from '../../views/form';
import '../../views/search';
import '../../fields';
import '../../space';

jest.mock('../../server-call')

const views = [
    {
        viewId: '1',
        viewType: 'Form',
    },
    {
        viewId: '2',
        viewType: 'Form',
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

const view_form = {
    viewId: '1',
    viewType: 'Form',
    label: 'View : 3',
    creatable: true,
    deletable: true,
    editable: true,
    onClose: '3',
    model: 'Test',
    template: `
        <div class="columns is-multiline is-mobile">
            <div class="column is-4">
                <furet-ui-form-field-integer
                    v-bind:config="config"
                    name="id"
                    label="ID"
                    required="1"
                    readonly="1"
                />
            </div>
            <div class="column is-8">
                <furet-ui-form-field-string
                    v-bind:config="config"
                    required="fields.number"
                    tooltip="Plop"
                    name="name"
                    label="Label"
                    icon="envelope"
                />
            </div>
            <div class="column is-6">
                <furet-ui-form-field-selection
                    v-bind:config="config"
                    name="state"
                    label="State"
                    v-bind:selections="{'new': 'New', 'started': 'Started', 'done': 'Done'}"
                />
            </div>
            <div class="column is-6">
                <furet-ui-form-field-boolean
                    v-bind:config="config"
                    name="bool"
                    label="Boolean"
                />
            </div>
        </div>
    `,
    buttons: [],
    fields: ["id", "name", "bool", "state"],
}

const data = {
    id: 1,
    name: 'Label 1',
    state: 'new',
    bool: true,
};

const change = {
    id: 1,
    name: 'Label 1 bis',
    state: 'new',
    bool: false,
};

describe('furet-ui-form-view component', () => {
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
            render: h => h(FormView, {props: {
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
            render: h => h(FormView, {props: {
                view: view_form,
                dataId: '1',
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
            render: h => h(FormView, {props: {
                view: view_form,
                dataId: '1',
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
            render: h => h(FormView, {props: {
                view: view_form,
                dataId: '1',
                data,
                change,
            }}),
        });
        renderer.renderToString(vm, (err, str) => {
            expect(str).toMatchSnapshot();
        });
    });
    it('addNewDataId 1', () => {
        const vm = new Vue({
            el: document.createElement('div'),
            store,
            router,
            i18n,
            template: '<div />',
        });
        router.push({path: '/'});
        expect(vm.$route.path).toBe('/');
        addNewDataId({
            view: view_form,
            $router: router,
            spaceId: '1',
            menuId: '2',
            actionId: '3',
            viewId: '1',
        });
        expect(vm.$route.name).toBe('space_menu_action_view_dataId');
        chai.expect(vm.$route.params).to.deep.equal({
            spaceId: '1',
            menuId: '2',
            actionId: '3',
            viewId: '1',
            dataId: vm.$route.params.dataId,
            mode: 'new',
        });
    });
    it('addNewDataId 2', () => {
        const vm = new Vue({
            el: document.createElement('div'),
            store,
            router,
            i18n,
            template: '<div />',
        });
        router.push({path: '/'});
        expect(vm.$route.path).toBe('/');
        addNewDataId({
            view: view_form,
            $router: router,
            spaceId: '1',
            actionId: '3',
            viewId: '1',
        });
        expect(vm.$route.name).toBe('space_action_view_dataId');
        chai.expect(vm.$route.params).to.deep.equal({
            spaceId: '1',
            menuId: undefined,
            actionId: '3',
            viewId: '1',
            dataId: vm.$route.params.dataId,
            mode: 'new',
        });
    });
    it('openModeDataId 1', () => {
        const vm = new Vue({
            el: document.createElement('div'),
            store,
            router,
            i18n,
            template: '<div />',
        });
        router.push({path: '/'});
        expect(vm.$route.path).toBe('/');
        openModeDataId({
            $router: router,
            spaceId: '1',
            menuId: '2',
            actionId: '3',
            viewId: '4',
            dataId: '5',
        });
        expect(vm.$route.name).toBe('space_menu_action_view_dataId');
        chai.expect(vm.$route.params).to.deep.equal({
            spaceId: '1',
            menuId: '2',
            actionId: '3',
            viewId: '4',
            dataId: '5',
            mode: 'readwrite',
        });
    });
    it('openModeDataId 2', () => {
        const vm = new Vue({
            el: document.createElement('div'),
            store,
            router,
            i18n,
            template: '<div />',
        });
        router.push({path: '/'});
        expect(vm.$route.path).toBe('/');
        openModeDataId({
            $router: router,
            spaceId: '1',
            actionId: '3',
            viewId: '4',
            dataId: '5',
        });
        expect(vm.$route.name).toBe('space_action_view_dataId');
        chai.expect(vm.$route.params).to.deep.equal({
            spaceId: '1',
            menuId: undefined,
            actionId: '3',
            viewId: '4',
            dataId: '5',
            mode: 'readwrite',
        });
    });
    it('closeModeDataId 1', () => {
        const vm = new Vue({
            el: document.createElement('div'),
            store,
            router,
            i18n,
            template: '<div />',
        });
        router.push({path: '/'});
        expect(vm.$route.path).toBe('/');
        closeModeDataId({
            view: view_form,
            $router: router,
            spaceId: '1',
            menuId: '2',
            actionId: '3',
        });
        expect(vm.$route.name).toBe('space_menu_action_view');
        chai.expect(vm.$route.params).to.deep.equal({
            spaceId: '1',
            menuId: '2',
            actionId: '3',
            viewId: '3',
        });
    });
    it('closeModeDataId 2', () => {
        const vm = new Vue({
            el: document.createElement('div'),
            store,
            router,
            i18n,
            template: '<div />',
        });
        router.push({path: '/'});
        expect(vm.$route.path).toBe('/');
        closeModeDataId({
            view: view_form,
            $router: router,
            spaceId: '1',
            actionId: '3',
        });
        expect(vm.$route.name).toBe('space_action_view');
        chai.expect(vm.$route.params).to.deep.equal({
            spaceId: '1',
            menuId: undefined,
            actionId: '3',
            viewId: '3',
        });
    });
    it('cancelModeDataId 1', () => {
        const vm = new Vue({
            el: document.createElement('div'),
            store,
            router,
            i18n,
            template: '<div />',
        });
        router.push({path: '/'});
        store.commit('UPDATE_CHANGE', {model: view_form.model, dataId: '1', fieldname: 'test', value: 'Test'});
        expect(vm.$route.path).toBe('/');
        expect(vm.$store.state.data.changes.Test['1'].test).toBe('Test');
        cancelModeDataId({
            view: view_form,
            $router: router,
            $store: store,
            mode: 'new',
            spaceId: '1',
            menuId: '2',
            actionId: '3',
            dataId: '1',
        });
        expect(vm.$route.name).toBe('space_menu_action_view');
        chai.expect(vm.$route.params).to.deep.equal({
            spaceId: '1',
            menuId: '2',
            actionId: '3',
            viewId: '3',
        });
        chai.expect(vm.$store.state.data.changes).to.deep.equal({});
    });
    it('cancelModeDataId 2', () => {
        const vm = new Vue({
            el: document.createElement('div'),
            store,
            router,
            i18n,
            template: '<div />',
        });
        router.push({path: '/'});
        expect(vm.$route.path).toBe('/');
        store.commit('UPDATE_CHANGE', {model: view_form.model, dataId: '1', fieldname: 'test', value: 'Test'});
        expect(vm.$store.state.data.changes.Test['1'].test).toBe('Test');
        cancelModeDataId({
            view: view_form,
            $router: router,
            $store: store,
            mode: 'readwrite',
            spaceId: '1',
            actionId: '3',
            viewId: '1',
            dataId: '1',
        });
        expect(vm.$route.name).toBe('space_action_view_dataId');
        chai.expect(vm.$route.params).to.deep.equal({
            spaceId: '1',
            menuId: undefined,
            actionId: '3',
            viewId: '1',
            dataId: '1',
            mode: 'readonly',
        });
        chai.expect(vm.$store.state.data.changes).to.deep.equal({});
    });
});

describe('furet-ui-x2m-form-view component', () => {
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
            render: h => h(X2MFormView, {props: {
                view: view_form,
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
            render: h => h(X2MFormView, {props: {
                view: view_form,
                views,
                dataId: '1',
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
            render: h => h(X2MFormView, {props: {
                view: view_form,
                views,
                viewId: '1',
                dataId: '1',
                dataIds: ['1', '2', '3'],
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
            render: h => h(X2MFormView, {props: {
                view: view_form,
                views,
                viewId: '1',
                dataId: '1',
                model: 'Test',
                data,
                change,
            }}),
        });
        renderer.renderToString(vm, (err, str) => {
            expect(str).toMatchSnapshot();
        });
    });
    it('addNewX2MDataId', () => {
        const vm = new Vue({
            el: document.createElement('div'),
            store,
            router,
            i18n,
            template: '<div />',
        });
        addNewX2MDataId({
            view: view_form,
            dataIds: ['1', '2', '3'],
            viewId: '3',
            x2oField: 'x2oField',
            x2oFieldId: '1',
            $emit: (key, value) => {
                switch (key) {
                    case 'changeView':
                        expect(value).toBe('3');
                        break;
                    case 'updateDataIds':
                        expect(value.length).toBe(4);
                        break;
                    default:
                        expect('Bad key').toBe(1);
                }
            },
            updateValueX2M: (newId, values, bool) => {
                expect(values.dataId).toBe(newId);
                expect(values.x2oField).toBe('1');
                expect(bool).toBe(true);
            },
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
            view: view_form,
            dataIds: ['1', '2', '3'],
            dataId: '3',
            viewId: '3',
            $emit: (key, value) => {
                switch (key) {
                    case 'updateDataIds':
                        chai.expect(value).to.deep.equal(['1', '2']);
                        break;
                    case 'changeView':
                        expect(value).toBe('3');
                        break;
                    default:
                        expect('undefined key').toBe(key)
                };
            },
            $store: store,
        });
        expect(store.state.data.changes.Test['3']).toBe('DELETED');
    });
    it('updateValueX2M', () => {
        const vm = new Vue({
            el: document.createElement('div'),
            store,
            router,
            i18n,
            template: '<div />',
        });
        updateValueX2M({
            view: view_form,
            $store: store,
        }, '1', {'x2oField': 'x2oFieldId'}, true);
        chai.expect(store.state.data.changes.new.Test['1']).to.deep.equal({x2oField: 'x2oFieldId'});
    });
});
