<template>
  <div class="ball"
    :style="{top: $store.getters['ball/getPosY'], left: $store.getters['ball/getPosX']}">
    .
  </div>
</template>

<script setup>
import {
  ref, onMounted,
} from 'vue';
import { useStore } from 'vuex';

const store = useStore();
const ball = ref(null);

onMounted(() => {
  ball.value = document.querySelector('.ball');
  store.commit('collision/findBallBorders', ball.value.getBoundingClientRect());
  setInterval(() => {
    const now = (new Date()).getTime();
    const diff = now - store.state.ball.lastMoveTime.getTime();
    if (diff > 50) {
      store.dispatch('ball/moveTo', ball.value);
    }
  }, 1);
});

</script>

<style scoped>
  .ball {
    position: absolute;
    width: 20px;
    height:20px;
    color: darkorange;
    background: darkorange;
    border-radius: 20px;
    border:2px solid black;
    transform: translateX(-50%);
  }
</style>
