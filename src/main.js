import { createApp } from 'vue'
import App from './App.vue'

import './assets/main.css'

import colors from 'vuetify/lib/util/colors'

// Vuetify
import '@mdi/font/css/materialdesignicons.css' // Ensure you are using css-loader
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import router from './router'
import Toast from "vue-toastification";
import "vue-toastification/dist/index.css";
import VueSweetalert2 from 'vue-sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';




const myCustomLightTheme = {
  dark: false,
  colors: {
    background: '#FFFFFF',
    surface: '#FFFFFF',
    primary: '#FFDA55',
    'primary-darken-1': '#3700B3',
    secondary: '#EDEEF2',
    'secondary-darken-1': '#018786',
    error: '#B00020',
    info: '#2196F3',
    success: '#4CAF50',
    warning: '#FB8C00',
  }
}

const vuetify = createVuetify({
  components,
  directives,
  icons: {
    defaultSet: 'mdi', // This is already the default value - only for display purposes
  },
  theme: {
    defaultTheme: 'myCustomLightTheme',
    themes: {
      myCustomLightTheme,
    }
  },
  // theme: {
  //   defaultTheme: "customDarkTheme",
  //   themes: {
  //     customDarkTheme,
  //   },
  // },
  // icons: {
  //   iconfont: 'md' || 'fa' 
  // },
})

createApp(App).use(vuetify).use(router).use(Toast).use(VueSweetalert2).mount('#app')
