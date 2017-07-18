/**
This file is a part of the FuretUI project

   Copyright (C) 2017 Jean-Sebastien SUZANNE <jssuzanne@anybox.fr>

This Source Code Form is subject to the terms of the Mozilla Public License,
v. 2.0. If a copy of the MPL was not distributed with this file,You can
obtain one at http://mozilla.org/MPL/2.0/.
**/
import Vue from 'vue';
import {store} from '../../store';
import {router} from '../../routes';
import {i18n, i18nConf} from '../../i18n';
import {dispatchAll} from '../../store'
import moment from 'moment';
import { sync } from 'vuex-router-sync';
sync(store, router)  // use vue-router with vuex
import '../../space';
import '../../views';
import '../../view';
jest.mock('../../server-call')


describe('dispatchAll', () => {
    let messages
    beforeEach(() => {
        store.dispatch('UNITEST_CLEAR');
        moment.locale('en');
        i18n.locale = 'en';
        messages = JSON.parse(JSON.stringify(i18n.getLocaleMessage('en')));
    });
    afterEach( () => {
        i18n.setLocaleMessage('en', messages);
    });
    it('UPDATE_LOCALES', () => {
        expect(i18n.t('menus.close')).toBe('Close')
        dispatchAll([{
            'type': 'UPDATE_LOCALES',
            'locales': [{
                'locale': 'en',
                'messages': {
                    'menus': {
                        'close': 'Test',
                    },
                },
            }],
        }])
        expect(i18n.t('menus.close')).toBe('Test')
    });
    it('SET_LOCALE', () => {
        expect(moment.locale()).toBe('en')
        expect(i18n.locale).toBe('en')
        dispatchAll([{
            'type': 'SET_LOCALE',
            'locale': 'fr',
        }])
        expect(moment.locale()).toBe('fr')
        expect(i18n.locale).toBe('fr')
    });
    it('UPDATE_ROUTE with path', () => {
        router.push('/');
        const vm = new Vue({
            el: document.createElement('div'),
            store,
            router,
            i18n,
            render: h => h('router-view')
        });
        expect(vm.$route.path).toBe('/')
        dispatchAll([{
            type: 'UPDATE_ROUTE',
            path: '/space/1/menu/2/action/3/view/4',
        }])
        expect(vm.$route.path).toBe('/space/1/menu/2/action/3/view/4')
    });
    it('UPDATE_ROUTE with name and params', () => {
        router.push('/');
        const vm = new Vue({
            el: document.createElement('div'),
            store,
            router,
            i18n,
            render: h => h('router-view')
        });
        expect(vm.$route.path).toBe('/')
        dispatchAll([{
            type: 'UPDATE_ROUTE',
            name: 'space_menu_action_view',
            params: {
                spaceId: '1',
                menuId: '2',
                actionId: '3',
                viewId: '4',
            },
        }])
        expect(vm.$route.path).toBe('/space/1/menu/2/action/3/view/4')
    });
    it('commit', () => {
        expect(store.state.global.title).toBe('');
        dispatchAll([{
            'type': 'UPDATE_GLOBAL',
            'title': 'Test',
        }])
        expect(store.state.global.title).toBe('Test');
    });
});
