import Vue from 'vue';
import App from './App.vue';
import store from './store/index';
import UIkit from 'uikit';
import Icons from 'uikit/dist/js/uikit-icons';

Vue.config.productionTip = false;


UIkit.use(Icons);

new Vue({
  store,
  render: h => h(App)
}).$mount('#cahier');

