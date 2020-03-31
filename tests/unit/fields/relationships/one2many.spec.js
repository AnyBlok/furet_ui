import { mount } from "@vue/test-utils";
import { getComponentPrototype } from "@/components/factory";

const localVue = global.localVue;
const store = global.store;

describe("One2Many field for form View", () => {

  const wrapper = mount(getComponentPrototype("furet-ui-form-field-one2many"), {
    store,
    localVue,
    propsData: {
      resource: {},
      data: {
        test: [{id: 1}],
      },
      config: {
        name: 'test',
      }
    },
    provide: {
      partIsReadonly: () => {
        return false;
      },
      updateChangeState: () => {
      },
    }
  });

  it("test furet ui form field string", () => {
    expect(wrapper.element).toMatchSnapshot();
  });
});
