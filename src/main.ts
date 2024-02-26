import App from './App.vue'
import router from './router';

import { IonicVue } from '@ionic/vue';



import './theme/variables.css';
import { createApp } from 'vue';

const app = createApp(App)
  .use(IonicVue)
  .use(router);

router.isReady().then(() => {
  app.mount('#app');
});