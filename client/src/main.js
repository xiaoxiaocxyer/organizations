import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

import 'font-awesome/css/font-awesome.min.css';

import "./assets/style.css";

Vue.use(ElementUI);

Vue.config.productionTip = false;


import initMenu from "./utils/menus";

router.beforeEach((to,from,next)=>{

  if(to.path == '/'){
    next();
  }else{
    if(store.state.menus == null){

      initMenu(router, store);
      next();
    }else{

      next();
    }
  }
});

new Vue({
  router,
  store,
  render: function (h) { return h(App) }
}).$mount('#app')
