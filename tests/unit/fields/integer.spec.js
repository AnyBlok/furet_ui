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

describe("Field.Integer for Resource.List", () => {
  const ListIntegerField = getComponentPrototype("furet-ui-list-field-integer");

  it("Empty", () => {
    const wrapper = mount(ListIntegerField, {
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
    const wrapper = mount(ListIntegerField, {
      store,
      localVue,
      provide,
      propsData: {
        resource: {},
        config: {
          name: "fieldName"
        },
        data: {
          fieldName: 10
        }
      }
    });

    expect(wrapper.element).toMatchSnapshot();
  });

  it("With value and slot", () => {
    const wrapper = mount(ListIntegerField, {
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
          fieldName: 10
        }
      }
    });

    expect(wrapper.element).toMatchSnapshot();
  });
});

describe("Field.Integer for Resource.Thumbnail", () => {
  const ThumbnailIntegerField = getComponentPrototype("furet-ui-thumbnail-field-integer");

  it("Empty", () => {
    const wrapper = mount(ThumbnailIntegerField, {
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
    const wrapper = mount(ThumbnailIntegerField, {
      store,
      localVue,
      provide,
      propsData: {
        resource: {},
        config: {
          name: "fieldName"
        },
        data: {
          fieldName: 10
        }
      }
    });
    expect(wrapper.element).toMatchSnapshot();
  });

  it("With value and slot", () => {
    const wrapper = mount(ThumbnailIntegerField, {
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
          fieldName: 10
        }
      }
    });
    expect(wrapper.element).toMatchSnapshot();
  });
});

describe("Field.Integer for Resource.Form", () => {
  const FormIntegerField = getComponentPrototype("furet-ui-form-field-integer");

  it("Empty", () => {
    const wrapper = mount(FormIntegerField, {
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
    const wrapper = mount(FormIntegerField, {
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
          fieldName: 15
        }
      }
    });

    expect(wrapper.element).toMatchSnapshot();
  });

  it("With value, label, readonly and slot", () => {
    const wrapper = mount(FormIntegerField, {
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
          fieldName: 15
        }
      }
    });

    expect(wrapper.element).toMatchSnapshot();
  });

  it("With value, label, icon and placeholder", () => {
    const wrapper = mount(FormIntegerField, {
      store,
      localVue,
      provide,
      propsData: {
        resource: {
          readonly: false
        },
        config: {
          name: "fieldName",
          label: "My field label",
          min: 5,
          max: 20,
          placeholder: "An explicit placeholder",
          icon: "user"
        },
        data: {
          fieldName: 15
        }
      }
    });
    expect(wrapper.element).toMatchSnapshot();
    expect(wrapper.find("input").element.value).toBe("15");
  });
});
