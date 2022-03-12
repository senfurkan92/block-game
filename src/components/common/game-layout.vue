<template>
  <div ref="parentElRef" style="width:100%; position:relative">
    <div class="center-x">
      <div class="indicator-area">
        <div>Score: {{ $store.state.player.score }}</div>
        <div>Health: {{ $store.state.player.health }}</div>
      </div>
      <div class="game-area">
        <slot name="game-area"></slot>
      </div>
      <Ball />
      <Stopper />
      {{ $store.state.ball.lastMoveTime.getTime() }}
    </div>
  </div>
</template>

<script setup>
import { onMounted } from 'vue';
import { useStore } from 'vuex';
import { useRoute } from 'vue-router';
import Ball from '@/components/ball/ball-index.vue';
import Stopper from '@/components/stopper/stopper-index.vue';

const store = useStore();
const route = useRoute();
const level = route.fullPath.split('-')[1];

onMounted(() => {
  store.dispatch('collision/findBlocksBorders', {
    doc: document,
    level,
  });
  store.commit('collision/findAreaBorders', document);
  window.onresize = () => {
    store.commit('collision/findAreaBorders', document);
  };
});
</script>

<style scoped>
  .center-x{
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
  }

  .indicator-area{
    display: grid;
    grid-template-columns: 1fr 1fr;
    padding: 1rem 0rem;
  }
  .game-area{
    height: 600px;
    width: 1200px;
    border: 4px solid black;
    border-radius: 10px;
    position: relative;
  }
</style>
