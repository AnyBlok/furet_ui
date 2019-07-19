import * as axios from 'axios';
import { defineComponent } from '../factory';

defineComponent('furet-ui-page', {
  template: `
    <section id="furet-ui-page" class="section">
      <b-message type="is-danger" v-if="(errors || []).length" v-bind:closable="false" v-bind:title="$i18n.t('error')">
        <ul>
          <li v-for="error in errors">
            <pre>{{ error }}</pre>
          </li>
        </ul>
      </b-message>
      <furet-ui-header-page
        name="furet-ui-page"
        v-bind:title="title"
        v-bind:subtitle="subtitle"
        v-bind:can_modify="can_modify"
        v-bind:can_delete="can_delete"
        v-on:goToList="goToList"
        v-on:goToEdit="goToEdit"
        v-on:goToPage="goToPage"
        v-on:deleteEntry="deleteEntry"
        v-bind:data="data"
      >
        <template slot="fsm_states" slot-scope="props">
          <slot name="fsm_states" v-bind:fsm_state="props.fsm_state" v-bind:fsm_instance="props.fsm_instance"/>
        </template>
        <template slot="fsm_controls" slot-scope="props">
          <slot name="fsm_controls" v-bind:fsm_state="props.fsm_state" v-bind:fsm_instance="props.fsm_instance"/>
        </template>
        <template slot="aftertitle" slot-scope="props">
          <slot name="aftertitle" v-bind:data="props.data" />
        </template>
        <template slot="actions" slot-scope="props">
          <slot name="actions" v-bind:data="props.data" />
        </template>
        <template slot="states" slot-scope="props">
          <slot name="states" v-bind:data="props.data" />
        </template>
      </furet-ui-header-page>
      <div>
        <b-loading v-bind:active.sync="loading"></b-loading>
        <slot v-bind:data="data" />
      </div>
      <footer>
        <div class="field is-grouped is-grouped-centered">
          <p class="control">
            <slot name="buttons" />
          </p>
        </div>
      </footer>
    </section>
  `,
  prototype: {
    props: [
      'title', 'subtitle', 'rest_api_url',
      'can_modify', 'can_delete'],
    data() {
      return {
        data: {},
        loading: false,
        errors: [],
      };
    },
    methods: {
      loadAsyncData() {
        this.loading = true;
        axios.get(this.rest_api_url)
          .then((response) => {
            this.data = response.data;
            this.loading = false;
          })
          .catch((error) => {
            this.errors = error.response.data.errors;
            this.loading = false;
          });
      },
      goToList() {
        this.$emit('goToList');
        this.$emit('gotolist');
      },
      goToPage(arg) {
        this.$emit('goToPage', arg);
        this.$emit('gotopage', arg);
      },
      goToEdit() {
        this.$emit('goToEdit');
        this.$emit('gotoedit');
      },
      deleteEntry() {
        this.loading = true;
        axios.delete(this.rest_api_url)
          .then(() => {
            this.goToList();
          })
          .catch((error) => {
            this.errors = error.response.data.errors;
            this.loading = false;
          });
      },
    },
    mounted() {
      this.loadAsyncData();
    },
  },
});

