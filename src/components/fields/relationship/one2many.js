/**
This file is a part of the FuretUI project

   Copyright (C) 2017 Jean-Sebastien SUZANNE <jssuzanne@anybox.fr>

This Source Code Form is subject to the terms of the Mozilla Public License,
v. 2.0. If a copy of the MPL was not distributed with this file,You can
obtain one at http://mozilla.org/MPL/2.0/.
**/
import {defineComponent} from '../../factory'
import {fields} from '../fields';
import {RelationShipX2MList} from './common';
import { pk2string } from "../../../store/modules/data";


/**
 * furet-ui-list-field-one2many component is used to manage relationship one2many on list
 * resource (``furet-ui-resource-list``).
 *
 * Extend Mixins:
 *  * @see ``furet-ui-list-field-common``
 *  * @see ``furet-ui-field-relationship``
 *
 * @example
 *  <furet-ui-list-field-one2many
 *    :config="aConfigObject"
 *    :data="aDataObject"
 *    :resource="aResourceObject"/>
 *
 * @mixes <furet-ui-list-field-common>, <furet-ui-field-relationship>
 *
 * @param {Object} config - A config object to manage the behaviour of the component
 * @param {Object} data - An object that contains data to display. The key to use
 *                        in set in the `config.key`
 * @param {Object} resource - A resource object used to properly bind data with parents
 *                            tags and manage reactivity.
 *
 * ``config`` Object contains
 * @param {String} name - the key to use in the ``data`` object where is store the value
 * @param {String} model - A model name, needed to display the data
 * @param {String} display - An evaluate string to display the entry
 */
defineComponent('furet-ui-list-field-one2many', {
  template: RelationShipX2MList,
  extend: ['furet-ui-list-field-common', 'furet-ui-field-relationship'],
  prototype: {
    computed: {
      values () {
        const res = [];
        const display = this.config.display;
        const model = this.config.model;
        this.value.forEach(pk => {
          res.push({
            pk,
            label: this.format(display, this.getEntry(model, pk)),
          });
        });
        return res;
      },
    },
  },
})
fields.list.one2many = 'furet-ui-list-field-one2many'


defineComponent('furet-ui-page-o2m-list-header', {
  template: `
    <header id="furet-ui-page-multi-entries-header">
      <div class="level">
        <div class="level-left">
          <div class="buttons is-grouped is-left">
            <button 
              id="furet-ui-page-multi-entries-header-new" 
              v-if="can_go_to_new" 
              v-bind:disabled="readonly"
              class="button is-x2m-created is-small" 
              v-on:click="goToNew"
            >
              <span class="icon"><b-icon icon="plus" /></span>
              <span>{{ $t('components.header.new') }}</span>
            </button>
            <slot name="actions" v-bind:data="data" />
          </div>
        </div>
        <div class="level-right">
          <div class="level-item">
            <b-field grouped group-multiline>
              <div class="control" v-for="tag in tags" v-if="tag.selected" v-bind:key="tag.key">
                  <b-tag 
                    v-bind:class="['furet-ui-page-multi-entries-header-tag', tag.key]" 
                    type="is-primary" closable 
                    v-on:close="removeTag(tag)">{{ $t(tag.label) }} </b-tag>
              </div>
              <div class="control" v-for="filter in filters" v-if="filter.values.length" v-bind:key="filter.key + '-' + filter.mode + '-' + filter.opt">
                <b-taglist attached>
                  <b-tag type="is-danger" v-if="filter.mode == 'exclude'"> ~ </b-tag>
                  <b-tag type="is-dark">{{ $t(filter.label) }}</b-tag>
                  <b-tag 
                    type="is-primary" 
                    closable 
                    v-for="value in filter.values" 
                    v-bind:class="['furet-ui-page-multi-entries-header-filter', filter.key, value]" 
                    v-on:close="removeFilter(filter.key, filter.mode, filter.opt, value)" 
                    v-bind:key="value">{{ value }} </b-tag>
                </b-taglist>
              </div>
            </b-field>
          </div>
          <div class="level-item" v-if="filters.length" >
            <b-autocomplete
              v-model="filterSearch"
              v-bind:data="filteredDataArray"
              v-bind:placeholder="this.$i18n.t('components.header.search')"
              icon="search"
              v-on:select="updateFilters"
              clear-on-select
              size="is-small"
            >
              <template slot="empty">{{ $t('components.header.notFound') }}</template>
              <template slot-scope="props">
                {{ props.option.mode == 'exclude' ? ' ~ ' : '' }} <small>{{ $t(props.option.label) }} </small> : <strong>{{ props.option.value }}</strong>
              </template>
            </b-autocomplete>
          </div>
          <div class="level-item buttons">
            <a id="furet-ui-page-multi-entries-header-refresh" class="button is-small" v-on:click="refresh"><b-icon icon="redo" /></a>
            <a id="furet-ui-page-multi-entries-header-tags" v-if="tags.length" class="button is-small" v-on:click.stop="tag_list_open = ! tag_list_open">
              <b-icon :icon="tag_list_open ? 'arrow-circle-up' : 'arrow-circle-down'" />
            </a>
          </div>
        </div>
      </div>
      <b-collapse class="panel is-pulled-right" v-bind:open.sync="tag_list_open">
        <b-taglist>
          <b-tag v-for="tag in tags" v-bind:key="tag.key" v-bind:class="['is-small', tag.selected ? '': 'has-text-weight-bold']" >
            <a 
              v-bind:class="['furet-ui-page-multi-entries-header-toggle-tag', tag.key]" 
              v-on:click.stop="toggleTag(tag)">{{ $t(tag.label) }}</a>
          </b-tag>
        </b-taglist>
      </b-collapse>
    </header>
  `,
  extend: ['furet-ui-page-multi-entries-header'],
});

