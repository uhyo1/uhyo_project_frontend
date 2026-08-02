<template>
  <div class="board">
    <div
      v-for="(row, y) in board"
      :key="y"
      class="board-row"
    >
      <div
        v-for="(cell, x) in row"
        :key="x"
        class="board-cell"
        :class="cellClass(x, y, cell)"
        @click="handleClick(x, y)"
      >
        <!-- 石の描画 -->
        <div v-if="cell === 1" class="stone black"></div>
        <div v-if="cell === 2" class="stone white"></div>

        <!-- 合法手ハイライト -->
        <div v-if="isValidMove(x, y)" class="valid-move"></div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import { useOthelloStore } from '@/stores/othelloStore';

const emit = defineEmits(['playerMove']);
const props = defineProps({
  board: { type: Array, required: true },
  validMoves: { type: Array, required: true }
});

const store = useOthelloStore();

/**
 * セルクリック処理
 */
function handleClick(x, y) {
  // 合法手でなければ警告（親側で表示してもOK）
  if (!isValidMove(x, y)) {
    alert('そこには置けません');
    return;
  }

  emit('playerMove', { x, y });
}

/**
 * 合法手判定
 */
function isValidMove(x, y) {
  return props.validMoves.some(m => m.x === x && m.y === y);
}

/**
 * セルの CSS クラス
 */
function cellClass(x, y, cell) {
  return {
    'board-cell': true,
    'cell-black': cell === 1,
    'cell-white': cell === 2,
    'cell-valid': isValidMove(x, y)
  };
}
</script>

<style scoped>
.board {
  display: grid;
  grid-template-rows: repeat(8, 1fr);
  width: 400px;
  height: 400px;
  background-color: #0a5f0a;
  border: 4px solid #003300;
}

.board-row {
  display: grid;
  grid-template-columns: repeat(8, 1fr);
}

.board-cell {
  position: relative;
  border: 1px solid #004400;
  cursor: pointer;
}

.stone {
  width: 80%;
  height: 80%;
  border-radius: 50%;
  margin: auto;
  margin-top: 10%;
}

.black {
  background-color: black;
}

.white {
  background-color: white;
}

.valid-move {
  width: 30%;
  height: 30%;
  background-color: rgba(255, 255, 0, 0.6);
  border-radius: 50%;
  margin: auto;
  margin-top: 35%;
}
</style>
