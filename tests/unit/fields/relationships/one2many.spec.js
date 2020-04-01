import { mount } from "@vue/test-utils";
import { getComponentPrototype } from "@/components/factory";

const localVue = global.localVue;
const store = global.store;

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
  it("Empty", () => {
    const wrapper = mount(Component, {
      store,
      localVue,
      propsData: {
        resource: {},
        data: {
          test: [],
        },
        config: {
          model: 'Model.1',
          name: 'test'
        }
      },
      provide: {
        getEntry,
      }
    });
    expect(wrapper.element).toMatchSnapshot();
  });
  it("With one value", () => {
    const wrapper = mount(Component, {
      store,
      localVue,
      propsData: {
        resource: {},
        data: {
          test: [{id: 1}],
        },
        config: {
          model: 'Model.1',
          name: 'test',
          display: "'Go to => ' + fields.title"
        }
      },
      provide: {
        getEntry,
      }
    });
    expect(wrapper.element).toMatchSnapshot();
  });
  it("With two value", () => {
    const wrapper = mount(Component, {
      store,
      localVue,
      propsData: {
        resource: {},
        data: {
          test: [{id: 1}, {id: 2}],
        },
        config: {
          model: 'Model.1',
          name: 'test',
          display: "'Go to => ' + fields.title"
        }
      },
      provide: {
        getEntry,
      }
    });
    expect(wrapper.element).toMatchSnapshot();
  });
  it("Hidden", () => {
    const wrapper = mount(Component, {
      store,
      localVue,
      propsData: {
        resource: {},
        data: {
          test: [{id: 1}, {id: 2}],
        },
        config: {
          hidden: true,
          model: 'Model.1',
          name: 'test',
          display: "'Go to => ' + fields.title"
        }
      },
      provide: {
        getEntry,
      }
    });
    expect(wrapper.element).toMatchSnapshot();
  });
  it("With style", () => {
    const wrapper = mount(Component, {
      store,
      localVue,
      propsData: {
        resource: {},
        data: {
          test: [{id: 1}, {id: 2}],
        },
        config: {
          model: 'Model.1',
          name: 'test',
          display: "'Go to => ' + fields.title",
          style: "`color: ${fields.color};`"
        }
      },
      provide: {
        getEntry,
      }
    });
    expect(wrapper.element).toMatchSnapshot();
  });
});

describe("Field.One2Many for Resource.Form", () => {
  const Component = getComponentPrototype("furet-ui-form-field-one2many");
  it("test furet ui form field one2many", () => {
    const wrapper = mount(Component, {
      store,
      localVue,
      propsData: {
        resource: {
          name: 'test'
        },
        data: {
          test: [{id: 1}]
        },
        config: {}
      },
      provide: {
        partIsReadonly: () => {
          return false;
        },
        updateChangeState: () => {},
        getEntry: () => {return {}},
        getNewEntry: () => {return {}}
      }
    });
    expect(wrapper.element).toMatchSnapshot();
  });
});
