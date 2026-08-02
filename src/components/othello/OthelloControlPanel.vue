<template>
  <div class="control-panel">

    <h3>対局設定</h3>

    <!-- 先行・後攻選択 -->
    <div class="setting-group">
      <label>あなたの色：</label>
      <select v-model="playerColor">
        <option value="BLACK">黒（先行）</option>
        <option value="WHITE">白（後攻）</option>
      </select>
    </div>

    <!-- CPU強さ選択 -->
    <div class="setting-group">
      <label>CPUの強さ：</label>
      <select v-model="cpuLevel">
        <option value="EASY">やさしい</option>
        <option value="NORMAL">普通</option>
        <option value="HARD">鬼つよ</option>
        <option value="ULTRA">最強</option>
      </select>
    </div>

    <!-- 新規対局ボタン -->
    <button @click="startGame" class="start-button">
      新規対局
    </button>

  </div>
</template>

<script setup>
import { ref } from 'vue';

const emit = defineEmits(['newGame']);

// 初期値（黒・普通）
const playerColor = ref('BLACK');
const cpuLevel = ref('NORMAL');

/**
 * 新規対局開始
 */
function startGame() {
  emit('newGame', {
    playerColor: playerColor.value,
    cpuLevel: cpuLevel.value
  });
}
</script>

<style scoped>
.control-panel {
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding: 16px;
  border: 1px solid #ccc;
  border-radius: 8px;
  width: 240px;
  background-color: #f8f8f8;
}

.setting-group {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

select {
  padding: 6px;
  border-radius: 4px;
  border: 1px solid #aaa;
}

.start-button {
  padding: 10px;
  background-color: #006600;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
}

.start-button:hover {
  background-color: #009900;
}
</style>
