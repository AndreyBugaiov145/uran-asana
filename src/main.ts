import './assets/main.css'
import 'bootstrap/dist/css/bootstrap.min.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './views/App.vue'
import { init } from '@/common/initProject'

init()

const app = createApp(App)

app.use(createPinia())

app.mount('#app')
