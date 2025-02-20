import { createApp } from 'vue';
import App from './App.vue';

// 🔹 Importar Vuetify correctamente
import { createVuetify } from 'vuetify';
import 'vuetify/styles';

// 🔹 Importar iconos de Material Design para Vuetify
import { aliases, mdi } from 'vuetify/iconsets/mdi';

// 🔹 Crear instancia de Vuetify con iconos incluidos
const vuetify = createVuetify({
  icons: {
    defaultSet: 'mdi',
    aliases,
    sets: { mdi },
  },
});

// 🔹 Crear la aplicación y usar Vuetify
const app = createApp(App);
app.use(vuetify);
app.mount('#app');
