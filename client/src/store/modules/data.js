const getFromCollection = (collection, modelName, id) => {
  if (collection[modelName] === undefined) return {};
  if (collection[modelName][id] === undefined) return {};
  return collection[modelName][id];
};


export const defaultState = {
  model: {},
  change: {},
};

// getters
export const getters = {
  entry: state => (modelName, id) => {
    const model = getFromCollection(state.model, modelName, id);
    const change = getFromCollection(state.change, modelName, id);
    return Object.assign({}, model, change);
  },
  entries: (state, getter) => (modelName) => {
    const entries = [];
    const model = state.model[modelName];
    model.forEach((value, id) => {
      entries.push(getter.entry(modelName, id));
    });
    return entries;
  },
};

// actions
export const actions = {
};

// actions
export const mutations = {
};

export default {
  state: defaultState,
  getters,
  actions,
  mutations,
};
