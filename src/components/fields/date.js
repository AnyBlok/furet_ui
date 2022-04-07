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


defineComponent('furet-ui-common-field-date', {
  prototype: {
    computed: {
      value () {
        moment.locale(i18n.locale);
        const value = this.data[this.config.name];
        const timezone = this.$store.state.global.userTimeZone;
        if (value) return moment(value).tz(timezone).format('LL');
        return '';
      },
    },
  },
})

defineComponent('furet-ui-list-field-date', {
  template: listTemplate,
  extend: ['furet-ui-list-field-common', 'furet-ui-common-field-date'],
})
fields.list.date = 'furet-ui-list-field-date'

defineComponent('furet-ui-thumbnail-field-date', {
  template: thumbnailTemplate,
  extend: ['furet-ui-thumbnail-field-common', 'furet-ui-common-field-date'],
})
fields.thumbnail.date = 'furet-ui-thumbnail-field-date'

defineComponent('furet-ui-form-field-date', {
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
        <span v-else>{{ readonly_value }}</span>
      </div>
      <b-datepicker
        v-else
        v-bind:placeholder="config.placeholder"
        v-bind:value="value" 
        v-on:input="updateDateValue"
        v-bind:editable="config.editable"
        v-bind:show-week-number="config.showWeekNumber"
        icon-pack="fa"
        v-bind:icon="config.icon"
        v-bind:key="config.key"
        trap-focus
      />
    </furet-ui-form-field-common-tooltip-field>
  `,
  prototype: {
    computed: {
      readonly_value () {
        moment.locale(i18n.locale);
        const value = this.data[this.config.name];
        const timezone = this.$store.state.global.userTimeZone;
        if (value) return moment(value).tz(timezone).format('LL');
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
      updateDateValue (value) {
        this.updateValue(value.toISOString())
      },
    },
  },
})
fields.form.date = 'furet-ui-form-field-date'
