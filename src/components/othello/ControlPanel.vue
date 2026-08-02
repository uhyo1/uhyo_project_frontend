<template>
  <div class="control-panel">

    <h2>オセロ設定</h2>

    <!-- プレイヤー色選択 -->
    <div class="section">
      <label>プレイヤーの色：</label>
      <select v-model="playerColor">
        <option value="BLACK">黒（先手）</option>
        <option value="WHITE">白（後手）</option>
      </select>
    </div>

    <!-- CPU強さ選択 -->
    <div class="section">
      <label>CPUの強さ：</label>
      <select v-model="cpuLevel">
        <option value="EASY">弱い</option>
        <option value="NORMAL">普通</option>
        <option value="HARD">強い</option>
      </select>
    </div>

    <!-- 新規ゲーム開始 -->
    <button @click="startGame" class="start-btn">
      新規ゲーム開始
    </button>

  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useOthelloStore } from '@/stores/useOthelloStore';

const store = useOthelloStore();

const playerColor = ref('BLACK');
const cpuLevel = ref('NORMAL');

const startGame = async () => {
  await store.newGame(playerColor.value, cpuLevel.value);
};
</script>

<style scoped>
.control-panel {
  padding: 16px;
  border: 1px solid #ccc;
  background: #fafafa;
  width: 240px;
  border-radius: 8px;
}

.section {
  margin-bottom: 12px;
}

label {
  font-weight: bold;
  margin-right: 8px;
}

select {
  padding: 4px;
}

.start-btn {
  width: 100%;
  padding: 8px;
  background: #0a7a0a;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
}

.start-btn:hover {
  background: #0fbf0f;
}
</style>
