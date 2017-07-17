/**
This file is a part of the FuretUI project

   Copyright (C) 2017 Jean-Sebastien SUZANNE <jssuzanne@anybox.fr>

This Source Code Form is subject to the terms of the Mozilla Public License,
v. 2.0. If a copy of the MPL was not distributed with this file,You can
obtain one at http://mozilla.org/MPL/2.0/.
**/
import Vue from 'vue';
import {FormMixin, ThumbnailMixin, ListMixin} from '../common';
import {RelationShip} from './common';
import {dispatchAll} from '../../store';
import {json_post} from '../../server-call';
import _ from 'underscore';

const getRemoteValue = (state, model, dataId) => {
    let data = {},
        change = {},
        change_new = {};
    try {
        data = state.data[model][dataId];
    } catch (e) {};
    try {
        change = state.changes[model][dataId];
    } catch (e) {};
    try {
        change_new = state.changes.new[model][dataId];
    } catch (e) {};
    return Object.assign({}, data, change, change_new);
}

export const FieldListMany2One = Vue.component('furet-ui-list-field-many2one', {
    mixins: [ListMixin, RelationShip],
    template: `
        <span v-if="isInvisible" />
        <a v-else v-on:click.stop="onClick">{{value}}</a>`,
    computed: {
        value () {
            const value = this.row[this.header.name] || '';
            const model = this.header.model; 
            return this.format(this.header.display, getRemoteValue(this.$store.state.data, model, value));
        }
    },
    methods: {
        onClick () {
            this.addInBreadscrumb({
                spaceId: this.header.spaceId,
                menuId: this.header.menuId,
                actionId: this.header.actionId,
                dataId: this.row[this.header.name],
                mode: this.header.mode,
            });
        },
    },
})

export const FieldThumbnailMany2One = Vue.component('furet-ui-thumbnail-field-many2one', {
    props: ['model', 'spaceId', 'menuId', 'actionId', 'mode', 'display'],
    mixins: [ThumbnailMixin, RelationShip],
    template: `
        <div v-if="isInvisible" />
        <b-tooltip 
            v-bind:label="getTooltip" 
            v-bind:position="tooltipPosition"
            v-else
        >
            <b-field 
                v-bind:label="this.label"
                v-bind:style="{'width': 'inherit'}"
            >
                <a v-on:click.stop="onClick">{{value}}</a>
            </b-field>
        </b-tooltip>`,
    computed: {
        value () {
            const value = this.data && this.data[this.name] || '';
            return this.format(this.display, getRemoteValue(this.$store.state.data, this.model, value));
        }
    },
    methods: {
        onClick () {
            this.addInBreadscrumb({
                spaceId: this.spaceId,
                menuId: this.menuId,
                actionId: this.actionId,
                dataId: this.data && this.data[this.name],
                mode: this.mode,
            });
        },
    },
})

export const FieldFormMany2One = Vue.component('furet-ui-form-field-many2one', {
    props: ['placeholder', 'icon', 'model', 'spaceId', 'menuId', 'actionId', 
            'mode', 'display', 'limit', 'fields'],
    mixins: [FormMixin, RelationShip],
    template: `
        <div v-if="this.isInvisible" />
        <b-tooltip 
            v-bind:label="getTooltip" 
            v-bind:position="tooltipPosition"
            v-bind:style="{'width': '100%'}"
            v-else
        >
            <b-field 
                v-bind:label="this.label"
                v-bind:type="getType"
                v-bind:message="getMessage"
                v-bind:style="{'width': 'inherit'}"
            >
                <a v-if="isReadonly" v-on:click.stop="onClick">{{value}}</a>
                <div 
                    v-else
                    class="field has-addons" 
                >
                    <p class="control is-expanded">
                        <b-autocomplete
                            v-model="value"
                            v-bind:data="data"
                            field="label"
                            v-bind:placeholder="placeholder"
                            icon-pack="fa"
                            v-bind:icon="icon"
                            v-on:change="onChange"
                            v-on:select="onSelect"
                        />
                    </p>
                    <p class="control" v-if="value">
                        <a v-on:click.stop="onClick" class="button">
                            <i class="fa fa-external-link"></i>
                        </a>
                    </p>
                </div>
            </b-field>
        </b-tooltip>`,
    data () {
        return {
            ids: null,
        };
    },
    computed: {
        value () {
            const value = this.config && this.config.data && this.config.data[this.name] || ''; 
            return this.format(this.display, getRemoteValue(this.$store.state.data, this.model, value));
        },
        data () {
            if (this.model) {
                let data = this.$store.state.data.data;
                if (data[this.model]) {
                    data = data[this.model];
                    data = _.map(_.keys(data), dataId => (
                        {dataId, label: this.format(this.display, getRemoteValue(this.$store.state.data, this.model, dataId))}
                    ))
                    if (this.ids) {
                        data = _.filter(data, d => this.ids.indexOf(d.dataId) != -1);
                    }
                    return data;
                }
            }
            return [];
        }
    },
    methods: {
        onClick () {
            this.addInBreadscrumb({
                spaceId: this.spaceId,
                menuId: this.menuId,
                actionId: this.actionId,
                dataId: this.config && this.config.data && this.config.data[this.name],
                mode: this.mode,
            });
        },
        onSelect (value) {
            if (value) {
                const v = this.config && this.config.data && this.config.data[this.name];
                if (v != value.dataId) {
                    this.updateValue(value.dataId);
                }
            }
        },
        onChange (value) {
            if (value != this.value) {
                json_post('/field/x2x/search', {model: this.model, fields:this.fields, value}, {
                    onSuccess: (result) => {
                        this.ids = _.map(result.ids || [], id => String(id));
                        dispatchAll(result.data);
                    }
                });
            }
        },
    },
})
