import { createApp } from 'vue';

import App from './App.vue';
import router from './router';
import alert from '@/hooks/alert';
import mediaPermission from '@/hooks/mediaPermission';

import "@/assets/styles/main.css";
import '@/assets/styles/transitions.css';

const app = createApp(App);
app.use(mediaPermission);
app.use(router);
app.use(alert);

app.mount('#app');
