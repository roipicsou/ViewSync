import { createManager } from '@vue-youtube/core';
import { createApp } from 'vue';

import app from './App.vue';

createApp(app).use(createManager()).mount('#app');