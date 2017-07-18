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
import {store} from '../../store';
import {router} from '../../routes';
import {i18n} from '../../i18n';
import {View, X2MView, ViewIcon, CustomView} from '../../view';
import '../../views';
import '../../fields';
import '../../space';

jest.mock('../../server-call')

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

const action_space = {
    type: 'UPDATE_SPACE',
    spaceid: '1',
    left_menu: menus,
    right_menu: [],
}

const action_action = {
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
}

const action_view_unknown = {
    type: 'UPDATE_VIEW',
    viewId: '0',
    viewType: 'Unknown',
};

const action_view_list = {
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
}
const action_view_thumbnail = {
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
}

const action_view_form = {
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
}

const action_data = {
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
        '3': {
            id: 3,
            name: 'Label 3',
            state: 'done',
            bool: true,
        },
    }
}

describe('furet-ui-view component', () => {
    const renderer = require('vue-server-renderer').createRenderer();
    beforeEach(() => {
        store.dispatch('UNITEST_CLEAR');
        router.push({path: '/'});
    });
    it('Render with no data', () => {
        const vm = new Vue({
            el: document.createElement('div'),
            store,
            router,
            i18n,
            render: h => h(View, {props: {
                spaceId: '1',
                menuId: '1',
                actionId: '1',
                viewId: '1',
                dataId: '1',
                mode: 'readonly',
            }}),
        });
        renderer.renderToString(vm, (err, str) => {
            expect(str).toMatchSnapshot();
        });
    });
    it('Render with list view', () => {
        const vm = new Vue({
            el: document.createElement('div'),
            store,
            router,
            i18n,
            render: h => h(View, {props: {
                spaceId: '1',
                menuId: '1',
                actionId: '1',
                viewId: '1',
            }}),
        });
        renderer.renderToString(vm, (err, str) => {
            expect(str).toMatchSnapshot();
        });
        store.commit(action_space);
        renderer.renderToString(vm, (err, str) => {
            expect(str).toMatchSnapshot();
        });
        store.commit(action_action)
        renderer.renderToString(vm, (err, str) => {
            expect(str).toMatchSnapshot();
        });
        store.commit(action_view_list)
        renderer.renderToString(vm, (err, str) => {
            expect(str).toMatchSnapshot();
        });
        store.commit(action_data)
        renderer.renderToString(vm, (err, str) => {
            expect(str).toMatchSnapshot();
        });
        store.commit({
            type: 'UPDATE_VIEW',
            viewId: '1',
            dataIds: ['1', '2'],
        });
        renderer.renderToString(vm, (err, str) => {
            expect(str).toMatchSnapshot();
        });
    });
    it('Render with thumbnail view', () => {
        const vm = new Vue({
            el: document.createElement('div'),
            store,
            router,
            i18n,
            render: h => h(View, {props: {
                spaceId: '1',
                menuId: '1',
                actionId: '1',
                viewId: '2',
            }}),
        });
        renderer.renderToString(vm, (err, str) => {
            expect(str).toMatchSnapshot();
        });
        store.commit(action_space);
        renderer.renderToString(vm, (err, str) => {
            expect(str).toMatchSnapshot();
        });
        store.commit(action_action)
        renderer.renderToString(vm, (err, str) => {
            expect(str).toMatchSnapshot();
        });
        store.commit(action_view_thumbnail)
        renderer.renderToString(vm, (err, str) => {
            expect(str).toMatchSnapshot();
        });
        store.commit(action_data)
        renderer.renderToString(vm, (err, str) => {
            expect(str).toMatchSnapshot();
        });
        store.commit({
            type: 'UPDATE_VIEW',
            viewId: '1',
            dataIds: ['1', '2'],
        });
        renderer.renderToString(vm, (err, str) => {
            expect(str).toMatchSnapshot();
        });
    });
    it('Render with form view', () => {
        const vm = new Vue({
            el: document.createElement('div'),
            store,
            router,
            i18n,
            render: h => h(View, {props: {
                spaceId: '1',
                menuId: '1',
                actionId: '1',
                viewId: '3',
                dataId: '1',
                model: 'readonly',
            }}),
        });
        renderer.renderToString(vm, (err, str) => {
            expect(str).toMatchSnapshot();
        });
        store.commit(action_space);
        renderer.renderToString(vm, (err, str) => {
            expect(str).toMatchSnapshot();
        });
        store.commit(action_action)
        renderer.renderToString(vm, (err, str) => {
            expect(str).toMatchSnapshot();
        });
        store.commit(action_view_form)
        renderer.renderToString(vm, (err, str) => {
            expect(str).toMatchSnapshot();
        });
        store.commit(action_data)
        renderer.renderToString(vm, (err, str) => {
            expect(str).toMatchSnapshot();
        });
        store.commit({
            type: 'UPDATE_CHANGE',
            model: 'Test',
            dataId: '1',
            fieldname: 'bool',
            value: false,
        });
        renderer.renderToString(vm, (err, str) => {
            expect(str).toMatchSnapshot();
        });
    });
    it('Render with unknwon view', () => {
        const vm = new Vue({
            el: document.createElement('div'),
            store,
            router,
            i18n,
            render: h => h(View, {props: {
                spaceId: '1',
                menuId: '1',
                actionId: '1',
                viewId: '0',
                dataId: '1',
                model: 'readonly',
            }}),
        });
        renderer.renderToString(vm, (err, str) => {
            expect(str).toMatchSnapshot();
        });
        store.commit(action_space);
        renderer.renderToString(vm, (err, str) => {
            expect(str).toMatchSnapshot();
        });
        store.commit(action_action)
        renderer.renderToString(vm, (err, str) => {
            expect(str).toMatchSnapshot();
        });
        store.commit(action_view_unknown)
        renderer.renderToString(vm, (err, str) => {
            expect(str).toMatchSnapshot();
        });
    });
});
describe('furet-ui-x2m-view component', () => {
    const renderer = require('vue-server-renderer').createRenderer();
    beforeEach(() => {
        store.dispatch('UNITEST_CLEAR');
        router.push({path: '/'});
    });
    it('Render with no data', () => {
        const vm = new Vue({
            el: document.createElement('div'),
            store,
            router,
            i18n,
            render: h => h(X2MView, {props: {
                model: 'Test',
                views,
                viewId: '1',
                dataIds: ['1', '2'],
                isReadonly: true,
                x2oField: 'x2oField',
                x2oFieldId: '1',
            }}),
        });
        renderer.renderToString(vm, (err, str) => {
            expect(str).toMatchSnapshot();
        });
    });
    it('Render with list view', () => {
        const vm = new Vue({
            el: document.createElement('div'),
            store,
            router,
            i18n,
            render: h => h(X2MView, {props: {
                model: 'Test',
                views,
                viewId: '1',
                dataIds: ['1', '2', 'newId'],
                isReadonly: true,
                x2oField: 'x2oField',
                x2oFieldId: '1',
            }}),
        });
        renderer.renderToString(vm, (err, str) => {
            expect(str).toMatchSnapshot();
        });
        store.commit(action_view_list)
        renderer.renderToString(vm, (err, str) => {
            expect(str).toMatchSnapshot();
        });
        store.commit(action_data)
        renderer.renderToString(vm, (err, str) => {
            expect(str).toMatchSnapshot();
        });
        store.commit({
            type: 'UPDATE_CHANGE',
            model: 'Test',
            dataId: '1',
            fieldname: 'bool',
            value: false,
        });
        renderer.renderToString(vm, (err, str) => {
            expect(str).toMatchSnapshot();
        });
        store.commit({
            type: 'CREATE_CHANGE_X2M',
            model: 'Test',
            dataId: 'newId',
        });
        store.commit({
            type: 'UPDATE_CHANGE_X2M',
            model: 'Test',
            dataId: 'newId',
            fieldname: 'bool',
            value: true,
        });
        store.commit({
            type: 'UPDATE_CHANGE_X2M',
            model: 'Test',
            dataId: 'newId',
            fieldname: 'name',
            value: 'New id',
        });
        renderer.renderToString(vm, (err, str) => {
            expect(str).toMatchSnapshot();
        });
    });
    it('Render with thumbnail view', () => {
        const vm = new Vue({
            el: document.createElement('div'),
            store,
            router,
            i18n,
            render: h => h(X2MView, {props: {
                model: 'Test',
                views,
                viewId: '2',
                dataIds: ['1', '2', 'newId'],
                isReadonly: true,
                x2oField: 'x2oField',
                x2oFieldId: '1',
            }}),
        });
        renderer.renderToString(vm, (err, str) => {
            expect(str).toMatchSnapshot();
        });
        store.commit(action_view_thumbnail)
        renderer.renderToString(vm, (err, str) => {
            expect(str).toMatchSnapshot();
        });
        store.commit(action_data)
        renderer.renderToString(vm, (err, str) => {
            expect(str).toMatchSnapshot();
        });
        store.commit({
            type: 'UPDATE_CHANGE',
            model: 'Test',
            dataId: '1',
            fieldname: 'bool',
            value: false,
        });
        renderer.renderToString(vm, (err, str) => {
            expect(str).toMatchSnapshot();
        });
        store.commit({
            type: 'CREATE_CHANGE_X2M',
            model: 'Test',
            dataId: 'newId',
        });
        store.commit({
            type: 'UPDATE_CHANGE_X2M',
            model: 'Test',
            dataId: 'newId',
            fieldname: 'bool',
            value: true,
        });
        store.commit({
            type: 'UPDATE_CHANGE_X2M',
            model: 'Test',
            dataId: 'newId',
            fieldname: 'name',
            value: 'New id',
        });
        renderer.renderToString(vm, (err, str) => {
            expect(str).toMatchSnapshot();
        });
    });
    it('Render with form view 1', () => {
        const vm = new Vue({
            el: document.createElement('div'),
            store,
            router,
            i18n,
            render: h => h(X2MView, {props: {
                model: 'Test',
                views,
                viewId: '3',
                dataId: '1',
                isReadonly: true,
                x2oField: 'x2oField',
                x2oFieldId: '1',
            }}),
        });
        renderer.renderToString(vm, (err, str) => {
            expect(str).toMatchSnapshot();
        });
        store.commit(action_view_form)
        renderer.renderToString(vm, (err, str) => {
            expect(str).toMatchSnapshot();
        });
        store.commit(action_data)
        renderer.renderToString(vm, (err, str) => {
            expect(str).toMatchSnapshot();
        });
        store.commit({
            type: 'UPDATE_CHANGE',
            model: 'Test',
            dataId: '1',
            fieldname: 'bool',
            value: false,
        });
        renderer.renderToString(vm, (err, str) => {
            expect(str).toMatchSnapshot();
        });
    });
    it('Render with form view 2', () => {
        const vm = new Vue({
            el: document.createElement('div'),
            store,
            router,
            i18n,
            render: h => h(X2MView, {props: {
                model: 'Test',
                views,
                viewId: '3',
                dataId: 'newId',
                isReadonly: true,
                x2oField: 'x2oField',
                x2oFieldId: '1',
            }}),
        });
        renderer.renderToString(vm, (err, str) => {
            expect(str).toMatchSnapshot();
        });
        store.commit(action_view_form)
        renderer.renderToString(vm, (err, str) => {
            expect(str).toMatchSnapshot();
        });
        store.commit(action_data)
        renderer.renderToString(vm, (err, str) => {
            expect(str).toMatchSnapshot();
        });
        store.commit({
            type: 'CREATE_CHANGE_X2M',
            model: 'Test',
            dataId: 'newId',
        });
        store.commit({
            type: 'UPDATE_CHANGE_X2M',
            model: 'Test',
            dataId: 'newId',
            fieldname: 'bool',
            value: true,
        });
        store.commit({
            type: 'UPDATE_CHANGE_X2M',
            model: 'Test',
            dataId: 'newId',
            fieldname: 'name',
            value: 'New id',
        });
        renderer.renderToString(vm, (err, str) => {
            expect(str).toMatchSnapshot();
        });
    });
    it('Render with unknwon view', () => {
        const vm = new Vue({
            el: document.createElement('div'),
            store,
            router,
            i18n,
            render: h => h(X2MView, {props: {
                spaceId: '1',
                menuId: '1',
                actionId: '1',
                viewId: '0',
                dataId: '1',
                model: 'readonly',
            }}),
        });
        renderer.renderToString(vm, (err, str) => {
            expect(str).toMatchSnapshot();
        });
        store.commit(action_space);
        renderer.renderToString(vm, (err, str) => {
            expect(str).toMatchSnapshot();
        });
        store.commit(action_action)
        renderer.renderToString(vm, (err, str) => {
            expect(str).toMatchSnapshot();
        });
        store.commit(action_view_unknown)
        renderer.renderToString(vm, (err, str) => {
            expect(str).toMatchSnapshot();
        });
    });
});

