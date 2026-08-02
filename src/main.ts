import { createApp } from 'vue';
import App from './App.vue';
import router from './router';

import { createPinia } from 'pinia';

const app = createApp(App);

// ★ Pinia を登録
const pinia = createPinia();
app.use(pinia);

// ★ Router を登録
app.use(router);

// ★ マウント
app.mount('#app');
