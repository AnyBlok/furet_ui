import Buefy from "buefy";
import Notifications from "vue-notification";
import Vuex from "vuex";
import { createLocalVue } from "@vue/test-utils";
import Router from "vue-router";
import { createRouter, routes } from "@/router";
import { createStore } from "@/store";

import { i18n } from "@/i18n";
import PluginDispatch from "@/plugins/dispatch.js";

// shared localVue
global.localVue = createLocalVue();
global.localVue.use(Buefy, { defaultIconPack: "fa" });
global.localVue.use(Notifications);
global.localVue.use(Vuex);
global.localVue.use(Router);

const store = createStore();
const router = createRouter(store, routes);
global.localVue.use(PluginDispatch, { router, store, i18n });
