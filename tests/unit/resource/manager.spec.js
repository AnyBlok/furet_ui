import { mount } from "@vue/test-utils";
import { getComponentPrototype } from '@/components/factory';
import { i18n } from "@/i18n";
import { eval_counter } from "@/components/resource/helper";
import axios from 'axios';

const localVue = global.localVue;
const router = global.router;

const mocki18n = jest.spyOn(i18n, "_t");
mocki18n.mockResolvedValue('');

const mock = jest.spyOn(axios, "get");
mock.mockResolvedValue({data: [], headers: {'x-total-records': 0}});

const store = global.store

const data = {
  'Model.1': {
    1: {title: 'Entry 1', color: 'red'},
    2: {title: 'Entry 2', color: 'blue'}
  },
}

const getEntry = (model, pk) => {
  return data[model][pk.id]
}
const getNewEntry = (model, uuid) => {
  uuid
  return data[model][1]
}

describe('furet-ui-waiting-resource component', () => {
  it('snapshot', () => {
    const wrapper = mount(getComponentPrototype('furet-ui-waiting-resource'), {
      localVue, 
      router,
      i18n,
    });
    expect(wrapper.element).toMatchSnapshot();
  });
});

describe('furet-ui-resource-not-found component', () => {
  it('snapshot', () => {
    const wrapper = mount(getComponentPrototype('furet-ui-resource-not-found'), {
      localVue, 
      router,
      i18n,
    });
    expect(wrapper.element).toMatchSnapshot();
  });
});

describe('furet-ui-space-resource-manager component', () => {
  store.commit('UPDATE_RESOURCES', {'definitions': [{
    'id': 1, 
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
  }]})
  it('snapshot', () => {
    const wrapper = mount(getComponentPrototype('furet-ui-space-resource-manager'), {
      localVue, 
      router,
      i18n,
      store,
      propsData: {
        id: 1,
      },
    });
    expect(wrapper.element).toMatchSnapshot();
  });
});

describe('furet-ui-form-field-resource-manager component', () => {
  store.commit('UPDATE_RESOURCES', {'definitions': [{
    'id': 1, 
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
  }]})
  it('snapshot', () => {
    const pushInBreadcrumb = jest.fn()
    const wrapper = mount(getComponentPrototype('furet-ui-form-field-resource-manager'), {
      localVue, 
      router,
      i18n,
      store,
      propsData: {
        id: 1,
        x2m_resource: {
          selectors: {},
          manager: {},
        },
        isReadonly: true,
        config: {},
      },
      provide: {
        getEntry,
        getNewEntry,
        pushInBreadcrumb,
      }
    });
    expect(wrapper.element).toMatchSnapshot();
  });
});
