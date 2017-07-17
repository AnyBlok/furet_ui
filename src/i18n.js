/**
This file is a part of the FuretUI project

   Copyright (C) 2017 Jean-Sebastien SUZANNE <jssuzanne@anybox.fr>

This Source Code Form is subject to the terms of the Mozilla Public License,
v. 2.0. If a copy of the MPL was not distributed with this file,You can
obtain one at http://mozilla.org/MPL/2.0/.
**/
import Vue from 'vue';
import VueI18n from 'vue-i18n';
Vue.use(VueI18n);


export const i18nConf = {
    locale: 'en',
    fallbackLocale: 'en',
    messages: {
        en: {
            menus: {
                close: 'Close',
                search: 'Search ...',
            },
            views: {
                unknown: {
                    title: 'The wanted view "{name}" is unknown',
                    message: "Report this message to the administrator",
                },
                common: {
                    create: 'Create',
                    save: 'Save',
                    edit: 'Edit',
                    cancel: 'Cancel',
                    delete: 'Delete',
                    close: 'Close',
                    actions: 'Actions',
                    more: 'More',
                },
                clients: {
                    login: {
                        button: 'Log in',
                    },
                },
            },
            fields: {
                common: {
                    required: 'this field is required',
                },
                json: {
                    invalid: 'Invalid JSON format',
                },
                file: {
                    upload: 'Upload',
                    download: 'Download',
                    delete: 'Delete',
                },
            },
        },
    },
};
export const i18n = new VueI18n(i18nConf);
