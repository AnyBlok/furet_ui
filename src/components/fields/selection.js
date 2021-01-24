/**
This file is a part of the FuretUI project

   Copyright (C) 2017 Jean-Sebastien SUZANNE <jssuzanne@anybox.fr>

This Source Code Form is subject to the terms of the Mozilla Public License,
v. 2.0. If a copy of the MPL was not distributed with this file,You can
obtain one at http://mozilla.org/MPL/2.0/.
**/
import _ from 'underscore';
import {defineComponent} from '../factory'
import {fields} from './fields';


defineComponent('furet-ui-common-field-selection', {
  prototype: {
    computed: {
      value () {
          const selections = this.config.selections || {};
          const value = this.data[this.config.name] || '';
          if (selections[value] == undefined) return ' --- ';
          return this.$t(selections[value]);
      },
      color () {
          const colors = this.config.colors || {};
          const value = this.data[this.config.name] || '';
          return colors[value];
      },
    },
  },
})
fields.list.selection = 'furet-ui-list-field-selection'


defineComponent('furet-ui-list-field-selection', {
  template: `
    <div>
      <span v-if="isHidden" />
      <div v-else>
        <b-tag v-if="color !== undefined" v-bind:type="color">{{value}}</b-tag>
        <span v-else>{{value}}</span>
      </div>
    </div>
  `,
  extend: ['furet-ui-list-field-common', 'furet-ui-common-field-selection'],
})
fields.list.selection = 'furet-ui-list-field-selection'


defineComponent('furet-ui-thumbnail-field-selection', {
  template: `
    <furet-ui-form-field-common-tooltip
      v-bind:resource="resource"
      v-bind:data="data"
      v-bind:config="config"
    >
      <b-tag v-if="color !== undefined" v-bind:type="color">{{value}}</b-tag>
      <span v-else>{{value}}</span>
    </furet-ui-form-field-common-tooltip>
  `,
  extend: ['furet-ui-thumbnail-field-common', 'furet-ui-common-field-selection'],
})
fields.thumbnail.selection = 'furet-ui-thumbnail-field-selection'


defineComponent('furet-ui-form-field-selection', {
  template: `
    <furet-ui-form-field-common-tooltip-field
      v-bind:resource="resource"
      v-bind:data="data"
      v-bind:config="config"
    >
      <div v-if="isReadonly">
        <b-tag v-if="color !== undefined" v-bind:type="color">{{formated_value}}</b-tag>
        <span v-else>{{formated_value}}</span>
      </div>
      <div class="field has-addons" v-else>
        <p class="control" v-if="color">
          <a class="button">
            <b-icon icon="info-circle" v-bind:type="color"/>
          </a>
        </p>
        <b-select 
          v-bind:placeholder="config.placeholder"
          icon-pack="fa"
          v-bind:icon="config.icon"
          v-bind:value="value"
          expanded
          v-on:input="updateValue"
          v-bind:key="config.key"
        >
          <option 
            v-for="option in getSelections"
            v-bind:key="option.value"
            v-bind:value="option.value"
          >
            {{ option.label }}
          </option>
        </b-select>
      </div>
    </furet-ui-form-field-common-tooltip-field>
  `,
  extend: ['furet-ui-form-field-common'],
  prototype: {
    computed: {
      formated_value () {
        const selections = this.config.selections || {};
        if (selections[this.value] == undefined) return ' --- ';
        return this.$t(selections[this.value]);
      },
      getSelections () {
        const colors = this.config.colors || {};
        const selections = [];
          if (!this.isRequired) selections.push({label: '', value: null, color: null});

        _.each(this.config.selections, (label, value) => {
          selections.push({value, label: this.$t(label), color: colors[value]})
        });

        return selections;
      },
      color () {
        const colors = this.config.colors || {};
        return colors[this.value];
      },
    },
  },
})
fields.form.selection = 'furet-ui-form-field-selection'
