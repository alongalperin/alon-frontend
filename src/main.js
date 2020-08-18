import Vue from "vue";
import App from "./App.vue";
import VueRouter from "vue-router";

import { store } from "./store/store";
import routes from "./router/routes";

Vue.config.productionTip = false;

Vue.use(VueRouter); // todo: move this router file

const router = new VueRouter({ routes });

store.dispatch("INIT_APP_USER_TOKEN");

new Vue({
  render: (h) => h(App),
  store,
  router,
}).$mount("#app");
