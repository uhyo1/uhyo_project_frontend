<!--
  File: TetrisView.vue
  Role: テトリスのゲーム画面。ゲーム開始・終了、キー操作、描画コンポーネントとの連携を担当。
  Created: 2026-07-12
  Author: Seiji
-->

<template>
  <div class="tetris-view">

    <h2>Tetris</h2>

    <div class="controls">
      <button @click="startGame">ゲーム開始</button>
      <button @click="endGame">ゲーム終了</button>
    </div>

    <div class="status">
      <p>Score: {{ score }}</p>
      <p>Lines: {{ lines }}</p>
      <p>Level: {{ level }}</p>
    </div>

    <TetrisBoard
      :field="field"
      :currentPiece="currentPiece"
      :currentX="currentX"
      :currentY="currentY"
    />

  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from "vue";
import TetrisBoard from "../components/TetrisBoard.vue";
import { createTetrisEngine } from "../logic/tetrisEngine.js";
import { startGameApi, finishGameApi } from "../api/tetrisApi.js";

// ================================
// 1. ゲームエンジン初期化
// ================================
const engine = createTetrisEngine();

// ================================
// 2. Vue 側のリアクティブ変数
// ================================
const field = ref(engine.field);
const currentPiece = ref(engine.currentPiece);
const currentX = ref(engine.currentX);
const currentY = ref(engine.currentY);

const score = ref(engine.score);
const lines = ref(engine.lines);
const level = ref(engine.level);

let gameInterval = null;
let gameStartTime = null;

// ================================
// 3. ゲーム開始
// ================================
async function startGame() {
  engine.initGame();

  // 状態を Vue 側に反映
  syncState();

  // サーバーに開始ログ送信
  await startGameApi();

  // ゲームループ開始
  gameStartTime = Date.now();
  gameInterval = setInterval(() => {
    engine.tick();
    syncState();

    if (engine.isGameOver()) {
      endGame();
    }
  }, 1000);
}

// ================================
// 4. ゲーム終了
// ================================
async function endGame() {
  if (gameInterval) {
    clearInterval(gameInterval);
    gameInterval = null;
  }

  const durationSec = Math.floor((Date.now() - gameStartTime) / 1000);

  const scoreData = {
    score: score.value,
    lines: lines.value,
    level: level.value,
    duration: durationSec
  };

  await finishGameApi(scoreData);

  alert("ゲーム終了！ スコアを保存しました。");
}

// ================================
// 5. キー操作
// ================================
function handleKey(e) {
  switch (e.key) {
    case "ArrowLeft":
      engine.moveLeft();
      break;
    case "ArrowRight":
      engine.moveRight();
      break;
    case "ArrowUp":
      engine.rotate();
      break;
    case "ArrowDown":
      engine.softDrop();
      break;
    case " ":
      engine.hardDrop();
      break;
  }
  syncState();
}

onMounted(() => {
  window.addEventListener("keydown", handleKey);
});

onUnmounted(() => {
  window.removeEventListener("keydown", handleKey);
  if (gameInterval) clearInterval(gameInterval);
});

// ================================
// 6. エンジン → Vue の状態同期
// ================================
function syncState() {
  field.value = engine.field.map(row => [...row]);
  currentPiece.value = engine.currentPiece ? engine.currentPiece.map(row => [...row]) : null;
  currentX.value = engine.currentX;
  currentY.value = engine.currentY;

  score.value = engine.score;
  lines.value = engine.lines;
  level.value = engine.level;
}
</script>

<style scoped>
.tetris-view {
  text-align: center;
  margin-top: 20px;
}

.controls button {
  margin: 5px;
  padding: 8px 16px;
}

.status {
  margin: 10px 0;
}
</style>
