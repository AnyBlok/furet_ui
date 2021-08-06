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

describe("Field.Color for Resource.List", () => {
  const ListColorField = getComponentPrototype("furet-ui-list-field-color");

  it("Empty", () => {
    const wrapper = mount(ListColorField, {
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
    const wrapper = mount(ListColorField, {
      store,
      localVue,
      provide,
      propsData: {
        resource: {},
        config: {
          name: "fieldName"
        },
        data: {
          fieldName: "#FF00F0"
        }
      }
    });

    expect(wrapper.element).toMatchSnapshot();
  });

  it("With value and slot", () => {
    const wrapper = mount(ListColorField, {
      store,
      localVue,
      provide,
      propsData: {
        resource: {},
        config: {
          slot: '<div>{{ data.fieldName }} <br/> {{ value }}</div>',
          name: "fieldName"
        },
        data: {
          fieldName: "#FF00F0"
        }
      }
    });

    expect(wrapper.element).toMatchSnapshot();
  });
});

describe("Field.Color for Resource.Thumbnail", () => {
  const ThumbnailColorField = getComponentPrototype("furet-ui-thumbnail-field-color");

  it("Empty", () => {
    const wrapper = mount(ThumbnailColorField, {
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
    const wrapper = mount(ThumbnailColorField, {
      store,
      localVue,
      provide,
      propsData: {
        resource: {},
        config: {
          name: "fieldName"
        },
        data: {
          fieldName: "#FF00F0"
        }
      }
    });
    expect(wrapper.element).toMatchSnapshot();
  });

  it("With value and slot", () => {
    const wrapper = mount(ThumbnailColorField, {
      store,
      localVue,
      provide,
      propsData: {
        resource: {},
        config: {
          slot: '<div>{{ data.fieldName }} <br/> {{ value }}</div>',
          name: "fieldName"
        },
        data: {
          fieldName: "#FF00F0"
        }
      }
    });
    expect(wrapper.element).toMatchSnapshot();
  });
});

describe("Field.Color for Resource.Form", () => {
  const FormColorField = getComponentPrototype("furet-ui-form-field-color");

  it("Empty", () => {
    const wrapper = mount(FormColorField, {
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
    const wrapper = mount(FormColorField, {
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
          fieldName: "#FF00F0"
        }
      }
    });

    expect(wrapper.element).toMatchSnapshot();
  });

  it("With value, readonly and slot", () => {
    const wrapper = mount(FormColorField, {
      store,
      localVue,
      provide,
      propsData: {
        resource: {
          readonly: true
        },
        config: {
          name: "fieldName",
          slot: '<div>{{ data.fieldName }} <br/> {{ value }}</div>',
        },
        data: {
          fieldName: "#FF00F0"
        }
      }
    });

    expect(wrapper.element).toMatchSnapshot();
  });

  it("With value, label", () => {
    const wrapper = mount(FormColorField, {
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
        },
        data: {
          fieldName: "#FF00F0"
        }
      }
    });
    expect(wrapper.element).toMatchSnapshot();
    expect(wrapper.find("input").element.value).toBe("#ff00f0");
  });
});
