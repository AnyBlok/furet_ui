import { defineComponent } from '../factory';

defineComponent('furet-ui-list', {
  template: `
    <section id="furet-ui-list" class="section">
      <furet-ui-page-errors v-bind:errors="errors"/>
      <furet-ui-page-multi-entries-header 
        v-bind:title="title"
        v-bind:subtitle="subtitle"
        v-bind:total="total"
        v-bind:data="data"
        v-bind:filters="filters"
        v-bind:tags="tags"
        v-on:updateFilters="updateFilters"
        v-on:removeFilter="removeFilter"
        v-on:refresh="refresh"
        v-on:toggleTag="toggleTag"
        v-on:removeTag="removeTag"
      >
      </furet-ui-page-multi-entries-header>
        <template slot="actions" slot-scope="props">
          <a v-if="can_browse && checkedRows.length > 0" class="button is-primary is-outlined" v-on:click="startBrowsing">
            <span class="icon"><font-awesome-icon icon="compass" /></span>
            <span>{{ $t('components.page.list.browse') }}</span>
          </a>
          <slot name="actions" v-bind:data="props.data" />
        </template>
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
              <p>{{ $t('components.page.list.notFound') }}</p>
            </div>
          </section>
        </template>
      </b-table>
    </section>
  `,
  extend: ['mixin-page-multi-entries'],
  prototype: {
    props: [
      'is_checkable', 'checkedElements', 'can_browse', 'detailed', 'detail_key'],
    data() {
      return {
        isCheckable: this.is_checkable || false,
        checkedRows: this.checkedElements || [],
      };
    },
    methods: {
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
    },
  },
});
