import { resources } from './resources';
import { v1 as uuidv1 } from 'uuid';
import { defineComponent } from '../factory';


defineComponent('furet-ui-header-page-singleton', {
  template: `
    <header id="header_page">
      <slot name="header" v-bind:data="data">
        <div class="level">
          <div class="level-left">
            <h2 class="level-item is-size-3">{{ title }}</h2>&nbsp;<span class="level-item"><slot name="aftertitle" v-bind:data="data" /></span>
          </div>
          <div class="level-right">
            <slot name="states" v-bind:data="data" />
          </div>
        </div>
      </slot>
      <div class="buttons is-grouped is-centered">
        <a v-if="show_save" class="button is-warning is-outlined" v-on:click="goToPage">
          <span class="icon">
            <b-icon icon="times" />
          </span>
          <span>{{ $t('components.header.cancel') }}</span>
        </a>
        <button v-if="can_modify" v-bind:disabled="readonly" class="button is-primary is-outlined" v-on:click="goToEdit">
          <span class="icon">
            <b-icon icon="pencil-alt" />
          </span>
          <span>{{ $t('components.header.edit') }}</span>
        </button>
        <button v-if="show_save" v-bind:disabled="can_save" class="button is-primary is-outlined" v-on:click="save">
          <span class="icon">
            <b-icon icon="save" />
          </span>
          <span>{{ $t('components.header.save') }}</span>
        </button>
        <slot name="head_actions" v-bind:data="data" />
      </div>
    </header>
  `,
  prototype: {
    props: ['title', 'can_modify',
            'show_save', 'can_save', 'data', 'readonly'],
    methods: {
      goToPage(row) {
        this.$emit('go-to-page', row);
      },
      goToEdit() {
        this.$emit('go-to-edit');
      },
      save() {
        this.$emit('save');
      },
    },
  },
});


defineComponent('furet-ui-resource-singleton', {
  template : `
    <section>
      <b-loading v-bind:active.sync="loading"></b-loading>
      <furet-ui-page-errors v-bind:errors="errors"/>
      <furet-ui-header-page-singleton
        name="furet-ui-page"
        v-bind:title="resource.title"
        v-bind:can_modify="readonly"
        v-bind:show_save="!readonly"
        v-bind:can_save="manager.children_is_modified"
        v-bind:readonly="manager.readonly"

        v-on:go-to-edit="goToEdit"
        v-on:go-to-page="goToPage"
        v-on:save="save"

        v-bind:data="data"
      >
        <template slot="header" v-if="resource.header_template">
          <component 
            v-bind:is="form_card_header_template" 
            v-bind:resource="resource"
            v-bind:data="data"
          />
        </template>
      </furet-ui-header-page-singleton>
      <div class="section">
        <component 
          v-bind:is="form_card_body_template" 
          v-bind:resource="resource"
          v-bind:data="data"
          v-bind:key="'body_' + resource.id"
        />
      </div>
      <component 
        v-bind:is="form_card_footer_template" 
        v-bind:resource="resource"
        v-bind:data="data"
        v-bind:key="'footer_' + resource.id"
      />
    </section>
  `,
  extend: ['furet-ui-resource-form'],
  prototype: {
    methods: {
      goToPage () {
        this.refresh_fields();
        if (this.uuid) this.getDefault();
        this.updateReadOnly(true);
      },
      parse_query() {
        if (this.manager.query !== undefined) {
          if (this.manager.query.pks) {
            const pks = JSON.parse(this.manager.query.pks);
            if (JSON.stringify(pks) != JSON.stringify(this.pks)) {
              this.pks = pks
              this.uuid = null;
              this.loadAsyncData();
            }
          } else if (this.uuid !== null) {
            // nothing
          } else {
            // new case
            this.uuid = uuidv1();
            this.getDefault();
          }
        }
      },
    },
  },
});
resources.singleton = 'furet-ui-resource-singleton';
