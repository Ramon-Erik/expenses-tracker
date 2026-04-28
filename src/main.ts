import { createApp } from "vue";
import { PluginOptions } from "vue-toastification";
import Toast from "vue-toastification";
import "vue-toastification/dist/index.css";
import "@/assets/style.css";

import App from "./App.vue";
import router from "./router/index";
import { createPinia } from "pinia";

const app = createApp(App);
const toastOptions: PluginOptions = {};

app.use(Toast, toastOptions);
app.use(createPinia());
app.use(router);

app.mount("#app");
