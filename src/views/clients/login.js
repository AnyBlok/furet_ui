/**
This file is a part of the FuretUI project

   Copyright (C) 2017 Jean-Sebastien SUZANNE <jssuzanne@anybox.fr>

This Source Code Form is subject to the terms of the Mozilla Public License,
v. 2.0. If a copy of the MPL was not distributed with this file,You can
obtain one at http://mozilla.org/MPL/2.0/.
**/
import Vue from 'vue';
import plugin from '../../plugin';
import {json_post_dispatch_all} from '../../server-call';

export const Login = Vue.component('furet-ui-custom-view-login', {
    template: `
        <section class="section">
            <div class="columns is-mobile">
                <div class="column is-half is-offset-one-quarter">
                    <a class="button is-primary" v-on:click="onCallServer">
                        {{ $t('views.clients.login.button') }}
                    </a>
                </div>
            </div>
        </section>`,
    methods: {
        onCallServer () {
            json_post_dispatch_all('/client/login', {});
        }
    },
});

plugin.set(['views', 'type', 'client'], {Login: {vue: 'furet-ui-custom-view-login'}});
