import Vue from 'vue';
import Vuex from 'vuex';
import bills from './modules/bills';
import formats from './modules/formats';


Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    route: 'bills'
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
    formats,
    bills
  }
});
