/**
This file is a part of the FuretUI project

   Copyright (C) 2017 Jean-Sebastien SUZANNE <jssuzanne@anybox.fr>

This Source Code Form is subject to the terms of the Mozilla Public License,
v. 2.0. If a copy of the MPL was not distributed with this file,You can
obtain one at http://mozilla.org/MPL/2.0/.
**/
import Vue from 'vue';
import './menus';
import './view';
import './space';
import './notifications';

export const App = Vue.component('furet-ui', {
    template: `
        <div>
            <header class="hero is-primary">
                <nav class="navbar" role="navigation" aria-label="main navigation">
                    <div class="navbar-brand">
                        <furet-ui-appbar-left-menu />
                    </div>
                    <div class="navbar-menu is-active">
                        <div class="navbar-start">
                            {{ title }}
                        </div>
                        <div class="navbar-end">
                            <furet-ui-appbar-right-menu />
                        </div>
                    </div>
                </nav>
            </header>
            <notifications></notifications>
            <router-view></router-view>
        </div>`,
    computed: {
        title () {
            return this.$store.state.global.title;
        }
    },
});

export default App
