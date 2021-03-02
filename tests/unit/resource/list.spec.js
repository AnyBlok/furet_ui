import { mount } from "@vue/test-utils";
import { getComponentPrototype } from '@/components/factory';
import { i18n } from "@/i18n";
// import { eval_counter } from "@/components/resource/helper";
import axios from 'axios';

const localVue = global.localVue;
const router = global.router;

const mocki18n = jest.spyOn(i18n, "_t");
mocki18n.mockResolvedValue('');

const mockAxios = jest.spyOn(axios, "post");
mockAxios.mockImplementationOnce(() =>
  Promise.resolve({ data: "redirect/uri" })
);
const mockAxios2 = jest.spyOn(axios, "get");
mockAxios2.mockImplementationOnce(() =>
  Promise.resolve({})
);

const store = global.store

const data = {
  'Model.1': {
    1: {title: 'Entry 1', color: 'red'},
    2: {title: 'Entry 2', color: 'blue'},
    3: {title: 'Entry 3', color: 'blue'},
    4: {title: 'Entry 4', color: 'blue'},
    5: {title: 'Entry 5', color: 'blue'},
    6: {title: 'Entry 6', color: 'blue'},
    7: {title: 'Entry 7', color: 'blue'},
  }
}

const getEntry = (model, pk) => {
  return data[model][pk.id];
}

const new_entries = {}
const NEW_DATA = [
  {title: 'Entry 8', color: 'red'},
  {title: 'Entry 9', color: 'red'},
  {title: 'Entry 10', color: 'red'},
  {title: 'Entry 11', color: 'red'},
  {title: 'Entry 12', color: 'red'},
  {title: 'Entry 13', color: 'red'},
  {title: 'Entry 14', color: 'red'},
  {title: 'Entry 15', color: 'red'},
  {title: 'Entry 16', color: 'red'},
];
const getNewEntries = (model) => {
  return new_entries[model];
}

