<!--
  File: TetrisBoard.vue
  Role: テトリスのフィールドとミノを Canvas で描画するコンポーネント
  Created: 2026-07-12
  Author: Seiji
-->

<template>
  <div class="tetris-board">
    <canvas ref="canvas" :width="canvasWidth" :height="canvasHeight"></canvas>
  </div>
</template>

<script setup>
import { onMounted, watch, ref } from "vue";

/**
 * props:
 *  - field: 20x10 の配列（固定ブロック）
 *  - currentPiece: ミノの形（2D配列）
 *  - currentX, currentY: ミノの位置
 */
const props = defineProps({
  field: { type: Array, required: true },
  currentPiece: { type: Array, required: true },
  currentX: { type: Number, required: true },
  currentY: { type: Number, required: true }
});

// 1マスのサイズ
const blockSize = 20;

// Canvas サイズ
const canvasWidth = 10 * blockSize;
const canvasHeight = 20 * blockSize;

const canvas = ref(null);
let ctx = null;

// 色設定（ミノごとに後で拡張可能）
const colors = {
  0: "#000000", // 空
  1: "#00FFFF", // I
  2: "#FFFF00", // O
  3: "#00FF00", // S
  4: "#FF0000", // Z
  5: "#0000FF", // J
  6: "#FFA500", // L
  7: "#800080"  // T
};

// Canvas 初期化
onMounted(() => {
  ctx = canvas.value.getContext("2d");
  draw();
});

// field や currentPiece が変わったら再描画
watch(
  () => [props.field, props.currentPiece, props.currentX, props.currentY],
  () => draw(),
  { deep: true }
);

// 描画処理
function draw() {
  if (!ctx) return;

  // 背景クリア
  ctx.fillStyle = "#111";
  ctx.fillRect(0, 0, canvasWidth, canvasHeight);

  drawField();
  if (props.currentPiece) {
    drawCurrentPiece();
  }
}

// 固定ブロック描画
function drawField() {
  for (let y = 0; y < props.field.length; y++) {
    for (let x = 0; x < props.field[y].length; x++) {
      const cell = props.field[y][x];
      if (cell !== 0) {
        drawBlock(x, y, colors[cell]);
      }
    }
  }
}

// 現在のミノ描画
function drawCurrentPiece() {
  const piece = props.currentPiece;

  for (let y = 0; y < piece.length; y++) {
    for (let x = 0; x < piece[y].length; x++) {
      if (piece[y][x] !== 0) {
        drawBlock(props.currentX + x, props.currentY + y, colors[piece[y][x]]);
      }
    }
  }
}

// 1ブロック描画
function drawBlock(x, y, color) {
  ctx.fillStyle = color;
  ctx.fillRect(
    x * blockSize,
    y * blockSize,
    blockSize,
    blockSize
  );

  // 枠線（見やすくするため）
  ctx.strokeStyle = "#222";
  ctx.strokeRect(
    x * blockSize,
    y * blockSize,
    blockSize,
    blockSize
  );
}
</script>

<style scoped>
.tetris-board {
  display: flex;
  justify-content: center;
  align-items: center;
}
canvas {
  background: #111;
  border: 2px solid #444;
}
</style>
