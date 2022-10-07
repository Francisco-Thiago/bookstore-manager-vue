import Vue from 'vue'
import { createPinia, PiniaVuePlugin } from 'pinia'
import App from './App.vue'
import AllIosIcon from 'vue-ionicons/dist/ionicons-ios.js'
import router from './router'
import vuetify from './plugins/vuetify'

Vue.config.productionTip = false
Vue.use(AllIosIcon)
Vue.use(PiniaVuePlugin)

const pinia = createPinia()

new Vue({
  router,
  vuetify,
  pinia,
  render: h => h(App)
})
.$mount('#app')
