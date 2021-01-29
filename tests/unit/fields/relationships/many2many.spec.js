import { mount } from "@vue/test-utils";
import { getComponentPrototype } from "@/components/factory";
import { i18n } from "@/i18n";
import axios from "axios";

const mock = jest.spyOn(axios, "get");
mock.mockResolvedValue({
  data: {
    data: [
      {
        model: "Model.1",
        pk: { id: 1 },
        data: { id: 1, title: "Entry 1", color: "red" },
        type: "UPDATE_DATA",
      },
      {
        model: "Model.1",
        pk: { id: 2 },
        data: { id: 2, title: "Entry 2", color: "blue" },
        type: "UPDATE_DATA",
      },
    ],
    pks: [{ id: 1 }, { id: 2 }],
  },
  headers: { "x-total-records": 0 },
});

const localVue = global.localVue;
const store = global.store;
const router = global.router;
const mock_router_push = jest.spyOn(router, "push");

const data = {
  "Model.1": {
    1: { title: "Entry 1", color: "red" },
    2: { title: "Entry 2", color: "blue" },
  },
};

const getEntry = (model, pk) => {
  return data[model][pk.id];
};

describe("Field.Many2Many for Resource.List", () => {
  const Component = getComponentPrototype("furet-ui-list-field-many2many");
  const pushInBreadcrumb = jest.fn();
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
          model: "Model.1",
          name: "test",
          display: "'Title: ' + fields.title",
          menu: menu,
          resource: resource,
        },
      },
      provide: {
        getEntry,
        pushInBreadcrumb,
      },
    };
  };

  beforeEach(() => {
    pushInBreadcrumb.mockClear();
    mock_router_push.mockClear();
  });
  it("Empty", () => {
    const wrapper = mount(Component, getOptions([], false, undefined));
    expect(wrapper.element).toMatchSnapshot();
  });
  it("With one value: Snapshot", () => {
    const wrapper = mount(Component, getOptions([{ id: 1 }], false, undefined));
    expect(wrapper.element).toMatchSnapshot();
  });
  it("With one value: openResource", () => {
    const wrapper = mount(
      Component,
      getOptions([{ id: 1 }], false, undefined, 10, 20)
    );
    expect(pushInBreadcrumb).not.toHaveBeenCalled();
    const m2m = wrapper.find("a");
    m2m.trigger("click");
    expect(pushInBreadcrumb).toHaveBeenCalled();
    expect(mock_router_push).toHaveBeenLastCalledWith({
      name: "resource",
      params: { code: undefined, id: 20, menuId: 10 },
      query: {
        mode: "form",
        pks: '{"id":1}',
      },
    });
  });
  it("With one value: openResource without link", () => {
    const wrapper = mount(Component, getOptions([{ id: 1 }], false, undefined));
    expect(pushInBreadcrumb).not.toHaveBeenCalled();
    const m2m = wrapper.find("a");
    m2m.trigger("click");
    expect(pushInBreadcrumb).not.toHaveBeenCalled();
    expect(mock_router_push).not.toHaveBeenCalled();
  });
  it("With two value: Snapshot", () => {
    const wrapper = mount(
      Component,
      getOptions([{ id: 1 }, { id: 2 }], false, undefined)
    );
    expect(wrapper.element).toMatchSnapshot();
  });
  it("Hidden", () => {
    const wrapper = mount(
      Component,
      getOptions([{ id: 1 }, { id: 2 }], true, undefined)
    );
    expect(wrapper.element).toMatchSnapshot();
  });
  it("With style", () => {
    const style = "`color: ${fields.color};`";
    const wrapper = mount(
      Component,
      getOptions([{ id: 1 }, { id: 2 }], false, style)
    );
    expect(wrapper.element).toMatchSnapshot();
  });
});

describe("Field.Many2Many for Resource.Thumbnail", () => {
  const Component = getComponentPrototype("furet-ui-thumbnail-field-many2many");
  const pushInBreadcrumb = jest.fn();
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
          model: "Model.1",
          name: "test",
          display: "'Title: ' + fields.title",
          menu: menu,
          resource: resource,
        },
      },
      provide: {
        getEntry,
        pushInBreadcrumb,
      },
    };
  };

  beforeEach(() => {
    pushInBreadcrumb.mockClear();
    mock_router_push.mockClear();
  });
  it("Empty", () => {
    const wrapper = mount(Component, getOptions([], false, undefined));
    expect(wrapper.element).toMatchSnapshot();
  });
  it("With one value: Snapshot", () => {
    const wrapper = mount(Component, getOptions([{ id: 1 }], false, undefined));
    expect(wrapper.element).toMatchSnapshot();
  });
  it("With one value: openResource", () => {
    const wrapper = mount(
      Component,
      getOptions([{ id: 1 }], false, undefined, 10, 20)
    );
    expect(pushInBreadcrumb).not.toHaveBeenCalled();
    const m2m = wrapper.find("a");
    m2m.trigger("click");
    expect(pushInBreadcrumb).toHaveBeenCalled();
    expect(mock_router_push).toHaveBeenLastCalledWith({
      name: "resource",
      params: { code: undefined, id: 20, menuId: 10 },
      query: {
        mode: "form",
        pks: '{"id":1}',
      },
    });
  });
  it("With one value: openResource without link", () => {
    const wrapper = mount(Component, getOptions([{ id: 1 }], false, undefined));
    expect(pushInBreadcrumb).not.toHaveBeenCalled();
    const m2m = wrapper.find("a");
    m2m.trigger("click");
    expect(pushInBreadcrumb).not.toHaveBeenCalled();
    expect(mock_router_push).not.toHaveBeenCalled();
  });
  it("With two value: Snapshot", () => {
    const wrapper = mount(
      Component,
      getOptions([{ id: 1 }, { id: 2 }], false, undefined)
    );
    expect(wrapper.element).toMatchSnapshot();
  });
  it("Hidden", () => {
    const wrapper = mount(
      Component,
      getOptions([{ id: 1 }, { id: 2 }], true, undefined)
    );
    expect(wrapper.element).toMatchSnapshot();
  });
  it("With style", () => {
    const style = "`color: ${fields.color};`";
    const wrapper = mount(
      Component,
      getOptions([{ id: 1 }, { id: 2 }], false, style)
    );
    expect(wrapper.element).toMatchSnapshot();
  });
});

