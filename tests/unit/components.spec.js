import { mount } from "@vue/test-utils";
import { defineComponent, getComponentPrototype } from "@/components/factory";

const localVue = global.localVue;

describe("components factory", () => {
  it("createComponents makes homepage component available to new component", () => {
    const wrapper = mount(
      { template: "<homepage />" },
      {
        localVue
      }
    );
    expect(wrapper.element).toMatchSnapshot();
  });

  it("Define a new component overwrite it and mount it", () => {
    defineComponent("fooBar", { template: `<homepage />` });
    defineComponent("fooBar", { template: `<homepage />` });

    const wrapper = mount(getComponentPrototype("fooBar"), { localVue });
    expect(wrapper.element).toMatchSnapshot();
  });

  it("Define a new component with extend", () => {
    defineComponent("Bar", { extend: ["homepage"] });

    const wrapper = mount(getComponentPrototype("Bar"), { localVue });
    expect(wrapper.element).toMatchSnapshot();
  });
});
