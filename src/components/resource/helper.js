import _ from 'underscore';
import { defineComponent } from '../factory';
import { safe_eval } from '../fields/common';

defineComponent('furet-ui-fieldset', {
  template: `
    <fieldset v-if="!isHidden" v-bind:disabled="isReadonly" v-bind="config.props">
      <slot />
    </fieldset>
  `,
  prototype: {
    props: ['resource', 'data', 'config'],
    computed: {
      isHidden () {
        if (this.config.hidden == undefined) return false;
        return safe_eval(this.config.hidden, this.data || {}, this.resource.selectors);
      },
      isReadonly () {
        if (this.resource.readonly) return true;
        const readonlyParams = safe_eval(this.config.readonly, this.data || {}, this.resource.selectors);
        if (this.config.writable) {
          const writableParams = safe_eval(this.config.writable, this.data || {}, this.resource.selectors);
          return readonlyParams && ! writableParams
        }
        return readonlyParams;
      },
    },
  },
})

defineComponent('furet-ui-tabs', {
  template: `
    <fieldset v-if="!isHidden" v-bind:disabled="isReadonly" v-bind="config.props">
      <b-tabs ref="tabs" v-model="resource.tags[config.name]">
        <slot />
      </b-tabs>
    </fieldset>
  `,
  prototype: {
    props: ['resource', 'data', 'config'],
    computed: {
      isHidden () {
        if (this.config.hidden == undefined) return false;
        return safe_eval(this.config.hidden, this.data || {}, this.resource.selectors);
      },
      isReadonly () {
        if (this.resource.readonly) return true;
        const readonlyParams = safe_eval(this.config.readonly, this.data || {}, this.resource.selectors);
        if (this.config.writable) {
          const writableParams = safe_eval(this.config.writable, this.data || {}, this.resource.selectors);
          return readonlyParams && ! writableParams
        }
        return readonlyParams;
      },
    },
  },
})

defineComponent('furet-ui-tab', {
  prototype: {
    functional: true,
    props: ['resource', 'data', 'config'],
    computed: {
    },
    render: function (createElement, context) {
        const visible = (() => {
          if (context.props.config.hidden == undefined) return true;
          return !safe_eval(context.props.config.hidden, context.props.data || {}, context.props.resource.selectors);
        })();
        const disabled = (() => {
          if (context.props.resource.readonly) return true;
          const readonlyParams = safe_eval(context.props.config.readonly, context.props.data || {}, context.props.resource.selectors);
          if (context.props.config.writable) {
            const writableParams = safe_eval(context.props.config.writable, context.props.data || {}, context.props.resource.selectors);
            return readonlyParams && ! writableParams
          }
          return readonlyParams;
        })();
        const options = Object.assign({}, context.data)
        options.attrs.visible= visible
        return createElement( 'b-tab-item', options, [
          createElement('fieldset', {attrs: {disabled}}, context.children)
        ])
    },
  },
})

defineComponent('furet-ui-div', {
  template: `
    <div v-if="!isHidden" v-bind="config.props">
      <slot />
    </div>
  `,
  prototype: {
    props: ['resource', 'data', 'config'],
    computed: {
      isHidden () {
        if (this.config.hidden == undefined) return false;
        return safe_eval(this.config.hidden, this.data || {}, this.resource.selectors);
      },
    },
  },
})

defineComponent('furet-ui-selector', {
  template: `
    <furet-ui-form-field-common-tooltip-field
      v-bind:resource="resource"
      v-bind:data="data"
      v-bind:config="config"
    >
      <div class="field has-addons">
        <b-select 
          v-bind:disabled="isReadonly" 
          icon-pack="fa"
          v-bind:icon="config.icon"
          v-model="resource.selectors[config.name]"
          expanded
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
  prototype: {
    props: ['resource', 'data', 'config'],
    computed: {
      value () {
        return this.resource.selectors[this.config.name];
      },
      isHidden () {
        if (this.config.hidden == undefined) return false;
        return safe_eval(this.config.hidden, this.data || {}, this.resource.selectors);
      },
      isReadonly () {
        const readonlyParams = safe_eval(this.config.readonly, this.data || {}, this.resource.selectors);
        return readonlyParams;
      },
      getSelections () {
        const colors = this.config.colors || {};
        const res = []
        res.push({label: '', value: null, color: null})
        _.each(this.config.selections, (label, value) => {
          res.push({value, label, color: colors[value]})
        });
        return res
      },
    },
    methods: {
      updateValue (value) {
        this.resource.selectors[this.config.name] = value;
      },
    },
  },
})
