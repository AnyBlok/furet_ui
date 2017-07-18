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
import {FieldListSelection, FieldThumbnailSelection, FieldFormSelection} from '../../fields/selection'

describe('Selection list component', () => {
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
            render: h => h(FieldListSelection, {props: {
                row: {fieldname: 'new'},
                header: {name: 'fieldname', selections: {new: 'New'}},
            }}),
        });
        renderer.renderToString(vm, (err, str) => {
            expect(str).toMatchSnapshot();
        });
    });
    it('Render without selections', () => {
        const vm = new Vue({
            el: document.createElement('div'),
            store,
            router,
            i18n,
            render: h => h(FieldListSelection, {props: {
                row: {fieldname: 'new'},
                header: {name: 'fieldname'},
            }}),
        });
        renderer.renderToString(vm, (err, str) => {
            expect(str).toMatchSnapshot();
        });
    });
    it('Render without data', () => {
        const vm = new Vue({
            el: document.createElement('div'),
            store,
            router,
            i18n,
            render: h => h(FieldListSelection, {props: {
                row: {},
                header: {name: 'fieldname', selections: {new: 'New'}},
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
            render: h => h(FieldListSelection, {props: {
                row: {fieldname: 'new'},
                header: {name: 'fieldname', invisible: true, selections: {new: 'New'}},
            }}),
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
            render: h => h(FieldListSelection, {props: {
                row: {fieldname: 'new'},
                header: {name: 'fieldname', invisible: false, selections: {new: 'New'}},
            }}),
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
            render: h => h(FieldListSelection, {props: {
                row: {fieldname: 'new', invisible: true},
                header: {name: 'fieldname', invisible: 'fields.invisible', selections: {new: 'New'}},
            }}),
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
            render: h => h(FieldListSelection, {props: {
                row: {fieldname: 'new', invisible: false},
                header: {name: 'fieldname', invisible: 'fields.invisible', selections: {new: 'New'}},
            }}),
        });
        renderer.renderToString(vm, (err, str) => {
            expect(str).toMatchSnapshot();
        });
    });
});

describe('Selection Thumbnail component', () => {
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
            render: h => h(FieldThumbnailSelection, {props: {
                data: {fieldname: 'new'},
                name: 'fieldname',
                selections: {new: 'New'},
            }}),
        });
        renderer.renderToString(vm, (err, str) => {
            expect(str).toMatchSnapshot();
        });
    });
    it('Render without selection', () => {
        const vm = new Vue({
            el: document.createElement('div'),
            store,
            router,
            i18n,
            render: h => h(FieldThumbnailSelection, {props: {
                data: {fieldname: 'new'},
                name: 'fieldname',
            }}),
        });
        renderer.renderToString(vm, (err, str) => {
            expect(str).toMatchSnapshot();
        });
    });
    it('Render without data', () => {
        const vm = new Vue({
            el: document.createElement('div'),
            store,
            router,
            i18n,
            render: h => h(FieldThumbnailSelection, {props: {
                data: {},
                name: 'fieldname',
                selections: {new: 'New'},
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
            render: h => h(FieldThumbnailSelection, {props: {
                data: {fieldname: 'new'},
                name: 'fieldname',
                invisible: true,
                selections: {new: 'New'},
            }}),
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
            render: h => h(FieldThumbnailSelection, {props: {
                data: {fieldname: 'new'},
                name: 'fieldname',
                invisible: false,
                selections: {new: 'New'},
            }}),
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
            render: h => h(FieldThumbnailSelection, {props: {
                data: {fieldname: 'new', invisible: true},
                name: 'fieldname',
                invisible: 'fields.invisible',
                selections: {new: 'New'},
            }}),
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
            render: h => h(FieldThumbnailSelection, {props: {
                data: {fieldname: 'new', invisible: false},
                name: 'fieldname',
                invisible: 'fields.invisible',
                selections: {new: 'New'},
            }}),
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
            render: h => h(FieldThumbnailSelection, {props: {
                data: {fieldname: 'new'},
                name: 'fieldname',
                label: 'The label',
                selections: {new: 'New'},
            }}),
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
            render: h => h(FieldThumbnailSelection, {props: {
                data: {fieldname: 'new'},
                name: 'fieldname',
                tooltip: 'The tooltip',
                selections: {new: 'New'},
            }}),
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
            render: h => h(FieldThumbnailSelection, {props: {
                data: {fieldname: 'new'},
                name: 'fieldname',
                tooltip: 'The left tooltip',
                tooltip_position: 'is-left',
                selections: {new: 'New'},
            }}),
        });
        renderer.renderToString(vm, (err, str) => {
            expect(str).toMatchSnapshot();
        });
    });
});

describe('Selection Form component', () => {
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
            render: h => h(FieldFormSelection, {props: {
                config: {data: {fieldname: 'new'}},
                name: 'fieldname',
                selections: {new: 'New'},
            }}),
        });
        renderer.renderToString(vm, (err, str) => {
            expect(str).toMatchSnapshot();
        });
    });
    it('Render without selections RW', () => {
        const vm = new Vue({
            el: document.createElement('div'),
            store,
            router,
            i18n,
            render: h => h(FieldFormSelection, {props: {
                config: {data: {fieldname: 'new'}},
                name: 'fieldname',
            }}),
        });
        renderer.renderToString(vm, (err, str) => {
            expect(str).toMatchSnapshot();
        });
    });
    it('Render without selections RO', () => {
        const vm = new Vue({
            el: document.createElement('div'),
            store,
            router,
            i18n,
            render: h => h(FieldFormSelection, {props: {
                config: {data: {fieldname: 'new', mode: 'readonly'}},
                name: 'fieldname',
            }}),
        });
        renderer.renderToString(vm, (err, str) => {
            expect(str).toMatchSnapshot();
        });
    });
    it('Render without data', () => {
        const vm = new Vue({
            el: document.createElement('div'),
            store,
            router,
            i18n,
            render: h => h(FieldFormSelection, {props: {
                config: {data: {}},
                name: 'fieldname',
                selections: {new: 'New'},
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
            render: h => h(FieldFormSelection, {props: {
                config: {data: {fieldname: 'new'}},
                name: 'fieldname',
                invisible: true,
                selections: {new: 'New'},
            }}),
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
            render: h => h(FieldFormSelection, {props: {
                config: {data: {fieldname: 'new'}},
                name: 'fieldname',
                invisible: false,
                selections: {new: 'New'},
            }}),
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
            render: h => h(FieldFormSelection, {props: {
                config: {data: {fieldname: 'new', invisible: true}},
                name: 'fieldname',
                invisible: 'fields.invisible',
                selections: {new: 'New'},
            }}),
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
            render: h => h(FieldFormSelection, {props: {
                config: {data: {fieldname: 'new', invisible: false}},
                name: 'fieldname',
                invisible: 'fields.invisible',
                selections: {new: 'New'},
            }}),
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
            render: h => h(FieldFormSelection, {props: {
                config: {data: {fieldname: 'new'}},
                name: 'fieldname',
                label: 'The label',
                selections: {new: 'New'},
            }}),
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
            render: h => h(FieldFormSelection, {props: {
                config: {data: {fieldname: 'new'}},
                name: 'fieldname',
                tooltip: 'The tooltip',
                selections: {new: 'New'},
            }}),
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
            render: h => h(FieldFormSelection, {props: {
                config: {data: {fieldname: 'new'}},
                name: 'fieldname',
                tooltip: 'The left tooltip',
                tooltip_position: 'is-left',
                selections: {new: 'New'},
            }}),
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
            render: h => h(FieldFormSelection, {props: {
                config: {data: {fieldname: 'new'}, mode: 'readonly'},
                name: 'fieldname',
                selections: {new: 'New'},
            }}),
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
            render: h => h(FieldFormSelection, {props: {
                config: {data: {fieldname: 'new'}},
                name: 'fieldname',
                readonly: true,
                selections: {new: 'New'},
            }}),
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
            render: h => h(FieldFormSelection, {props: {
                config: {data: {fieldname: 'new', readonly: 1}},
                name: 'fieldname',
                readonly: 'fields.readonly',
                selections: {new: 'New'},
            }}),
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
            render: h => h(FieldFormSelection, {props: {
                config: {data: {fieldname: 'new'}},
                name: 'fieldname',
                required: true,
                selections: {new: 'New'},
            }}),
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
            render: h => h(FieldFormSelection, {props: {
                config: {data: {fieldname: 'new', required: true}},
                name: 'fieldname',
                required: 'fields.required',
                selections: {new: 'New'},
            }}),
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
            render: h => h(FieldFormSelection, {props: {
                config: {data: {}},
                name: 'fieldname',
                required: true,
                selections: {new: 'New'},
            }}),
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
            render: h => h(FieldFormSelection, {props: {
                config: {data: {}},
                name: 'fieldname',
                placeholder: 'The placeholder',
                selections: {new: 'New'},
            }}),
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
            render: h => h(FieldFormSelection, {props: {
                config: {data: {}},
                name: 'fieldname',
                icon: 'user',
                selections: {new: 'New'},
            }}),
        });
        renderer.renderToString(vm, (err, str) => {
            expect(str).toMatchSnapshot();
        });
    });
});
