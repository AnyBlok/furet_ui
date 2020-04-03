import { createLocalVue } from "@vue/test-utils";
import { getters, defaultState, mutations } from "@/store/modules/global";
import Vuex from "vuex";

const localVue = createLocalVue();
localVue.use(Vuex);

describe("store global module", () => {
  let state;
  let store;

  beforeEach(() => {
    // Make test predictable deep copying state before each test
    state = JSON.parse(JSON.stringify(defaultState));
    store = new Vuex.Store({
      getters,
      state,
      mutations
    });
  });

  it("test PushBreadcrumb mutation", () => {
    store.commit("PushBreadcrumb", "test");
    expect(state.breadcrumb.length).toBe(1);
    expect(state.breadcrumb[0]).toBe("test");
  });

  it("test ClearBreadcrumbFrom mutation", () => {
    state.breadcrumb = ["a", "b", "c"]
    store.commit("ClearBreadcrumbFrom", 1);
    expect(state.breadcrumb.length).toBe(1);
    expect(state.breadcrumb[0]).toBe("a");
  });
  
  it("test ClearBreadcrumb mutation", () => {
    state.breadcrumb = [{test: "1"}, {test: "2"}, {test: "3"}]
    store.commit("ClearBreadcrumb");
    expect(state.breadcrumb.length).toBe(0);
  });
  
  it("test PopBreadcrumb mutation", () => {
    state.breadcrumb = [{test: "1"}, {test: "2"}, {test: "3"}]
    store.commit("PopBreadcrumb");
    expect(state.breadcrumb.length).toBe(2);
    expect(state.breadcrumb[1].test).toBe("2");
  });

  it("test FURETUI LOADED mutation", () => {
    expect(state.appLoaded).toBe(false);
    store.commit("FURETUI LOADED");
    expect(state.appLoaded).toBe(true);
  });

  it("test LOGIN mutation", () => {
    expect(state.authenticated).toBe(false);
    store.commit("LOGIN");
    expect(state.authenticated).toBe(true);
    expect(state.userName).toBe("");
  });

  it("test LOGIN mutation with undefined", () => {
    expect(state.authenticated).toBe(false);
    store.commit("LOGIN", undefined);
    expect(state.authenticated).toBe(true);
    expect(state.userName).toBe("");
  });

  it("test LOGIN mutation with undefined username", () => {
    expect(state.authenticated).toBe(false);
    // TODO: PV: I'm wondering if python None is received as undefined or null ?
    store.commit("LOGIN", { userName: undefined });
    expect(state.authenticated).toBe(true);
    expect(state.userName).toBe("");
  });

  it("test LOGIN mutation with user name", () => {
    expect(state.authenticated).toBe(false);
    store.commit("LOGIN", { userName: "test" });
    expect(state.authenticated).toBe(true);
    expect(state.userName).toBe("test");
  });

  it("test LOGIN mutation with user name", () => {
    state = Object.assign(state, {
      authenticated: true,
      userName: "test",
      space_name: "My menu"
    });
    store.commit("LOGOUT", { userName: "test" });
    expect(state.authenticated).toBe(false);
    expect(state.userName).toBe("");
    expect(state.space_name).toBe("Menu");
  });
});
