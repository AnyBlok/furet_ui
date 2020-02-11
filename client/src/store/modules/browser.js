export const defaultState = {
  list: [],
  offset: 0,
};

// getters
export const getters = {
  nextBrowserTarget(state) {
    if (state.list.length === 0) return undefined;
    else if (state.offset === state.list.length - 1) return state.list[0];
    return state.list[state.offset + 1];
  },
  previousBrowserTarget(state) {
    if (state.list.length === 0) return undefined;
    else if (state.offset === 0) return state.list[state.list.length - 1];
    return state.list[state.offset - 1];
  },
};

// actions
export const actions = {
};

// mutations
export const mutations = {
  CLEAR_BROWSER_LIST(state) {
    state.list = [];
    state.offset = 0;
  },
  UPDATE_BROWSER_LIST(state, action) {
    state.list = action.list;
    state.offset = 0;
  },
  DECREASE_BROWSER_OFFSET(state) {
    if (state.list.length === 0) state.offset = 0;
    else if (state.offset === 0) state.offset = state.list.length - 1;
    else state.offset -= 1;
  },
  INCREASE_BROWSER_OFFSET(state) {
    if (state.list.length === 0) state.offset = 0;
    else if (state.offset === state.list.length - 1) state.offset = 0;
    else state.offset += 1;
  },
};

export default {
  state: defaultState,
  getters,
  actions,
  mutations,
};
