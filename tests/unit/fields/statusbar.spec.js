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

describe("Field.StatusBar for Resource.List", () => {
  const ListStatusBarField = getComponentPrototype("furet-ui-list-field-statusbar");

  it("Empty", () => {
    const wrapper = mount(ListStatusBarField, {
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
    const wrapper = mount(ListStatusBarField, {
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
    const wrapper = mount(ListStatusBarField, {
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

  it("With value and dangerous state 1", () => {
    const wrapper = mount(ListStatusBarField, {
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
          name: "fieldName",
          'dangerous-states': ['entry1']
        },
        data: {
          fieldName: "entry1"
        }
      }
    });
    expect(wrapper.element).toMatchSnapshot();
  });

  it("With value and dangerous state 2", () => {
    const wrapper = mount(ListStatusBarField, {
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
          name: "fieldName",
          'dangerous-states': ['entry1']
        },
        data: {
          fieldName: "entry2"
        }
      }
    });
    expect(wrapper.element).toMatchSnapshot();
  });

  it("With value and done state 1", () => {
    const wrapper = mount(ListStatusBarField, {
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
          name: "fieldName",
          'done-states': ['entry1']
        },
        data: {
          fieldName: "entry1"
        }
      }
    });
    expect(wrapper.element).toMatchSnapshot();
  });

  it("With value and done state 2", () => {
    const wrapper = mount(ListStatusBarField, {
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
          name: "fieldName",
          'done-states': ['entry1']
        },
        data: {
          fieldName: "entry2"
        }
      }
    });
    expect(wrapper.element).toMatchSnapshot();
  });
});

describe("Field.StatusBar for Resource.Thumbnail", () => {
  const ThumbnailStatusBarField = getComponentPrototype("furet-ui-thumbnail-field-statusbar");

  it("Empty", () => {
    const wrapper = mount(ThumbnailStatusBarField, {
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
    const wrapper = mount(ThumbnailStatusBarField, {
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
    const wrapper = mount(ThumbnailStatusBarField, {
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
});

describe("Field.StatusBar for Resource.Thumbnail", () => {
  const ThumbnailStatusBarField = getComponentPrototype("furet-ui-thumbnail-field-statusbar");

  it("Empty", () => {
    const wrapper = mount(ThumbnailStatusBarField, {
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
    const wrapper = mount(ThumbnailStatusBarField, {
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
    const wrapper = mount(ThumbnailStatusBarField, {
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

  it("With value and dangerous state 1", () => {
    const wrapper = mount(ThumbnailStatusBarField, {
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
          name: "fieldName",
          'dangerous-states': ['entry1']
        },
        data: {
          fieldName: "entry1"
        }
      }
    });
    expect(wrapper.element).toMatchSnapshot();
  });

  it("With value and dangerous state 2", () => {
    const wrapper = mount(ThumbnailStatusBarField, {
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
          name: "fieldName",
          'dangerous-states': ['entry1']
        },
        data: {
          fieldName: "entry2"
        }
      }
    });
    expect(wrapper.element).toMatchSnapshot();
  });

  it("With value and done state 1", () => {
    const wrapper = mount(ThumbnailStatusBarField, {
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
          name: "fieldName",
          'done-states': ['entry1']
        },
        data: {
          fieldName: "entry1"
        }
      }
    });
    expect(wrapper.element).toMatchSnapshot();
  });

  it("With value and done state 2", () => {
    const wrapper = mount(ThumbnailStatusBarField, {
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
          name: "fieldName",
          'done-states': ['entry1']
        },
        data: {
          fieldName: "entry2"
        }
      }
    });
    expect(wrapper.element).toMatchSnapshot();
  });
});

describe("Field.StatusBar for Resource.Form", () => {
  const FormStatusBarField = getComponentPrototype("furet-ui-form-field-statusbar");

  it("Empty", () => {
    const wrapper = mount(FormStatusBarField, {
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
    const wrapper = mount(FormStatusBarField, {
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
    const wrapper = mount(FormStatusBarField, {
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

  it("With unknown value", () => {
    const wrapper = mount(FormStatusBarField, {
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
    const wrapper = mount(FormStatusBarField, {
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
    const wrapper = mount(FormStatusBarField, {
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

  it("With value and dangerous state 1", () => {
    const wrapper = mount(FormStatusBarField, {
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
          name: "fieldName",
          'dangerous-states': ['entry1']
        },
        data: {
          fieldName: "entry1"
        }
      }
    });
    expect(wrapper.element).toMatchSnapshot();
  });

  it("With value and dangerous state 2", () => {
    const wrapper = mount(FormStatusBarField, {
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
          name: "fieldName",
          'dangerous-states': ['entry1']
        },
        data: {
          fieldName: "entry2"
        }
      }
    });
    expect(wrapper.element).toMatchSnapshot();
  });

  it("With value and done state 1", () => {
    const wrapper = mount(FormStatusBarField, {
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
          name: "fieldName",
          'done-states': ['entry1']
        },
        data: {
          fieldName: "entry1"
        }
      }
    });
    expect(wrapper.element).toMatchSnapshot();
  });

  it("With value and done state 2", () => {
    const wrapper = mount(FormStatusBarField, {
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
          name: "fieldName",
          'done-states': ['entry1']
        },
        data: {
          fieldName: "entry2"
        }
      }
    });
    expect(wrapper.element).toMatchSnapshot();
  });
});
