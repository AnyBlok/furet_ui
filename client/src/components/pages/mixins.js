import axios from 'axios';
import _ from 'underscore';
import { defineComponent } from '../factory';

defineComponent('furet-ui-page-errors', {
  template: `
    <div class="container">
      <b-message type="is-danger" v-if="errors && errors.length" v-bind:closable="false" v-bind:title="$i18n.t('error')">
        <ul>
          <li v-for="error in errors">
            <pre>{{ error }}</pre>
          </li>
        </ul>
      </b-message>
    </div>
  `,
  prototype: {
    props: ['errors'],
  },
});

defineComponent('furet-ui-page-multi-entries-header', {
  template: `
    <header id="furet-ui-page-multi-entries-header">
      <div class="level">
        <div class="level-left">
          <h2 class="level-item is-size-3">{{ title }}</h2>&nbsp;<span class="level-item"><small>({{ total }})</small>&nbsp;<slot name="aftertitle" v-bind:data="data" /></span>
          <h3 class="is-size-4">{{ subtitle }}</h3>
        </div>
        <div class="level-right">
          <div class="level-item">
            <b-field grouped group-multiline>
              <div class="control" v-for="tag in tags" v-if="tag.selected" v-bind:key="tag.key">
                  <b-tag 
                    v-bind:class="['furet-ui-page-multi-entries-header-tag', tag.key]" 
                    type="is-primary" closable 
                    v-on:close="removeTag(tag)">{{ tag.label }} </b-tag>
              </div>
              <div class="control" v-for="filter in filters" v-if="filter.values.length" v-bind:key="filter.key + '-' + filter.mode + '-' + filter.opt">
                <b-taglist attached>
                  <b-tag type="is-danger" v-if="filter.mode == 'exclude'"> ~ </b-tag>
                  <b-tag type="is-dark">{{ filter.label }}</b-tag>
                  <b-tag 
                    type="is-primary" 
                    closable 
                    v-for="value in filter.values" 
                    v-bind:class="['furet-ui-page-multi-entries-header-filter', filter.key, value]" 
                    v-on:close="removeFilter(filter.key, filter.mode, filter.opt, value)" 
                    v-bind:key="value">{{ value }} </b-tag>
                </b-taglist>
              </div>
            </b-field>
          </div>
          <div class="level-item">
            <b-autocomplete
              v-model="filterSearch"
              v-bind:data="filteredDataArray"
              v-bind:placeholder="this.$i18n.t('components.page.list.search')"
              icon="search"
              v-on:select="updateFilters"
              clear-on-select
            >
              <template slot="empty">{{ $t('components.page.list.notFound') }}</template>
              <template slot-scope="props">
                {{ props.option.mode == 'exclude' ? ' ~ ' : '' }} <small>{{ props.option.label }} </small> : <strong>{{ props.option.value }}</strong>
              </template>
            </b-autocomplete>
          </div>
          <div class="level-item buttons">
            <a id="furet-ui-page-multi-entries-header-refresh" class="button" v-on:click="refresh"><font-awesome-icon icon="sync" /></a>
            <a id="furet-ui-page-multi-entries-header-tags" v-if="tags.length" class="button" v-on:click.stop="tag_list_open = ! tag_list_open">
              <font-awesome-icon :icon="tag_list_open ? 'caret-square-up' : 'caret-square-down'" />
            </a>
          </div>
        </div>
      </div>
      <b-collapse class="panel is-pulled-right" v-bind:open.sync="tag_list_open">
        <b-taglist>
          <b-tag v-for="tag in tags" v-bind:key="tag.key" v-bind:class="['is-small', tag.selected ? '': 'has-text-weight-bold']" >
            <a 
              v-bind:class="['furet-ui-page-multi-entries-header-toggle-tag', tag.key]" 
              v-on:click.stop="toggleTag(tag)">{{ tag.label }}</a>
          </b-tag>
        </b-taglist>
      </b-collapse>
      <div class="buttons is-grouped is-centered">
        <a id="furet-ui-page-multi-entries-header-new" v-if="can_go_to_new" class="button is-primary is-outlined" v-on:click="goToNew">
          <span class="icon"><font-awesome-icon icon="plus-square" /></span>
          <span>{{ $t('components.page.list.new') }}</span>
        </a>
        <slot name="actions" v-bind:data="data" />
      </div>
    </header>
  `,
  prototype: {
    props: ['title', 'subtitle', 'filters', 'tags', 'total', 'data', 'can_go_to_new'],
    data() {
      return {
        filterSearch: '',
        tag_list_open: false,
      };
    },
    computed: {
      filteredDataArray() {
        // eslint-disable-next-line
        return _.map(this.filters, (f) => {
          return {
            key: f.key,
            mode: f.mode,
            label: f.label,
            value: this.filterSearch,
            opt: f.opt,
          };
        });
      },
    },
    methods: {
      goToNew() {
        this.$emit('goToNew');
      },
      updateFilters(option) {
        this.$emit('updateFilters', option);
      },
      refresh() {
        this.$emit('refresh');
      },
      removeFilter(key, mode, opt, value) {
        this.$emit('removeFilter', key, mode, opt, value);
      },
      toggleTag(tag) {
        this.$emit('toggleTag', tag);
      },
      removeTag(tag) {
        this.$emit('removeTag', tag);
      },
    },
  },
});

