export default {
  state() {
    return {
      blocksBorders: [],
      ballBorders: {},
      stopperBorders: {},
      areaBorders: {},
    };
  },
  mutations: {
    findAreaBorders(state, doc) {
      const area = doc.querySelector('.game-area');
      const {
        left, right, bottom, top,
      } = area.getBoundingClientRect();
      state.areaBorders = {
        left,
        right,
        bottom,
        top,
      };
    },
    findBlocksBorders(state, payload) {
      const { blocks } = payload;
      const blockEls = payload.doc.querySelectorAll('.block');
      state.blocksBorders = Array.from(blockEls).map((x, i) => {
        const borders = x.getBoundingClientRect();
        return {
          bottom: borders.bottom,
          top: borders.top,
          right: borders.right,
          left: borders.left,
          block: blocks[i],
        };
      });
    },
    findBallBorders(state, boundaries) {
      const {
        left, right, bottom, top,
      } = boundaries;
      state.ballBorders = {
        left,
        right,
        bottom,
        top,
      };
    },
    assignStopperBorders(state, boundaries) {
      const {
        left, right, bottom, top,
      } = boundaries;
      state.stopperBorders = {
        left,
        right,
        bottom,
        top,
      };
    },
  },
  actions: {
    findBlocksBorders({ commit, rootState }, payload) {
      const blocks = [];
      rootState.levels[`level${payload.level}`].forEach((row) => {
        row.forEach((block) => blocks.push(block));
      });
      commit('findBlocksBorders', {
        doc: payload.doc,
        blocks,
      });
    },
  },
  namespaced: true,
};
