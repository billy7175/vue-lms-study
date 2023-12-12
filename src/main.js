// import ElementPlus from 'element-plus'
import "element-plus/dist/index.css";
import "./assets/main.css";

import { createApp } from "vue";
import App from "./App.vue";
import routers from "./routers/index.js";
import PrimeVue from 'primevue/config';
import { createPinia } from "pinia";
import axios from "./apis/index.js";
const pinia = createPinia();

const app = createApp(App);

app.use(axios);
app.use(routers);
app.use(pinia);
app.use(PrimeVue)

app.mount("#app");
