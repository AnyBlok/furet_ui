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

describe("Field.Password for Resource.List", () => {
  const ListPasswordField = getComponentPrototype("furet-ui-list-field-password");

  it("Empty", () => {
    const wrapper = mount(ListPasswordField, {
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
    const wrapper = mount(ListPasswordField, {
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

  it("With value and slot", () => {
    const wrapper = mount(ListPasswordField, {
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
          fieldName: "A value"
        }
      }
    });

    expect(wrapper.element).toMatchSnapshot();
  });
});

describe("Field.Password for Resource.Thumbnail", () => {
  const ThumbnailPasswordField = getComponentPrototype("furet-ui-thumbnail-field-password");

  it("Empty", () => {
    const wrapper = mount(ThumbnailPasswordField, {
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
    const wrapper = mount(ThumbnailPasswordField, {
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

  it("With value and slot", () => {
    const wrapper = mount(ThumbnailPasswordField, {
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
          fieldName: "A value"
        }
      }
    });
    expect(wrapper.element).toMatchSnapshot();
  });
});

describe("Field.Password for Resource.Thumbnail", () => {
  const ThumbnailPasswordField = getComponentPrototype("furet-ui-thumbnail-field-password");

  it("Empty", () => {
    const wrapper = mount(ThumbnailPasswordField, {
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
    const wrapper = mount(ThumbnailPasswordField, {
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

describe("Field.Password for Resource.Form", () => {
  const FormPasswordField = getComponentPrototype("furet-ui-form-field-password");

  it("Empty", () => {
    const wrapper = mount(FormPasswordField, {
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

  it("Empty and readonly", () => {
    const wrapper = mount(FormPasswordField, {
      store,
      localVue,
      provide,
      propsData: {
        resource: {
          readonly: true,
        },
        data: {},
        config: {}
      }
    });
    expect(wrapper.element).toMatchSnapshot();
  });

  it("With value, label, readonly", () => {
    const wrapper = mount(FormPasswordField, {
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

  it("With value, label, readonly and slot", () => {
    const wrapper = mount(FormPasswordField, {
      store,
      localVue,
      provide,
      propsData: {
        resource: {
          readonly: true
        },
        config: {
          slot: '<div>{{ data.fieldName }} <br/> {{ value }}</div>',
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
    const wrapper = mount(FormPasswordField, {
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

  it("With value, label, reveal and icon", () => {
    const wrapper = mount(FormPasswordField, {
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
          icon: "user",
          reveal: true,
        },
        data: {
          fieldName: "A value"
        }
      }
    });
    expect(wrapper.element).toMatchSnapshot();
  });
});
