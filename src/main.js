import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "@/store/index";
import config from "@/config";
import axios from "axios";
import VueAxios from "vue-axios";
import VueCookie from "vue-cookie";
import configureAxios from "./axios-config";
import i18n from "./locales/index";

Vue.use(VueCookie);
Vue.config.productionTip = false;
Vue.prototype.$config = config;
configureAxios({ axios, Vue });
Vue.use(VueAxios, axios);

new Vue({
  router,
  store,
  i18n,
  render: h => h(App)
}).$mount("#app");
