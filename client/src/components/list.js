import axios from 'axios';
import _ from 'underscore';
import { defineComponent } from './factory';

defineComponent('furet-ui-list', {
  template: `
    <section id="backend-list" class="section">
      <furet-ui-app-errors v-bind:errors="errors"/>
      <header id="header-list">
        <div class="level">
          <div class="level-left">
            <h2 class="level-item is-size-3">{{ title }}</h2>&nbsp;<span class="level-item"><small>({{ total }})</small>&nbsp;<slot name="aftertitle" v-bind:data="data" /></span>
            <h3 class="is-size-4">{{ subtitle }}</h3>
          </div>
          <div class="level-right">
            <div class="level-item">
              <b-field grouped group-multiline>
                <div class="control" v-for="tag in tags" v-if="tag.selected" v-bind:key="tag.key">
                    <b-tag type="is-primary" closable v-on:close="removeTag(tag)">{{ tag.label }} </b-tag>
                </div>
                <div class="control" v-for="filter in filters" v-if="filter.values.length" v-bind:key="filter.key + '-' + filter.mode + '-' + filter.opt">
                  <b-taglist attached>
                    <b-tag type="is-danger" v-if="filter.mode == 'exclude'"> ~ </b-tag>
                    <b-tag type="is-dark">{{ filter.label }}</b-tag>
                    <b-tag type="is-primary" closable v-for="value in filter.values" v-on:close="removeFilter(filter.key, filter.mode, filter.opt, value)" v-bind:key="value">{{ value }} </b-tag>
                  </b-taglist>
                </div>
              </b-field>
            </div>
            <div class="level-item">
              <b-autocomplete
                v-model="filterSearch"
                v-bind:data="filteredDataArray"
                v-bind:placeholder="this.$i18n.t('components.list.search')"
                icon="search"
                v-on:select="updateFilters"
                clear-on-select
              >
                <template slot="empty">{{ $t('components.list.notFound') }}</template>
                <template slot-scope="props">
                  {{ props.option.mode == 'exclude' ? ' ~ ' : '' }} <small>{{ props.option.label }} </small> : <strong>{{ props.option.value }}</strong>
                </template>
              </b-autocomplete>
            </div>
            <div class="level-item buttons" v-if="hasFilter || tags.length">
              <a v-if="hasFilter" class="button" v-on:click="refresh"><font-awesome-icon icon="sync" /></a>
              <a v-if="tags.length" class="button" v-on:click.stop="tag_list_open = ! tag_list_open">
                <font-awesome-icon :icon="tag_list_open ? 'caret-square-up' : 'caret-square-down'" />
              </a>
            </div>
          </div>
        </div>
        <b-collapse class="panel is-pulled-right" v-bind:open.sync="tag_list_open">
          <b-taglist>
            <b-tag v-for="tag in tags" v-bind:key="tag.key" v-bind:class="['is-small', tag.selected ? '': 'has-text-weight-bold']" >
              <a v-on:click.stop="toggleTag(tag)">{{ tag.label }}</a>
            </b-tag>
          </b-taglist>
        </b-collapse>
        <div class="buttons is-grouped is-centered">
          <a v-if="can_go_to_new" class="button is-primary is-outlined" v-on:click="goToNew">
            <span class="icon"><font-awesome-icon icon="plus-square" /></span>
            <span>{{ $t('list.new') }}</span>
          </a>
          <a v-if="can_browse && checkedRows.length > 0" class="button is-primary is-outlined" v-on:click="startBrowsing">
            <span class="icon"><font-awesome-icon icon="compass" /></span>
            <span>{{ $t('list.browse') }}</span>
          </a>
          <slot name="actions" v-bind:data="data" />
        </div>
      </header>
      <b-table
        ref="list_table"
        v-bind:data="data"
        v-bind:loading="loading"
        paginated
        backend-pagination
        v-bind:total="total"
        v-bind:current-page.sync="page"
        v-bind:per-page="perPage"
        v-on:page-change="onPageChange"

        backend-sorting
        v-bind:default-sort-direction="defaultSortOrder"
        v-bind:default-sort="[sortField, sortOrder]"
        v-on:sort="onSort"

        striped
        hoverable
        v-bind:detailed="detailed"
        v-bind:detail-key="detail_key"
        v-bind:checkable="isCheckable"
        v-bind:checked-rows.sync="checkedRows"

        v-on:dblclick="onClick"
      >
        <template slot-scope="props">
            <slot v-bind:row="props.row" />
        </template>

        <template v-if="detailed" slot="detail" slot-scope="props">
            <slot name="detail" v-bind:row="props.row" />
        </template>

        <template slot="empty">
          <section class="section">
            <div class="content has-text-grey has-text-centered">
              <p>{{ $t('components.list.notFound') }}</p>
            </div>
          </section>
        </template>
      </b-table>
    </section>
  `,
  prototype: {
    props: [
      'title', 'subtitle', 'default_filter', 'default_tags', 'defaultSortField', 'defaultSortOrder',
      'rest_api_url', 'perpage', 'many2one_select', 'can_go_to_new', 'is_checkable', 'checkedElements',
      'can_browse', 'detailed', 'detail_key'],
    data() {
      return {
        data: [],
        errors: [],
        total: 0,
        loading: false,
        tag_list_open: false,
        sortField: this.defaultSortField,
        sortOrder: this.defaultSortOrder,
        page: 1,
        perPage: this.perpage || 25,
        filters: _.map((this.default_filter || []), f => f),
        tags: _.map((this.default_tags || []), t => t),
        filterSearch: '',
        isCheckable: this.is_checkable || false,
        checkedRows: this.checkedElements || [],
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
      hasFilter() {
        let countfilter = 0;
        _.each(this.filters, (f) => {
          countfilter += (f.values || []).length;
        });
        if (countfilter > 0) return true;
        return false;
      },
    },
    methods: {
      goToNew() {
        this.$emit('goToNew');
      },
      onClick(row) {
        if (this.many2one_select) this.many2one_select(row);
        else this.$emit('click', row);
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
            this.errors = ['plop', 'titi', { foo: 'bar' }];
            this.loading = false;
          })
          .catch((error) => {
            this.errors = error.response.data.errors;
            this.loading = false;
          });
      },
      onPageChange(page) {
        this.page = page;
        this.updateData();
      },
      refresh() {
        this.page = 1;
        this.updateData();
      },
      onSort(field, order) {
        this.sortField = field;
        this.sortOrder = order;
        this.updateData();
      },
      startBrowsing() {
        const list = [];
        this.checkedRows.forEach((row) => {
          if (row.id !== undefined) {
            list.push({ id: row.id });
          }
          if (row.uuid !== undefined) {
            list.push({ uuid: row.uuid });
          }
        });
        this.$store.commit('UPDATE_BROWSER_LIST', { list });
        this.$emit('goToPage', list[0]);
      },
      browse() {
        this.startBrowsing();
      },
    },
    mounted() {
      // this.$store.commit('CLEAR_BROWSER_LIST');
      const regexWithOption = new RegExp('.*\\[(.+)\\]\\[(.+)\\]');
      const regexWithoutOption = new RegExp('.*\\[(.+)\\]');
      const query = this.$route.query;
      if (query.page) this.page = parseInt(query.page, 10);
      if (query.order) {
        const order = query.order.split();
        this.sortField = order[0];
        this.sortOrder = order[1];
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
        _.each(query.tags.split(), (tag) => {
          _.find(this.tags, t => t.key === tag).selected = true;
        });
      }
      this.loadAsyncData();
    },
  },
});
