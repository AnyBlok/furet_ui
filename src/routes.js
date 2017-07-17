/**
This file is a part of the FuretUI project

   Copyright (C) 2017 Jean-Sebastien SUZANNE <jssuzanne@anybox.fr>

This Source Code Form is subject to the terms of the Mozilla Public License,
v. 2.0. If a copy of the MPL was not distributed with this file,You can
obtain one at http://mozilla.org/MPL/2.0/.
**/
import Vue from 'vue';
import VueRouter from 'vue-router';
Vue.use(VueRouter);
import {json_post_dispatch_all} from './server-call';


const CustomeView = {
    template: '<furet-ui-custom-view v-bind:viewName="viewName" />',
    props: ['viewName'],
    beforeRouteEnter: (to, from, next) => {
        json_post_dispatch_all('/custom/view/' + to.params.viewName, {});
        next();
    },
    beforeRouteUpdate: (to, from, next) => {
        if (to.params.viewName != from.params.viewName) {
            json_post_dispatch_all('/custom/view/' + to.params.viewName, {});
        }
        next();
    },
}

const Action = {
    template: '<router-view></router-view>',
    beforeRouteEnter: (to, from, next) => {
        json_post_dispatch_all('/action/' + to.params.actionId, to.params);
        next();
    },
    beforeRouteUpdate: (to, from, next) => {
        if (to.params.actionId != from.params.actionId)
            json_post_dispatch_all('/action/' + to.params.actionId, to.params);
        next();
    },
};

const View = {
    template: `<furet-ui-view
                    v-bind:spaceId="spaceId"
                    v-bind:menuId="menuId"
                    v-bind:actionId="actionId"
                    v-bind:viewId="viewId"
                    v-bind:dataId="dataId"
                    v-bind:mode="mode"
                />`,
    props: ['spaceId', 'menuId', 'actionId', 'viewId', 'dataId', 'mode'],
    beforeRouteEnter: (to, from, next) => {
        json_post_dispatch_all('/view/' + to.params.viewId, to.params);
        next();
    },
    beforeRouteUpdate: (to, from, next) => {
        if (to.params.viewId != from.params.viewId)
            json_post_dispatch_all('/view/' + to.params.viewId, to.params);
        next();
    },
};


export const router = new VueRouter({
    routes: [
        {
            path: '/custom/view/:viewName',
            name: 'custom_view',
            props: true,
            component: CustomeView,
        },
        {
            path: '/space/:spaceId',
            name: 'space',
            props: true,
            component: {
                template: `<furet-ui-space
                                v-bind:spaceId="spaceId"
                                v-bind:menuId="menuId"
                                v-bind:actionId="actionId"
                                v-bind:viewId="viewId"
                            />`,
                props: ['spaceId', 'menuId', 'actionId', 'viewId'],
                beforeRouteEnter: (to, from, next) => {
                    json_post_dispatch_all('/space/' + to.params.spaceId, to.params);
                    next();
                },
                beforeRouteUpdate: (to, from, next) => {
                    if (to.params.spaceId != from.params.spaceId) json_post_dispatch_all('/space/' + to.params.spaceId, to.params);
                    next();
                },
            },
            children: [
                {
                    path: 'menu/:menuId',
                    name: 'space_menu',
                    component: {
                        template: '<router-view></router-view>'
                    },
                    children: [
                        {
                            path: 'action/:actionId',
                            name: 'space_menu_action',
                            component: Action,
                            children: [
                                {
                                    path: 'view/:viewId',
                                    name: 'space_menu_action_view',
                                    props: true,
                                    component: View,
                                    children: [
                                        {
                                            path: 'data/:dataId/mode/:mode',
                                            name: 'space_menu_action_view_dataId',
                                            component: {template: '<div />'},  // never called
                                        },
                                    ],
                                },
                                {
                                    path: 'custom/view/:viewName',
                                    name: 'space_menu_action_custom_view',
                                    props: true,
                                    component: CustomeView,
                                },
                            ],
                        },
                    ],
                },
                {
                    path: 'action/:actionId',
                    name: 'space_action',
                    component: Action,
                    children: [
                        {
                            path: 'view/:viewId',
                            name: 'space_action_view',
                            props: true,
                            component: View,
                            children: [
                                {
                                    path: 'data/:dataId/mode/:mode',
                                    name: 'space_action_view_dataId',
                                    component: {template: '<div />'},  // never called
                                },
                            ],
                        },
                        {
                            path: 'custom/view/:viewName',
                            name: 'space_action_custom_view',
                            props: true,
                            component: CustomeView,
                        },
                    ],
                },
            ]
        },
    ],
});

export default router;
