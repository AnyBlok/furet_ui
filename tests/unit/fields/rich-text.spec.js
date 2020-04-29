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

describe("Field.RichText for Resource.List", () => {
  const ListRichTextField = getComponentPrototype("furet-ui-list-field-rich-text");

  it("Empty", () => {
    const wrapper = mount(ListRichTextField, {
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
    const wrapper = mount(ListRichTextField, {
      store,
      localVue,
      provide,
      propsData: {
        resource: {},
        config: {
          name: "fieldName"
        },
        data: {
          fieldName: "<p>A value</p>"
        }
      }
    });

    expect(wrapper.element).toMatchSnapshot();
  });
});
describe("Field.RichText for Resource.Form", () => {
  const FormRichTextField = getComponentPrototype("furet-ui-form-field-rich-text");

  it("Empty", () => {
    const wrapper = mount(FormRichTextField, {
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
    const wrapper = mount(FormRichTextField, {
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
          fieldName: "<p>A value</p>"
        }
      }
    });

    expect(wrapper.element).toMatchSnapshot();
  });

  it("With value, label and icon", () => {
    const wrapper = mount(FormRichTextField, {
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
          fieldName: "<p>A value</p>"
        }
      }
    });
    expect(wrapper.element).toMatchSnapshot();
  });
});
