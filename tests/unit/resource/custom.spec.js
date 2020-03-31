import { mount } from "@vue/test-utils";
import { getComponentPrototype } from "@/components/factory";

const localVue = global.localVue;
const store = global.store;

store.state.resource[1] = { component: "b-table" };
const wrapper = mount(getComponentPrototype("furet-ui-resource-custom"), {
  store,
  localVue,
  propsData: {
    id: 1,
    manager: {}
  }
});

describe("Custom resource", () => {
  it("test furet ui resource custom", () => {
    expect(wrapper.element).toMatchSnapshot();
  });

  it("test update-query-string event properly raised", async () => {
    wrapper.vm.updateQueryString("test");
    await wrapper.vm.$nextTick();
    expect(wrapper.emitted("update-query-string").length).toBe(1);
    expect(wrapper.emitted("update-query-string")[0]).toEqual(["test"]);
  });
});