describe("Field.Many2ManyTags for Resource.Form", () => {
  const Component = getComponentPrototype("furet-ui-form-field-many2many-tags");
  const updateValue = jest.fn();
  let wrapper;
  const pushInBreadcrumb = jest.fn();

  beforeEach(() => {
    updateValue.mockClear();
    pushInBreadcrumb.mockClear();
    wrapper = mount(Component, {
      store,
      i18n,
      localVue,
      propsData: {
        resource: {},
        data: {
          test: [{ id: 1 }, { id: 2 }],
        },
        config: {
          model: "Model.1",
          name: "test",
          resource: 1,
        },
      },
      provide: {
        pushInBreadcrumb,
        partIsReadonly: () => {
          return false;
        },
        getEntry,
        updateChangeState: () => {},
        getNewEntry: () => {
          return {};
        },
        getNewEntries: () => {
          return [];
        },
        registryRefreshCallback: () => {},
      },
      methods: {
        updateValue,
      },
    });
  });
  it("snapshot", () => {
    expect(wrapper.element).toMatchSnapshot();
  });
  it("onSelect", () => {
    wrapper.vm.onSelect({ pk: { id: 4 } });
    expect(updateValue.mock.calls[0][0][2].__x2m_state).toBe("LINKED");
  });
  it("onUnSelect", () => {
    wrapper.vm.onUnSelect(wrapper.vm.values[0]);
    expect(updateValue.mock.calls[0][0][0].__x2m_state).toBe("UNLINKED");
  });
  it("onUnSelect a linked tag", () => {
    wrapper.vm.value[0]["__x2m_state"] = "LINKED";
    wrapper.vm.onUnSelect(wrapper.vm.values[0]);
    expect(updateValue.mock.calls[0][0][0].__revert).toBe(true);
  });

  it("isClosable", () => {
    expect(wrapper.vm.isClosable({})).toBe(true);
    expect(wrapper.vm.isClosable({ pk: undefined })).toBe(true);
    expect(wrapper.vm.isClosable({ pk: null })).toBe(true);
    expect(wrapper.vm.isClosable({ pk: {} })).toBe(true);
    expect(wrapper.vm.isClosable({ pk: { id: 1 } })).toBe(true);
    expect(
      wrapper.vm.isClosable({ pk: { id: 1, __x2m_state: undefined } })
    ).toBe(true);
    expect(wrapper.vm.isClosable({ pk: { id: 1, __x2m_state: null } })).toBe(
      true
    );
    expect(wrapper.vm.isClosable({ pk: { id: 1, __x2m_state: "" } })).toBe(
      true
    );
    expect(
      wrapper.vm.isClosable({ pk: { id: 1, __x2m_state: "LINKED" } })
    ).toBe(true);
    expect(
      wrapper.vm.isClosable({ pk: { id: 1, __x2m_state: "UNLINKED" } })
    ).toBe(false);
  });

  it("getType", () => {
    expect(wrapper.vm.getType({})).toBe("is-primary");
    expect(wrapper.vm.getType({ pk: undefined })).toBe("is-primary");
    expect(wrapper.vm.getType({ pk: null })).toBe("is-primary");
    expect(wrapper.vm.getType({ pk: {} })).toBe("is-primary");
    expect(wrapper.vm.getType({ pk: { id: 1 } })).toBe("is-primary");
    expect(wrapper.vm.getType({ pk: { id: 1, __x2m_state: undefined } })).toBe(
      "is-primary"
    );
    expect(wrapper.vm.getType({ pk: { id: 1, __x2m_state: null } })).toBe(
      "is-primary"
    );
    expect(wrapper.vm.getType({ pk: { id: 1, __x2m_state: "" } })).toBe(
      "is-primary"
    );
    expect(wrapper.vm.getType({ pk: { id: 1, __x2m_state: "LINKED" } })).toBe(
      "is-primary"
    );
    expect(wrapper.vm.getType({ pk: { id: 1, __x2m_state: "UNLINKED" } })).toBe(
      ""
    );
  });
});
