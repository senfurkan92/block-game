import { createStore } from 'vuex';
import standarts from './module/standarts';
import levels from './module/levels';
import ball from './module/ball-control';
import collision from './module/collison';
import player from './module/player';

export default createStore({
  state() {
    return {};
  },
  getters: {},
  mutations: {},
  actions: {},
  modules: {
    standarts,
    levels,
    ball,
    collision,
    player,
  },
});
