import Vue from 'vue'
import vuex from 'vuex'
Vue.use(vuex);


export default new vuex.Store({
  state: {
    http: 'http://192.168.6.137/xtadvert/'
    // http: 'http://localhost:8081'
  }
})
