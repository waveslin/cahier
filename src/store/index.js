import Vue from 'vue';
import Vuex from 'vuex';
import bills from './modules/bills';
import formats from './modules/formats';
import options from './modules/options';


Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    route: 'dashboard'
  },
  getters: {
    getRoute: function (state) {
      return state.route;
    }
  },
  mutations: {
    setRoute: function (state, newRoute) {
      state.route = newRoute;
    }
  },
  modules: {
    bills,
    formats,
    options
  }
});
