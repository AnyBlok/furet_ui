import { shallowMount } from "@vue/test-utils";
import { defineComponent, getComponentPrototype } from "@/components/factory";

describe("components factory", () => {
  it("createComponents homepage", () => {
    const wrapper = shallowMount({ template: "<homepage />" });
    expect(wrapper.element).toMatchSnapshot();
  });

  it("createComponents add component and over write it", () => {
    defineComponent("fooBar", { template: "<homepage />" });

    const wrapper = shallowMount(getComponentPrototype("fooBar"));
    expect(wrapper.element).toMatchSnapshot();
  });

  it("createComponents add component with extend", () => {
    defineComponent("foo", { template: "<homepage />" });
    defineComponent("Bar", { extend: ["foo"] });

    const wrapper = shallowMount(getComponentPrototype("Bar"));
    expect(wrapper.element).toMatchSnapshot();
  });
});
