import { shallowMount } from "@vue/test-utils";
import { getComponentPrototype } from "@/components/factory";

const localVue = global.localVue;

describe("Homepage", () => {
  it("test homepage", () => {
    const wrapper = shallowMount(getComponentPrototype("homepage"), {
      localVue
    });
    expect(wrapper.element).toMatchSnapshot();
  });
});
