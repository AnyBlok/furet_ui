/**
This file is a part of the FuretUI project

   Copyright (C) 2017 Jean-Sebastien SUZANNE <jssuzanne@anybox.fr>

This Source Code Form is subject to the terms of the Mozilla Public License,
v. 2.0. If a copy of the MPL was not distributed with this file,You can
obtain one at http://mozilla.org/MPL/2.0/.
**/
import Vue from 'vue';
import {FormMixin, ThumbnailMixin, ListMixin} from '../common';
import {RelationShip, RelationShipX2MList, RelationShipX2MThumbnail, RelationShipX2MForm} from './common';
import {dispatchAll} from '../../store';
import {json_post} from '../../server-call';
import _ from 'underscore';

export const FieldListMany2Many = Vue.component('furet-ui-list-field-many2many', {
    mixins: [ListMixin, RelationShip, RelationShipX2MList],
})

export const FieldThumbnailMany2Many = Vue.component('furet-ui-thumbnail-field-many2many', {
    mixins: [ThumbnailMixin, RelationShip, RelationShipX2MThumbnail],
})

export const onChangeM2M = (config, name, dataId, value) => {
    const values = (config && config.data && config.data[name] || []).slice(0);
    if (value) {
        values.push(dataId);
    } else {
        const index = values.indexOf(dataId);
        if (index > -1) values.splice(index, 1);
    }
    return values;
};

export const FieldFormMany2ManyCheckbox = Vue.component('furet-ui-form-field-many2many-checkbox', {
    props: ['checkbox_class', 'model', 'display', 'fields', 'fieldcolor'],
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
                <div class="columns is-multiline is-mobile">
                    <div 
                        v-for="value in existing"
                        v-bind:id="value.dataId"
                        v-bind:class="['column', checkbox_class]" 
                    >
                        <furet-ui-b-checkbox 
                            v-bind:checked="isChecked(value.dataId)" 
                            v-bind:disabled="isReadonly"
                            v-on:change="onChange"
                        >
                            {{value.label}}
                            <div v-bind:style="getStyle(value.dataId)" />
                        </furet-ui-b-checkbox>
                    </div>
                </div>
            </b-field>
        </b-tooltip>`,
    components: {
        'furet-ui-b-checkbox': {
            props: ['checked', 'disabled'],
            template: `
                <b-checkbox 
                    v-model="value" 
                    v-bind:disabled="disabled"
                    v-on:change="onChange"
                >
                    <slot></slot>
                </b-checkbox>
            `,
            data () {
                return {
                    value: this.checked,
                };
            },
            methods: {
                onChange (value, event) {
                    this.$emit('change', value, event);
                },
            },
            watch: {
                disabled (newDisabled) {
                    this.value = this.checked;
                },
            }
        },
    },
    created () {
        json_post('/field/x2x/search', 
                  {model: this.model, fields:this.fields}, 
                  {
                      onSuccess: (result) => {
                          dispatchAll(result.data);
                      }
                  }
        );
    },
    computed: {
        existingIds () {
            if (this.model) {
                let data = this.$store.state.data.data;
                if (data[this.model]) {
                    return _.keys(data[this.model]);
                }
            }
            return [];
        },
        existing () {
            const data = this.$store.state.data.data[this.model];
            return _.map(this.existingIds, dataId => ({
                dataId, label: this.format(this.display, data[dataId])
            }));
        }
    },
    methods: {
        isChecked(dataId) {
            const value = this.config && this.config.data && this.config.data[this.name] || [];
            const values = _.map(value, v => String(v));
            if (values.indexOf(dataId) > -1) return true;
            return false;
        },
        getStyle (dataId) {
            if (this.fieldcolor) {
                const data = this.$store.state.data.data[this.model][dataId];
                if (data[this.fieldcolor]) return {width: '100%', height: '5px', backgroundColor: data[this.fieldcolor]};
            }
            return {'display': 'none'};
        },
        onChange (value, event) {
            this.updateValue(onChangeM2M(this.config, this.name, event.path[2].id, value));
        },
    },
})

export const FieldFormMany2ManyTags = Vue.component('furet-ui-form-field-many2many-tags', {
    props: ['placeholder', 'icon', 'fields', 'defaultIds', 'defaultValue'],
    mixins: [FormMixin, RelationShip, RelationShipX2MForm],
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
                <div class="field has-addons" >
                    <p class="control is-expanded">
                        <span 
                            v-for="value in values"
                            class="tag" 
                            v-bind:style="getStyle(value.dataId)"
                        >
                            <a 
                                v-on:click.stop="onClick(value.dataId)">{{value.label}}
                            </a>
                            <button 
                                v-if="!isReadonly" 
                                class="delete is-small" 
                                v-on:click="removeTag(value.dataId)"
                            />
                        </span>
                        <b-autocomplete
                            v-model="value" v-if="!isReadonly"
                            v-bind:data="data"
                            field="label"
                            v-bind:placeholder="placeholder"
                            icon-pack="fa"
                            v-bind:icon="icon"
                            v-on:change="onChange"
                            v-on:select="onSelect"
                        />
                    </p>
                </div>
            </b-field>
        </b-tooltip>`,
    data () {
        return {
            ids: this.defaultIds || null,
            value: this.defaultValue || '',
        };
    },
    computed: {
        data () {
            if (this.model) {
                const values = ({}, this.config && this.config.data && this.config.data[this.name] || []).slice(0);
                let data = this.$store.state.data.data;
                if (data[this.model]) {
                    data = data[this.model];
                    data = _.map(_.keys(data), dataId => ({dataId, label: this.format(this.display, data[dataId])}))
                    if (this.ids) {
                        data = _.filter(data, d => this.ids.indexOf(d.dataId) != -1);
                    }
                    data = _.filter(data, d => values.indexOf(d.dataId) == -1);
                    return data;
                }
            }
            return [];
        },
        getType () {
            if (this.isRequired) {
                if (this.values.length > 0) return 'is-info';
                return 'is-danger';
            }
            return '';
        },
        getMessage () {
            if (this.isRequired) {
                if (this.values.length == 0) return this.$i18n.t('fields.common.required');
            }
            return ''
        },
    },
    methods: {
        removeTag (dataId) {
            this.updateValue(onChangeM2M(this.config, this.name, dataId, false));
        },
        onSelect (value) {
            if (value) {
                this.updateValue(onChangeM2M(this.config, this.name, value.dataId, true));
                this.value = '';
            }
        },
        onChange (value) {
            json_post('/field/x2x/search', {model: this.model, fields:this.fields, value}, {
                onSuccess: (result) => {
                    this.ids = _.map(result.ids || [], id => String(id));
                    dispatchAll(result.data);
                }
            });
        },
    },
})
