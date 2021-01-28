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

describe("Field.Function for Resource.List", () => {
  const ListFunctionField = getComponentPrototype("furet-ui-list-field-function");

  it("Empty", () => {
    const wrapper = mount(ListFunctionField, {
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
    const wrapper = mount(ListFunctionField, {
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

describe("Field.Function for Resource.Thumbnail", () => {
  const ThumbnailFunctionField = getComponentPrototype("furet-ui-thumbnail-field-function");

  it("Empty", () => {
    const wrapper = mount(ThumbnailFunctionField, {
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
    const wrapper = mount(ThumbnailFunctionField, {
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

describe("Field.Function for Resource.Form", () => {
  const FormFunctionField = getComponentPrototype("furet-ui-form-field-function");

  it("Empty", () => {
    const wrapper = mount(FormFunctionField, {
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
    const wrapper = mount(FormFunctionField, {
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

});
