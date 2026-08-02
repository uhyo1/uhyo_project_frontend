<template>
  <div class="othello-view">

    <div class="left-panel">
      <ControlPanel />
    </div>

    <div class="right-panel">
      <OthelloGame />
      <TauntPanel />
      <ResultPanel />
</div>

  </div>

</template>

<script setup>
import ControlPanel from '@/components/othello/ControlPanel.vue';
import OthelloGame from '@/components/othello/OthelloGame.vue';
import TauntPanel from '@/components/othello/TauntPanel.vue';
import ResultPanel from '@/components/othello/ResultPanel.vue';

</script>

<style scoped>
.othello-view {
  display: flex;
  gap: 20px;
  padding: 20px;
}

.left-panel {
  width: 260px;
}

.right-panel {
  position: relative;
}
</style>
