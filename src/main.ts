import { createApp } from 'vue'
import App from './App.vue'

import Toast from 'vue-toastification'
import type { PluginOptions } from 'vue-toastification'
import 'vue-toastification/dist/index.css'
import router from './router'
import { createPinia } from 'pinia'

const app = createApp(App)

const toastOptions: PluginOptions = {}
app.use(Toast, toastOptions)

app.use(router)
app.use(createPinia())

app.mount('#app')
