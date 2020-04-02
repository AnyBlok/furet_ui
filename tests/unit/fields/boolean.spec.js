import { mount } from "@vue/test-utils";
import { getComponentPrototype } from "@/components/factory";

const localVue = global.localVue;
const store = global.store;
const provide = {
  partIsReadonly: () => {
    return false;
  },
  updateChangeState: () => {}
};

describe("Field.Boolean for Resource.List", () => {
  const ListBooleanField = getComponentPrototype("furet-ui-list-field-boolean");

  it("Empty", () => {
    const wrapper = mount(ListBooleanField, {
      store,
      localVue,
      provide,
      propsData: {
        resource: {},
        data: {},
        config: {}
      }
    });
    expect(wrapper.element).toMatchSnapshot();
  });

  it("With true value", () => {
    const wrapper = mount(ListBooleanField, {
      store,
      localVue,
      provide,
      propsData: {
        resource: {},
        config: {
          name: "fieldName"
        },
        data: {
          fieldName: "true"
        }
      }
    });
    expect(wrapper.element).toMatchSnapshot();
  });
  it("With false value", () => {
    const wrapper = mount(ListBooleanField, {
      store,
      localVue,
      provide,
      propsData: {
        resource: {},
        config: {
          name: "fieldName"
        },
        data: {
          fieldName: "false"
        }
      }
    });
    expect(wrapper.element).toMatchSnapshot();
  });
  it("With security issue value", () => {
    const wrapper = mount(ListBooleanField, {
      store,
      localVue,
      provide,
      propsData: {
        resource: {},
        config: {
          name: "fieldName"
        },
        data: {
          fieldName: "throw Error('this is a security issue')"
        }
      }
    });
    expect(wrapper.element).toMatchSnapshot();
  });
});

describe("Field.Boolean for Resource.Form", () => {
  const FormBooleanField = getComponentPrototype("furet-ui-form-field-boolean");

  it("Empty", () => {
    const wrapper = mount(FormBooleanField, {
      store,
      localVue,
      provide,
      propsData: {
        resource: {},
        data: {},
        config: {}
      }
    });
    expect(wrapper.element).toMatchSnapshot();
  });
});
