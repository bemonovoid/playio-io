import { createApp } from 'vue'
import axios from 'axios';
import VueAxios from "vue-axios";
import App from './App.vue'
import router from "./router";
import { Quasar } from 'quasar'
import quasarUserOptions from './quasar-user-options'

createApp(App).use(VueAxios, axios).use(Quasar, quasarUserOptions).use(router).mount('#app')
