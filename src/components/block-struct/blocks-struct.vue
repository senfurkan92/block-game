<template>
  <div style="position:relative; display:flex;flex-direction: column"
    :style="{top: topPx}">
    <BlockRow v-for="blockRow, index in props.blocks"
      :key="index"
      :index="index"
      :blocks="blockRow"/>
  </div>
</template>

<script setup>
import { computed, defineProps } from 'vue';
import { useStore } from 'vuex';
import BlockRow from './block-row.vue';

const store = useStore();
const props = defineProps({
  blocks: Array,
});
const topPx = computed({
  get() {
    return `${1 * store.state.standarts.ysidePx}px`;
  },
});
</script>
