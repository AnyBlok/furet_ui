import { mount } from "@vue/test-utils";
import { getComponentPrototype } from "@/components/factory";

const localVue = global.localVue;
const store = global.store;

const wrapper = mount(getComponentPrototype("furet-ui-form-field-string"), {
  store,
  localVue,
  propsData: {
    resource: {},
    data: {},
    config: {}
  },
  mocks: {
    partIsReadonly: () => {
      return false;
    }
  }
});

describe("String field", () => {
  it("test furet ui form field string", () => {
    expect(wrapper.element).toMatchSnapshot();
  });
});
