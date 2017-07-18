/**
This file is a part of the FuretUI project

   Copyright (C) 2017 Jean-Sebastien SUZANNE <jssuzanne@anybox.fr>

This Source Code Form is subject to the terms of the Mozilla Public License,
v. 2.0. If a copy of the MPL was not distributed with this file,You can
obtain one at http://mozilla.org/MPL/2.0/.
**/

/**
    Picture class

    Render a picture with source come from (type):
    * font-icon: font awesome class


**/
import Vue from 'vue';

export const Picture = Vue.component('furet-ui-picture', {
    template: `
        <span class="icon" v-if="type == 'font-icon'">
            <i v-bind:class="['fa',  value ? value : '']"></i>
        </span>`,
    props: ['type', 'value'],
});
