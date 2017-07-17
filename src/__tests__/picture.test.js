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
import Picture from '../picture';

test('Picture font-icon fa-user', () => {
        const renderer = require('vue-server-renderer').createRenderer();
        const vm = new Vue({
            el: document.createElement('div'),
            store,
            router,
            i18n,
            render: h => h(Picture, {props: {type: 'font-icon', value: 'fa-user'}}),
        });
        renderer.renderToString(vm, (err, str) => {
            expect(str).toMatchSnapshot();
        });
});

test.skip('Picture with base64', () => {
});

test.skip('Picture with url', () => {
});
