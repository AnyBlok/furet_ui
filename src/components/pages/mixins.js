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

defineComponent('furet-ui-page-header-date', {
  template: `
    <span>{{ formatDate(value) }}</span>
  `,
  extend: ['date-display'],
  prototype: {
    props: ['value'],
  },
});

defineComponent('furet-ui-list-total', {
  template: `
    <b-field grouped group-multiline v-bind:class="pagination_size">
      <div class="control">
        <strong>{{ $t('components.header.total') }} :</strong>
        {{ total }}
      </div>
      <div v-if="number_created" class="control has-text-x2m-created">
        <strong>{{ $t('components.header.created') }} :</strong>
        +{{ number_created }}
      </div>
      <div v-if="number_updated" class="control has-text-x2m-updated">
        <strong>{{ $t('components.header.updated') }} :</strong>
        {{ number_updated }}
      </div>
      <div v-if="number_deleted" class="control has-text-x2m-deleted">
        <strong>{{ $t('components.header.deleted') }} :</strong>
        -{{ number_deleted }}
      </div>
      <div v-if="number_linked" class="control has-text-x2m-linked">
        <strong>{{ $t('components.header.linked') }} :</strong>
        +{{ number_linked }}
      </div>
      <div v-if="number_unlinked" class="control has-text-x2m-unlinked">
        <strong>{{ $t('components.header.unlinked') }} :</strong>
        -{{ number_unlinked }}
      </div>
    </b-field>
  `,
  prototype: {
    props: [
      'total', 'number_created', 'number_updated', 'number_deleted',
      'number_linked', 'number_unlinked', 'pagination_size', 
    ],
  },
});

