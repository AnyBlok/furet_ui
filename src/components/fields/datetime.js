/**
This file is a part of the FuretUI project

   Copyright (C) 2017 Jean-Sebastien SUZANNE <jssuzanne@anybox.fr>

This Source Code Form is subject to the terms of the Mozilla Public License,
v. 2.0. If a copy of the MPL was not distributed with this file,You can
obtain one at http://mozilla.org/MPL/2.0/.
**/
import moment from 'moment-timezone';
import {defineComponent} from '../factory'
import {fields} from './fields';
import { listTemplate, thumbnailTemplate } from './common';
import {i18n} from '../../i18n';


defineComponent('furet-ui-common-field-datetime', {
  prototype: {
    computed: {
      value () {
        moment.locale(i18n.locale);
        const value = this.data[this.config.name];
        const timezone = this.$store.state.global.userTimeZone;
        if (value) return moment(value).tz(timezone).format('LLL');
        return '';
      },
    },
  },
})

defineComponent('furet-ui-list-field-datetime', {
  template: listTemplate,
  extend: ['furet-ui-list-field-common', 'furet-ui-common-field-datetime'],
})
fields.list.datetime = 'furet-ui-list-field-datetime'

defineComponent('furet-ui-thumbnail-field-datetime', {
  template: thumbnailTemplate,
  extend: ['furet-ui-thumbnail-field-common', 'furet-ui-common-field-datetime'],
})
fields.thumbnail.datetime = 'furet-ui-thumbnail-field-datetime'
fields.kanban.datetime = 'furet-ui-thumbnail-field-datetime'

defineComponent('furet-ui-form-field-datetime', {
  extend: ['furet-ui-form-field-common'],
  template: `
    <furet-ui-form-field-common-tooltip-field
      v-bind:resource="resource"
      v-bind:data="data"
      v-bind:config="config"
    >
      <div v-if="isReadonly">
        <component 
          v-if="config.slot" 
          v-bind:is="component_template"
          v-bind:config="config"
          v-bind:resource="resource"
          v-bind:data="data"
          v-bind:value="readonly_value"
        />
        <span v-else>{{ readonly_value}}</span>
      </div>
      <b-datetimepicker
        v-else
        rounded
        v-bind:placeholder="config.placeholder"
        v-bind:value="value" 
        v-on:input="updateDateTimeValue"
        v-bind:editable="config.editable"
        v-bind:datepicker="config.datepicker"
        v-bind:timepicker="config.timepicker"
        icon-pack="fa"
        v-bind:icon="config.icon"
        v-bind:key="config.key"
      >
        <template slot="left">
          <button class="button is-primary"
            v-on:click="updateDateTimeValue(new Date())">
            <b-icon icon="clock"></b-icon>
            <span>Now</span>
          </button>
        </template>
        <template slot="right">
          <button class="button is-danger"
            v-on:click="updateValue(null)">
            <b-icon icon="times"></b-icon>
            <span>Clear</span>
          </button>
        </template>
      </b-datetimepicker>
    </furet-ui-form-field-common-tooltip-field>
  `,
  prototype: {
    computed: {
      readonly_value () {
        moment.locale(i18n.locale);
        const value = this.data[this.config.name];
        const timezone = this.$store.state.global.userTimeZone;
        if (value) return moment(value).tz(timezone).format('LLL');
        return '';
      },
      value () {
        moment.locale(i18n.locale);
        const value = this.data[this.config.name];
        if (!value) return null;
        return new Date(Date.parse(value))
      },
    },
    methods: {
      updateDateTimeValue (value) {
        this.updateValue(value.toISOString())
      },
    },
  },
})
fields.form.datetime = 'furet-ui-form-field-datetime'
