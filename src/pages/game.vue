<template>
  <div>
    <GameLayout>
      <template #game-area>
        <router-view></router-view>
      </template>
    </GameLayout>
  </div>
</template>

<script>
import GameLayout from '../components/common/game-layout.vue';

export default {
  name: 'game-area',
  components: {
    GameLayout,
  },
};
</script>
