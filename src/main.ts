import { createApp } from 'vue';
import { createPinia } from 'pinia';

import App from './App.vue';
import ElementPlus from 'element-plus';
import 'normalize.css';
import 'element-plus/dist/index.css';
import '@/assets/element-icon/el-index.css';

const app = createApp(App);
app.use(createPinia());
app.use(ElementPlus);
app.mount('#app');
