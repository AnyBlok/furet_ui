import { mount } from "@vue/test-utils";
import { getComponentPrototype } from "@/components/factory";
import { i18n } from "@/i18n";
import axios from 'axios';

const mock = jest.spyOn(axios, "get");
mock.mockResolvedValue({
  data: {
    data: [
      {
        model: "Model.1",
        pk: { id: 1 },
        data: { id: 1, title: "Entry 1", color: "red" },
        type: "UPDATE_DATA"
      },
      {
        model: "Model.1",
        pk: { id: 2 },
        data: { id: 2, title: "Entry 2", color: "blue" },
        type: "UPDATE_DATA"
      }
    ],
    pks: [{ id: 1 }, { id: 2 }]
  },
  headers: { 'x-total-records': 0 }
});

const localVue = global.localVue;
const store = global.store;
const router = global.router;
const mock_router_push = jest.spyOn(router, "push");

const data = {
  'Model.1': {
    1: {title: 'Entry 1', color: 'red'},
    2: {title: 'Entry 2', color: 'blue'}
  },
}

const getEntry = (model, pk) => {
  return data[model][pk.id]
}
describe("Field.One2Many for Resource.List", () => {
  const Component = getComponentPrototype("furet-ui-list-field-one2many");
  const pushInBreadcrumb = jest.fn()
  const getOptions = (data, hidden, style, menu, resource) => {
    return {
      store,
      router,
      localVue,
      propsData: {
        resource: {},
        data: {
          test: data,
        },
        config: {
          hidden,
          style,
          model: 'Model.1',
          name: 'test',
          display: "'Go to => ' + fields.title",
          menu: menu,
          resource: resource,
        }
      },
      provide: {
        getEntry,
        pushInBreadcrumb,
      }
    }
  }

  beforeEach(() => {
    pushInBreadcrumb.mockClear()
    mock_router_push.mockClear()
  })
  it("Empty", () => {
    const wrapper = mount(Component, getOptions([], false, undefined))
    expect(wrapper.element).toMatchSnapshot();
  });
  it("With one value: Snapshot", () => {
    const wrapper = mount(Component, getOptions([{id: 1}], false, undefined))
    expect(wrapper.element).toMatchSnapshot();
  });
  it("With one value: openResource", () => {
    const wrapper = mount(Component, getOptions([{id: 1}], false, undefined, 10, 20))
    expect(pushInBreadcrumb).not.toHaveBeenCalled()
    const o2m = wrapper.find('a')
    o2m.trigger('click')
    expect(pushInBreadcrumb).toHaveBeenCalled()
    expect(mock_router_push).toHaveBeenLastCalledWith({
      name: "resource", 
      params: {code: undefined, id: 20, menuId: 10}, 
      query: {mode: "form", pks: "{\"pk\":{\"id\":1},\"label\":\"Go to => Entry 1\"}"}
    });
  });
  it("With one value: openResource without link", () => {
    const wrapper = mount(Component, getOptions([{id: 1}], false, undefined))
    expect(pushInBreadcrumb).not.toHaveBeenCalled()
    const o2m = wrapper.find('a')
    o2m.trigger('click')
    expect(pushInBreadcrumb).not.toHaveBeenCalled()
    expect(mock_router_push).not.toHaveBeenCalled()
  });
  it("With two value: Snapshot", () => {
    const wrapper = mount(Component, getOptions([{id: 1}, {id: 2}], false, undefined))
    expect(wrapper.element).toMatchSnapshot();
  });
  it("Hidden", () => {
    const wrapper = mount(Component, getOptions([{id: 1}, {id: 2}], true, undefined))
    expect(wrapper.element).toMatchSnapshot();
  });
  it("With style", () => {
    const style = "`color: ${fields.color};`";
    const wrapper = mount(Component, getOptions([{id: 1}, {id: 2}], false, style))
    expect(wrapper.element).toMatchSnapshot();
  });
});

describe("Field.One2Many for Resource.Form", () => {
  const Component = getComponentPrototype("furet-ui-form-field-one2many");
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
  let updateValue;
  let wrapper;
  beforeEach(() => {
    updateValue = jest.fn()
    wrapper = mount(Component, {
      store,
      i18n,
      localVue,
      propsData: {
        resource: {
        },
        data: {
            test: [{id: 1}, {id: 2}]
        },
        config: {
          model: 'Model.1',
          name: 'test',
          resource: 1,
        }
      },
      provide: {
        partIsReadonly: () => {
          return false;
        },
        getEntry,
        updateChangeState: () => {},
        getNewEntry: () => {return {}}
      },
      methods: {
        updateValue,
      }
    });
  });
  it("snapshot", () => {
    expect(wrapper.element).toMatchSnapshot();
  });
  it("o2m_delete", () => {
    wrapper.vm.o2m_delete({model: 'Model.2', pks:{id: 1}})
    expect(updateValue.mock.calls[0][0][0].__x2m_state).toBe('DELETED')
  });
  it("o2m_update", () => {
    wrapper.vm.o2m_update({model: 'Model.2', pks:{id: 1}})
    expect(updateValue.mock.calls[0][0][0].__x2m_state).toBe('UPDATED')
  });
  it("o2m_add", () => {
    wrapper.vm.o2m_add({model: 'Model.2', uuid: 'uuid'})
    expect(updateValue.mock.calls[0][0][0].uuid).toBe('uuid')
    expect(updateValue.mock.calls[0][0][0].__x2m_state).toBe('ADDED')
  });
});
