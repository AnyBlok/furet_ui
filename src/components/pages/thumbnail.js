import { defineComponent } from '../factory';

defineComponent('furet-ui-thumbnail', {
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
        v-bind:go_to_new_choices="go_to_new_choices"
        v-bind:readonly="readonly"
        v-on:updateFilters="updateFilters"
        v-on:removeFilter="removeFilter"
        v-on:refresh="refresh"
        v-on:toggleTag="toggleTag"
        v-on:removeTag="removeTag"
        v-on:go-to-new="goToNew"
      >
        <template slot="actions" slot-scope="props">
          <slot name="actions" v-bind:data="props.data" />
        </template>
      </component>
      <div class="top level">
        <div class="level-left">
          <furet-ui-list-total
            v-bind:pagination_size="pagination_size"
            v-bind:total="total"
            v-bind:number_created="number_created"
            v-bind:number_updated="number_updated"
            v-bind:number_deleted="number_deleted"
            v-bind:number_linked="number_linked"
            v-bind:number_unlinked="number_unlinked"
          />
        </div>
        <div class="level-right">
          <div class="level-item">
            <b-pagination
              :total="total"
              :per-page="perPage"
              :size="pagination_size"
              :current="page"
              @change="onPageChange"
            />
          </div>
        </div>
      </div>

      <div v-if="data.length > 0" class="columns is-multiline">
        <div 
          v-for="thumbnail in data" 
          v-on:dblclick="goToPage(thumbnail)"
          class="column is-one-quarter-desktop is-half-tablet is-12-mobile"
        >
          <slot v-bind:data="thumbnail" />
        </div>
      </div>
      <section v-else class="section">
        <div class="content has-text-grey has-text-centered">
          <p>{{ $t('components.header.notFound') }}</p>
        </div>
      </section>

      <div class="top level">
        <div class="level-left">
          <furet-ui-list-total
            v-bind:pagination_size="pagination_size"
            v-bind:total="total"
            v-bind:number_created="number_created"
            v-bind:number_updated="number_updated"
            v-bind:number_deleted="number_deleted"
            v-bind:number_linked="number_linked"
            v-bind:number_unlinked="number_unlinked"
          />
        </div>
        <div class="level-right">
          <div class="level-item">
            <b-pagination
              :total="total"
              :per-page="perPage"
              :size="pagination_size"
              :current="page"
              @change="onPageChange"
            />
          </div>
        </div>
      </div>
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
