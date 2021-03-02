import { mount } from "@vue/test-utils";
import { getComponentPrototype } from "@/components/factory";
import { i18n } from "@/i18n";
import axios from "axios";

const localVue = global.localVue;
const router = global.router;
const store = global.store;

const mockaxios = jest.spyOn(axios, "post");
mockaxios.mockResolvedValue({ data: [] });

describe("app component", () => {
  it("snapshot: init", () => {
    const wrapper = mount(getComponentPrototype("furet-ui-login-password"), {
      store,
      localVue,
      router,
      i18n,
    });
    expect(wrapper.element).toMatchSnapshot();
    expect(wrapper.vm.is_not_clickable).toBe(true);
  });
  it("snapshot: with auth and errors", () => {
    const wrapper = mount(getComponentPrototype("furet-ui-login-password"), {
      store,
      localVue,
      router,
      i18n,
    });
    wrapper.setData({
      username: "login",
      password: "password",
      errors: ["Error 1", "Error 2"],
    });
    expect(wrapper.element).toMatchSnapshot();
    expect(wrapper.vm.is_not_clickable).toBe(false);
  });
  it("login: ok", () => {
    const wrapper = mount(getComponentPrototype("furet-ui-login-password"), {
      store,
      localVue,
      router,
      i18n,
    });
    wrapper.setData({
      username: "login",
      password: "password",
      errors: ["Error 1", "Error 2"],
    });
    wrapper.vm.logIn();
  });
});
