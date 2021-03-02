// /**
// This file is a part of the FuretUI project
//
//    Copyright (C) 2017 Jean-Sebastien SUZANNE <jssuzanne@anybox.fr>
//
// This Source Code Form is subject to the terms of the Mozilla Public License,
// v. 2.0. If a copy of the MPL was not distributed with this file,You can
// obtain one at http://mozilla.org/MPL/2.0/.
// **/
// import _ from 'underscore';
import { defineComponent } from "../factory";
import { fields } from "./fields";
import { listTemplate, thumbnailTemplate, safe_eval_boolean } from "./common";

const computed_boolean_checked = (obj) => {
  // #11 safe eval can return null at the moment we are ignoring null values
  return safe_eval_boolean(obj.value) ? true : false;
};

defineComponent("furet-ui-list-field-boolean", {
  template: `
    <div>
      <span v-if="isHidden" />
      <b-checkbox 
        v-else
        v-model="checked"
        disabled
      />
    </div>`,
  extend: ["furet-ui-list-field-common"],
  prototype: {
    computed: {
      checked() {
        return computed_boolean_checked(this);
      }
    }
  }
});
fields.list.boolean = "furet-ui-list-field-boolean";

defineComponent("furet-ui-common-field-yesno", {
  prototype: {
    computed: {
      value() {
        const base = "components.fields.yesno";
        // #11 safe eval can return null at the moment we are ignoring null values
        return this.$t(
          safe_eval_boolean(this.data[this.config.name] || "")
            ? `${base}.yes`
            : `${base}.no`
        );
      }
    }
  }
});

defineComponent("furet-ui-list-field-yesno", {
  template: listTemplate,
  extend: ["furet-ui-list-field-common", "furet-ui-common-field-yesno"],
});
fields.list.yesno = "furet-ui-list-field-yesno";

defineComponent("furet-ui-thumbnail-field-boolean", {
  template: `
  <furet-ui-thumbnail-field-common-tooltip-field
    v-bind:resource="resource"
    v-bind:data="data"
    v-bind:config="config"
  >
    <span>{{ value }}</span>
      <b-checkbox 
        v-model="checked" 
        disabled
        v-bind:key="config.key"
      >
        {{ config.label }}
      </b-checkbox>
  </furet-ui-thumbnail-field-common-tooltip-field>
  `,
  extend: ["furet-ui-thumbnail-field-common"],
  prototype: {
    computed: {
      checked() {
        return computed_boolean_checked(this);
      }
    }
  }
});
fields.thumbnail.boolean = "furet-ui-thumbnail-field-boolean";

defineComponent("furet-ui-thumbnail-field-yesno", {
  template: thumbnailTemplate,
  extend: ["furet-ui-thumbnail-field-common", "furet-ui-common-field-yesno"],
});
fields.thumbnail.yesno = "furet-ui-thumbnail-field-yesno";

defineComponent("furet-ui-form-field-boolean", {
  template: `
    <furet-ui-form-field-common-tooltip
      v-bind:resource="resource"
      v-bind:data="data"
      v-bind:config="config"
    >
      <b-checkbox 
        v-model="checked" 
        v-bind:disabled="isReadonly"
        v-bind:key="config.key"
      >
        {{ config.label }}
      </b-checkbox>
    </furet-ui-form-field-common-tooltip>`,
  extend: ["furet-ui-form-field-common"],
  prototype: {
    computed: {
      checked: {
        get() {
          // #11 safe eval can return null at the moment we are ignoring null values
          return safe_eval_boolean(this.value) ? true : null;
        },
        set(value) {
          this.updateValue(value);
        }
      }
    }
  }
});
fields.form.boolean = "furet-ui-form-field-boolean";
