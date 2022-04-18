import { createApp } from 'vue'
import axios from 'axios';
import VueAxios from "vue-axios";
import PlayqdApplicationComponent from './components/desktop/PlayqdApplicationComponent.vue'
import router from "./router";
import { Quasar } from 'quasar'
import quasarUserOptions from './quasar-user-options'
import {createHead} from '@vueuse/head';

createApp(PlayqdApplicationComponent)
    .use(VueAxios, axios)
    .use(Quasar, quasarUserOptions)
    .use(router)
    .use(createHead())
    .mount('#app')
