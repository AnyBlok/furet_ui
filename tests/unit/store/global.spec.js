import { createLocalVue } from "@vue/test-utils";
import { getters, defaultState, mutations } from "@/store/modules/global";
import Vuex from "vuex";

const localVue = createLocalVue();
localVue.use(Vuex);

describe("store global module: Mutation", () => {
  let state;
  let store;

  beforeEach(() => {
    // Make test predictable deep copying state before each test
    state = JSON.parse(JSON.stringify(defaultState));
    store = new Vuex.Store({
      getters,
      state,
      mutations,
    });
  });

  it("test PushBreadcrumb mutation", () => {
    store.commit("PushBreadcrumb", "test");
    expect(state.breadcrumb.length).toBe(1);
    expect(state.breadcrumb[0]).toBe("test");
  });

  it("test SET_LOGIN_PAGE mutation", () => {
    state.loginPage = "test";
    store.commit("SET_LOGIN_PAGE", { login_page: "changed" });
    expect(state.loginPage).toBe("changed");
  });

  it("test ClearBreadcrumbFrom mutation", () => {
    state.breadcrumb = ["a", "b", "c"];
    store.commit("ClearBreadcrumbFrom", 1);
    expect(state.breadcrumb.length).toBe(1);
    expect(state.breadcrumb[0]).toBe("a");
  });

  it("test ClearBreadcrumb mutation", () => {
    state.breadcrumb = [{ test: "1" }, { test: "2" }, { test: "3" }];
    store.commit("ClearBreadcrumb");
    expect(state.breadcrumb.length).toBe(0);
  });

  it("test PopBreadcrumb mutation", () => {
    state.breadcrumb = [{ test: "1" }, { test: "2" }, { test: "3" }];
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
      space_name: "My menu",
    });
    store.commit("LOGOUT", { userName: "test" });
    expect(state.authenticated).toBe(false);
    expect(state.userName).toBe("");
    expect(state.space_name).toBe("Menu");
  });

  it("test UPDATE_PREVIOUS_ROUTE", () => {
    expect(state.previous_route).toStrictEqual({});
    store.commit("UPDATE_PREVIOUS_ROUTE", { route: "test" });
    expect(state.previous_route).toStrictEqual("test");
  });

  it("test UPDATE_SPACE_MENUS", () => {
    expect(state.space_menus).toStrictEqual([]);
    store.commit("UPDATE_SPACE_MENUS", { menus: [1, 2, 3] });
    expect(state.space_menus).toStrictEqual([1, 2, 3]);
  });

  it("test UPDATE_CURRENT_SPACE", () => {
    expect(state.space_name).toBe("Menu");
    store.commit("UPDATE_CURRENT_SPACE", { label: "test" });
    expect(state.space_name).toBe("test");
  });

  it("test UPDATE_GLOBAL", () => {
    expect(state.isOpenLeft).toBe(false);
    store.commit("UPDATE_GLOBAL", { isOpenLeft: true });
    expect(state.isOpenLeft).toBe(true);
  });

  it("test OPEN_LEFT_MENU", () => {
    expect(state.isOpenLeft).toBe(false);
    store.commit("OPEN_LEFT_MENU", true);
    expect(state.isOpenLeft).toBe(true);
    store.commit("OPEN_LEFT_MENU", false);
    expect(state.isOpenLeft).toBe(false);
  });

  it("test OPEN_RIGHT_MENU", () => {
    expect(state.isOpenRight).toBe(false);
    store.commit("OPEN_RIGHT_MENU", true);
    expect(state.isOpenRight).toBe(true);
    store.commit("OPEN_RIGHT_MENU", false);
    expect(state.isOpenRight).toBe(false);
  });

  it("test UPDATE_CURRENT_LEFT_MENUS", () => {
    expect(state.left_menus).toStrictEqual([]);
    store.commit("UPDATE_CURRENT_LEFT_MENUS", { menus: [1, 2, 3] });
    expect(state.left_menus).toStrictEqual([1, 2, 3]);
  });

  it("test UPDATE_CURRENT_RIGHT_MENUS", () => {
    expect(state.right_menus).toStrictEqual([]);
    store.commit("UPDATE_CURRENT_RIGHT_MENUS", { menus: [1, 2, 3] });
    expect(state.right_menus).toStrictEqual([1, 2, 3]);
  });
});

describe("store global module: Getter", () => {
  let state;
  let store;

  beforeEach(() => {
    // Make test predictable deep copying state before each test
    state = JSON.parse(JSON.stringify(defaultState));
    store = new Vuex.Store({
      getters,
      state,
      mutations,
    });
  });

  it("test loggedIn", () => {
    expect(store.getters.loggedIn).toBe(false);
  });

  it("test isLoaded", () => {
    expect(store.getters.isLoaded).toBe(false);
  });
});
