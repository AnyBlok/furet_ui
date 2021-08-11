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

describe("Field.Json for Resource.List", () => {
  const ListJsonField = getComponentPrototype("furet-ui-list-field-json");

  it("Empty", () => {
    const wrapper = mount(ListJsonField, {
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
    const wrapper = mount(ListJsonField, {
      store,
      localVue,
      provide,
      propsData: {
        resource: {},
        config: {
          name: "fieldName"
        },
        data: {
          fieldName: {
            entry1: 'Entry 1',
            entry2: 'Entry 2',
          }
        }
      }
    });

    expect(wrapper.element).toMatchSnapshot();
  });

  it("With value and slot", () => {
    const wrapper = mount(ListJsonField, {
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
          fieldName: {
            entry1: 'Entry 1',
            entry2: 'Entry 2',
          }
        }
      }
    });

    expect(wrapper.element).toMatchSnapshot();
  });
});

describe("Field.Json for Resource.Thumbnail", () => {
  const ThumbnailJsonField = getComponentPrototype("furet-ui-thumbnail-field-json");

  it("Empty", () => {
    const wrapper = mount(ThumbnailJsonField, {
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
    const wrapper = mount(ThumbnailJsonField, {
      store,
      localVue,
      provide,
      propsData: {
        resource: {},
        config: {
          name: "fieldName"
        },
        data: {
          fieldName: {
            entry1: 'Entry 1',
            entry2: 'Entry 2',
          }
        }
      }
    });
    expect(wrapper.element).toMatchSnapshot();
  });

  it("With value and slot", () => {
    const wrapper = mount(ThumbnailJsonField, {
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
          fieldName: {
            entry1: 'Entry 1',
            entry2: 'Entry 2',
          }
        }
      }
    });
    expect(wrapper.element).toMatchSnapshot();
  });
});

describe("Field.Json for Resource.Thumbnail", () => {
  const ThumbnailJsonField = getComponentPrototype("furet-ui-thumbnail-field-json");

  it("Empty", () => {
    const wrapper = mount(ThumbnailJsonField, {
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
    const wrapper = mount(ThumbnailJsonField, {
      store,
      localVue,
      provide,
      propsData: {
        resource: {},
        config: {
          name: "fieldName"
        },
        data: {
          fieldName: {
            entry1: 'Entry 1',
            entry2: 'Entry 2',
          }
        }
      }
    });
    expect(wrapper.element).toMatchSnapshot();
  });
});

describe("Field.Json for Resource.Form", () => {
  const FormJsonField = getComponentPrototype("furet-ui-form-field-json");
  it("Empty", () => {
    const wrapper = mount(FormJsonField, {
      store,
      localVue,
      provide,
      i18n,
      propsData: {
        resource: {},
        data: {},
        config: {}
      }
    });
    expect(wrapper.element).toMatchSnapshot();
  });

  it("With value, label, readonly", () => {
    const wrapper = mount(FormJsonField, {
      store,
      localVue,
      provide,
      i18n,
      propsData: {
        resource: {
          readonly: true
        },
        config: {
          name: "fieldName",
          label: "My field label"
        },
        data: {
          fieldName: {
            entry1: 'Entry 1',
            entry2: 'Entry 2',
          }
        }
      }
    });

    expect(wrapper.element).toMatchSnapshot();
  });

  it("With value, label, readonly and slot", () => {
    const wrapper = mount(FormJsonField, {
      store,
      localVue,
      provide,
      i18n,
      propsData: {
        resource: {
          readonly: true
        },
        config: {
          name: "fieldName",
          slot: '<div>{{ data.fieldName }} <br/> {{ value }}</div>',
          label: "My field label"
        },
        data: {
          fieldName: {
            entry1: 'Entry 1',
            entry2: 'Entry 2',
          }
        }
      }
    });

    expect(wrapper.element).toMatchSnapshot();
  });

  it("With value, label, maxrow and placeholder", () => {
    const wrapper = mount(FormJsonField, {
      store,
      localVue,
      provide,
      i18n,
      propsData: {
        resource: {
          readonly: false
        },
        config: {
          name: "fieldName",
          label: "My field label",
          placeholder: "An explicit placeholder",
        },
        data: {
          fieldName: {
            entry1: 'Entry 1',
            entry2: 'Entry 2',
          }
        }
      }
    });
    expect(wrapper.element).toMatchSnapshot();
  });
  it("Empty 1 With required", () => {
    const wrapper = mount(FormJsonField, {
      store,
      localVue,
      provide,
      i18n,
      propsData: {
        resource: {
          readonly: false,
        },
        config: {
          name: "fieldName",
          label: "My field label",
          placeholder: "An explicit placeholder",
          required: 'true',
        },
        data: {
        }
      }
    });
    expect(wrapper.element).toMatchSnapshot();
  });
  it("Empty 2 With required", () => {
    const wrapper = mount(FormJsonField, {
      store,
      localVue,
      provide,
      i18n,
      propsData: {
        resource: {
          readonly: false,
        },
        config: {
          name: "fieldName",
          label: "My field label",
          placeholder: "An explicit placeholder",
          required: 'true',
        },
        data: {
          fieldName: '{}',
        }
      }
    });
    expect(wrapper.element).toMatchSnapshot();
  });
  it("Invalid With required", () => {
    const wrapper = mount(FormJsonField, {
      store,
      localVue,
      provide,
      i18n,
      propsData: {
        resource: {
          readonly: false,
        },
        config: {
          name: "fieldName",
          label: "My field label",
          placeholder: "An explicit placeholder",
          required: 'true',
        },
        data: {
          fieldName: '{',
        }
      }
    });
    expect(wrapper.element).toMatchSnapshot();
  });
});
