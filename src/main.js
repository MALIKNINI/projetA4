import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import Vuex from 'vuex'
import Home from './views/Home.vue'
import vuetify from './plugins/vuetify'

Vue.config.productionTip = false
Vue.use(VueRouter);
Vue.use(Vuex);
const routes = [
  {path: '/', component: Home},
  {path: '/register', name: 'Register', component: () => import( './components/Auth/Register.vue') },
  {path: '/login', name: 'Login', component: () => import( './components/Auth/Login.vue')},
  {path: '/list_products' , name: 'List-products', component: () => import( './components/ListProducts.vue'),
  beforeEnter: (to, from, next) => {
    if(localStorage.getItem === null) {
      next(false);
    } else {
      next();
    }
  }},

]

const router = new VueRouter({
  mode: 'history',
  routes: routes
})

new Vue({
  router,
  vuetify,
  render: h => h(App)
}).$mount('#app')
