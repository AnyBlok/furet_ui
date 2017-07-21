/**
This file is a part of the FuretUI project

   Copyright (C) 2017 Jean-Sebastien SUZANNE <jssuzanne@anybox.fr>

This Source Code Form is subject to the terms of the Mozilla Public License,
v. 2.0. If a copy of the MPL was not distributed with this file,You can
obtain one at http://mozilla.org/MPL/2.0/.
**/
import Vue from 'vue';
import {store} from '../store';
import {router} from '../routes';
import {i18n} from '../i18n';
import Buefy from 'buefy';
Vue.use(Buefy, {defaultIconPack: 'fa',});
import {Notifications, Notification} from '../notifications';

describe('Notifications component', () => {
    const renderer = require('vue-server-renderer').createRenderer();
    beforeEach(() => {
        store.dispatch('UNITEST_CLEAR');
    });
    it('notifications', () => {
        const vm = new Vue({
            el: document.createElement('div'),
            store,
            router,
            i18n,
            render: h => h(Notifications),
        });
        renderer.renderToString(vm, (err, str) => {
            expect(str).toMatchSnapshot();
        });
        store.dispatch('ADD_NOTIFICATION', {title: 'Title 1', message: 'Message 1', process: 'dispatch'});
        renderer.renderToString(vm, (err, str) => {
            expect(str).toMatchSnapshot();
        });
        store.dispatch('ADD_NOTIFICATION', {title: 'Title 2', message: 'Message 2', process: 'dispatch'});
        renderer.renderToString(vm, (err, str) => {
            expect(str).toMatchSnapshot();
        });
    });
    it('notification', () => {
        const vm = new Vue({
            el: document.createElement('div'),
            store,
            router,
            i18n,
            render: h => h(Notification, {props: {
                title: 'Title 1',
                message: '<span>Message 1</span>',
            }}),
        });
        renderer.renderToString(vm, (err, str) => {
            expect(str).toMatchSnapshot();
        });
    });
    it('notification success with icon', () => {
        const vm = new Vue({
            el: document.createElement('div'),
            store,
            router,
            i18n,
            render: h => h(Notification, {props: {
                title: 'Title 1',
                message: '<span>Message 1</span>',
                has_icon: true,
                type: 'success',
            }}),
        });
        renderer.renderToString(vm, (err, str) => {
            expect(str).toMatchSnapshot();
        });
    });
    it('notification info with icon', () => {
        const vm = new Vue({
            el: document.createElement('div'),
            store,
            router,
            i18n,
            render: h => h(Notification, {props: {
                title: 'Title 1',
                message: '<span>Message 1</span>',
                has_icon: true,
                type: 'info',
            }}),
        });
        renderer.renderToString(vm, (err, str) => {
            expect(str).toMatchSnapshot();
        });
    });
    it('notification warning with icon', () => {
        const vm = new Vue({
            el: document.createElement('div'),
            store,
            router,
            i18n,
            render: h => h(Notification, {props: {
                title: 'Title 1',
                message: '<span>Message 1</span>',
                has_icon: true,
                type: 'warning',
            }}),
        });
        renderer.renderToString(vm, (err, str) => {
            expect(str).toMatchSnapshot();
        });
    });
    it('notification error with icon', () => {
        const vm = new Vue({
            el: document.createElement('div'),
            store,
            router,
            i18n,
            render: h => h(Notification, {props: {
                title: 'Title 1',
                message: '<span>Message 1</span>',
                has_icon: true,
                type: 'error',
            }}),
        });
        renderer.renderToString(vm, (err, str) => {
            expect(str).toMatchSnapshot();
        });
    });
});
