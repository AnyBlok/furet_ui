import { mount } from "@vue/test-utils";
import { getComponentPrototype } from "@/components/factory";
import { i18n } from "@/i18n";

const mocki18n = jest.spyOn(i18n, "_t");
mocki18n.mockResolvedValue('');

const localVue = global.localVue;
const store = global.store;
const provide = {
  partIsReadonly: () => {
    return false;
  },
  updateChangeState: () => {}
};

describe("Field.Selection for Resource.List", () => {
  const ListSelectionField = getComponentPrototype("furet-ui-list-field-selection");

  it("Empty", () => {
    const wrapper = mount(ListSelectionField, {
      store,
      localVue,
      provide,
      i18n,
      propsData: {
        resource: {},
        data: {},
        config: {
          selections: {
            'entry1': 'Entry 1',
            'entry2': 'Entry 2',
          },
        }
      }
    });
    expect(wrapper.element).toMatchSnapshot();
  });

  it("Empty without selection", () => {
    const wrapper = mount(ListSelectionField, {
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

  it("With value", () => {
    const wrapper = mount(ListSelectionField, {
      store,
      localVue,
      provide,
      i18n,
      propsData: {
        resource: {},
        config: {
          selections: {
            'entry1': 'Entry 1',
            'entry2': 'Entry 2',
          },
          name: "fieldName"
        },
        data: {
          fieldName: "entry1"
        }
      }
    });

    expect(wrapper.element).toMatchSnapshot();
  });

  it("With value and slot", () => {
    const wrapper = mount(ListSelectionField, {
      store,
      localVue,
      provide,
      i18n,
      propsData: {
        resource: {},
        config: {
          selections: {
            'entry1': 'Entry 1',
            'entry2': 'Entry 2',
          },
          slot: '<div>{{ data.fieldName }} <br/> {{ value }}</div>',
          name: "fieldName"
        },
        data: {
          fieldName: "entry1"
        }
      }
    });

    expect(wrapper.element).toMatchSnapshot();
  });
});

describe("Field.Selection for Resource.Thumbnail", () => {
  const ThumbnailSelectionField = getComponentPrototype("furet-ui-thumbnail-field-selection");

  it("Empty", () => {
    const wrapper = mount(ThumbnailSelectionField, {
      store,
      localVue,
      provide,
      i18n,
      propsData: {
        resource: {},
        data: {},
        config: {
          selections: {
            'entry1': 'Entry 1',
            'entry2': 'Entry 2',
          },
        }
      }
    });
    expect(wrapper.element).toMatchSnapshot();
  });

  it("Empty without selection", () => {
    const wrapper = mount(ThumbnailSelectionField, {
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

  it("With value", () => {
    const wrapper = mount(ThumbnailSelectionField, {
      store,
      localVue,
      provide,
      i18n,
      propsData: {
        resource: {},
        config: {
          selections: {
            'entry1': 'Entry 1',
            'entry2': 'Entry 2',
          },
          name: "fieldName"
        },
        data: {
          fieldName: "entry1"
        }
      }
    });

    expect(wrapper.element).toMatchSnapshot();
  });

  it("With value and slot", () => {
    const wrapper = mount(ThumbnailSelectionField, {
      store,
      localVue,
      provide,
      i18n,
      propsData: {
        resource: {},
        config: {
          selections: {
            'entry1': 'Entry 1',
            'entry2': 'Entry 2',
          },
          slot: '<div>{{ data.fieldName }} <br/> {{ value }}</div>',
          name: "fieldName"
        },
        data: {
          fieldName: "entry1"
        }
      }
    });

    expect(wrapper.element).toMatchSnapshot();
  });
});

describe("Field.Selection for Resource.Form", () => {
  const FormSelectionField = getComponentPrototype("furet-ui-form-field-selection");

  it("Empty", () => {
    const wrapper = mount(FormSelectionField, {
      store,
      localVue,
      provide,
      i18n,
      propsData: {
        resource: {},
        data: {},
        config: {
          selections: {
            'entry1': 'Entry 1',
            'entry2': 'Entry 2',
          },
        }
      }
    });
    expect(wrapper.element).toMatchSnapshot();
  });

  it("Empty without selections", () => {
    const wrapper = mount(FormSelectionField, {
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
    const wrapper = mount(FormSelectionField, {
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
          selections: {
            'entry1': 'Entry 1',
            'entry2': 'Entry 2',
          },
          label: "My field label"
        },
        data: {
          fieldName: "entry1"
        }
      }
    });

    expect(wrapper.element).toMatchSnapshot();
  });

  it("With value, label, readonly and slot", () => {
    const wrapper = mount(FormSelectionField, {
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
          selections: {
            'entry1': 'Entry 1',
            'entry2': 'Entry 2',
          },
          label: "My field label"
        },
        data: {
          fieldName: "entry1"
        }
      }
    });

    expect(wrapper.element).toMatchSnapshot();
  });

  it("With unknown value", () => {
    const wrapper = mount(FormSelectionField, {
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
          selections: {
            'entry1': 'Entry 1',
            'entry2': 'Entry 2',
          },
          label: "My field label"
        },
        data: {
          fieldName: "entry3"
        }
      }
    });

    expect(wrapper.element).toMatchSnapshot();
  });

  it("With value, label and icon", () => {
    const wrapper = mount(FormSelectionField, {
      store,
      localVue,
      provide,
      i18n,
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
          selections: {
            'entry1': 'Entry 1',
            'entry2': 'Entry 2',
          },
        },
        data: {
          fieldName: "entry1"
        }
      }
    });
    expect(wrapper.element).toMatchSnapshot();
  });

  it("With, required, value, label and icon", () => {
    const wrapper = mount(FormSelectionField, {
      store,
      localVue,
      provide,
      i18n,
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
          required: true,
          selections: {
            'entry1': 'Entry 1',
            'entry2': 'Entry 2',
          },
        },
        data: {
          fieldName: "entry1"
        }
      }
    });
    expect(wrapper.element).toMatchSnapshot();
  });
});
