// import ElementPlus from 'element-plus'
import "element-plus/dist/index.css";
import "./assets/main.css";

import { createApp } from "vue";
import App from "./App.vue";
import routers from "./routers/index.js";
import PrimeVue from 'primevue/config';
import { createPinia } from "pinia";
import axios from "./apis/index.js";
import 'primevue/resources/themes/lara-light-green/theme.css'
// import 'primevue/resources/themes/saga-blue/theme.css'; // Choose your preferred theme
// import 'primevue/resources/primevue.min.css';
// import 'primeicons/primeicons.css';
const pinia = createPinia();

const app = createApp(App);
// InputText
import InputText from 'primevue/inputtext'
import Slider from 'primevue/slider';

app.use(axios);
app.use(routers);
app.use(pinia);
app.use(PrimeVue)
app.component('Slider', Slider);
app.component('InputText', InputText);

app.mount("#app");
