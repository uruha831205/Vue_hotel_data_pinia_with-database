// import './assets/main.css'
import App from "./App.vue";

import { createApp } from "vue";
import { createPinia } from "pinia";
import { createVuetify } from "vuetify"; //icon
import * as components from "vuetify/components"; //icon
import * as directives from "vuetify/directives"; //icon
import "@mdi/font/css/materialdesignicons.css"; //icon

const app = createApp(App);
const pinia = createPinia();
const vuetify = createVuetify({
  components,
  directives,
  icons: {
    defaultSet: "mdi",
  },
});

app.use(pinia);
app.use(vuetify);
app.mount("#app");
