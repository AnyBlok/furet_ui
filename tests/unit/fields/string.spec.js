import { mount } from "@vue/test-utils";
import { getComponentPrototype } from "@/components/factory";
import { i18n } from "@/i18n";

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

  it("With value and slot", () => {
    const wrapper = mount(ListStringField, {
      store,
      localVue,
      provide,
      propsData: {
        resource: {},
        config: {
          name: "fieldName",
          slot: '<div>{{ data.fieldName }} <br/> {{ value }}</div>',
        },
        data: {
          fieldName: "A value"
        }
      }
    });
    expect(wrapper.element).toMatchSnapshot();
  });
});

describe("Field.String for Resource.Thumbnail", () => {
  const ThumbnailStringField = getComponentPrototype("furet-ui-thumbnail-field-string");

  it("Empty", () => {
    const wrapper = mount(ThumbnailStringField, {
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
    const wrapper = mount(ThumbnailStringField, {
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
    const wrapper = mount(ThumbnailStringField, {
      store,
      localVue,
      provide,
      propsData: {
        resource: {},
        config: {
          name: "fieldName",
          slot: '<div>{{ data.fieldName }} <br/> {{ value }}</div>',
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

  it("Empty and required", () => {
    const wrapper = mount(FormStringField, {
      store,
      localVue,
      i18n,
      provide,
      propsData: {
        resource: {},
        data: {},
        config: {
          required: true
        }
      }
    });
    expect(wrapper.element).toMatchSnapshot();
  });

  it("Hidden", () => {
    const wrapper = mount(FormStringField, {
      store,
      localVue,
      provide,
      propsData: {
        resource: {},
        data: {},
        config: {
          hidden: true
        }
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

  it("With value, label, readonly and slot", () => {
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
          label: "My field label",
          slot: '<div>{{ data.fieldName }} <br/> {{ value }}</div>',
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

  it("With value, label, readonly and writable", () => {
    const wrapper = mount(FormStringField, {
      store,
      localVue,
      provide,
      propsData: {
        resource: {
        },
        config: {
          name: "fieldName",
          label: "My field label",
          readonly: true,
          writable: true
        },
        data: {
          fieldName: "A value"
        }
      }
    });

    expect(wrapper.element).toMatchSnapshot();
  });
});
