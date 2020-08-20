import { mount } from "@vue/test-utils";
import { getComponentPrototype } from "@/components/factory";
import { i18n } from "@/i18n";
import axios from "axios";

const localVue = global.localVue;
const router = global.router;
const store = global.store;

const mockAxios = jest.spyOn(axios, "post");
mockAxios.mockImplementationOnce(() =>
  Promise.resolve({ data: "redirect/uri" })
);
describe("app component", () => {
  beforeEach(() => {
    mockAxios.mockClear();
  });
  it("snapshot: init", () => {
    const wrapper = mount(getComponentPrototype("furet-ui-login-oidc"), {
      store,
      localVue,
      router,
      i18n,
    });
    expect(wrapper.element).toMatchSnapshot();
  });
  it("snapshot: with auth and errors", () => {
    const wrapper = mount(getComponentPrototype("furet-ui-login-oidc"), {
      store,
      localVue,
      router,
      i18n,
    });
    wrapper.setData({
      errors: ["Error 1", "Error 2"],
    });
    expect(wrapper.element).toMatchSnapshot();
  });
  it("login: ok", () => {
    const wrapper = mount(getComponentPrototype("furet-ui-login-oidc"), {
      store,
      localVue,
      router,
      i18n,
    });
    wrapper.vm.logIn();

    expect(mockAxios).toBeCalledWith("/furet-ui/oidc/login", {
      redirect: undefined,
    });
  });
});
