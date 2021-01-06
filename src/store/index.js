import Vue from "vue";
import Vuex from "vuex";

import modules from "./modules";

Vue.use(Vuex);
const debug = process.env.NODE_ENV !== "production";

export const storeDef = {
  modules,
  strict: debug
};

export const createStore = () => new Vuex.Store(storeDef);
export default createStore;
