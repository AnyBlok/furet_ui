import * as axios from 'axios';
import debounce from 'debounce';
import { defineComponent } from '../factory';

defineComponent('many2one', {
  template: `
    <div>
      <span v-if="readonly">{{ title }}</span>
      <b-autocomplete
        v-else
        expanded
        v-on:input="getAsyncData"
        v-bind:loading="isFetching"
        v-model="name"
        v-bind:data="data"
        v-on:select="updateSelect"
        field="title"
        ref="autocomplete"
      >
        <template slot="empty">{{ $t('components.fields.notFound') }}</template>
        <template slot="header" v-if="has_select_view">
          <a @click="isSelectPage=true">
            <span> Search more... </span>
          </a> 
        </template>
        <template slot-scope="props">
          <slot v-bind:option="props.option.data" v-bind:index="props.index"/>
        </template>
      </b-autocomplete>
      <div v-bind:class="['modal', isSelectPage ? 'is-active' : '']">
        <div class="modal-background"></div>
        <div class="modal-card">
          <header class="modal-card-head">
            <p class="modal-card-title">Modal title</p>
            <button class="delete" aria-label="close" v-on:click.stop="isSelectPage = false"></button>
          </header>
          <section class="modal-card-body">
            <slot name="listView" v-bind:selectAction="selectAction"/>
          </section>
          <footer class="modal-card-foot">
            <a class="button is-primary is-outlined" v-on:click.stop="isSelectPage = false">Close</a>
          </footer>
        </div>
      </div>
    </div>
  `,
  prototype: {
    props: [
      'value', 'limit', 'primary_keys', 'filter_on', 'filter_op', 'rest_api_url',
      'display', 'has_select_view', 'readonly', 'filters',
    ], // todo add search more, create
    data() {
      return {
        title: '',
        data: [],
        name: '',
        isFetching: false,
        isSelectPage: false,
      };
    },
    methods: {
      selectAction(row) {
        this.isSelectPage = false;
        const value = this.updateSelect({ data: row });
        this.get_result(value);
      },
      getAsyncData: debounce(function async() {
        this.isFetching = true;
        const params = {
          offset: 0,
          limit: this.limit || 10,
        };
        if (this.filters && this.filters.length) {
          this.filters.forEach((filter) => {
            const f = filter.split('=');
            const key = f[0];
            const value = f[1];
            params[key] = value;
          });
        }
        params[`filter[${this.filter_on}][${this.filter_op || 'ilike'}]`] = this.name;
        axios.get(this.rest_api_url, { params })
          .then((response) => {
            this.isFetching = false;
            this.data = [];
            (response.data || []).forEach((data) => {
              // eslint-disable-next-line
              const title = eval(this.display);
              this.data.push({ title, data });
            });
          })
          .catch(() => {
            this.isFetching = false;
          });
      }, 200),
      updateSelect(option) {
        if (option) {
          this.title = option.title;
          const value = {};
          this.primary_keys.forEach((pk) => {
            value[pk] = option.data[pk];
          });
          this.$emit('update_selection', value);
          return value;
        }
        return {};
      },
      get_result(value) {
        this.isFetching = true;
        const params = {
          offset: 0,
          limit: this.limit || 10,
        };
        this.primary_keys.forEach((pk) => {
          params[`filter[${pk}][eq]`] = value[pk];
        });
        axios.get(this.rest_api_url, { params })
          .then((response) => {
            this.data = [];
            (response.data || []).forEach((data) => {
              // eslint-disable-next-line
              const title = eval(this.display);
              this.data.push({ title, data });
            });
            this.isFetching = false;
            this.title = this.data[0].title;
            this.$refs.autocomplete.setSelected(this.data[0]);
          })
          .catch(() => {
            this.isFetching = false;
          });
      },
    },
    mounted() {
      if (this.value && Object.keys(this.value).length) this.get_result(this.value);
    },
  },
});

