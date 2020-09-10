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
mock.mockResolvedValue({data: [], headers: {'x-total-records': 0}});

const store = global.store

const getEntry = (model, pk) => {
  return {title: 'Entry 1', color: 'red'};
}

const getNewEntry = (model, uuid) => {
  return {title: 'New Entry 1', color: 'red'};
}

describe('furet-ui-resource-form component', () => {

  store.commit('UPDATE_RESOURCES', {'definitions': [{
    'id': 1, 
    'type': 'form', 
    'model': 'Model.1', 
    'header_template': `
      <nav class="level">
        <div class="level-left">
          <div class="level-item content">
            <h1 class="is-large">{{ data.title }}</h1>
          </div>
        </div>
      </nav>
    `,
    'body_template': `
      <div 
        id="id" 
        key="key"
      >
        <div class="columns">
          <div class="column">
            <furet-ui-field 
              name="title" 
              v-bind:config="{name: 'title', type: 'string', label: 'Title'}" 
              v-bind:resource="resource"
              v-bind:data="data"
            >
            </furet-ui-field>
          </div>
          <div class="column">
            <furet-ui-field 
              name="color" 
              v-bind:config="{name: 'color', type: 'string', label: 'Color'}" 
              v-bind:resource="resource"
              v-bind:data="data"
            >
            </furet-ui-field>
          </div>
        </div>
      </div>
    `,
    'footer_template': `
      <nav class="level">
        <div class="level-left">
          <div class="level-item content">
            <h1 class="is-large">{{ data.title }}</h1>
          </div>
        </div>
      </nav>
    `,
    'fields': ['id', 'title', 'color']
  }]});

  const wrapper = mount(getComponentPrototype("furet-ui-resource-form"), {
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
      getNewEntry,
    }
  });
  it('furet-ui-resource-form: snapshot', () => {
    expect(wrapper.element).toMatchSnapshot();
  });
  it('furet-ui-resource-form: getBreadcrumbInfo', () => {
    const info = wrapper.vm.getBreadcrumbInfo()
    expect(info).toStrictEqual({icon: "newspaper", label: ""})
  });
});
