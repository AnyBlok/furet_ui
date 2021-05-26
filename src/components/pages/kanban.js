import { defineComponent } from '../factory';
import draggable from 'vuedraggable';

defineComponent('furet-ui-kanban', {
  template: `
    <section id="furet-ui-kanban">
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

      <div class="columns is-variable is-1">
        <div
            v-for="header in headers" 
            class="column is-primary"
            style="min-height: 100px"
        >
          <draggable 
            v-bind:list="splited_data[header.value]" 
            group="kanban"
            v-on:change="(e) => onChange(header, e)"
            draggable=".thumbnail"
          >
            <div 
              v-for="kanban in splited_data[header.value]" 
              v-on:dblclick="goToPage(kanban)"
              v-bind:class="['block', (draganddrop && !readonly) ? 'thumbnail': '']"
            >
              <slot v-bind:data="kanban.data" />
            </div>
            <div slot="header" class="tags has-addons are-large">
              <span class="tag">{{ header.label }}</span>
              <span class="tag is-dark">{{splited_data[header.value].length}}</span>
            </div>
          </draggable>
        </div>
      </div>

    </section>
  `,
  extend: ['mixin-page-multi-entries'],
  prototype: {
    props: ['headers', 'field_identity', 'field_order', 'pks', 'draganddrop'],
    components: {
      draggable,
    },
    data () {
      return {
        perPage: 0,
        sortingPriority: [{field: this.field_order, order: 'asc'}],
      }
    },
    computed: {
      splited_data () {
        const data = {};
        this.headers.forEach(header => {
          data[header.value] = [];
        });
        this.data.forEach(d => {
          const pks = {};
          this.pks.forEach(pk  => {
            pks[pk] = d[pk];
          });
          data[d[this.field_identity]].push({
            pks,
            order: d[this.field_order],
            data: d
          })
        });
        this.headers.forEach(header => {
          // reorder
          data[header.value].sort((a, b) => a.order - b.order)
        });
        return data
      },
    },
    methods: {
      onChange( header, e ) {
        this.$emit('update-thumbnail', header, e);
      }
    },
  }
});
