<template>
  <div style="position:absolute; display: flex"
    :style="{top: topPx}">
    <template v-for="block, i in blocks" :key="i">
      <Block :index="i" :block="block"/>
    </template>
  </div>
</template>

<script setup>
import { defineProps, computed } from 'vue';
import { useStore } from 'vuex';
// import BlockModel from '@/models/block';
import Block from './block-struct.vue';

const store = useStore();

const props = defineProps({
  index: Number,
  blocks: Array,
});
const topPx = computed({
  get() {
    return `${props.index * store.state.standarts.ysidePx}px`;
  },
});
</script>

<style>

</style>
