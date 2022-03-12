<template>
  <div class="block" style="position:absolute; background: black"
    :style="{
      left: leftPx,
      width: `${$store.state.standarts.xsidePx}px`,
      height: `${$store.state.standarts.ysidePx}px`,
      background: bgColor,
    }">
  </div>
</template>

<script setup>
import { defineProps, computed } from 'vue';
import { useStore } from 'vuex';
import BlockModel from '@/models/block';

const store = useStore();

const props = defineProps({
  index: Number,
  block: BlockModel,
});
const leftPx = computed({
  get() {
    return `${props.index * store.state.standarts.xsidePx}px`;
  },
});

const bgColor = computed({
  get() {
    switch (props.block.life) {
      case (5): return 'black';
      case (4): return 'magenta';
      case (3): return 'red';
      case (2): return 'yellow';
      case (1): return 'green';
      default: return 'white';
    }
  },
});
</script>
