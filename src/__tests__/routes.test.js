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
import '../space';

jest.mock('../server-call')

describe('Route component', () => {
    const renderer = require('vue-server-renderer').createRenderer();
    beforeEach(() => {
        store.dispatch('UNITEST_CLEAR');
        router.push({path: '/'});
    });
    it('Render App with default path', () => {
        const vm = new Vue({
            el: document.createElement('div'),
            template: '<router-view></router-view>',
            store,
            router,
            i18n,
        });
        renderer.renderToString(vm, (err, str) => {
            expect(str).toMatchSnapshot();
        });
    });
    it('Render App with custom view login', () => {
        const vm = new Vue({
            el: document.createElement('div'),
            template: '<router-view></router-view>',
            store,
            router,
            i18n,
        });
        router.push({name: 'custom_view', params: {viewName: 'Login'}});
        renderer.renderToString(vm, (err, str) => {
            expect(str).toMatchSnapshot();
        });
        router.push({name: 'custom_view', params: {viewName: 'Other'}});
        renderer.renderToString(vm, (err, str) => {
            expect(str).toMatchSnapshot();
        });
    });
    it('Render App with space', () => {
        const vm = new Vue({
            el: document.createElement('div'),
            template: '<router-view></router-view>',
            store,
            router,
            i18n,
        });
        router.push({name: 'space', params: {spaceId: '1'}});
        renderer.renderToString(vm, (err, str) => {
            expect(str).toMatchSnapshot();
        });
        router.push({name: 'space', params: {spaceId: '2'}});
        renderer.renderToString(vm, (err, str) => {
            expect(str).toMatchSnapshot();
        });
    });
    it('Render App with space and menu', () => {
        const vm = new Vue({
            el: document.createElement('div'),
            template: '<router-view></router-view>',
            store,
            router,
            i18n,
        });
        router.push({name: 'space_menu', params: {spaceId: '1', menuId: '1'}});
        renderer.renderToString(vm, (err, str) => {
            expect(str).toMatchSnapshot();
        });
        router.push({name: 'space_menu', params: {spaceId: '1', menuId: '2'}});
        renderer.renderToString(vm, (err, str) => {
            expect(str).toMatchSnapshot();
        });
    });
    it('Render App with space and menu and action', () => {
        const vm = new Vue({
            el: document.createElement('div'),
            template: '<router-view></router-view>',
            store,
            router,
            i18n,
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
        store.commit({                                                                       
            type: 'UPDATE_ACTION',
            actionId: '2',
            label: 'Action : 1',
            views: [
                {
                    viewId: '4',
                    type: 'List',
                },
                {
                    viewId: '5',
                    type: 'Form',
                    unclickable: true,
                },
            ],
        });
        router.push({name: 'space_menu_action', params: {spaceId: '1', menuId: '1', actionId: 1}});
        renderer.renderToString(vm, (err, str) => {
            expect(str).toMatchSnapshot();
        });
        router.push({name: 'space_menu_action', params: {spaceId: '1', menuId: '1', actionId: 2}});
        renderer.renderToString(vm, (err, str) => {
            expect(str).toMatchSnapshot();
        });
    });
    it('Render App with space and menu and action and custome view', () => {
        const vm = new Vue({
            el: document.createElement('div'),
            template: '<router-view></router-view>',
            store,
            router,
            i18n,
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
        router.push({name: 'space_menu_action_custom_view', 
                     params: {spaceId: '1', menuId: '1', actionId: 1, viewName: 'Login'}});
        renderer.renderToString(vm, (err, str) => {
            expect(str).toMatchSnapshot();
        });
    });
    it('Render App with space and menu and action and view', () => {
        const vm = new Vue({
            el: document.createElement('div'),
            template: '<router-view></router-view>',
            store,
            router,
            i18n,
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
        store.commit({
            type: 'UPDATE_VIEW',
            viewId: '2',
            viewType: 'Thumbnail',
            label: 'View : 2',
            creatable: true,
            onSelect: '3',
            model: 'Test',
            search: [
                {
                    key: 'name',
                    label: 'Label',
                    default: 'todo',
                },
                {
                    key: 'creation_date',
                    label: 'Creation date',
                },
            ],
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
                            v-bind:selections="{'new': 'New', 'started': 'Started', 'done': 'Done'}"
                        />
                    </div>
                    <div class="column is-6">
                        <furet-ui-thumbnail-field-integer
                            v-bind:data="card"
                            name="id"
                            label="ID"
                        />
                    </div>
                </div>`,
            buttons: [],
            fields: ["id", "name", "bool", "state"],
        });
        store.commit({
            type: 'UPDATE_VIEW',
            viewId: 3,
            viewType: 'Form',
            label: 'View : 3',
            creatable: true,
            deletable: true,
            editable: true,
            onClose: '1',
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
                            label="Bool"
                        />
                    </div>
                </div>`, 
            buttons: [],
            fields: ["id", "name", "bool", "state"],
        });
        store.commit({
            type: 'UPDATE_DATA',
            model: 'Test',
            data: {
                '1': {
                    id: 1,
                    name: 'Label',
                    state: 'new',
                    bool: true,
                },
                '2': {
                    id: 2,
                    name: 'Label 2',
                    state: 'done',
                    bool: true,
                },
            }
        });
        store.commit({
            type: 'UPDATE_VIEW',
            viewId: '1',
            dataIds: ['1', '2'],
        });
        store.commit({
            type: 'UPDATE_VIEW',
            viewId: '2',
            dataIds: ['1', '2'],
        });
        router.push({name: 'space_menu_action_view', 
                     params: {spaceId: '1', menuId: '1', actionId: 1, viewId: '1'}});
        renderer.renderToString(vm, (err, str) => {
            expect(str).toMatchSnapshot();
        });
        router.push({name: 'space_menu_action_view', 
                     params: {spaceId: '1', menuId: '1', actionId: 1, viewId: '2'}});
        renderer.renderToString(vm, (err, str) => {
            expect(str).toMatchSnapshot();
        });
        router.push({name: 'space_menu_action_view_dataId', 
                     params: {spaceId: '1', menuId: '1', actionId: 1, viewId: '3', dataId: '1', mode: 'new'}});
        renderer.renderToString(vm, (err, str) => {
            expect(str).toMatchSnapshot();
        });
        router.push({name: 'space_menu_action_view_dataId', 
                     params: {spaceId: '1', menuId: '1', actionId: 1, viewId: '3', dataId: '2', mode: 'new'}});
        renderer.renderToString(vm, (err, str) => {
            expect(str).toMatchSnapshot();
        });
    });
    it('Render App with space and action', () => {
        const vm = new Vue({
            el: document.createElement('div'),
            template: '<router-view></router-view>',
            store,
            router,
            i18n,
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
        store.commit({                                                                       
            type: 'UPDATE_ACTION',
            actionId: '2',
            label: 'Action : 1',
            views: [
                {
                    viewId: '4',
                    type: 'List',
                },
                {
                    viewId: '5',
                    type: 'Form',
                    unclickable: true,
                },
            ],
        });
        router.push({name: 'space_action', params: {spaceId: '1', actionId: 1}});
        renderer.renderToString(vm, (err, str) => {
            expect(str).toMatchSnapshot();
        });
        router.push({name: 'space_action', params: {spaceId: '1', actionId: 2}});
        renderer.renderToString(vm, (err, str) => {
            expect(str).toMatchSnapshot();
        });
    });
    it('Render App with space and action and custome view', () => {
        const vm = new Vue({
            el: document.createElement('div'),
            template: '<router-view></router-view>',
            store,
            router,
            i18n,
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
        router.push({name: 'space_action_custom_view', 
                     params: {spaceId: '1', actionId: 1, viewName: 'Login'}});
        renderer.renderToString(vm, (err, str) => {
            expect(str).toMatchSnapshot();
        });
    });
    it('Render App with space and action and view', () => {
        const vm = new Vue({
            el: document.createElement('div'),
            template: '<router-view></router-view>',
            store,
            router,
            i18n,
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
        store.commit({
            type: 'UPDATE_VIEW',
            viewId: '2',
            viewType: 'Thumbnail',
            label: 'View : 2',
            creatable: true,
            onSelect: '3',
            model: 'Test',
            search: [
                {
                    key: 'name',
                    label: 'Label',
                    default: 'todo',
                },
                {
                    key: 'creation_date',
                    label: 'Creation date',
                },
            ],
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
                            v-bind:selections="{'new': 'New', 'started': 'Started', 'done': 'Done'}"
                        />
                    </div>
                    <div class="column is-6">
                        <furet-ui-thumbnail-field-integer
                            v-bind:data="card"
                            name="id"
                            label="ID"
                        />
                    </div>
                </div>`,
            buttons: [],
            fields: ["id", "name", "bool", "state"],
        });
        store.commit({
            type: 'UPDATE_VIEW',
            viewId: 3,
            viewType: 'Form',
            label: 'View : 3',
            creatable: true,
            deletable: true,
            editable: true,
            onClose: '1',
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
                            label="Bool"
                        />
                    </div>
                </div>`, 
            buttons: [],
            fields: ["id", "name", "bool", "state"],
        });
        store.commit({
            type: 'UPDATE_DATA',
            model: 'Test',
            data: {
                '1': {
                    id: 1,
                    name: 'Label',
                    state: 'new',
                    bool: true,
                },
                '2': {
                    id: 2,
                    name: 'Label 2',
                    state: 'done',
                    bool: true,
                },
            }
        });
        store.commit({
            type: 'UPDATE_VIEW',
            viewId: '1',
            dataIds: ['1', '2'],
        });
        store.commit({
            type: 'UPDATE_VIEW',
            viewId: '2',
            dataIds: ['1', '2'],
        });
        router.push({name: 'space_action_view', 
                     params: {spaceId: '1', actionId: 1, viewId: '1'}});
        renderer.renderToString(vm, (err, str) => {
            expect(str).toMatchSnapshot();
        });
        router.push({name: 'space_action_view', 
                     params: {spaceId: '1', actionId: 1, viewId: '2'}});
        renderer.renderToString(vm, (err, str) => {
            expect(str).toMatchSnapshot();
        });
        router.push({name: 'space_action_view_dataId', 
                     params: {spaceId: '1', actionId: 1, viewId: '3', dataId: '1', mode: 'new'}});
        renderer.renderToString(vm, (err, str) => {
            expect(str).toMatchSnapshot();
        });
        router.push({name: 'space_action_view_dataId', 
                     params: {spaceId: '1', actionId: 1, viewId: '3', dataId: '2', mode: 'new'}});
        renderer.renderToString(vm, (err, str) => {
            expect(str).toMatchSnapshot();
        });
    });
});
