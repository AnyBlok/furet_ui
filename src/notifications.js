/**
This file is a part of the FuretUI project

   Copyright (C) 2017 Jean-Sebastien SUZANNE <jssuzanne@anybox.fr>

This Source Code Form is subject to the terms of the Mozilla Public License,
v. 2.0. If a copy of the MPL was not distributed with this file,You can
obtain one at http://mozilla.org/MPL/2.0/.
**/
import Vue from 'vue';

export const Notifications = Vue.component('notifications', {
    template: `
        <div
            v-bind:style="{position: 'fixed', right: '10px', top: '60px', width: '400px', zIndex: 1000}"
        >
            <component 
                v-for="notification in notifications"
                is="notification"
                v-bind:key="notification.id"
                v-bind:id="notification.id"
                v-bind:type="notification.notification_type"
                v-bind:title="notification.title"
                v-bind:message="notification.message"
                v-bind:has_icon="notification.has_icon"
            />
        </div>`,
    computed: {
        notifications () {
            return this.$store.state.global.notifications;
        },
    },
})

export const Notification = Vue.component('notification', {
    props: ['id', 'type', 'title', 'message', 'has_icon'],
    template: `
        <b-message 
            v-bind:title="title" 
            v-bind:has-icon="has_icon" 
            v-bind:type="getType"
            v-on:close="onClose"
        >
            <div v-html="message" />
        </b-message>`,
    computed: {
        getType () {
            switch (this.type) {
                case 'success':
                    return 'is-success';
                case 'info':
                    return 'is-info';
                case 'warning':
                    return 'is-warning';
                case 'error':
                    return 'is-danger';
                default:
                    return null;
            }
        }
    },
    methods: {
        onClose () {
            this.$store.commit('REMOVE_NOTIFICATION', {id: this.id});
        }
    }
})
