import Vue from 'vue';
import Vuex from 'vuex';
import bills from './modules/bills';


Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    route: 'bookkeeping'
  },
  getters: {
    getRoute: (state) => {
      return state.route;
    }
  },
  mutations: {
    setRoute: (state, newRoute) => {
      state.route = newRoute;
    }
  },
  modules: {
    bills
  }
});
