import axios from 'axios';
import { defineComponent } from '../factory';

defineComponent('furet-ui-new', {
  template: `
    <section id="furet-ui-new" class="section">
      <b-message type="is-danger" v-if="(errors || []).length" v-bind:closable="false" v-bind:title="$i18n.t('error')">
        <ul>
          <li v-for="error in errors">
            <pre>{{ error }}</pre>
          </li>
        </ul>
      </b-message>
      <form v-on:submit="goToPage(true)">
        <furet-ui-header-page
          name="furet-ui-header-new"
          v-bind:title="title"
          can_save="true"
          v-on:go-to-list="goToList"
          v-bind:data="data"
        >
          <template slot="aftertitle" slot-scope="props">
            <slot name="aftertitle" v-bind:data="props.data" />
          </template>
          <template slot="head_actions" slot-scope="props">
            <slot name="head_actions" v-bind:data="props.data" v-bind:submit="$refs.submit"/>
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
              <slot name="foot_actions" v-bind:data="data" v-bind:submit="$refs.submit"/>
            </p>
          </div>
        </footer>
      </form>
    </section>
  `,
  prototype: {
    props: ['title', 'default_data', 'rest_api_url'],
    data() {
      return {
        data: this.default_data || {},
        errors: [],
        loading: false,
      };
    },
    methods: {
      goToList() {
        this.$emit('go-to-list');
      },
      goToPage(haveToSave) {
        if (haveToSave) {
          this.loading = true;
          axios.post(this.rest_api_url, [this.data])
            .then((response) => {
              this.loading = false;
              this.$emit('go-to-page', response.data[0]);
            })
            .catch((error) => {
              this.errors = error.response.data.errors;
              this.loading = false;
            });
        } else {
          this.$emit('go-to-list');
        }
      },
    },
  },
});
