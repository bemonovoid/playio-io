import { createApp } from 'vue'
import axios from 'axios';
import VueAxios from "vue-axios";
import DesktopAppComponent from './components/desktop/DesktopAppComponent.vue'
import router from "./router";
import { Quasar } from 'quasar'
import quasarUserOptions from './quasar-user-options'
import {createHead} from '@vueuse/head';

createApp(DesktopAppComponent).use(VueAxios, axios).use(Quasar, quasarUserOptions).use(router).use(createHead()).mount('#app')
