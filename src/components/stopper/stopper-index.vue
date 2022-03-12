<template>
  <div id="stopper"
    style="height: 20px; background: gray; position: absolute;
      left:50%; transform: translateX(-50%)"
    :style="{width: stopperX, top: topY}">
  </div>
</template>

<script setup>
import {
  computed,
  onMounted,
  ref,
} from 'vue';
import { useStore } from 'vuex';

const store = useStore();
const stopperX = computed({
  get() {
    return `${store.state.standarts.stopperPx}px`;
  },
});
const topY = computed({
  get() {
    return `${19 * store.state.standarts.ysidePx}px`;
  },
});

// calculate limits
const stopper = ref(null);
onMounted(() => {
  stopper.value = document.querySelector('#stopper');
  store.commit('collision/assignStopperBorders', stopper.value.getBoundingClientRect());
});

// horizontal movement
window.onkeydown = (e) => {
  const leftX = stopper.value.getBoundingClientRect().left;
  const rightX = stopper.value.getBoundingClientRect().right;
  if (e.key === 'd' && rightX < store.state.collision.areaBorders.right - 10) {
    const rateX = Number((`${stopper.value.style.left}`).replace('%', ''));
    stopper.value.style.left = `${rateX + store.state.standarts.stopperSpeed}%`;
    store.commit('collision/assignStopperBorders', stopper.value.getBoundingClientRect());
  }
  if (e.key === 'a' && leftX > store.state.collision.areaBorders.left + 10) {
    const rateX = Number((`${stopper.value.style.left}`).replace('%', ''));
    stopper.value.style.left = `${rateX - store.state.standarts.stopperSpeed}%`;
    store.commit('collision/assignStopperBorders', stopper.value.getBoundingClientRect());
  }
};
</script>

<style>

</style>
