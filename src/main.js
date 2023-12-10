// import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import routers from './routers/index.js'
import { createPinia} from 'pinia'
const pinia = createPinia()

const app = createApp(App)
app.use(routers) 
app.use(pinia)
app.mount('#app')
