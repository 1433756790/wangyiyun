import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store/index";
import moment from "moment";
// 封装是全局指令
Vue.filter("datefmt", function(input, fmtstring) {
  //当input为时间戳，需转为Number类型
  if (input) {
    return moment(input).format(fmtstring);
  } else {
    return "";
  }
});
Vue.filter("playcountfmt", function(value) {
  if (!value) return "";
  value = (value / 10000).toFixed(1);
  return value;
});

// 引入axios
import { request } from "./network/request";
Vue.prototype.$http = request;

// css格式化
import "../src/assets/css/reset.css";

// 引入element
import Element from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
Vue.use(Element);

// fontawesome
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { far } from "@fortawesome/free-regular-svg-icons";
import { fab } from "@fortawesome/free-brands-svg-icons";
import {
  FontAwesomeIcon,
  FontAwesomeLayers,
  FontAwesomeLayersText,
} from "@fortawesome/vue-fontawesome";

library.add(fas, far, fab);

Vue.component("font-awesome-icon", FontAwesomeIcon);
Vue.component("font-awesome-layers", FontAwesomeLayers);
Vue.component("font-awesome-layers-text", FontAwesomeLayersText);

Vue.config.productionTip = false;

// 路由导航守卫
new Vue({
  router,
  render: (h) => h(App),
  store,
}).$mount("#app");
