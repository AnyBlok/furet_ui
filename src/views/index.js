/**
This file is a part of the FuretUI project

   Copyright (C) 2017 Jean-Sebastien SUZANNE <jssuzanne@anybox.fr>

This Source Code Form is subject to the terms of the Mozilla Public License,
v. 2.0. If a copy of the MPL was not distributed with this file,You can
obtain one at http://mozilla.org/MPL/2.0/.
**/
import './clients';
import './search';
import './list';
import './thumbnail';
import './form';
import Vue from 'vue';
import plugin from '../plugin';

/**
 * Unknown view, use if no view found
 *
 * props:
 *  @viewName: Name of the custom view which is not available
 *  @viewType: Name of the standard view which is not available
 *
**/
export const ViewUnknown = Vue.component('furet-ui-view-unknown', {
    props: ['viewName'],
    template: `
        <div v-bind:style="{marginBottom: '20px'}">
            <section class="section box">
                <h1 class="title">{{$t('views.unknown.title', {name: viewName})}}</h1>
                <h2 class="subtitle">
                    {{$t('views.unknown.message')}}
                </h2>
            </section>
        </div>`,
});

plugin.set(['views'], {Unknown: {vue: 'furet-ui-view-unknown'}})


export const ViewIconUnknown = Vue.component('furet-ui-view-icon-unknown', {
    template: '<i class="fa fa-exclamation-triangle"></i>',
})

plugin.set(['views', 'icon'], {Unknown: 'furet-ui-view-icon-unknown'})
