import { createLocalVue } from "@vue/test-utils";
import { getters, defaultState, mutations } from "@/store/modules/resource";
import Vuex from "vuex";

const localVue = createLocalVue();
localVue.use(Vuex);

describe("store resource module: Mutation", () => {
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

  it("test UPDATE_RESOURCES", () => {
    expect(state).toStrictEqual({});
    store.commit("UPDATE_RESOURCES", {definitions: [{id: 1, foo: 'Bar'}]});
    expect(state).toStrictEqual({"1": {foo: "Bar", id: 1}});
  });

  it("test UPDATE_RESOURCE_TOGGLE_HIDDEN_COLUMN", () => {
    store.commit("UPDATE_RESOURCES", {definitions: [
        {id: 1, headers: [{name: 'foo'}, {name: 'bar'}]},
    ]});
    expect(state["1"].headers[0]['hidden-column']).toStrictEqual(undefined);
    expect(state["1"].headers[1]['hidden-column']).toStrictEqual(undefined);

    store.commit("UPDATE_RESOURCE_TOGGLE_HIDDEN_COLUMN", {id: 1, field: 'foo'});
    expect(state["1"].headers[0]['hidden-column']).toStrictEqual(true);
    expect(state["1"].headers[1]['hidden-column']).toStrictEqual(undefined);

    store.commit("UPDATE_RESOURCE_TOGGLE_HIDDEN_COLUMN", {id: 1, field: 'foo'});
    expect(state["1"].headers[0]['hidden-column']).toStrictEqual(false);
    expect(state["1"].headers[1]['hidden-column']).toStrictEqual(undefined);
  });
});
