import { defineComponent } from '../factory';

defineComponent('furet-ui-list', {
  template: `
    <section id="furet-ui-list">
      <furet-ui-page-errors v-bind:errors="errors"/>
      <furet-ui-page-multi-entries-header 
        v-bind:title="title"
        v-bind:filters="filters"
        v-bind:tags="tags"
        v-bind:total="total"
        v-bind:data="data"
        v-bind:can_go_to_new="can_go_to_new"
        v-on:updateFilters="updateFilters"
        v-on:removeFilter="removeFilter"
        v-on:refresh="refresh"
        v-on:toggleTag="toggleTag"
        v-on:removeTag="removeTag"
        v-on:go-to-new="goToNew"
      >
        <template slot="actions" slot-scope="props">
          <a v-if="checkedRows.length > 0" class="button is-primary is-outlined" v-on:click="startBrowsing">
            <span class="icon"><b-icon icon="file-document-box-multiple" /></span>
            <span>{{ $t('components.page.list.browse') }}</span>
          </a>
          <slot name="actions" v-bind:data="props.data" />
        </template>
      </furet-ui-page-multi-entries-header>
      <slot name="hidden_columns" />
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
        sort-multiple
        :sort-multiple-data="sortingPrioirty"

        v-on:sort="onSort"
        @sorting-priority-removed="onSortingPriorityRemoved"

        striped
        hoverable
        v-bind:detailed="detailed"
        v-bind:detail-key="detail_key"
        v-bind:checkable="isCheckable"
        v-bind:checked-rows.sync="checkedRows"

        v-on:dblclick="goToPage"
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
              <p>{{ $t('components.page.header.notFound') }}</p>
            </div>
          </section>
        </template>
      </b-table>
    </section>
  `,
  extend: ['mixin-page-multi-entries'],
  prototype: {
    props: [
      'is_checkable', 'checkedElements', 'detailed', 'detail_key'],
    data() {
      return {
        isCheckable: this.is_checkable || false,
        checkedRows: this.checkedElements || [],
      };
    },
    computed: {
      selectedEntries() {
        if (this.checkedRows.length !== 0) return this.checkedRows;
        return this.data;
      },
    },
  },
});
