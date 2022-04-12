import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import BootstrapVue3 from 'bootstrap-vue-3'
import vueChartkick from 'vue-chartkick'
import 'chartkick/chart.js'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue-3/dist/bootstrap-vue-3.css'

const app = createApp(App).use(router)
app.use(BootstrapVue3)
app.use(vueChartkick)
app.mount('#app')
