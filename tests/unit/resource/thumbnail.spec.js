import { mount } from "@vue/test-utils";
import { getComponentPrototype } from '@/components/factory';
import { i18n } from "@/i18n";
// import { eval_counter } from "@/components/resource/helper";
import axios from 'axios';

const localVue = global.localVue;
const router = global.router;

const mocki18n = jest.spyOn(i18n, "_t");
mocki18n.mockResolvedValue('');

const mock = jest.spyOn(axios, "get");
mock.mockResolvedValue({
    data: [], 
    headers: {'x-total-records': 7}});

const store = global.store

const data = [
  {id: 1, title: 'Entry 1', color: 'red'},
  {id: 2, title: 'Entry 2', color: 'blue'},
  {id: 3, title: 'Entry 3', color: 'blue'},
  {id: 4, title: 'Entry 4', color: 'blue'},
  {id: 5, title: 'Entry 5', color: 'blue'},
  {id: 6, title: 'Entry 6', color: 'blue'},
  {id: 7, title: 'Entry 7', color: 'blue'},
]

const getEntry = (model, pk) => {
  return data[model][pk.id];
}

describe('furet-ui-resource-thumbnail component', () => {

  store.commit('UPDATE_RESOURCES', {'definitions': [{
    'id': 1, 
    'type': 'thumbnail', 
    'pks': ['id'],
    'title': 'Templates', 
    'model': 'Model.1', 
    'filters': [], 
    'tags': [], 
    'fields': ['id', 'title', 'color'],
    'header_template': `
      <header class="card-header">
        {{ data.title }}
      </header>
    `,
    'body_template': `
      <div class="columns">
        <div class="column">
          <furet-ui-field :resource="resource" :data="data" :config="{'type':'string', 'name': 'title'}"
        </div>
        <div class="column">
          <furet-ui-field :resource="resource" :data="data" :config="{'type':'string', 'name': 'color'}"
        </div>
      </div>
    `,
    'footer_template': `
      <footer class="card-footer">
        <div class="card-footer-item">
          Test 1
        </div>
        <div class="card-footer-item">
          Test 2
        </div>
      </footer>
    `,
  }]});

  const getWrapper = () => {
    return mount(getComponentPrototype("furet-ui-resource-thumbnail"), {
      store,
      localVue,
      router,
      i18n,
      propsData: {
        id: 1,
        manager: {},
      },
      provide: {
        getEntry,
        getNewEntries: () => {}
      },
    });
  }

  it('furet-ui-resource-thumbnail without data', () => {
      const wrapper = getWrapper();
      expect(wrapper.element).toMatchSnapshot();
  });
});