defineComponent('furet-ui-page-o2m-page-header', {
  template: `
    <header id="header_page">
      <div class="buttons is-grouped has-addons">
        <a v-if="can_save" class="button is-small" v-on:click="goToPage">
          <span class="icon">
            <b-icon icon="times" />
          </span>
          <span>{{ $t('components.header.cancel') }}</span>
        </a>
        <a v-else class="button is-small" v-on:click="goToList">
          <span class="icon">
            <b-icon icon="arrow-left" />
          </span>
          <span>{{ $t('components.header.return') }}</span>
        </a>
        <a v-if="prevous_target" class="button is-small" v-on:click="goToPreviousPage">
          <span class="icon">
            <b-icon icon="page-previous" />
          </span>
          <span>{{ $t('components.header.previous') }}</span>
        </a>
        <a v-if="next_target" class="button is-small" v-on:click="goToNextPage">
          <span class="icon">
            <b-icon icon="page-next" />
          </span>
          <span>{{ $t('components.header.next') }}</span>
        </a>
        <button v-if="can_go_to_new" v-bind:disabled="readonly" class="button is-x2m-created is-small" v-on:click="goToNew">
          <span class="icon">
            <b-icon icon="plus" />
          </span>
          <span>{{ $t('components.header.new') }}</span>
        </button>
        <button v-if="can_modify" v-bind:disabled="readonly" class="button is-x2m-updated is-small" v-on:click="goToEdit">
          <span class="icon">
            <b-icon icon="pencil-alt" />
          </span>
          <span>{{ $t('components.header.edit') }}</span>
        </button>
        <button v-if="can_save & data.__uuid !== undefined" class="button is-x2m-created is-small" v-on:click="save">
          <span class="icon">
            <b-icon icon="save" />
          </span>
          <span>{{ $t('components.header.apply') }}</span>
        </button>
        <button v-if="can_save & data.__uuid === undefined" class="button is-x2m-updated is-small" v-on:click="save">
          <span class="icon">
            <b-icon icon="save" />
          </span>
          <span>{{ $t('components.header.apply') }}</span>
        </button>
        <button v-if="can_delete" v-bind:disabled="readonly" class="button is-x2m-deleted is-small" v-on:click="deleteEntry">
          <span class="icon">
            <b-icon icon="trash" />
          </span>
          <span>{{ $t('components.header.delete') }}</span>
        </button>
        <slot name="head_actions" v-bind:data="data" />
      </div>
    </header>
  `,
  extend: ['furet-ui-header-page'],
});


