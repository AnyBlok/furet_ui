import { mount } from "@vue/test-utils";
import { getComponentPrototype } from "@/components/factory";
import axios from 'axios';

const mock = jest.spyOn(axios, "get");
mock.mockResolvedValue({data: {data: [], pks: [{id: 1}]}});

const localVue = global.localVue;
const store = global.store;

const getEntry = () => {
  return {title: 'Entry'}
}
describe("Field.Many2One for Resource.List", () => {
  const Component = getComponentPrototype("furet-ui-list-field-many2one");
  const openResource = jest.fn()
  const getOptions = (data, hidden) => {
    return {
      store,
      localVue,
      propsData: {
        resource: {},
        data: {
          test: data,
        },
        config: {
          hidden,
          model: 'Model.1',
          name: 'test',
          display: "'Go to => ' + fields.title"
        }
      },
      methods: {
        openResource,
      },
      provide: {
        getEntry,
      }
    }
  }

  beforeEach(() => {
    openResource.mockClear()
  })
  it("Empty snapshot", () => {
    const wrapper = mount(Component, getOptions(null, false))
    expect(wrapper.element).toMatchSnapshot();
  });
  it("Empty breadcrumb", () => {
    const wrapper = mount(Component, getOptions(null, false))
    expect(openResource).not.toHaveBeenCalled()
    const a = wrapper.find('a')
    a.trigger('click')
    expect(openResource).not.toHaveBeenCalled()
  });
  it("With value: snapshot", () => {
    const wrapper = mount(Component, getOptions({id: 1}, false))
    expect(wrapper.element).toMatchSnapshot();
  });
  it("With value: breadcrumb", () => {
    const wrapper = mount(Component, getOptions({id: 1}, false))
    expect(openResource).not.toHaveBeenCalled()
    const a = wrapper.find('a')
    a.trigger('click')
    expect(openResource).toHaveBeenCalled()
  });
  it("Hidden", () => {
    const wrapper = mount(Component, getOptions({id: 1}, true))
    expect(wrapper.element).toMatchSnapshot();
  });
});

describe("Field.One2Many for Resource.Form", () => {
  const Component = getComponentPrototype("furet-ui-form-field-many2one");
  const updateValue = jest.fn()
  const openResource = jest.fn()

  const getOptions = (readonly) => {
    return {
      store,
      localVue,
      propsData: {
        resource: {
        },
        data: {
          test: [{id: 1}]
        },
        config: {
          model: 'Model.1',
          name: 'test',
          display: "'Go to => ' + fields.title",
          fields: ['title'],
          filter_by: ['code'],
          limit: 10,
        }
      },
      provide: {
        partIsReadonly: () => {
          return readonly;
        },
        getEntry,
        updateChangeState: () => {},
        getNewEntry: () => {return {}}
      },
      methods: {
        updateValue,
        openResource,
      }
    };
  }
  beforeEach(() => {
    updateValue.mockClear();
    openResource.mockClear();
  });
  it("snapshot: RW", () => {
    const wrapper = mount(Component, getOptions(false));
    expect(wrapper.element).toMatchSnapshot();
  });
  it("snapshot: RO", () => {
    const wrapper = mount(Component, getOptions(true));
    expect(wrapper.element).toMatchSnapshot();
  });
  it("openResource", () => {
    const wrapper = mount(Component, getOptions(true));
    expect(openResource).not.toHaveBeenCalled()
    const o2m = wrapper.find('a')
    o2m.trigger('click')
    expect(openResource).toHaveBeenCalled()
  });
  it("compute choices", () => {
    const wrapper = mount(Component, getOptions(false));
    expect(wrapper.vm.choices).toStrictEqual([])
    wrapper.setData({pks: [{id: 1}]})
    expect(wrapper.vm.choices).toStrictEqual([{
      label: "Go to => Entry", pk: {id: 1}}])
  });
  it("onSelect", () => {
    const wrapper = mount(Component, getOptions(false));
    expect(updateValue).not.toHaveBeenCalled()
    wrapper.vm.onSelect({pk: {id: 2}})
    expect(updateValue).toHaveBeenCalled()
  });
  it("onChange: with value", () => {
    const wrapper = mount(Component, getOptions(false));
    expect(wrapper.vm.pks).toStrictEqual([])
    expect(updateValue).not.toHaveBeenCalled()
    wrapper.vm.onChange(test)
    expect(wrapper.vm.pks).toStrictEqual([])
    expect(updateValue).toHaveBeenCalled()
  });
  it("onChange: without value", () => {
    const wrapper = mount(Component, getOptions(false));
    wrapper.setProps({data: {}})
    expect(wrapper.vm.pks).toStrictEqual([])
    expect(updateValue).not.toHaveBeenCalled()
    wrapper.vm.onChange(test)
    expect(wrapper.vm.pks).toStrictEqual([])
    expect(updateValue).not.toHaveBeenCalled()
  });
});