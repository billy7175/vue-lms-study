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
import { useUserState } from './stores/user'
import VueCookies from 'vue-cookies'



app.use(axios);
app.use(routers);
app.use(pinia);
app.use(VueCookies, { expire: '7d' })
const userState = useUserState()
app.use(PrimeVue)
const token = VueCookies.get('token')
const user = VueCookies.get('user')
if (token) {
    userState.loginUser({
        token,
        user
    })
}

app.mount("#app");
