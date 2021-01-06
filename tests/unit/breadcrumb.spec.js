import { mount } from "@vue/test-utils";
import { getComponentPrototype } from "@/components/factory";

const localVue = global.localVue;
const store = global.store;
const router = global.router;
const mock_router_push = jest.spyOn(router, "push");

describe("furet-ui-breadcrumb", () => {
  const Breadcrumb = getComponentPrototype("furet-ui-breadcrumb");

  beforeEach(() => {
    mock_router_push.mockClear()
  });

  it("Empty", () => {
    const wrapper = mount(Breadcrumb, {
      store,
      localVue
    });
    expect(wrapper.element).toMatchSnapshot();
  });

  it("with data", () => {
    store.commit("PushBreadcrumb", {
      label: "Home",
      icon: "home"
    });
    store.commit("PushBreadcrumb", {
      label: "User",
      icon: "user"
    });
    store.commit("PushBreadcrumb", {
      label: "Without icon"
    });
    store.commit("PushBreadcrumb", {
      label: "Null icon",
      icon: null
    });
    const wrapper = mount(Breadcrumb, {
      store,
      localVue
    });
    expect(wrapper.element).toMatchSnapshot();
  });

  it("makes sure end of history is removed after a click on an item", async () => {
    store.commit("ClearBreadcrumb");
    store.commit("PushBreadcrumb", {
      label: "Home",
      icon: "home",
      route: "Go to home"
    });
    store.commit("PushBreadcrumb", {
      label: "User",
      icon: "user",
      route: "Go to user"
    });
    store.commit("PushBreadcrumb", {
      label: "something else",
      route: "Go to somewhere else"
    });
    const wrapper = mount(Breadcrumb, {
      store,
      localVue,
      router
    });
    // Only Home should be display after clicking on User element
    await wrapper
      .findAll("li")
      .at(1)
      .find("a")
      .trigger("click");
    expect(wrapper.findAll("li").length).toBe(1);
    expect(mock_router_push).toHaveBeenLastCalledWith("Go to user");
    expect(wrapper.element).toMatchSnapshot();
  });
  it("makes sure data store changes is cleared when click on breadcrumb", () => {

    store.commit("ClearBreadcrumb");
    store.commit("PushBreadcrumb", {
      label: "Home",
      icon: "home",
      route: "Go to home"
    });
    store.commit("PushBreadcrumb", {
      label: "User",
      icon: "user",
      route: "Go to user"
    });
    store.commit("PushBreadcrumb", {
      label: "something else",
      route: "Go to somewhere else"
    });
    const commit_store_mock = jest.spyOn(store, "commit")
    const wrapper = mount(Breadcrumb, {
      store,
      localVue,
      router
    });
    // Only Home should be display after clicking on User element
    wrapper
      .findAll("li")
      .at(1)
      .find("a")
      .trigger("click");
      expect(commit_store_mock).toHaveBeenNthCalledWith(1, "ClearBreadcrumbFrom", 1);
      expect(commit_store_mock).toHaveBeenNthCalledWith(2, "CLEAR_CHANGE");
  });
});
