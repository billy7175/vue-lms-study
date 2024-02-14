import { createApp } from "vue";
import App from "./App.vue";
import routers from "./routers/index.js";
import PrimeVue from "primevue/config";
import { createPinia } from "pinia";
import axios from "./apis/index.js";
import "primevue/resources/themes/lara-light-green/theme.css";
import "element-plus/dist/index.css";
import * as ElementPlusIconsVue from "@element-plus/icons-vue";
import "./assets/main.scss";
import BillyUI from "billy-ui";
console.log(BillyUI);
const pinia = createPinia();

const app = createApp(App);

import { useUserState } from "./stores/user";
import VueCookies from "vue-cookies";
app.provide("$alert", "hello globally");
app.use(axios);
app.use(routers);
app.use(pinia);
app.use(VueCookies, { expire: "7d" });
const userState = useUserState();
// import from './assets/styles/mixins.scss'
app.use(PrimeVue, {
  pt: {
    global: {
      // color:red;
      css: `
        .p-button-danger {
        }
      `,
    },
  },
  ripple: true,
});

app.config.globalProperties.$myGlobalFunction = function () {
  console.log("This is a global function!");
};
console.log(1212);
console.log(app);

const token = VueCookies.get("token");
const user = VueCookies.get("user");
if (token) {
  userState.loginUser({
    token,
    user,
  });
}

for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component);
}

app.mount("#app");
