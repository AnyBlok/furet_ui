/**
This file is a part of the FuretUI project

   Copyright (C) 2017 Jean-Sebastien SUZANNE <jssuzanne@anybox.fr>

This Source Code Form is subject to the terms of the Mozilla Public License,
v. 2.0. If a copy of the MPL was not distributed with this file,You can
obtain one at http://mozilla.org/MPL/2.0/.
**/
import Vue from 'vue';
import vSelect from 'vue-select'
Vue.component('v-select', vSelect)
import {json_post} from '../server-call';
import _ from 'underscore';

export const onChange = (obj, values) => {
    if (JSON.stringify(values) != obj.origin) {
        const filter = [];
        _.each(values, value => {
            const e = _.find(filter, f => f.key == value.key);
            if (e == undefined)
                filter.push({
                    key: value.key,
                    label: value.label,
                    value: value.value,
                    operator: value.operator,
                    type: value.type,
                })
            else {
                if (!Array.isArray(e.value)) e.value = [e.value];
                e.value.push(value.value)
                e.label = obj.labels[e.key] + ' : "' + e.value.join('", "') + '"';
            }
        });
        obj.origin = JSON.stringify(filter);
        obj.selected = filter;
        obj.$emit('updateFilter', filter);
    }
};

export const SearchBar = Vue.component('furet-ui-search-bar-view', {
    props: ['filter', 'search', 'model'],
    template: `
        <div class="field has-addons">
            <p class="control">
                <a class="button" v-on:click="onClick">
                    <i class="fa fa-search"></i>
                </a>
            </p>
            <p class="control">
                <v-select
                    multiple
                    v-bind:value.sync="selected"
                    v-bind:options="options"
                    v-bind:style="{backgroundColor: 'white'}"
                    v-bind:debounce="250"
                    v-bind:on-search="getOptions"
                    v-bind:on-change="onChange"
                />
            </p>
        </div>`,
    data () {
        return {
            selected: JSON.parse(JSON.stringify(this.filter)),
            origin: JSON.stringify(this.filter),
            options: [],
        }
    },
    computed: {
        labels () {
            const res = {};
            _.each(this.search, s => {res[s.key] = s.label});
            return res;
        }
    },
    methods: {
        getOptions (value, loading) {
            const self = this;
            loading(true);
            json_post('/data/search', {search: this.search, value, model: this.model}, {
                onSuccess (options) {self.options = options},
                onComplete () {loading(false)},
            });
        },
        onClick () {
            this.$emit('updateFilter', this.selected);
        },
        onChange(values) {
            onChange(this, values);
        },
    },
})
