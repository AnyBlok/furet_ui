import { shallowMount, mount } from "@vue/test-utils";
import { getComponentPrototype } from "@/components/factory";

const localVue = global.localVue;
const store = global.store;

describe("Custom resource", () => {
  it("test furet ui resource custom", () => {
    store.state.resource[1] = { component: "b-table" };
    const wrapper = mount(getComponentPrototype("furet-ui-resource-custom"), {
      store,
      localVue,
      propsData: {
        id: 1,
        manager: {}
      }
    });
    expect(wrapper.element).toMatchSnapshot();
  });
});
