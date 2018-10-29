// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import Vuex from 'vuex'
import axios from 'axios'
import qs from 'qs'
import 'babel-polyfill'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import '../static/css/fenye.css'
import '../static/js/rem.js'
import store from './store'

Vue.config.productionTip = false
Vue.use(ElementUI);
Vue.use(Vuex);

router.beforeEach((to, from, next) => {
  if (to.meta.requireAuth) {
    if(sessionStorage.getItem('access_token')){
      next();
    }else {
      next({
        path:'/'
      })
    }
  }
  else {
    next();
  }
  if(to.fullPath == "/"){
    if(sessionStorage.getItem('access_token')){
      next({
        path:from.fullPath
      });
    }else {
      next();
    }
  }
});

/* eslint-disable no-new */
new Vue({
	el: '#app',
	router,
  store,
	components: { App },
	template: '<App/>'
})

axios.defaults.baseURL = 'http://192.168.6.137/xtadvert/';
// axios.defaults.baseURL = 'http://localhost:8081';
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8';
axios.interceptors.request.use((config) => {
	if(config.method === 'post' ){
		config.data = qs.stringify(config.data);
	}
	return config;
},(error) =>{
	return Promise.reject(error);
});


