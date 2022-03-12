<template>
  <div style="position:relative">
    <Blocks :blocks="$store.state.levels.level1"/>
  </div>
</template>

<script setup>
import Blocks from '../components/block-struct/blocks-struct.vue';
</script>

<style>

</style>
