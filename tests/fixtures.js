import Buefy from "buefy";
import Notifications from "vue-notification";
import Vuex from "vuex";
import { createLocalVue } from "@vue/test-utils";
import Router from "vue-router";
import { createRouter, routes } from "@/router";
import { createStore } from "@/store";

import { i18n } from "@/i18n";
import PluginDispatch from "@/plugins/dispatch.js";

// freeze time in buefy unittest test to get predictable snapshot
const dateCreator = () => new Date("2020-06-10T16:22:11.000+02:00");

// shared localVue
global.localVue = createLocalVue();
global.localVue.use(Buefy, {
  defaultIconPack: "fa",
  defaultDatetimeCreator: dateCreator,
  defaultDateCreator: dateCreator,
});
global.localVue.use(Notifications);
global.localVue.use(Vuex);
global.localVue.use(Router);

const store = createStore();
const router = createRouter(store, routes);

i18n.locale = "en";
global.localVue.use(PluginDispatch, { router, store, i18n });
global.store = store;
global.router = router;

document.execCommand = () => {};
document.getSelection = () => {};
