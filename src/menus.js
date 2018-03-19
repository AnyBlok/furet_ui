/**
This file is a part of the FuretUI project

   Copyright (C) 2017 Jean-Sebastien SUZANNE <jssuzanne@anybox.fr>

This Source Code Form is subject to the terms of the Mozilla Public License,
v. 2.0. If a copy of the MPL was not distributed with this file,You can
obtain one at http://mozilla.org/MPL/2.0/.
**/
import Vue from 'vue';
import './picture';
import _ from 'underscore';
import {dispatchAll} from './store';
import {json_post} from './server-call';
        
export const selectCard = (type, router, store, card) => {
    const key = 'UPDATE_' + (type || '').toUpperCase() + '_MENU';
    switch (card.type) {
        case 'client':
            router.push({name: 'custom_view', params: {viewName: card.id}}); 
            break;
        case 'space':
            router.push({name: 'space', params: {spaceId: card.id}});
            store.commit(key, {
                value: {
                    label: card.label,
                    image: card.image,
                },
            });
            break;
    }
    store.commit('CLEAR_BREADSCRUMB');
    store.commit('CLEAR_CHANGE');
}

export const openMenu = (type, route, router, store) => {
    store.commit('UPDATE_PREVIOUS_PATH', {route: route});
    router.push({name: 'menu', params: {type}}); 
}

export const closeMenu = (router, store) => {
    router.push({path:store.state.global.previous_path})
}

export const MenuDisplay = Vue.component('furet-ui-menu', {
    template: `
        <div>
            <div class="level">
                <div class="level-item">
                    <a 
                        class="button is-primary is-medium is-outlined"
                        v-bind:style="{margin: '5px'}"
                        v-on:click.stop="closeMenu"
                    >{{$t('menus.close')}}</a>
                </div>
                <div class="level-item">
                    <b-input
                        type="search"
                        icon-pack="fa"
                        icon="search"
                        v-bind:placeholder="$t('menus.search')"
                        v-model="searchText">
                    </b-input>
                </div>
            </div>
            <section 
                v-bind:style="{color: '#363636', padding: '5px'}"
            >
                <div class="columns is-multiline is-mobile">
                    <div 
                        class="column is-12-mobile is-half-tablet is-one-quarter-desktop"
                        v-for="card in cards"
                    >
                        <article 
                            class="box media furet-ui-space-menu" 
                            v-on:click.stop="selectCard(card)"
                            v-bind:style="{padding: '2px'}"
                        >
                            <aside class="media-left">
                                <figure class="image is-32x32">
                                    <furet-ui-picture
                                        v-bind:type="card.image.type"
                                        v-bind:value="card.image.value"
                                    />
                                </figure>
                            </aside>
                            <section class="media-content">
                                <h1>{{card.label}}</h1>
                                <p v-bind:style="{whiteSpace: 'pre-wrap'}">{{card.description}}</p>
                            </section>
                        </article>
                    </div>
                </div>
            </section>
        </div>`,
    props: ['type', 'unittest_search'],
    data () {
        return {
            searchText: this.unittest_search || '',
        };
    },
    computed: {
        cards () {
            const re = new RegExp(this.searchText, 'ig'),
                  store = this.$store.state[this.type + 'menu'],
                  cards = _.filter(store.values, c => (re.test(c.label) || re.test(c.description)));
            return cards
        },
    },
    methods: {
        selectCard (card) {
            selectCard(this.type, this.$router, this.$store, card);
        },
        closeMenu () {
            closeMenu(this.$router, this.$store);
        },
    },
})

export const Menu = Vue.component('furet-ui-appbar-menu', {
    template: `
        <a class="nav-item" v-if="hasValue">
            <a class="button" v-on:click="openMenu">
                <furet-ui-picture 
                    v-bind:type="value.image.type" 
                    v-bind:value="value.image.value" 
                />
                <span> {{ value.label }} </span>
            </a>
        </a>`,
    props: ['type'],
    computed: {
        value () {
            return this.$store.state[this.type + 'menu'].value;
        },
        hasValue () {
            const value = this.$store.state[this.type + 'menu'].value,
                  hasImage = _.keys(value.image || {}).length > 0,
                  hasLabel = value.label.length > 0;
            return hasImage && hasLabel;
        },
    },
    methods: {
        openMenu () {
            openMenu(this.type, this.$route, this.$router, this.$store);
        },
    },
});

export const LeftMenu = Vue.component('furet-ui-appbar-left-menu', {
    template: '<furet-ui-appbar-menu type="left"/>',
});

export const RightMenu = Vue.component('furet-ui-appbar-right-menu', {
    template: '<furet-ui-appbar-menu type="right"/>',
});
