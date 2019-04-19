defineComponent('teams', {
  template: `
    <div class="container">
      <furet-ui-list
        title="Teams"
        rest_api_url='/teams'
        :default_filters="filters"
        :default_tags="tags"
        defaultSortField="lastname"
        defaultSortOrder="desc"
      >
        <template slot-scope="props">
          <b-table-column field="firstname" label="First name">
            {{ props.row.firstname }}
          </b-table-column>
          <b-table-column field="lastname" label="Last name">
            {{ props.row.lastname }}
          </b-table-column>
          <b-table-column field="roles" label="Roles">
            <div class="tags are-medium">
              <span class="tag is-primary" v-for="role in props.row.roles" :key="role">
                {{ role }}
              </span>
            </div>
          </b-table-column>
        </template>
      </furet-ui-list>
    </div>
  `,
  prototype: {
    data () {
      return {
        filters: [{
          key: 'state',
          mode: 'include',
          label: 'State',
          op: 'or-ilike',
          values: [],
        }],
        tags: [{
          key: 'plop',
          label: 'plop'
        }],
      };
    },
  },
});
defineResource('teams', {mustBeAuthenticated: true});
