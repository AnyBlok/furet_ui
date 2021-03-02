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

describe("Field.Url for Resource.List", () => {
  const ListUrlField = getComponentPrototype("furet-ui-list-field-url");

  it("Empty", () => {
    const wrapper = mount(ListUrlField, {
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
    const wrapper = mount(ListUrlField, {
      store,
      localVue,
      provide,
      propsData: {
        resource: {},
        config: {
          name: "fieldName"
        },
        data: {
          fieldName: "http://my.ferret"
        }
      }
    });
    expect(wrapper.element).toMatchSnapshot();
  });
});

describe("Field.Url for Resource.Thumbnail", () => {
  const ThumbnailUrlField = getComponentPrototype("furet-ui-thumbnail-field-url");

  it("Empty", () => {
    const wrapper = mount(ThumbnailUrlField, {
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
    const wrapper = mount(ThumbnailUrlField, {
      store,
      localVue,
      provide,
      propsData: {
        resource: {},
        config: {
          name: "fieldName"
        },
        data: {
          fieldName: "http://my.ferret"
        }
      }
    });
    expect(wrapper.element).toMatchSnapshot();
  });
});

describe("Field.Url for Resource.Form", () => {
  const FormUrlField = getComponentPrototype("furet-ui-form-field-url");

  it("Empty", () => {
    const wrapper = mount(FormUrlField, {
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
    const wrapper = mount(FormUrlField, {
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
          fieldName: "http://my.ferret"
        }
      }
    });

    expect(wrapper.element).toMatchSnapshot();
  });

  it("With value, label and icon", () => {
    const wrapper = mount(FormUrlField, {
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
          fieldName: "http://my.ferret"
        }
      }
    });
    expect(wrapper.element).toMatchSnapshot();
    expect(wrapper.find("input").element.value).toBe("http://my.ferret");
    expect(wrapper.find("input").element.placeholder).toBe(
      "An explicit placeholder"
    );
  });
  it("With value, label and icon with incorrect email", () => {
    const wrapper = mount(FormUrlField, {
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
          fieldName: "my-feret"
        }
      }
    });
    expect(wrapper.element).toMatchSnapshot();
  });
});
