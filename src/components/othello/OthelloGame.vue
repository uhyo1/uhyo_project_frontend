<template>
  <div class="othello-container">
    <div class="board">
      <div v-for="(row, y) in store.board" :key="y" class="row">
        <OthelloCell
          v-for="(cell, x) in row"
          :key="x"
          :x="x"
          :y="y"
          :value="cell"
          :validMoves="store.validMoves"
          @cell-click="onCellClick"
        />
      </div>
    </div>

    <div class="info-panel">
      <p>ターン: {{ store.currentTurn }}</p>
      <p>黒: {{ store.blackCount }} / 白: {{ store.whiteCount }}</p>
      <p v-if="store.isGameOver" class="game-over">ゲーム終了！</p>
      <p v-if="store.tauntMessage" class="taunt">{{ store.tauntMessage }}</p>
    </div>
  </div>
</template>

<script setup>
import OthelloCell from '@/components/othello/OthelloCell.vue';
import { useOthelloStore } from '@/stores/useOthelloStore';
const store = useOthelloStore();

/**
 * セルの見た目を決める
 */
const cellClass = (cell, x, y) => {
  const classes = [];

  if (cell === 1) classes.push('black');
  if (cell === 2) classes.push('white');

  // 合法手の位置をハイライト
  const isValid = store.validMoves.some(m => m.x === x && m.y === y);
  if (isValid) classes.push('valid');

  return classes.join(' ');
};

/**
 * セルクリック処理
 */
const onCellClick = async (x, y) => {
  if (store.isGameOver) return;
  if (store.currentTurn !== 'PLAYER') return;

  // プレイヤーの手
  await store.playerMove(x, y);

  // ゲーム終了なら CPU の手は不要
  if (store.isGameOver) return;

  // CPU の手
  await store.cpuMove();
};
</script>

<style scoped>
.othello-container {
  display: flex;
  gap: 20px;
}

.board {
  display: inline-block;
  background: #0a7a0a;
  padding: 10px;
}

.board-row {
  display: flex;
}

.cell {
  width: 40px;
  height: 40px;
  background: #0a7a0a;
  border: 1px solid #004400;
  border-radius: 4px;
  cursor: pointer;
  position: relative;
}

.cell.black::after {
  content: "";
  width: 32px;
  height: 32px;
  background: black;
  border-radius: 50%;
  position: absolute;
  top: 4px;
  left: 4px;
}

.cell.white::after {
  content: "";
  width: 32px;
  height: 32px;
  background: white;
  border-radius: 50%;
  position: absolute;
  top: 4px;
  left: 4px;
}

.cell.valid {
  background: #0fbf0f;
}

.info-panel {
  font-size: 16px;
}

.game-over {
  font-weight: bold;
  color: red;
}

.taunt {
  margin-top: 10px;
  font-style: italic;
  color: #333;
}
.board {
  display: flex;
  flex-direction: column;
  gap: 0;
}

.row {
  display: flex;
  flex-direction: row;
  gap: 0;
}

</style>
