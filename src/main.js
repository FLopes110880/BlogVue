import Vue from 'vue'
// import Vuex from 'vuex'
import App from './App.vue'
import store from './store'
import router from './router'
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap"

Vue.config.productionTip = false

// new Vuex.Store({
//   state: {
//     isLoggedIn: !!localStorage.getItem("token")
//   },
// });

new Vue({
  store,
  router,
  render: h => h(App)
}).$mount('#app')
