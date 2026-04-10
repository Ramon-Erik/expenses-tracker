import { createApp } from 'vue'
import App from './App.vue'

import Toast from 'vue-toastification'
import type { PluginOptions } from 'vue-toastification'
import 'vue-toastification/dist/index.css'
import '@/assets/variables.css'
import router from './router'

const app = createApp(App)

const toastOptions: PluginOptions = {}
app.use(Toast, toastOptions)

app.use(router)

app.mount('#app')
