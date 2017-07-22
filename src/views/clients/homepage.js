/**
This file is a part of the FuretUI project

   Copyright (C) 2017 Jean-Sebastien SUZANNE <jssuzanne@anybox.fr>

This Source Code Form is subject to the terms of the Mozilla Public License,
v. 2.0. If a copy of the MPL was not distributed with this file,You can
obtain one at http://mozilla.org/MPL/2.0/.
**/
import Vue from 'vue';

export const Homepage = Vue.component('furet-ui-homepage', {
    template: `
        <section class="section content">
            <div class="columns is-mobile">
                <div class="column is-half is-offset-one-quarter">
                    <h1>{{ $t('views.clients.homepage.title') }}</h1>
                    <p>{{ $t('views.clients.homepage.description') }}</p>
                </div>
            </div>
        </section>`,
});