describe('furet-ui-view-icon component', () => {
    const renderer = require('vue-server-renderer').createRenderer();
    it('List', () => {
        const vm = new Vue({
            el: document.createElement('div'),
            store,
            router,
            i18n,
            render: h => h(ViewIcon, {props: {type: 'List'}}),
        });
        renderer.renderToString(vm, (err, str) => {
            expect(str).toMatchSnapshot();
        });
    });
    it('Thumbnail', () => {
        const vm = new Vue({
            el: document.createElement('div'),
            store,
            router,
            i18n,
            render: h => h(ViewIcon, {props: {type: 'Thumbnail'}}),
        });
        renderer.renderToString(vm, (err, str) => {
            expect(str).toMatchSnapshot();
        });
    });
    it('Form', () => {
        const vm = new Vue({
            el: document.createElement('div'),
            store,
            router,
            i18n,
            render: h => h(ViewIcon, {props: {type: 'Form'}}),
        });
        renderer.renderToString(vm, (err, str) => {
            expect(str).toMatchSnapshot();
        });
    });
    it('Unknown', () => {
        const vm = new Vue({
            el: document.createElement('div'),
            store,
            router,
            i18n,
            render: h => h(ViewIcon, {props: {type: 'Unknown'}}),
        });
        renderer.renderToString(vm, (err, str) => {
            expect(str).toMatchSnapshot();
        });
    });
})

describe('furet-ui-custom-view component', () => {
    const renderer = require('vue-server-renderer').createRenderer();
    it('Login', () => {
        const vm = new Vue({
            el: document.createElement('div'),
            store,
            router,
            i18n,
            render: h => h(CustomView, {props: {viewName: 'Login'}}),
        });
        renderer.renderToString(vm, (err, str) => {
            expect(str).toMatchSnapshot();
        });
    });
    it('Logout', () => {
        const vm = new Vue({
            el: document.createElement('div'),
            store,
            router,
            i18n,
            render: h => h(CustomView, {props: {viewName: 'Logout'}}),
        });
        renderer.renderToString(vm, (err, str) => {
            expect(str).toMatchSnapshot();
        });
    });
    it('Unknown', () => {
        const vm = new Vue({
            el: document.createElement('div'),
            store,
            router,
            i18n,
            render: h => h(CustomView, {props: {viewName: 'Unknown'}}),
        });
        renderer.renderToString(vm, (err, str) => {
            expect(str).toMatchSnapshot();
        });
    });
})
