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
        return safe_eval(this.config.hidden, this.data || {});
      },
      isReadonly () {
        if (this.resource.readonly) return true;
        const readonlyParams = safe_eval(this.config.readonly, this.data || {});
        if (this.config.writable) {
          const writableParams = safe_eval(this.config.writable, this.data || {});
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
      <b-tabs ref="tabs">
        <slot />
      </b-tabs>
    </fieldset>
  `,
  prototype: {
    props: ['resource', 'data', 'config'],
    computed: {
      isHidden () {
        if (this.config.hidden == undefined) return false;
        return safe_eval(this.config.hidden, this.data || {});
      },
      isReadonly () {
        if (this.resource.readonly) return true;
        const readonlyParams = safe_eval(this.config.readonly, this.data || {});
        if (this.config.writable) {
          const writableParams = safe_eval(this.config.writable, this.data || {});
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
          return !safe_eval(context.props.config.hidden, context.props.data || {});
        })();
        const disabled = (() => {
          if (context.props.resource.readonly) return true;
          const readonlyParams = safe_eval(context.props.config.readonly, context.props.data || {});
          if (context.props.config.writable) {
            const writableParams = safe_eval(context.props.config.writable, context.props.data || {});
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
        return safe_eval(this.config.hidden, this.data || {});
      },
    },
  },
})
