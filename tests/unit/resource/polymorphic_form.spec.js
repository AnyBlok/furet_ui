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

const mockAxios = jest.spyOn(axios, "post");
mockAxios.mockImplementationOnce(() =>
  Promise.resolve({ data: "redirect/uri" })
);

const store = global.store

const getEntry = (model, pk) => {
  model;
  pk;
  return {title: 'Entry 1', color: 'red'};
}

const getNewEntry = (model, uuid) => {
  model;
  uuid;
  return {title: 'New Entry 1', color: 'red'};
}

const updateChangeState = () => {}

describe('furet-ui-resource-form component', () => {

  store.commit('UPDATE_RESOURCES', {'definitions': [{
    'id': 1, 
    'type': 'polymorphicform', 
    'model': 'Model.1', 
    'fields': ['id', 'color'],
    'forms': [
        {
            waiting_value: {color: 'red'},
            resource_id: 2
        },
        {
            waiting_value: {color: 'green'},
            resource_id: 3
        },
    ]
  }]});
  store.commit('UPDATE_RESOURCES', {'definitions': [{
    'id': 2, 
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

  store.commit('UPDATE_RESOURCES', {'definitions': [{
    'id': 3, 
    'type': 'Unknown'
  }]});

  const getWrapper = () => {
    return mount(getComponentPrototype("furet-ui-resource-polymorphic-form"), {
      store,
      localVue,
      router,
      i18n,
      propsData: {
        id: 1,
        manager: {query: {pks: JSON.stringify({id: 1})}},
      },
      provide: {
        getEntry,
        getNewEntry,
        updateChangeState,
      }
    });
  }

  const getWrapperWithSpecificResource = (resource_id) => {
    return mount(getComponentPrototype("furet-ui-resource-polymorphic-form"), {
      store,
      localVue,
      router,
      i18n,
      propsData: {
        id: 1,
        manager: {query: {pks: JSON.stringify({id: 1}), resource_id}},
      },
      provide: {
        getEntry,
        getNewEntry,
        updateChangeState,
      }
    });
  }

  beforeEach(() => {
    mock.mockClear();
    mockAxios.mockClear();
  });

  it('snapshot', () => {
    const wrapper = getWrapper();
    expect(wrapper.element).toMatchSnapshot();
  });
  it('snapshot with specific resource', () => {
    const wrapper = getWrapperWithSpecificResource(2);
    expect(wrapper.element).toMatchSnapshot();
  });
  it('snapshot with specific resource not found', () => {
    const wrapper = getWrapperWithSpecificResource(3);
    expect(wrapper.element).toMatchSnapshot();
  });
  it('goToList', () => {
    const wrapper = getWrapper();
    expect(wrapper.emitted()['go-to-list']).toBe(undefined)
    wrapper.vm.goToList()
    expect(wrapper.emitted()['go-to-list']).toBeTruthy()
  });
  it('goToNew', () => {
    const wrapper = getWrapper();
    expect(wrapper.emitted()['go-to-new']).toBe(undefined)
    wrapper.vm.goToNew()
    expect(wrapper.emitted()['go-to-new']).toBeTruthy()
  });
  it('updateQueryString', () => {
    const wrapper = getWrapper();
    expect(wrapper.emitted()['update-query-string']).toBe(undefined)
    wrapper.vm.updateQueryString({})
    expect(wrapper.emitted()['update-query-string']).toBeTruthy()
  });
  it('createData', () => {
    const wrapper = getWrapper();
    expect(wrapper.emitted()['create-data']).toBe(undefined)
    wrapper.vm.createData({})
    expect(wrapper.emitted()['create-data']).toBeTruthy()
  });
  it('updateData', () => {
    const wrapper = getWrapper();
    expect(wrapper.emitted()['update-data']).toBe(undefined)
    wrapper.vm.updateData()
    expect(wrapper.emitted()['update-data']).toBeTruthy()
  });
  it('deleteData', () => {
    const wrapper = getWrapper();
    expect(wrapper.emitted()['delete-data']).toBe(undefined)
    wrapper.vm.deleteData()
    expect(wrapper.emitted()['delete-data']).toBeTruthy()
  });
  it('revertData', () => {
    const wrapper = getWrapper();
    expect(wrapper.emitted()['revert-data']).toBe(undefined)
    wrapper.vm.revertData()
    expect(wrapper.emitted()['revert-data']).toBeTruthy()
  });
  it('clearChange', () => {
    const wrapper = getWrapper();
    expect(wrapper.emitted()['clear-change']).toBe(undefined)
    wrapper.vm.clearChange()
    expect(wrapper.emitted()['clear-change']).toBeTruthy()
  });
  it('modifyState', () => {
    const wrapper = getWrapper();
    expect(wrapper.emitted()['modify-state']).toBe(undefined)
    wrapper.vm.modifyState()
    expect(wrapper.emitted()['modify-state']).toBeTruthy()
  });
});