describe('furet-ui-resource-list component', () => {

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
  }]});

  store.commit('UPDATE_RESOURCES', {'definitions': [{
    'id': 2, 
    'type': 'list', 
    'title': 'Templates', 
    'model': 'Model.1', 
    'filters': [], 
    'tags': [], 
    'buttons': [
      {
        icon: 'th',
        label: 'Test',
        call: 'test',
      },
    ],
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
    ], 
    'fields': ['id', 'title', 'color']
  }]});

  store.commit('UPDATE_RESOURCES', {'definitions': [{
    'id': 3, 
    'type': 'list', 
    'title': 'Templates', 
    'model': 'Model.1', 
    'filters': [], 
    'tags': [], 
    'buttons': [
      {
        icon: 'th',
        label: 'Test',
        'open-resource': 'test',
      },
    ],
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
    ], 
    'fields': ['id', 'title', 'color']
  }]});

  const getWrapper = (resourceId) => {
    const id = resourceId || 1;
    return mount(getComponentPrototype("furet-ui-resource-list"), {
      store,
      localVue,
      router,
      i18n,
      propsData: {
        id,
        manager: {},
      },
      provide: {
        getEntry,
        getNewEntries
      }
    });
  }


  beforeEach(() => {
    mockAxios.mockClear();
    mockAxios2.mockClear();
    new_entries["Model.1"] = [];
  });

  it('furet-ui-resource-list snapshot without data', () => {
      const wrapper = getWrapper();
      expect(wrapper.element).toMatchSnapshot();
  });
  it('furet-ui-resource-list snapshot without data with button', () => {
      const wrapper = getWrapper(2);
      expect(wrapper.element).toMatchSnapshot();
  });
  it('furet-ui-resource-list snapshot with data', () => {
    const response = {
      pks: [{id: 1}, {id: 2}],
      total: 2,
      data: [] // useless for test because getEntry is mocked
    };

    const wrapper = getWrapper();
    const list = wrapper.vm.$refs.list;
    wrapper.vm.api_formater(list, response)
    wrapper.vm.$nextTick(() => {
      expect(wrapper.element).toMatchSnapshot();
    })
  });
  it('furet-ui-resource-list.api_formater without data', () => {
      const wrapper = getWrapper();
      const obj = {
      };
      wrapper.vm.api_formater(obj, {});
      expect(obj.total).toBe(0);
      expect(obj.data.length).toBe(0);
      expect(obj.number_created).toBe(0);
      expect(obj.number_updated).toBe(0);
      expect(obj.number_deleted).toBe(0);
      expect(obj.number_linked).toBe(0);
      expect(obj.number_unlinked).toBe(0);
  });
  it('furet-ui-resource-list.api_formater exist object', () => {
      const wrapper = getWrapper();
      const obj = {
        data : 1,
        number_created : 1,
        number_updated : 1,
        number_deleted : 1,
        number_linked : 1,
        number_unlinked : 1,
      };
      wrapper.vm.api_formater(obj, {});
      expect(obj.total).toBe(0);
      expect(obj.data.length).toBe(0);
      expect(obj.number_created).toBe(0);
      expect(obj.number_updated).toBe(0);
      expect(obj.number_deleted).toBe(0);
      expect(obj.number_linked).toBe(0);
      expect(obj.number_unlinked).toBe(0);
  });

  it('furet-ui-resource-list.api_formater page 1 with data and new entries', () => {
    const wrapper = getWrapper();
    const obj = {
      page: 1,
      perPage: 5,
    }
    new_entries["Model.1"] = NEW_DATA
    wrapper.vm.api_formater(obj, {total: 7, pks: [{id: 1}, {id: 2}, {id: 3}, {id: 4}, {id: 5}]});
    expect(obj.total).toBe(16);
    expect(obj.data.length).toBe(5);
    expect(
      obj.data.reduce(function(accumulator, currentValue) {
        accumulator.push(currentValue.title);
        return accumulator;
      }, [])
    ).toEqual(
      ["Entry 1", "Entry 2", "Entry 3", "Entry 4", "Entry 5"]
    );
  });
  it('furet-ui-resource-list.api_formater page 2 with data and new entries', () => {
    const wrapper = getWrapper();
    const obj = {
      page: 2,
      perPage: 5,
    }
    new_entries["Model.1"] = NEW_DATA
    wrapper.vm.api_formater(obj, {total: 7, pks: [{id: 6}, {id: 7}]});
    expect(obj.total).toBe(16);
    expect(obj.data.length).toBe(5);
    expect(
      obj.data.reduce(function(accumulator, currentValue) {
        accumulator.push(currentValue.title);
        return accumulator;
      }, [])
    ).toEqual(
      ["Entry 6", "Entry 7", "Entry 8", "Entry 9", "Entry 10"]
    );
  });
  it('furet-ui-resource-list.api_formater page 3 with data and new entries', () => {
    const wrapper = getWrapper();
    const obj = {
      page: 3,
      perPage: 5,
    }
    new_entries["Model.1"] = NEW_DATA
    wrapper.vm.api_formater(obj, {total: 7, pks: []});
    expect(obj.total).toBe(16);
    expect(obj.data.length).toBe(5);
    expect(
      obj.data.reduce(function(accumulator, currentValue) {
        accumulator.push(currentValue.title);
        return accumulator;
      }, [])
    ).toEqual(
      ["Entry 11", "Entry 12", "Entry 13", "Entry 14", "Entry 15"]
    );
  });
  it('furet-ui-resource-list.api_formater page 4 with data and new entries', () => {
    const wrapper = getWrapper();
    const obj = {
      page: 4,
      perPage: 5,
    }
    new_entries["Model.1"] = NEW_DATA
    wrapper.vm.api_formater(obj, {total: 7, pks: []});
    expect(obj.total).toBe(16);
    expect(obj.data.length).toBe(1);
    expect(
      obj.data.reduce(function(accumulator, currentValue) {
        accumulator.push(currentValue.title);
        return accumulator;
      }, [])
    ).toEqual(
      ["Entry 16"]
    );
  });
  it('furet-ui-resource-list.api_formater page 1 with no data and new entries', () => {
    const wrapper = getWrapper();
    const obj = {
      page: 1,
      perPage: 5,
    }
    new_entries["Model.1"] = NEW_DATA
    wrapper.vm.api_formater(obj, {total: 0, pks: []});
    expect(obj.total).toBe(9);
    expect(obj.data.length).toBe(5);
    expect(
      obj.data.reduce(function(accumulator, currentValue) {
        accumulator.push(currentValue.title);
        return accumulator;
      }, [])
    ).toEqual(
      ["Entry 8", "Entry 9", "Entry 10", "Entry 11", "Entry 12", ]
    );
  });
  it('furet-ui-resource-list.api_formater page 2 with no data and new entries', () => {
    const wrapper = getWrapper();
    const obj = {
      page: 2,
      perPage: 5,
    }
    new_entries["Model.1"] = NEW_DATA
    wrapper.vm.api_formater(obj, {total: 0, pks: []});
    expect(obj.total).toBe(9);
    expect(obj.data.length).toBe(4);
    expect(
      obj.data.reduce(function(accumulator, currentValue) {
        accumulator.push(currentValue.title);
        return accumulator;
      }, [])
    ).toEqual(
      ["Entry 13", "Entry 14", "Entry 15", "Entry 16" ]
    );
  });
  it('furet-ui-resource-list breadscrumb', () => {
    const wrapper = getWrapper();
    expect(wrapper.vm.getBreadcrumbInfo().icon).toBe('list');
  });
  it('furet-ui-resource-list refresh', () => {
    const wrapper = getWrapper();
    wrapper.vm.refresh()
    expect(mockAxios2).toBeCalledWith(
      "/furet-ui/resource/1/crud", 
      {
        params: {
          'context[fields]': "id,title,color",
          'context[model]': "Model.1",
          limit: 25,
          offset: 0,
        }
      }
    );
  });
  it('furet-ui-resource-list toggleHiddenColumn', () => {
    const wrapper = getWrapper();
    wrapper.vm.toggleHiddenColumn({})
  });
  it('furet-ui-resource-list click button call', async () => {
    const response = {
      pks: [{id: 1}],
      total: 1,
      data: [] // useless for test because getEntry is mocked
    };

    const wrapper = getWrapper(2);
    const list = wrapper.vm.$refs.list;
    wrapper.vm.api_formater(list, response)
    await wrapper.vm.$nextTick()
    const button = wrapper.find('a.furet-ui-list-button');
    button.trigger('click')
    expect(mockAxios).toBeCalledWith("/furet-ui/resource/2/model/Model.1/call/test", {});
  });
  it('furet-ui-resource-list click button open resource', async () => {
    const response = {
      pks: [{id: 1}],
      total: 1,
      data: [] // useless for test because getEntry is mocked
    };

    const wrapper = getWrapper(3);
    const list = wrapper.vm.$refs.list;
    wrapper.vm.api_formater(list, response)
    await wrapper.vm.$nextTick()
    const button = wrapper.find('a.furet-ui-list-button');
    button.trigger('click')
    expect(mockAxios).toBeCalledWith(
      "/furet-ui/open/resource/test", 
      {
        params: {},
        resource_type: undefined,
        route: null,
      }
    );
  });
});
