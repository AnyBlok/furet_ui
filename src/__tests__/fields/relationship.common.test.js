/**
This file is a part of the FuretUI project

   Copyright (C) 2017 Jean-Sebastien SUZANNE <jssuzanne@anybox.fr>

This Source Code Form is subject to the terms of the Mozilla Public License,
v. 2.0. If a copy of the MPL was not distributed with this file,You can
obtain one at http://mozilla.org/MPL/2.0/.
**/
import Vue from 'vue';
import Vuex from 'vuex';
import {store} from '../../store';
import {router} from '../../routes';
import {i18n} from '../../i18n';
import {addInBreadscrumb} from '../../fields/relationship/common'

jest.mock('../../server-call')

describe('addInBreadscrumb', () => {
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
            template: '<div></div>',
        });
        router.push({path: '/space/1/menu/2/action/3/view/4'});
        store.commit({type: 'REPLACE_CHANGE', changes: {test: 1}});
        store.commit({                                                                       
            type: 'UPDATE_ACTION',
            actionId: '3',
            label: 'Action : 3',
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
        expect(vm.$route.path).toBe('/space/1/menu/2/action/3/view/4');
        expect(vm.$store.state.global.breadscrumbs.length).toBe(0);
        expect(vm.$store.state.data.changes.test).toBe(1);
        addInBreadscrumb(vm.$route, vm.$store, {
            spaceId: '5',
            menuId: '6',                                     
            actionId: '7',                                 
            dataId: '8',                                                         
            mode: 'new',
        });
        expect(vm.$store.state.global.breadscrumbs.length).toBe(1);
        expect(vm.$store.state.global.breadscrumbs[0].path).toBe('/space/1/menu/2/action/3/view/4');
        expect(vm.$store.state.global.breadscrumbs[0].label).toBe('Action : 3');
        expect(vm.$store.state.global.breadscrumbs[0].changes.test).toBe(1);
        expect(vm.$store.state.global.breadscrumbs[0].position).toBe(0);
        expect(vm.$store.state.data.changes.test).toBe(undefined);
    });
});
