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

const getNewEntries = () => {
  return [];
}

const updateChangeState = () => {}

describe('furet-ui-resource-form component', () => {

  store.commit('UPDATE_RESOURCES', {'definitions': [{
    'id': 1, 
    'type': 'set', 
    'pks': ['id'],
    'multi': 2,
    'form': 3,
    'can_read': true,
  }]});

  store.commit('UPDATE_RESOURCES', {'definitions': [{
    'id': 2, 
    'type': 'list', 
    'title': 'Templates', 
    'model': 'Model.1', 
    'filters': [], 
    'tags': [], 
    'headers': [
      {
        'hidden': false, 
        'name': 'title', 
        'label': 'Title', 
        'component': 'furet-ui-field', 
        'type': 'string', 
        'numeric': false, 
        'tooltip': null, 
        'sortable': true
      },
      {
        'hidden': false, 
        'name': 'color', 
        'label': 'Color', 
        'component': 'furet-ui-field', 
        'type': 'string', 
        'numeric': false, 
        'tooltip': null, 
        'sortable': true
      }
    ], 
    'fields': ['id', 'title', 'color']
  }]});
  store.commit('UPDATE_RESOURCES', {'definitions': [{
    'id': 3, 
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

  const getWrapper = () => {
    return mount(getComponentPrototype("furet-ui-resource-set"), {
      store,
      localVue,
      router,
      i18n,
      propsData: {
        id: 1,
        manager: {},
        config: {
          model: 'Model.1',
        }
      },
      provide: {
        getEntry,
        getNewEntry,
        getNewEntries,
        updateChangeState,
      }
    });
  }

  const getWrapperForm = () => {
    return mount(getComponentPrototype("furet-ui-resource-set"), {
      store,
      localVue,
      router,
      i18n,
      propsData: {
        id: 1,
        manager: {mode: 'form', pks: JSON.stringify({id: 1})},
        config: {
          model: 'Model.1',
        }
      },
      provide: {
        getEntry,
        getNewEntry,
        getNewEntries,
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
  it('snapshot 2', () => {
    const wrapper = getWrapperForm();
    expect(wrapper.element).toMatchSnapshot();
  });
  it('goToPage 1', () => {
    const wrapper = getWrapper();
    expect(wrapper.emitted()['push-in-breadcrumb']).toBe(undefined)
    expect(wrapper.emitted()['update-query-string']).toBe(undefined)
    wrapper.vm.goToPage({__uuid: 'test'})
    expect(wrapper.emitted()['push-in-breadcrumb']).toBe(undefined)
    expect(wrapper.emitted()['update-query-string']).toBeTruthy()
  });
  it('goToPage 2', () => {
    const wrapper = getWrapper();
    expect(wrapper.emitted()['push-in-breadcrumb']).toBe(undefined)
    expect(wrapper.emitted()['update-query-string']).toBe(undefined)
    wrapper.vm.goToPage({id: 1})
    expect(wrapper.emitted()['push-in-breadcrumb']).toBeTruthy()
    expect(wrapper.emitted()['update-query-string']).toBeTruthy()
  });
  it('goToNew 1', () => {
    const wrapper = getWrapper();
    expect(wrapper.emitted()['push-in-breadcrumb']).toBe(undefined)
    expect(wrapper.emitted()['update-query-string']).toBe(undefined)
    wrapper.vm.goToNew()
    expect(wrapper.emitted()['push-in-breadcrumb']).toBeTruthy()
    expect(wrapper.emitted()['update-query-string']).toBeTruthy()
  });
  it('goToNew 2', () => {
    const wrapper = getWrapper();
    expect(wrapper.emitted()['push-in-breadcrumb']).toBe(undefined)
    expect(wrapper.emitted()['update-query-string']).toBe(undefined)
    wrapper.vm.goToNew({waiting_value: 'test', resource_id: 4})
    expect(wrapper.emitted()['push-in-breadcrumb']).toBeTruthy()
    expect(wrapper.emitted()['update-query-string']).toBeTruthy()
  });
  it('goToList', () => {
    const wrapper = getWrapper();
    expect(wrapper.emitted()['go-to-list']).toBe(undefined)
    wrapper.vm.goToList()
    expect(wrapper.emitted()['go-to-list']).toBeTruthy()
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
    wrapper.vm.revertData({id: 1})
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
  it('getBreadcrumbInfo', () => {
    const wrapper = getWrapper();
    wrapper.vm.getBreadcrumbInfo()
  });
});
