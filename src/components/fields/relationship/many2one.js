/**
This file is a part of the FuretUI project

   Copyright (C) 2017 Jean-Sebastien SUZANNE <jssuzanne@anybox.fr>

This Source Code Form is subject to the terms of the Mozilla Public License,
v. 2.0. If a copy of the MPL was not distributed with this file,You can
obtain one at http://mozilla.org/MPL/2.0/.
**/
// import _ from 'underscore';
import axios from 'axios';
import {defineComponent} from '../../factory'
import {fields} from '../fields';


defineComponent('furet-ui-list-field-many2one', {
  template: `
    <div>
      <span v-if="isHidden" />
      <a v-else v-on:click.stop="onClick">{{value}}</a>
    </div>`,
  extend: ['furet-ui-list-field-common', 'furet-ui-list-field-relationship'],
    prototype: {
      computed: {
        value () {
          const value = this.data[this.config.name] || '';
          const model = this.config.model; 
          return this.format(this.config.display, this.getEntry(model, value));
        }
      },
      methods: {
        onClick () {
          this.addInBreadscrumb();
        },
      },
    },
})
fields.list.many2one = 'furet-ui-list-field-many2one'


defineComponent('furet-ui-form-field-many2one', {
  template: `
    <furet-ui-form-field-common-tooltip-field
      v-bind:resource="resource"
      v-bind:data="data"
      v-bind:config="config"
    >
      <a v-if="isReadonly">{{value}}</a>
      <b-autocomplete
        v-else
        v-bind:value="value"
        v-bind:data="choices"
        field="label"
        v-bind:placeholder="config.placeholder"
        icon-pack="fa"
        v-bind:icon="config.icon"
        v-on:typing="onChange"
        v-on:select="onSelect"
      />
    </furet-ui-form-field-common-tooltip-field>
  `,
  extend: ['furet-ui-form-field-common', 'furet-ui-list-field-relationship'],
  prototype: {
    data () {
        return {
            pks: [],
        };
    },
    computed: {
      value () {
        const value = this.data[this.config.name] || '';
        const model = this.config.model; 
        return this.format(this.config.display, this.getEntry(model, value));
      },
      choices () {
        const res = [];
        this.pks.forEach(pk => {
          res.push({
              pk,
              label: this.format(this.config.display, this.getEntry(this.config.model, pk)),
          })
        });
        return res
      },
    },
    methods: {
      onClick () {
        // add breadscrumb
      },
      onSelect (value) {
        this.updateValue(value.pk)
      },
      onChange (value) {
        if (this.value) this.updateValue(null)
        const params = {
          model: this.config.model,
          fields: this.config.fields.toString(),
          limit: this.config.limit,
        }
        this.config.filter_by.forEach(filter => {
          params[`filter[${filter}][ilike]`] = value
        })
        axios.get('/furet-ui/crud', { params })
          .then((response) => {
            this.$dispatchAll(response.data.data);
            this.pks = response.data.pks
            this.loading = false;
          })
      },
    },
  },
})
fields.form.many2one = 'furet-ui-form-field-many2one'
