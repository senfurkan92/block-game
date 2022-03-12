export default {
  state() {
    return {
      angle: -90,
      posX: 600,
      posY: 500,
      health: 5,
      score: 0,
      ballSpeed: 4.8,
      rightCollide: true,
      leftCollide: true,
      topCollide: true,
      bottomCollide: true,
      findCollide: true,
      lastMoveTime: new Date(),
    };
  },
  getters: {
    getPosX(state) {
      return `${state.posX}px`;
    },
    getPosY(state) {
      return `${state.posY}px`;
    },
  },
  mutations: {
    goInitialPos(state) {
      state.posX = 600;
      state.posY = 500;
      state.angle = 90;
    },
    moveTo(state, payload) {
      state.lastMoveTime = new Date();
      const radius = state.angle * (Math.PI / 180);
      state.posX += state.ballSpeed * Math.cos(radius);
      state.posY -= state.ballSpeed * Math.sin(radius);

      // assign ballpos
      const {
        left, right, bottom, top,
      } = payload.ballEl.getBoundingClientRect();
      // eslint-disable-next-line no-param-reassign
      payload.rootState.collision.ballBorders = {
        left,
        right,
        bottom,
        top,
      };
    },
    rightCollide(state, obs) {
      if (state.rightCollide) {
        state.angle = -(state.angle + 180);
        state.rightCollide = false;
        state.leftCollide = true;
        state.topCollide = true;
        state.bottomCollide = true;
        if (obs) {
          // eslint-disable-next-line no-param-reassign
          obs.block.life -= 1;
        }
      }
    },
    leftCollide(state, obs) {
      if (state.leftCollide) {
        state.angle = -(state.angle + 180);
        state.rightCollide = true;
        state.leftCollide = false;
        state.topCollide = true;
        state.bottomCollide = true;
        if (obs) {
          // eslint-disable-next-line no-param-reassign
          obs.block.life -= 1;
        }
      }
    },
    topCollide(state, obs) {
      if (state.topCollide) {
        state.angle = -state.angle;
        state.rightCollide = true;
        state.leftCollide = true;
        state.topCollide = false;
        state.bottomCollide = true;
        if (obs) {
          // eslint-disable-next-line no-param-reassign
          obs.block.life -= 1;
        }
      }
    },
    bottomCollide(state, obs) {
      if (state.bottomCollide) {
        state.angle = -state.angle;
        state.rightCollide = true;
        state.leftCollide = true;
        state.topCollide = true;
        state.bottomCollide = false;
        if (obs) {
          // eslint-disable-next-line no-param-reassign
          obs.block.life -= 1;
        }
      }
    },
    addDiff(state, diff) {
      state.angle += diff;
    },
  },
  actions: {
    moveTo({ commit, rootState, dispatch }, ballEl) {
      commit('moveTo', { ballEl, rootState });
      dispatch('collision');
    },
    async collision({
      dispatch, commit, rootState, state,
    }) {
      // block collsion check
      const ball = rootState.collision.ballBorders;
      rootState.collision.blocksBorders.forEach(async (block) => {
        const obs = block;
        if (obs.block.life) {
          const collided = await dispatch('detectCollide', { ball, obs });
          switch (collided) {
            case 1: if (state.topCollide) {
              commit('topCollide', obs);
              // eslint-disable-next-line no-param-reassign
              rootState.player.score += 1;
            } break;
            case 2: if (state.rightCollide) {
              commit('rightCollide', obs);
              // eslint-disable-next-line no-param-reassign
              rootState.player.score += 1;
            } break;
            case 3: if (state.bottomCollide) {
              commit('bottomCollide', obs);
              // eslint-disable-next-line no-param-reassign
              rootState.player.score += 1;
            } break;
            case 4: if (state.leftCollide) {
              commit('leftCollide', obs);
              // eslint-disable-next-line no-param-reassign
              rootState.player.score += 1;
            } break;
            default: break;
          }
        }
      });
      // area border check
      // top
      if (state.topCollide
        && Math.abs(ball.top - rootState.collision.areaBorders.top) <= 5) {
        commit('topCollide');
      }
      // bottom
      if (state.bottomCollide
        && Math.abs(ball.bottom - rootState.collision.areaBorders.bottom) <= 5) {
        commit('bottomCollide');
        // eslint-disable-next-line no-param-reassign
        rootState.player.health -= 1;
        commit('goInitialPos');
      }
      // right
      if (state.rightCollide
        && Math.abs(ball.right - rootState.collision.areaBorders.right) <= 5) {
        commit('rightCollide');
      }
      // left
      if (state.leftCollide
        && Math.abs(ball.left - rootState.collision.areaBorders.left) <= 5) {
        commit('leftCollide');
      }
      // stopper border check
      if (state.bottomCollide
        && Math.abs(ball.bottom - rootState.collision.stopperBorders.top) <= 5) {
        const ballCenterX = (ball.right + ball.left) / 2;
        if (ballCenterX >= rootState.collision.stopperBorders.left - 10
          && ballCenterX <= rootState.collision.stopperBorders.right + 10) {
          commit('bottomCollide');
          const stopperCenterX = (rootState.collision.stopperBorders.left
            + rootState.collision.stopperBorders.right) / 2;
          const stopperHalfX = (rootState.collision.stopperBorders.right
            - rootState.collision.stopperBorders.left) / 2;
          const diff = ((stopperCenterX - ballCenterX) / stopperHalfX) * 45;
          commit('addDiff', diff);
        }
      }
    },
    detectCollide({ state }, payload) {
      const sensitivity = 5;
      const {
        ball, obs,
      } = payload;
      // top
      if (state.topCollide && Math.abs(ball.top - obs.bottom) <= sensitivity) {
        const ballCenterX = (ball.right + ball.left) / 2;
        if (ballCenterX >= obs.left - 10 && ballCenterX <= obs.right + 10) {
          return 1;
        }
      }
      // bottom
      if (state.bottomCollide && Math.abs(ball.bottom - obs.top) <= sensitivity) {
        const ballCenterX = (ball.right + ball.left) / 2;
        if (ballCenterX >= obs.left - 10 && ballCenterX <= obs.right + 10) {
          return 3;
        }
      }
      // right
      if (state.rightCollide && Math.abs(ball.right - obs.left) <= sensitivity) {
        const ballCenterY = (ball.top + ball.bottom) / 2;
        if (ballCenterY <= obs.bottom + 10 && ballCenterY >= obs.top - 10) {
          return 2;
        }
      }
      // left
      if (state.leftCollide && Math.abs(ball.left - obs.right) <= sensitivity) {
        const ballCenterY = (ball.top + ball.bottom) / 2;
        if (ballCenterY <= obs.bottom + 10 && ballCenterY >= obs.top - 10) {
          return 4;
        }
      }
      return 0;
    },
  },
  namespaced: true,
};
