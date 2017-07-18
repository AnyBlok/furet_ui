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

export const Menu = Vue.component('furet-ui-appbar-menu', {
    template: `
        <a class="nav-item" v-if="hasValue">
            <a class="button" v-on:click="isModalActive = true; searchText = ''">
                <furet-ui-picture 
                    v-bind:type="value.image.type" 
                    v-bind:value="value.image.value" 
                />
                <span> {{ value.label }} </span>
            </a>
            <b-modal :active.sync="isModalActive">
                <div class="modal-background"></div>
                <div class="modal-card">
                    <header class="modal-card-head">
                        <b-field  position="is-centered">
                            <b-input
                                type="search"
                                icon-pack="fa"
                                icon="search"
                                v-bind:placeholder="$t('menus.search')"
                                v-model="searchText">
                            </b-input>
                        </b-field>
                    </header>
                    <div 
                        class="modal-card-body"
                        v-bind:style="{color: '#363636', padding: '5px'}"
                    >
                        <div v-for="group in groups">
                            <legend>
                                <furet-ui-picture
                                    v-bind:type="group.image.type"
                                    v-bind:value="group.image.value"
                                />
                                {{ group.label }}
                            </legend>
                            <div class="columns is-multiline is-mobile">
                                <div class="column is-12-mobile is-half-tablet is-half-desktop"
                                    v-for="card in group.values">
                                        <article 
                                            class="box media" 
                                            v-on:click.stop="selectCard(card)"
                                            v-bind:style="{padding: '5px'}"
                                        >
                                            <div class="media-left">
                                                <figure class="image is-32x32">
                                                    <furet-ui-picture
                                                        v-bind:type="card.image.type"
                                                        v-bind:value="card.image.value"
                                                    />
                                                </figure>
                                            </div>
                                            <div class="media-content">
                                                <div >
                                                    <strong>{{card.label}}</strong>
                                                    <br />
                                                    <small v-bind:style="{whiteSpace: 'pre-wrap'}">{{card.description}}</small>
                                                </div>
                                            </div>
                                        </article>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <footer class="modal-card-foot">
                        <a 
                            v-on:click="isModalActive = false"
                            v-bind:style="{color: '#363636'}"
                        >{{$t('menus.close')}}</a>
                    </footer>
                </div>
            </b-modal>
        </a>`,
    props: ['type', 'unittest_active', 'unittest_search'],
    data () {
        return {
            isModalActive: this.unittest_active || false, 
            searchText: this.unittest_search || '',
        };
    },
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
        groups () {
            const groups = [],
                  re = new RegExp(this.searchText, 'ig');
            _.each(this.$store.state[this.type + 'menu'].values, g => {
                const cards = _.filter(g.values, c => (re.test(c.label) || re.test(c.description)))
                if (cards.length) groups.push(Object.assign({}, g, {values: cards}));
            });
            return groups;
        },
    },
    methods: {
        selectCard (card) {
            selectCard(this.type, this.$router, this.$store, card);
            this.isModalActive = false;
        }
    }
});

export const LeftMenu = Vue.component('furet-ui-appbar-left-menu', {
    template: '<furet-ui-appbar-menu type="left"/>',
});

export const RightMenu = Vue.component('furet-ui-appbar-right-menu', {
    template: '<furet-ui-appbar-menu type="right"/>',
});
