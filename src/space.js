/**
This file is a part of the FuretUI project

   Copyright (C) 2017 Jean-Sebastien SUZANNE <jssuzanne@anybox.fr>

This Source Code Form is subject to the terms of the Mozilla Public License,
v. 2.0. If a copy of the MPL was not distributed with this file,You can
obtain one at http://mozilla.org/MPL/2.0/.
**/
import Vue from 'vue';
import {dispatchAll} from './store';
import {json_post} from './server-call';
import _ from 'underscore';
import './picture';

export const changeView = (router, store, spaceId, menuId, actionId, viewId) => {
    store.commit('CLEAR_CHANGE');
    router.push({
        name: menuId ? 'space_menu_action_view' : 'space_action_view',
        params: {spaceId, menuId, actionId, viewId}
    });
};
export const onClickBreadScrumb = (router, store, action) => {
    store.commit('REMOVE_FROM_BREADSCRUMB', {position: action.position});
    store.commit('REPLACE_CHANGE', {changes: action.changes});
    router.push({path: action.path});
};
export const onClickMenu = (router, spaceId, menu) => {
    if (menu.actionId) {
        router.push({
            name: 'space_menu_action',
            params: {
                spaceId: spaceId,
                menuId: menu.id,
                actionId: menu.actionId,
            },
        });
    }
    dispatchAll([
        {type: 'CLEAR_BREADSCRUMB'},
        {type: 'CLEAR_CHANGE'},
    ]);
}

export const ViewSelector = Vue.component('furet-ui-view-selector', {
    props: ['views', 'viewId'],
    template: `
        <div class="field has-addons" v-if="views.length > 0">
            <p class="control" 
                v-for="view in views"
                v-if="!view.unclickable || view.viewId == viewId"
            >
                <b-tooltip v-bind:label="view.type" position="is-left" type="is-info">
                    <a class="button" 
                        v-on:click.stop="changeView(view.viewId)"
                        v-bind:disabled="view.viewId == viewId"
                        v-bind:class="[view.viewId == viewId ? 'is-primary': '']"
                    >
                        <span class="icon is-small">
                            <furet-ui-view-icon v-bind:type="view.type" />
                        </span>
                    </a>
                </b-tooltip>
            </p>
        </div>
    `,
    methods: {
        changeView (viewId) {
            this.$emit('changeView', viewId);
        },
    },
});

export const SpaceMenu = Vue.component('furet-ui-space-menu', {
    template: `
        <ul class="menu-list">
            <li v-for="menu in menus">
                <span v-if="(menu.submenus || []).length != 0">
                    <furet-ui-picture 
                        v-bind:type="menu.image.type"
                        v-bind:value="menu.image.value"
                    />
                    {{menu.label}}
                </span>
                <furet-ui-space-menu 
                    v-if="(menu.submenus || []).length != 0"
                    v-bind:menus="menu.submenus || []"
                    v-bind:menuId="menuId"
                    v-bind:spaceId="spaceId"
                />
                <a v-if="menu.actionId || menu.custom_view"
                   v-on:click="onClickMenu(menu)"
                   v-bind:class="[menu.id == menuId ? 'is-active' : '']"
                >
                    <furet-ui-picture 
                        v-bind:type="menu.image.type"
                        v-bind:value="menu.image.value"
                    />
                    {{menu.label}}
                </a>
            </li>
        </ul>`,
    props: ['menus', 'menuId', 'spaceId'],
    methods: {
        onClickMenu (menu) {
            onClickMenu(this.$router, this.spaceId, menu);
        }
    }
});

export const Space = Vue.component('furet-ui-space', {
    template: `
        <div 
            class="columns is-gapless"
            v-bind:style="{marginTop: '5px'}"
        >
            <div v-if="isOpenLeft && left_menu.length > 0" class="column is-one-quarter is-half-mobile">
                <aside class="menu" v-bind:style="{padding: '5px'}">
                    <furet-ui-space-menu 
                        v-bind:menus="left_menu" 
                        v-bind:menuId="menuId" 
                        v-bind:spaceId="spaceId"
                    />
                </aside>
            </div>
            <div class="column" v-bind:style="{paddingLeft: '10px', paddingRight: '10px'}">
                <nav class="nav" v-bind:style="{backgroundColor: 'inherit'}">
                    <div class="nav-left">
                        <a class="button" v-on:click="isOpenLeft = !isOpenLeft" v-if="left_menu.length > 0">
                            <i class="fa fa-bars fa-2x" aria-hidden="true"></i>
                        </a>
                        <nav class="breadcrumb">
                            <ul>
                                <li v-for="a in actions">
                                    <a v-on:click="onClickBreadScrumb(a)">
                                        {{a.label}}
                                    </a>
                                </li>
                                <li class="is-active"><a>{{action.label}}</a></li>
                            </ul>
                        </nav>
                    </div>
                    <div class="nav-right">
                        <furet-ui-view-selector
                            v-bind:views="action.views"
                            v-bind:viewId="viewId"
                            v-on:changeView="changeView"
                        />
                        <a class="button" v-on:click="isOpenRight = !isOpenRight" v-if="right_menu.length > 0">
                            <i class="fa fa-bars fa-2x" aria-hidden="true"></i>
                        </a>
                    </div>
                </nav>
                <router-view></router-view>
            </div>
            <div v-if="isOpenRight && right_menu.length > 0" class="column is-one-quarter is-half-mobile">
                <aside class="menu" v-bind:style="{padding: '5px'}">
                    <furet-ui-space-menu 
                        v-bind:menus="right_menu" 
                        v-bind:menuId="menuId" 
                        v-bind:spaceId="spaceId"
                    />
                </aside>
            </div>
        </div>`,
    props: ['spaceId', 'menuId', 'actionId', 'viewId', 'defaultOpenLeft', 'defaultOpenRight'],
    data () {
        return {
            isOpenLeft: this.defaultOpenLeft || false,
            isOpenRight: this.defaultOpenRight ||  false,
        }
    },
    computed: {
        space_state () {
            return this.$store.state.data.spaces[String(this.spaceId)];
        },
        left_menu () {
            return this.space_state && this.space_state.left_menu || [];
        },
        right_menu () {
            return this.space_state && this.space_state.right_menu || [];
        },
        actions () {
            return this.$store.state.global.breadscrumbs || [];
        },
        action () {
            if (this.actionId) {
                const action = this.$store.state.data.actions[String(this.actionId)];
                if (action) {
                    return {label: action.label, views: action.views};
                }
           }
           return {label: '', views: []};
        }
    },
    methods: {
        changeView (viewId) {
            changeView(this.$router, this.$store, this.spaceId, this.menuId, this.actionId, viewId);
        },
        onClickBreadScrumb (action) {
            onClickBreadScrumb(this.$router, this.$store, action);
        },
    },
});
