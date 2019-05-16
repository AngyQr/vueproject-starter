import "@fortawesome/fontawesome-free/css/all.css";
import "material-design-icons-iconfont/dist/material-design-icons.css";
import Vue from "vue";
import Vuetify from "vuetify";
import "vuetify/dist/vuetify.css";
import zhHans from "vuetify/es5/locale/es";
import App from "./App";

Vue.config.productionTip = false;

// https://vuetifyjs.com/en/style/colors
Vue.use(Vuetify, {
  lang: {
    locales: { zhHans },
    current: "zhHans",
  },
  theme: {
    primary: "#FF5100",
    secondary: "#FF7101",
    accent: "#009FFD",
    error: "#FF5252",
    info: "#2196F3",
    success: "#4CAF50",
    warning: "#FFC107",
  },
});

new Vue({
  el: "#root",
  components: { App },
  template: "<App/>",
});
