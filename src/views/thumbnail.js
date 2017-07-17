/**
This file is a part of the FuretUI project

   Copyright (C) 2017 Jean-Sebastien SUZANNE <jssuzanne@anybox.fr>

This Source Code Form is subject to the terms of the Mozilla Public License,
v. 2.0. If a copy of the MPL was not distributed with this file,You can
obtain one at http://mozilla.org/MPL/2.0/.
**/
import Vue from 'vue';
import plugin from '../plugin';
import _ from 'underscore';
import {ViewMultiMixin} from './common';
import {X2MViewMultiMixin} from './x2m-common';

/**
 * Add Icon for Thumbnail view
**/
export const ThumbnailViewIcon = Vue.component('furet-ui-thumbnail-view-icon', {
    template: '<i class="fa fa-th"></i>',
});

plugin.set(['views', 'icon'], {Thumbnail: 'furet-ui-thumbnail-view-icon'})

export const ThumbnailView = Vue.component('furet-ui-thumbnail-view', {
    mixins: [ViewMultiMixin],
    template: `
        <div v-bind:style="{'margin-bottom': '20px'}">
            <nav class="level">
                <div class="level-left">
                    <div class="field has-addons">
                        <p class="control" v-if="view && view.creatable">
                            <a  class="button"
                                v-on:click="addNew"
                            >
                                <span class="icon is-small">
                                    <i class="fa fa-plus"></i>
                                </span>
                                <span>{{$t('views.common.create')}}</span>
                            </a>
                        </p>
                        <p class="control" 
                            v-if="view && (view.buttons || []).length >0"
                        >
                            <b-dropdown>
                                <button class="button" slot="trigger">
                                    <span>{{$t('views.common.actions')}}</span>
                                    <span class="icon is-small">
                                        <i class="fa fa-caret-down"></i>
                                    </span>
                                </button>
                                <b-dropdown-option 
                                    v-for="button in view.buttons"
                                    v-bind:value="button.buttonId"
                                    v-bind:key="button.buttonId"
                                    v-on:change="selectAction(button.buttonId)"
                                >
                                    {{button.label}}
                                </b-dropdown-option>
                            </b-dropdown>
                        </p>
                    </div>
                </div>
                <div class="level-right">
                    <furet-ui-search-bar-view 
                        v-if="search.length > 0"
                        v-bind:search="search" 
                        v-bind:filter="filter"
                        v-bind:model="this.view.model"
                        v-on:updateFilter="updateFilter"
                    />
                </div>
            </nav>
            <div class="columns is-multiline is-mobile">
                <div v-bind:class="['column', view.column_size || 'is-12-mobile is-one-third-tablet is-one-quarter-desktop']"
                     v-for="card in tableData"
                >
                    <article class="box" v-on:click.stop="selectEntry(card)">
                        <component v-bind:is="thumbnail_card" v-bind:card="card"/>
                    </article>
                </div>
            </div>
        </div>
    `,
    data: () => {
        return {
            filter: [],
        };
    },
    computed: {
        tableData () {
            const dataIds = this.dataIds ? this.dataIds : _.keys(this.data || {});
            return _.map(dataIds, dataId => Object.assign(
                {__dataId: dataId}, 
                (this.data || {})[dataId], 
                (this.change || {})[dataId]
            ));
        },
        thumbnail_card () {
            if (this.view) {
                return {
                    template: this.view.template,
                    props: ['card'],
                };
            }
            return {
                template: '<div></div>'
            };
        },
    },
});

plugin.set(['views', 'type'], {Thumbnail: 'furet-ui-thumbnail-view'});

export const X2MThumbnailView = Vue.component('furet-ui-x2m-thumbnail-view', {
    mixins:[X2MViewMultiMixin],
    template: `
        <div v-bind:style="{'margin-bottom': '10px'}">
            <nav class="level">
                <div class="level-left">
                    <div class="field has-addons" v-if="!isReadonly">
                        <p class="control" v-if="view && view.creatable">
                            <a  class="button"
                                v-on:click="addNew"
                            >
                                <span class="icon is-small">
                                    <i class="fa fa-plus"></i>
                                </span>
                                <span>{{$t('views.common.create')}}</span>
                            </a>
                        </p>
                    </div>
                </div>
                <div class="level-right">
                    <furet-ui-view-selector
                        v-bind:views="views"
                        v-bind:viewId="viewId"
                        v-on:changeView="changeView"
                    />
                </div>
            </nav>
            <div class="columns is-multiline is-mobile">
                <div v-bind:class="['column', view.column_size || 'is-12-mobile is-one-half-tablet is-one-third-desktop']"
                     v-for="card in tableData"
                >
                    <article class="box" v-on:click.stop="selectEntry(card)">
                        <component v-bind:is="thumbnail_card" v-bind:card="card"/>
                    </article>
                </div>
            </div>
        </div>
    `,
    computed: {
        tableData () {
            return _.map(this.dataIds, dataId => Object.assign(
                {__dataId: dataId}, 
                (this.data || {})[dataId], 
                (this.change || {})[dataId]
            ));
        },
        thumbnail_card () {
            if (this.view) {
                return {
                    template: this.view.template,
                    props: ['card'],
                };
            }
            return {
                template: '<div></div>'
            };
        },
    },
});

plugin.set(['views', 'x2m-type'], {Thumbnail: 'furet-ui-x2m-thumbnail-view'});