defineComponent('furet-ui-page-multi-entries-header', {
  template: `
    <header id="furet-ui-page-multi-entries-header">
      <div class="level">
        <div class="level-left">
          <h2 class="level-item is-size-3">{{ title }}</h2>&nbsp;<span class="level-item">&nbsp;<slot name="aftertitle" v-bind:data="data" /></span>
        </div>
        <div class="level-right">
          <div class="level-item">
            <b-field grouped group-multiline>
              <div class="control" v-for="tag in tags" v-if="tag.selected" v-bind:key="tag.key">
                  <b-tag 
                    v-bind:class="['furet-ui-page-multi-entries-header-tag', tag.key]" 
                    type="is-primary" closable 
                    v-on:close="removeTag(tag)">{{ $t(tag.label) }} </b-tag>
              </div>
              <div class="control" v-for="filter in filters" v-if="filter.values.length" v-bind:key="filter.key + '-' + filter.mode + '-' + filter.opt">
                <b-taglist attached>
                  <b-tag type="is-danger" v-if="filter.mode == 'exclude'"> ~ </b-tag>
                  <b-tag type="is-dark">{{ $t(filter.label) }}</b-tag>
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
          <div class="level-item" v-if="filters.length" >
            <b-autocomplete
              v-model="filterSearch"
              v-bind:data="filteredDataArray"
              v-bind:placeholder="this.$i18n.t('components.header.search')"
              icon="search"
              v-on:select="updateFilters"
              clear-on-select
            >
              <template slot="empty">{{ $t('components.header.notFound') }}</template>
              <template slot-scope="props">
                {{ props.option.mode == 'exclude' ? ' ~ ' : '' }} <small>{{ $t(props.option.label) }} </small> : <strong>{{ props.option.value }}</strong>
              </template>
            </b-autocomplete>
          </div>
          <div class="level-item buttons">
            <a id="furet-ui-page-multi-entries-header-refresh" class="button" v-on:click="refresh"><b-icon icon="redo" /></a>
            <a id="furet-ui-page-multi-entries-header-tags" v-if="tags.length" class="button" v-on:click.stop="tag_list_open = ! tag_list_open">
              <b-icon :icon="tag_list_open ? 'arrow-circle-up' : 'arrow-circle-down'" />
            </a>
          </div>
        </div>
      </div>
      <b-collapse class="panel is-pulled-right" v-bind:open.sync="tag_list_open">
        <b-taglist>
          <b-tag v-for="tag in tags" v-bind:key="tag.key" v-bind:class="['is-small', tag.selected ? '': 'has-text-weight-bold']" >
            <a 
              v-bind:class="['furet-ui-page-multi-entries-header-toggle-tag', tag.key]" 
              v-on:click.stop="toggleTag(tag)">{{ $t(tag.label) }}</a>
          </b-tag>
        </b-taglist>
      </b-collapse>
      <div class="buttons is-grouped is-centered">
        <div v-if="can_go_to_new">
          <b-dropdown 
            :triggers="['hover']" 
            v-if="go_to_new_choices.length"
            v-bind:disabled="readonly"
          >
            <button 
              class="button is-primary is-outlined" 
              slot-scope="{ active }"
              slot="trigger">
              <span class="icon"><b-icon icon="plus" /></span>
              <span>{{ $t('components.header.new') }}</span>
              <span class="icon"><b-icon :icon="active ? 'caret-up' : 'caret-down'" /></span>
            </button>
            <b-dropdown-item 
              v-for="choice in go_to_new_choices"
              aria-role="listitem"
              v-on:click="goToNewPolymorphic(choice)"
            >
              {{ choice.label }}
            </b-dropdown-item>
          </b-dropdown>
          <button 
            id="furet-ui-page-multi-entries-header-new" 
            v-else
            v-bind:disabled="readonly"
            class="button is-primary is-outlined" 
            v-on:click="goToNew"
          >
            <span class="icon"><b-icon icon="plus" /></span>
            <span>{{ $t('components.header.new') }}</span>
          </button>
        </div>
        <slot name="actions" v-bind:data="data" />
      </div>
    </header>
  `,
  prototype: {
    props: ['title', 'filters', 'tags', 'data', 'can_go_to_new', 'go_to_new_choices', 'readonly'],
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
        this.$emit('go-to-new');
      },
      goToNewPolymorphic(choice) {
        this.$emit('go-to-new', choice);
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
      'title', 'default_filters', 'default_tags', 'defaultSortField', 'defaultSortOrder',
      'perpage', 'can_go_to_new', 'go_to_new_choices', 'rest_api_url', 'rest_api_params',
      'rest_api_formater', 'query', 'default_header_component_name'],
    data() {
      const sortingPriority = [];
      if (this.defaultSortField) {
        sortingPriority.push({field: this.defaultSortField, order: this.defaultSortOrder || 'asc'})
      }
      return {
        data: [],
        errors: [],
        total: 0,
        number_created: 0,
        number_updated: 0,
        number_deleted: 0,
        number_linked: 0,
        number_unlinked: 0,
        loading: false,
        page: 1,
        perPage: this.perpage || 25,
        filters: _.map((this.default_filters || []), f => Object.assign({}, f, {values: Object.assign([], f.values || [])})),
        additional_filter: {},
        tags: _.map((this.default_tags || []), t => Object.assign({}, t)),
        sortingPriority,
        headerComponentName: this.default_header_component_name || 'furet-ui-page-multi-entries-header',
      };
    },
    computed: {
      selectedEntries() {
        return this.data;
      },
    },
    methods: {
      goToNew(choice) {
        this.$emit('go-to-new', choice);
      },
      goToPage(row) {
        this.$emit('go-to-page', row);
      },
      updateData() {
        const query = { page: this.page };
        const filters = {};
        const tags = [];
        const orders = [];
        this.sortingPriority.forEach(sort => {
          orders.push(`${sort.field}:${sort.order}`)
        });
        if (orders.length) query.orders = orders.toString()

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
        this.$emit('update-query-string', query);
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
      from_x2m_with_a_newest_parent() {
        if (this.additional_filter === null) return false;
        let res = false;
        _.each(_.keys(this.additional_filter), filter => {
          if (this.additional_filter[filter] === undefined) {
            res = true;
          }
        });
        return res;
      },
      loadAsyncData() {
        if (this.from_x2m_with_a_newest_parent()) {
          if (this.rest_api_formater) {
            this.rest_api_formater(this, {});
          }
          return
        }
        const params = Object.assign({}, this.rest_api_params || {});
        params.offset = (this.page - 1) * this.perPage;
        params.limit = this.perPage;
        this.sortingPriority.forEach(({field, order}) => {
          params[`order_by[${field}]`] = order;
        })
        _.each(this.filters, (filter) => {
          if (filter.values.length) {
            const value = (filter.op.startsWith('or-') || filter.op === 'in') ? filter.values.toString() : filter.values[0];
            const preop = filter.mode === 'exclude' ? '~' : '';
            params[`${preop}filter[${filter.key}][${filter.op}]`] = value;
          }
        });
        if (this.additional_filter !== null) {
          _.each(_.keys(this.additional_filter), filter => {
            if (this.additional_filter[filter] !== undefined) {
              params[`filter[${filter}][in]`] = this.additional_filter[filter].toString()
            }
          });
        }
        const tags = [];
        _.each(this.tags, (tag) => {
          if (tag.selected) tags.push(tag.key);
        });
        if (tags.length) params.tags = tags.toString();

        this.loading = true;
        axios.get(this.rest_api_url, { params })
          .then((response) => {
            if (this.rest_api_formater) {
              this.rest_api_formater(this, response.data || {});
            } else {
              this.data = response.data || [];
              this.total = response.headers['x-total-records'] || response.data.length;
            }
            this.loading = false;
          })
          .catch((error) => {
            // console.error(error);
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
        let existingPriority = this.sortingPriority.find(i => i.field === field)
        if(existingPriority) {
          existingPriority.order = existingPriority.order === 'desc' ? 'asc' : 'desc'
        } else {
          // request sorted data from backend
          this.sortingPriority.push({field, order})
        }
        this.updateData();
      },
      onSortingPriorityRemoved (field){
        this.sortingPriority = this.sortingPriority.filter(
            (priority) => priority.field !== field)
        this.updateData();
      },
      parse_query() {
        const regexWithOption = new RegExp('.*\\[(.+)\\]\\[(.+)\\]');
        const regexWithoutOption = new RegExp('.*\\[(.+)\\]');
        const query = this.query;
        if (query === undefined) {
          this.loadAsyncData();
          return;
        }
        if (query.page) this.page = parseInt(query.page, 10);
        if (query.orders) {
          query.orders.split(',').forEach(sort => {
            let [field, order] = sort.split(':');
            this.sortingPriority.push({field, order});
          })
        }

        _.forEach(this.filters, f => {f.values = [];});
        _.forEach(this.tags, f => {f.selected = false;});
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
        if (query.additional_filter) this.additional_filter = query.additional_filter;
        else if (query.additional_filter === null) this.additional_filter = null;
        this.loadAsyncData();
      }
    },
    watch: {
      query () {
        this.parse_query();  // query is reactive
      },
    },
    mounted() {
      this.parse_query()
    },
  },
});

defineComponent('furet-ui-header-page', {
  template: `
    <header id="header_page">
      <slot name="header" v-bind:data="data">
        <div class="level">
          <div class="level-left">
            <h2 class="level-item is-size-3">{{ $t(title) }}</h2>&nbsp;<span class="level-item"><slot name="aftertitle" v-bind:data="data" /></span>
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
        <a v-else class="button is-primary is-outlined" v-on:click="goToList">
          <span class="icon">
            <b-icon icon="arrow-left" />
          </span>
          <span>{{ $t('components.header.return') }}</span>
        </a>
        <a v-if="prevous_target" class="button is-primary is-outlined" v-on:click="goToPreviousPage">
          <span class="icon">
            <b-icon icon="page-previous" />
          </span>
          <span>{{ $t('components.header.previous') }}</span>
        </a>
        <a v-if="next_target" class="button is-primary is-outlined" v-on:click="goToNextPage">
          <span class="icon">
            <b-icon icon="page-next" />
          </span>
          <span>{{ $t('components.header.next') }}</span>
        </a>
        <div v-if="can_go_to_new">
          <b-dropdown 
            :triggers="['hover']" 
            v-if="go_to_new_choices.length"
            v-bind:disabled="readonly"
          >
            <button 
              class="button is-primary is-outlined" 
              slot-scope="{ active }"
              slot="trigger">
              <span class="icon"><b-icon icon="plus" /></span>
              <span>{{ $t('components.header.new') }}</span>
              <span class="icon"><b-icon :icon="active ? 'caret-up' : 'caret-down'" /></span>
            </button>
            <b-dropdown-item 
              v-for="choice in go_to_new_choices"
              aria-role="listitem"
              v-on:click="goToNewPolymorphic(choice)"
            >
              {{ choice.label }}
            </b-dropdown-item>
          </b-dropdown>
          <button v-else v-bind:disabled="readonly" class="button is-primary is-outlined" v-on:click="goToNew">
            <span class="icon">
              <b-icon icon="plus" />
            </span>
            <span>{{ $t('components.header.new') }}</span>
          </button>
        </div>
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
        <button v-if="can_delete" v-bind:disabled="readonly" class="button is-danger is-outlined" v-on:click="deleteEntry">
          <span class="icon">
            <b-icon icon="trash" />
          </span>
          <span>{{ $t('components.header.delete') }}</span>
        </button>
        <slot name="head_actions" v-bind:data="data" />
      </div>
    </header>
  `,
  prototype: {
    props: ['title', 'can_go_to_new', 'go_to_new_choices', 'can_modify',
            'can_delete', 'show_save', 'can_save', 'data', 'readonly'],
    computed: {
      prevous_target() {
        return this.$store.getters.previousBrowserTarget;
      },
      next_target() {
        return this.$store.getters.nextBrowserTarget;
      },
    },
    methods: {
      goToList() {
        this.$emit('go-to-list');
      },
      goToPage(row) {
        this.$emit('go-to-page', row);
      },
      goToPreviousPage() {
        const target = this.prevous_target;
        if (target !== undefined) {
          this.$store.commit('DECREASE_BROWSER_OFFSET');
          this.$emit('go-to-page', target);
        }
      },
      goToNextPage() {
        const target = this.next_target;
        if (target !== undefined) {
          this.$store.commit('INCREASE_BROWSER_OFFSET');
          this.$emit('go-to-page', target);
        }
      },
      goToNew() {
        this.$emit('go-to-new');
      },
      goToNewPolymorphic(choice) {
        this.$emit('go-to-new', choice);
      },
      goToEdit() {
        this.$emit('go-to-edit');
      },
      save() {
        this.$emit('save');
      },
      deleteEntry() {
        this.$emit('delete-entry');
      },
    },
  },
});
