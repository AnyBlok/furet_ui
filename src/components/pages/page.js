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
        v-on:go-to-list="goToList"
        v-on:go-to-edit="goToEdit"
        v-on:go-to-page="goToPage"
        v-on:delete-entry="deleteEntry"
        v-bind:data="data"
      >
        <template slot="aftertitle" slot-scope="props">
          <slot name="aftertitle" v-bind:data="props.data" />
        </template>
        <template slot="head_actions" slot-scope="props">
          <slot name="head_actions" v-bind:data="props.data" />
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
        <div class="buttons is-grouped is-centered">
          <slot name="foot_actions" v-bind:data="data" />
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
        this.$emit('go-to-list');
      },
      goToPage(arg) {
        this.$emit('go-to-page', arg);
      },
      goToEdit() {
        this.$emit('go-to-edit');
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

