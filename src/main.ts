import axios from "axios";
import App from "./App.vue";
import store from "./store";
import router from "./router";
import { createApp } from "vue";

axios.defaults.baseURL = "https://api.github.com";

createApp(App).use(store).use(router).mount("#app");
