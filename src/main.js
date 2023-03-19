import { createApp } from 'vue'
import App from './App.vue'
import bootstrap from 'bootstrap';

import './assets/main.css'

import colors from 'vuetify/lib/util/colors'

// Vuetify
import '@mdi/font/css/materialdesignicons.css' // Ensure you are using css-loader
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import router from './router'



// const customDarkTheme = {
//   dark: true,
//   colors: {
//     background: "#15202b",
//     surface: "#15202b",
//     primary: "#3f51b5",
//     secondary: "#03dac6",
//     error: "#f44336",
//     info: "#2196F3",
//     success: "#4caf50",
//     warning: "#fb8c00",
//   },
// };



const vuetify = createVuetify({
  components,
  directives,
  icons: {
    defaultSet: 'mdi', // This is already the default value - only for display purposes
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

createApp(App).use(vuetify).use(router).use(bootstrap).mount('#app')
