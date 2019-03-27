import Vue from 'vue';
import Vuex from 'vuex';
import {
  stat
} from 'fs';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    isDengLu: false,
    isWrite: false,
    list: [],
    username: '',
    IsPC: true
  },
  mutations: {
    landorquit(state, payload) {
      state.isDengLu = payload.dengLu;
      state.username = payload.username;
    },
    write(state, payload) {
      state.isWrite = payload.write;
    },
    updateList(state, payload) {
      state.list = payload.listData;
    },
    IsPCState(state, payload) {
      state.IsPC = payload.IsPC;
    }
  },
  actions: {

  },
});
