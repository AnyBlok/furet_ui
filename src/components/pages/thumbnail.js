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
        readonly
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

      <furet-ui-list-pagination
        v-bind:loading="loading"
        v-bind:total="total"
        v-bind:perPage="perPage"
        v-bind:page="page"
        v-bind:number_created="number_created"
        v-bind:number_updated="number_updated"
        v-bind:number_deleted="number_deleted"
        v-bind:number_linked="number_linked"
        v-bind:number_unlinked="number_unlinked"
        v-bind:pagination_size="pagination_size"
        v-on:change="onPageChange"
      >
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
      </furet-ui-list-pagination>

    </section>
  `,
  extend: ['mixin-page-multi-entries'],
});
