import { mount } from "@vue/test-utils";
import { getComponentPrototype } from "@/components/factory";

const value = new Date("2020-05-06T00:00:00.000Z")

const localVue = global.localVue;
const store = global.store;
const provide = {
  partIsReadonly: () => {
    return false;
  },
  updateChangeState: () => {}
};

describe("Field.Date for Resource.List", () => {
  const ListDateField = getComponentPrototype("furet-ui-list-field-date");

  it("Empty", () => {
    const wrapper = mount(ListDateField, {
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
    const wrapper = mount(ListDateField, {
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
          fieldName: value
        }
      }
    });

    expect(wrapper.element).toMatchSnapshot();
  });

  it("With value and slot", () => {
    const wrapper = mount(ListDateField, {
      store,
      localVue,
      provide,
      propsData: {
        resource: {},
        config: {
          name: "fieldName"
        },
        data: {
          fieldName: value
        }
      }
    });

    expect(wrapper.element).toMatchSnapshot();
  });
});

describe("Field.Date for Resource.Thumbnail", () => {
  const ThumbnailDateField = getComponentPrototype("furet-ui-thumbnail-field-date");

  it("Empty", () => {
    const wrapper = mount(ThumbnailDateField, {
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
    const wrapper = mount(ThumbnailDateField, {
      store,
      localVue,
      provide,
      propsData: {
        resource: {},
        config: {
          name: "fieldName"
        },
        data: {
          fieldName: value
        }
      }
    });

    expect(wrapper.element).toMatchSnapshot();
  });

  it("With value and slot", () => {
    const wrapper = mount(ThumbnailDateField, {
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
          fieldName: value
        }
      }
    });

    expect(wrapper.element).toMatchSnapshot();
  });
});

describe("Field.Date for Resource.Form", () => {
  const FormDateField = getComponentPrototype("furet-ui-form-field-date");
  jest.spyOn(global.Date, 'now').mockImplementationOnce(() => value.valueOf())

  it("Empty", () => {
    const wrapper = mount(FormDateField, {
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
    const wrapper = mount(FormDateField, {
      store,
      localVue,
      provide,
      propsData: {
        resource: {
          readonly: true
        },
        data: {},
        config: {}
      }
    });
    expect(wrapper.element).toMatchSnapshot();
  });

  it("With value, label, readonly", () => {
    const wrapper = mount(FormDateField, {
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
          fieldName: value
        }
      }
    });

    expect(wrapper.element).toMatchSnapshot();
  });

  it("With value, label, readonly and slot", () => {
    const wrapper = mount(FormDateField, {
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
          label: "My field label"
        },
        data: {
          fieldName: value
        }
      }
    });

    expect(wrapper.element).toMatchSnapshot();
  });

  it("With value, label and icon", () => {
    const wrapper = mount(FormDateField, {
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
          fieldName: value
        }
      }
    });
    expect(wrapper.element).toMatchSnapshot();
  });

  it("trigger value", () => {
    const updateValue = jest.fn()
    const wrapper = mount(FormDateField, {
      store,
      localVue,
      provide,
      propsData: {
        resource: {
          readonly: false
        },
        config: {
          name: "fieldName",
        },
        data: {}
      },
      methods: {
        updateValue,
      },
    });
    expect(updateValue).not.toHaveBeenCalled()
    wrapper.vm.updateDateValue(value)
    expect(updateValue).toHaveBeenCalled()
    expect(updateValue).toHaveBeenLastCalledWith('2020-05-06T00:00:00.000Z')
  });
});
