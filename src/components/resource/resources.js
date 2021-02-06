import { defineComponent } from '../factory';
export const resources = {};
export default {
    resources,
}


defineComponent('furet-ui-resource-with-search', {
  extend: ['furet-ui-resource', 'i18n-translate'],
  prototype: {
    props: ['id', 'manager'],
    data () {
      return {
        received_pks: [],
      };
    },
    computed: {
      rest_api_url () {
        return `/furet-ui/resource/${this.id}/crud`;
      },
      api_params () {
        return {
          'context[model]': this.resource.model,
          'context[fields]': this.resource.fields.toString(),
        }
      }
    },
    methods: {
      revert_modification(row){
        this.$emit("revert-data", row)
      },
      api_formater (obj, data) {
        this.$dispatchAll(data.data);
        let res = [];
        if(data.pks === undefined) data.pks = [];
        if(data.total === undefined) data.total = 0;

        data.pks.forEach(pk => {
          res.push(this.getEntry(this.resource.model, pk))
        });
        this.received_pks = data.pks;
        const news = this.getNewEntries(this.resource.model);
        const total = data.total + news.length;
        if (res.length < obj.perPage){
          const modulus = data.total % obj.perPage;
          const page_count = Math.floor(data.total / obj.perPage) + 1;
          let start = ((obj.page - page_count) * obj.perPage);
          if(start > 0 ){
            start -= modulus;
          }
          const end = start + obj.perPage - res.length;
          obj.data = res.concat(news.slice(start, end));
        } else {
          obj.data = res;
        }
        data.total = total;
        obj.total = total;

        let created = 0;
        let updated = 0;
        let deleted = 0;
        let linked = 0;
        let unlinked = 0;

        (this.manager.changed_rows || []).forEach(change => {
          switch (change.__x2m_state) {
            case 'ADDED':
              created++;
              break;
            case 'UPDATED':
              updated++;
              break;
            case 'DELETED':
              deleted++;
              break;
            case 'LINKED':
              linked++;
              break;
            case 'UNLINKED':
              unlinked++;
              break;
          }
        })
        obj.number_created = created;
        obj.number_updated = updated;
        obj.number_deleted = deleted;
        obj.number_linked = linked;
        obj.number_unlinked = unlinked;
      },
      goToNew(choice) {
        this.$emit('go-to-new', choice);
      },
      goToPage(row, options) {
        if(row.__change_state !== "delete") this.$emit('go-to-page', row, options);
      },
    },
  },
});


defineComponent('furet-ui-resource-with-ssr', {
  extend: ['furet-ui-resource', 'i18n-translate'],
  prototype: {
    props: ['id', 'manager'],
    data () {
      return {
        templates: {},
      };
    },
    computed: {
      form_card_header_template () {
        return this.form_card('header_template');
      },
      form_card_body_template () {
        return this.form_card('body_template');
      },
      form_card_footer_template () {
        return this.form_card('footer_template');
      },
    },
    methods: {
      form_card (part) {
        if (this.templates[part] !== undefined) return this.templates[part];
        const template = {
          template: '<div></div>',
          name: `${part}_${this.resource.id}`,
          props: ['data', 'resource'],
        }
        if (this.resource[part]) {
            template.template = this.resource[part];
            this.templates[part] = template;
        }
        return template;
      },
    },
  },
});
