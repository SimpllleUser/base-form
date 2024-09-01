import './assets/main.css';

import { createApp } from 'vue';
import { createPinia } from 'pinia';

import 'vuetify/styles';

import { vuetify } from './core/plugins/vuetify/index';
import App from './App.vue';
import router from './router';

const app = createApp(App);

app.use(vuetify);
app.use(createPinia());
app.use(router);

app.mount('#app');
