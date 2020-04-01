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

describe("Field.String for Resource.List", () => {
  const ListStringField = getComponentPrototype("furet-ui-list-field-string");

  it("Empty", () => {
    const wrapper = mount(ListStringField, {
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

  it("With value", () => {
    const wrapper = mount(ListStringField, {
      store,
      localVue,
      provide,
      propsData: {
        resource: {},
        config: {
          name: "fieldName"
        },
        data: {
          fieldName: "A value"
        }
      }
    });

    expect(wrapper.element).toMatchSnapshot();
  });
});
describe("Field.String for Resource.Form", () => {
  const FormStringField = getComponentPrototype("furet-ui-form-field-string");

  it("Empty", () => {
    const wrapper = mount(FormStringField, {
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

  it("With value, label, readonly", () => {
    const wrapper = mount(FormStringField, {
      store,
      localVue,
      provide,
      propsData: {
        resource: {
          readonly: true
        },
        config: {
          name: "fieldName",
          label: "My field label"
        },
        data: {
          fieldName: "A value"
        }
      }
    });

    expect(wrapper.element).toMatchSnapshot();
  });

  it("With value, label and icon", () => {
    const wrapper = mount(FormStringField, {
      store,
      localVue,
      provide,
      propsData: {
        resource: {
          readonly: false
        },
        config: {
          maxlength: 10,
          placeholder: "An explicit placeholder",
          name: "fieldName",
          label: "My field label",
          icon: "user"
        },
        data: {
          fieldName: "A value"
        }
      }
    });
    expect(wrapper.element).toMatchSnapshot();
    expect(wrapper.find("input").element.value).toBe("A value");
    expect(wrapper.find("input").element.placeholder).toBe(
      "An explicit placeholder"
    );
  });
});
