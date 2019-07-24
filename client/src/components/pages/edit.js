import * as axios from 'axios';
import { defineComponent } from '../factory';

defineComponent('furet-ui-edit', {
  template: `
    <section id="furet-ui-edit" class="section">
      <b-message type="is-danger" v-if="(errors || []).length" v-bind:closable="false" v-bind:title="$i18n.t('error')">
        <ul>
          <li v-for="error in errors">
            <pre>{{ error }}</pre>
          </li>
        </ul>
      </b-message>
      <form v-on:submit="savePage(true)">
        <furet-ui-header-page
          name="furet-ui-header-edit"
          v-bind:title="title"
          v-bind:subtitle="subtitle"
          v-bind:can_modify="can_modify"
          v-bind:can_delete="can_delete"
          can_save="true"
          v-on:go-to-list="goToList"
          v-on:go-to-page="goToEdit"
          v-on:delete-entry="deleteEntry"
          v-on:save="savePage(true)"
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
            <slot name="actions" v-bind:data="props.data" v-bind:submit="$refs.submit"/>
          </template>
          <template slot="states" slot-scope="props">
            <slot name="states" v-bind:data="props.data" />
          </template>
        </furet-ui-header-page>
        <b-loading v-bind:active.sync="loading"></b-loading>
        <slot v-bind:data="data" />
        <footer>
          <div class="field is-grouped is-grouped-centered">
            <p class="control">
              <button class="button is-primary is-outlined" type="submit" v-bind:value="$i18n.t('components.page.save')" ref="submit">
                <span class="icon">
                  <b-icon icon="floppy" />
                </span>
                <span>{{ $t('components.page.save') }}</span>
              </button>
              <button class="button is-primary is-outlined" type="reset" v-bind:value="$i18n.t('components.page.clear')">
                <span class="icon">
                  <b-icon icon="format-clear" />
                </span>
                <span>{{ $t('components.page.clear') }}</span>
              </button>
              <slot name="buttons" />
            </p>
          </div>
        </footer>
      </form>
    </section>
  `,
  prototype: {
    props: [
      'title', 'subtitle', 'rest_api_url', 'get_body',
      'can_modify', 'can_delete', 'can_save'],
    data() {
      return {
        initial_data: {},
        data: {},
        errors: [],
        loading: false,
      };
    },
    methods: {
      goToList() {
        this.$emit('go-to-list');
      },
      goToEdit(target) {
        this.$emit('go-to-edit', target);
      },
      applyResponse(response) {
        this.initial_data = response.data;
        this.data = JSON.parse(JSON.stringify(response.data));
      },
      loadAsyncData() {
        this.loading = true;
        axios.get(this.rest_api_url)
          .then((response) => {
            this.applyResponse(response);
            this.loading = false;
          })
          .catch((error) => {
            this.errors = error.response.data.errors;
            this.loading = false;
          });
      },
      savePage(haveToSave) {
        if (haveToSave) {
          const body = this.get_body(this.initial_data, this.data);
          this.errors = [];
          if (Object.keys(body).length !== 0) {
            this.loading = true;
            axios.patch(this.rest_api_url, body)
              .then((response) => {
                this.loading = false;
                this.$emit('go-to-page', response.data);
              })
              .catch((error) => {
                this.errors = error.response.data.errors;
                this.loading = false;
              });
          } else {
            this.$emit('go-to-page', this.initial_data);
          }
        } else {
          this.$emit('go-to-page', this.initial_data);
        }
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
