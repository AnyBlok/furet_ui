import { mount } from "@vue/test-utils";
import { getComponentPrototype } from "@/components/factory";

const localVue = global.localVue;
const store = global.store;

describe("Field.String for Resource.Form", () => {
  const FormStringField = getComponentPrototype("furet-ui-form-field-string");
  const provide = {
    partIsReadonly: () => {
      return false;
    },
    updateChangeState: () => {}
  };

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