/**
 * furet-ui-form-field-one2many component is used to manage relationship one2many on form
 * resource (``furet-ui-resource-form``).
 *
 * Extend Mixins:
 *  * @see ``furet-ui-list-field-common``
 *
 * @example
 *  <furet-ui-form-field-one2many
 *    :config="aConfigObject"
 *    :data="aDataObject"
 *    :resource="aResourceObject"/>
 *
 * @mixes <furet-ui-list-field-common>
 *
 * @param {Object} config - A config object to manage the behaviour of the component
 * @param {Object} data - An object that contains data to display. The key to use
 *                        in set in the `config.key`
 * @param {Object} resource - A resource object used to properly bind data with parents
 *                            tags and manage reactivity.
 *
 * ``config`` Object contains
 * @param {String} name - the key to use in the ``data`` object where is store the value
 * @param {String} model - A model name, needed to display the data
 * @param {Integer} resource - Id of the resource to used
 */
defineComponent("furet-ui-form-field-one2many", {
  template: `
    <furet-ui-form-field-common-tooltip-field
      v-bind:resource="resource"
      v-bind:data="data"
      v-bind:config="config"
    >
      <furet-ui-form-field-resource-manager
        ref="manager"
        v-bind:id="config.resource"
        v-bind:x2m_resource="resource"
        v-bind:isReadonly="isReadonly"
        v-bind:config="x2mconfig"
        v-bind:value="value"

        v-on:add="o2m_add"
        v-on:revert="o2m_revert"
        v-on:update="o2m_update"
        v-on:delete="o2m_delete"
      />
    </furet-ui-form-field-common-tooltip-field>
  `,
  extend: ["furet-ui-form-field-common"],
  prototype: {
    inject: ['registryRefreshCallback'],
    computed: {
      x2mconfig () {
        if (this.config.multi_header_component_name === undefined) {
          this.config.multi_header_component_name = 'furet-ui-page-o2m-list-header';
        }
        if (this.config.page_header_component_name === undefined) {
          this.config.page_header_component_name = 'furet-ui-page-o2m-page-header';
        }
        this.config.pagination_size = 'is-small';
        return this.config;
      },
    },
    methods: {
      addState(actions, state) {
        return [Object.assign({}, actions.pks, { __x2m_state: state})];
      },
      o2m_revert(actions) {
        const newvalue = [];
        const changes = {};
        changes[actions.model] = {};
        if (actions.uuid){
          newvalue.push({ __revert: true, uuid: actions.uuid });
          changes[actions.model]["new"] = {};
          changes[actions.model]["new"][actions.uuid] = {"__revert": true};
        } else {
          changes[actions.model][pk2string(actions.pks)] = {"__revert": true};
          newvalue.push(Object.assign({ __revert: true}, actions.pks));
        }
        this.updateValue(newvalue, changes);
      },
      o2m_add(actions) {
        const newvalue = [];
        newvalue.push({ __x2m_state: "ADDED", uuid: actions.uuid });
        this.updateValue(newvalue, actions.changes);
      },
      o2m_update(actions) {
        this.updateValue(this.addState(actions, "UPDATED"), actions.changes);
      },
      o2m_delete(actions) {
        const data = {};
        data[actions.model] = {};
        const pks = pk2string(actions.pks);
        data[actions.model][pks] = Object.assign({__change_state: "delete"}, actions.pks);
        this.updateValue(this.addState(actions, "DELETED"), data);
      },
      refresh () {
        this.$refs.manager.$refs.resource.refresh()
      },
    },
    mounted () {
      this.registryRefreshCallback(this.refresh);
    },
  }
});
fields.form.one2many = "furet-ui-form-field-one2many";
