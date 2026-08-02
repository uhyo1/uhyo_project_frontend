<template>
  <div class="status-panel">

    <!-- 自軍色 -->
    <div class="status-item">
      <label>あなた：</label>
      <span :class="playerColorClass">{{ playerColorLabel }}</span>
    </div>

    <!-- CPU強さ -->
    <div class="status-item">
      <label>CPU：</label>
      <span>{{ cpuLevelLabel }}</span>
    </div>

    <!-- 手番 -->
    <div class="status-item">
      <label>手番：</label>
      <span>{{ turnLabel }}</span>
    </div>

    <!-- 石数 -->
    <div class="status-item">
      <label>黒：</label>
      <span>{{ blackCount }}</span>
    </div>

    <div class="status-item">
      <label>白：</label>
      <span>{{ whiteCount }}</span>
    </div>

  </div>
</template>

<script setup>
import { computed } from 'vue';

const props = defineProps({
  playerColor: { type: Number, required: true },   // 1=黒, 2=白
  cpuLevel: { type: String, required: true },      // EASY / NORMAL / HARD
  currentTurn: { type: String, required: true },   // PLAYER / CPU
  blackCount: { type: Number, required: true },
  whiteCount: { type: Number, required: true }
});

/**
 * 自軍色ラベル
 */
const playerColorLabel = computed(() =>
  props.playerColor === 1 ? '黒' : '白'
);

/**
 * 自軍色の CSS クラス
 */
const playerColorClass = computed(() =>
  props.playerColor === 1 ? 'color-black' : 'color-white'
);

/**
 * CPU強さラベル
 */
const cpuLevelLabel = computed(() => {
  switch (props.cpuLevel) {
    case 'EASY': return 'やさしい';
    case 'NORMAL': return '普通';
    case 'HARD': return '鬼つよ';
    default: return props.cpuLevel;
  }
});

/**
 * 手番ラベル
 */
const turnLabel = computed(() =>
  props.currentTurn === 'PLAYER' ? 'あなたの番' : 'CPUの番'
);
</script>

<style scoped>
.status-panel {
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding: 12px 16px;
  border: 1px solid #ccc;
  border-radius: 8px;
  width: 240px;
  background-color: #fafafa;
}

.status-item {
  display: flex;
  justify-content: space-between;
  font-size: 14px;
}

.color-black {
  font-weight: bold;
  color: black;
}

.color-white {
  font-weight: bold;
  color: #ddd;
  background-color: #333;
  padding: 2px 6px;
  border-radius: 4px;
}
</style>
