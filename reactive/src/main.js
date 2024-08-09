/**
 * main.js
 *
 * Bootstraps Vuetify and other plugins then mounts the App`
 */

// Components

import App from './App.vue'
import router from "./router";
import store from './store/index.js'
 
// Composables
import { createApp } from 'vue'
 

// Plugins
import { registerPlugins } from '@/plugins'

import { globalCookiesConfig } from "vue3-cookies";
import LoadScript from "vue-plugin-load-script";

globalCookiesConfig({
   
    path: "/",
    domain: "",
    secure: true,
    sameSite: "Strict",
  });

const app = createApp(App)

registerPlugins(app)
app.use(router);
app.use(store)
app.use(LoadScript)
app.mount('#app')

