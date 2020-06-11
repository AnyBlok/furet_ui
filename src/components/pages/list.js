import { defineComponent } from '../factory';

defineComponent('furet-ui-list', {
  template: `
    <section id="furet-ui-list">
      <furet-ui-page-errors v-bind:errors="errors"/>
      <component
        v-bind:is="headerComponentName"
        v-bind:title="title"
        v-bind:filters="filters"
        v-bind:tags="tags"
        v-bind:data="data"
        v-bind:can_go_to_new="can_go_to_new"
        v-bind:readonly="readonly"
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
            <span>{{ $t('components.header.browse') }}</span>
          </a>
          <slot name="actions" v-bind:data="props.data" />
        </template>
      </component>
      <slot name="hidden_columns" />
      <b-table
        ref="list_table"
        v-bind:data="data"
        v-bind:loading="loading"

        paginated
        backend-pagination
        pagination-position="both"
        v-bind:pagination-size="pagination_size"

        v-bind:total="total"
        v-bind:current-page.sync="page"
        v-bind:per-page="perPage"
        v-on:page-change="onPageChange"

        backend-sorting
        sort-multiple
        :sort-multiple-data="sortingPriority"

        v-on:sort="onSort"
        @sorting-priority-removed="onSortingPriorityRemoved"

        striped
        hoverable
        v-bind:detailed="detailed"
        v-bind:detail-key="detail_key"
        v-bind:checkable="isCheckable"
        v-bind:checked-rows.sync="checkedRows"
        v-bind:row-class="row_state"

        v-on:dblclick="goToPage"
      >
        <template slot-scope="props">
          <slot v-bind:row="props.row" />
        </template>

        <template slot="top-left">
          <furet-ui-list-total
            v-bind:pagination_size="pagination_size"
            v-bind:total="total"
            v-bind:number_created="number_created"
            v-bind:number_updated="number_updated"
            v-bind:number_deleted="number_deleted"
            v-bind:number_linked="number_linked"
            v-bind:number_unlinked="number_unlinked"
          />
        </template>

        <template slot="bottom-left">
          <furet-ui-list-total
            v-bind:pagination_size="pagination_size"
            v-bind:total="total"
            v-bind:number_created="number_created"
            v-bind:number_updated="number_updated"
            v-bind:number_deleted="number_deleted"
            v-bind:number_linked="number_linked"
            v-bind:number_unlinked="number_unlinked"
          />
        </template>

        <template v-if="detailed" slot="detail" slot-scope="props">
          <slot name="detail" v-bind:row="props.row" />
        </template>

        <template slot="empty">
          <section class="section">
            <div class="content has-text-grey has-text-centered">
              <p>{{ $t('components.header.notFound') }}</p>
            </div>
          </section>
        </template>
      </b-table>
    </section>
  `,
  extend: ['mixin-page-multi-entries'],
  prototype: {
    props: [
      'is_checkable', 'checkedElements', 'detailed', 'detail_key', 'readonly', 'pagination_size'],
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
      row_state() {
        return (row, _index) => {
          let style_class = ""
          switch(row.__change_state) {
            case "create":
              style_class = "is-created";
              break;
            case "update":
              style_class = "is-updated";
              break;
            case "delete":
              style_class = "is-deleted";
              break;
            case "link":
              style_class = "is-linked";
              break;
            case "unlink":
              style_class = "is-unlinked";
              break;
            default:
              style_class = "is-unmodified";
            }
            return style_class
        };
      }
    },
  },
});
