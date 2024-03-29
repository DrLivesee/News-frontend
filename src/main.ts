import { createApp } from "vue";
import App from "@/App.vue";
import router from "@/router";
import { createPinia } from "pinia";


const pinia = createPinia();
const vueApp = createApp(App);

vueApp.use(pinia);
vueApp.use(router);
vueApp.mount("#app");