defineComponent('mixin-page-multi-entries', {
  prototype: {
    props: [
      'title', 'subtitle', 'default_filters', 'default_tags', 'defaultSortField', 'defaultSortOrder',
      'rest_api_url', 'perpage', 'many2one_select', 'can_go_to_new', 'browseFields'],
    data() {
      return {
        data: [],
        errors: [],
        total: 0,
        loading: false,
        page: 1,
        perPage: this.perpage || 25,
        filters: _.map((this.default_filters || []), f => f),
        tags: _.map((this.default_tags || []), t => t),
        sortField: this.defaultSortField,
        sortOrder: this.defaultSortOrder,
      };
    },
    computed: {
      selectedEntries() {
        return this.data;
      },
    },
    methods: {
      goToNew() {
        this.$emit('goToNew');
      },
      browsing() {
        if (this.selectedEntries.length === 0) return [];
        if ((this.browseFields || []).length === 0) return [];
        const list = [];
        this.selectedEntries.forEach((row) => {
          const entry = {};
          this.browseFields.forEach((field) => {
            entry[field] = row[field];
          });
          list.push(entry);
        });
        return list;
      },
      goToPage(row) {
        if (this.many2one_select) this.many2one_select(row);
        else if ((this.browseFields || []).length !== 0) {
          const list = this.browsing();
          const entry = {};
          this.browseFields.forEach((field) => {
            entry[field] = row[field];
          });
          const offset = list.indexOf(entry);
          this.$store.commit('UPDATE_BROWSER_LIST', { list, offset });
          this.$emit('goToPage', row);
        } else this.$emit('goToPage', row);
      },
      startBrowsing() {
        const list = this.browsing();
        if (list.length === 0) return;
        this.$store.commit('UPDATE_BROWSER_LIST', { list });
        this.$emit('goToPage', list[0]);
      },
      updateData() {
        if (!this.many2one_select) {
          const query = { page: this.page };
          const filters = {};
          const tags = [];
          if (this.sortOrder !== undefined && this.sortField !== undefined) {
            query.order = `${this.sortField},${this.sortOrder}`;
          }
          _.each(this.filters, (f) => {
            if (f.values.length) {
              const mode = f.mode === 'exclude' ? '~' : '';
              const opt = f.opt ? `[${f.opt}]` : '';
              filters[`${mode}filter[${f.key}]${opt}`] = f.values.join();
            }
          });
          if (_.keys(filters).length) query.filters = JSON.stringify(filters);
          _.each(this.tags, (t) => {
            if (t.selected) tags.push(t.key);
          });
          if (tags.length) query.tags = tags.join();
          this.$router.push({ query });
        }
        this.loadAsyncData();
      },
      updateFilters(option) {
        if (option) {
          const filter = _.find(
            this.filters,
            f => f.key === option.key && f.mode === option.mode && f.opt === option.opt);
          if (filter.op.startsWith('or-') || filter.op === 'in') {
            filter.values.push(option.value);
          } else {
            filter.values = [option.value];
          }
          this.page = 1;
          this.updateData();
        }
      },
      removeFilter(key, mode, opt, value) {
        const filter = _.find(this.filters, f => f.key === key && f.mode === mode && f.opt === opt);
        filter.values = _.filter(filter.values, v => v !== value);
        this.page = 1;
        this.updateData();
      },
      toggleTag(tag) {
        // eslint-disable-next-line
        tag.selected = !tag.selected;
        this.updateData();
      },
      removeTag(tag) {
        // eslint-disable-next-line
        tag.selected = false;
        this.updateData();
      },
      loadAsyncData() {
        this.loading = true;
        const params = {
          offset: (this.page - 1) * this.perPage,
          limit: this.perPage,
        };
        params[`order_by[${this.sortOrder}]`] = this.sortField;
        _.each(this.filters, (filter) => {
          if (filter.values.length) {
            const value = (filter.op.startsWith('or-') || filter.op === 'in') ? filter.values.toString() : filter.values[0];
            const preop = filter.mode === 'exclude' ? '~' : '';
            params[`${preop}filter[${filter.key}][${filter.op}]`] = value;
          }
        });
        const tags = [];
        _.each(this.tags, (tag) => {
          if (tag.selected) tags.push(tag.key);
        });
        if (tags.length) params.tags = tags.toString();

        axios.get(this.rest_api_url, { params })
          .then((response) => {
            this.data = response.data || [];
            this.total = response.headers['x-total-records'] || response.data.length;
            this.loading = false;
          })
          .catch((error) => {
            this.errors = error.response.data.errors;
            this.loading = false;
          });
      },
      refresh() {
        this.page = 1;
        this.updateData();
      },
      onPageChange(page) {
        this.page = page;
        this.updateData();
      },
      onSort(field, order) {
        this.sortField = field;
        this.sortOrder = order;
        this.updateData();
      },
    },
    mounted() {
      this.$store.commit('CLEAR_BROWSER_LIST');
      const regexWithOption = new RegExp('.*\\[(.+)\\]\\[(.+)\\]');
      const regexWithoutOption = new RegExp('.*\\[(.+)\\]');
      const query = this.$route.query;
      if (query.page) this.page = parseInt(query.page, 10);
      if (query.order) {
        const order = query.order.split(',');
        this.sortField = order[0].trim();
        this.sortOrder = order[1].trim();
      }
      if (query.filters) {
        _.each(JSON.parse(query.filters), (queryStringValue, queryStringName) => {
          if (queryStringName.startsWith('filter')) {
            const resWithOption = queryStringName.match(regexWithOption);
            const resWithoutOption = queryStringName.match(regexWithoutOption);
            let key = '';
            let opt;
            if (resWithOption) {
              key = resWithOption[1];
              opt = resWithOption[2];
            } else key = resWithoutOption[1];
            const filter = _.find(this.filters, f => f.key === key && f.opt === opt && f.mode !== 'exclude');
            filter.values = queryStringValue.split(',');
          } else if (queryStringName.startsWith('~filter')) {
            const resWithOption = queryStringName.match(regexWithOption);
            const resWithoutOption = queryStringName.match(regexWithoutOption);
            let key = '';
            let opt;
            if (resWithOption) {
              key = resWithOption[1];
              opt = resWithOption[2];
            } else key = resWithoutOption[1];
            const filter = _.find(this.filters, f => f.key === key && f.opt === opt && f.mode === 'exclude');
            filter.values = queryStringValue.split(',');
          }
        });
      }
      if (query.tags) {
        _.each(query.tags.split(','), (tag) => {
          _.find(this.tags, t => t.key === tag.trim()).selected = true;
        });
      }
      this.loadAsyncData();
    },
  },
});
