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
import {SearchBar, onChange} from '../../views/search';

jest.mock('../../server-call')

describe('furet-ui-search-bar-view component', () => {
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
            render: h => h(SearchBar, {props: {
                filter: [],
            }}),
        });
        renderer.renderToString(vm, (err, str) => {
            expect(str).toMatchSnapshot();
        });
    });
    it('onChange 1', () => {
        const obj = {
            origin: '',
            label: {},
            $emit (key, value) {
                expect(key).toBe('updateFilter'),
                chai.expect(value).to.deep.equal([]);
            },
        }
        onChange(obj, []);
        chai.expect(obj.selected).to.deep.equal([]);
        chai.expect(obj.origin).to.deep.equal('[]');
    });
    it('onChange 2', () => {
        const values = [
            {
                key: 'test',
                label: 'label',
                value: 'test',
                operator: 'equal',
                type: 'search',
            },
        ];
        const filter = [
            {
                key: 'test',
                label: 'label',
                value: 'test',
                operator: 'equal',
                type: 'search',
            },
        ]
        const obj = {
            origin: '',
            label: {},
            $emit (key, value) {
                expect(key).toBe('updateFilter'),
                chai.expect(value).to.deep.equal(filter);
            },
        }
        onChange(obj, values);
        chai.expect(obj.selected).to.deep.equal(filter);
        chai.expect(obj.origin).to.deep.equal(JSON.stringify(filter));
    });
    it('onChange 3', () => {
        const values = [
            {
                key: 'test',
                label: 'label',
                value: 'test 1',
                operator: 'equal',
                type: 'search',
            },
            {
                key: 'test',
                label: 'label',
                value: 'test 2',
                operator: 'equal',
                type: 'search',
            },
        ];
        const filter = [
            {
                key: 'test',
                label: 'label : "test 1", "test 2"',
                value: ['test 1', 'test 2'],
                operator: 'equal',
                type: 'search',
            },
        ]
        const obj = {
            origin: '',
            labels: {test: 'label'},
            $emit (key, value) {
                expect(key).toBe('updateFilter'),
                chai.expect(value).to.deep.equal(filter);
            },
        }
        onChange(obj, values);
        chai.expect(obj.selected).to.deep.equal(filter);
        chai.expect(obj.origin).to.deep.equal(JSON.stringify(filter));
    });
});
