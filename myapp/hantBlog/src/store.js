import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    isDengLu: false,
    isWrite: false,
    list: []
  },
  mutations: {
    landorquit(state, payload) {
      state.isDengLu = payload.dengLu;
    },
    write(state, payload) {
      state.isWrite = payload.write;
    },
    updateList(state, payload) {
      state.list = payload.listData;
    }
  },
  actions: {

  },
});
