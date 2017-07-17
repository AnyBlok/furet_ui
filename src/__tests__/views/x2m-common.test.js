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
import {addNewX2MMulti, updateValueX2MMulti} from '../../views/x2m-common';

jest.mock('../../server-call')

const view = {
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

describe('ViewMixin mixin', () => {
    const renderer = require('vue-server-renderer').createRenderer();
    beforeEach(() => {
        store.dispatch('UNITEST_CLEAR');
        router.push({path: '/'});
    });
    it('addNewX2MMulti', () => {
        const vm = new Vue({
            el: document.createElement('div'),
            store,
            router,
            i18n,
            template: '<div />',
        });
        addNewX2MMulti({
            view,
            dataIds,
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
    it('updateValueX2MMulti', () => {
        const vm = new Vue({
            el: document.createElement('div'),
            store,
            router,
            i18n,
            template: '<div />',
        });
        updateValueX2MMulti({
            view,
            $store: store,
        }, '1', {'x2oField': 'x2oFieldId'}, true);
        chai.expect(store.state.data.changes.new.Test['1']).to.deep.equal({x2oField: 'x2oFieldId'});
    });
});
