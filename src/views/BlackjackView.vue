<script setup>
import { ref } from "vue";
import axios from "axios";

// プレイヤーとディーラーの手札（画像パスの配列）
const player = ref([]);
const dealer = ref([]);

// メッセージ（勝敗・案内）
const message = ref("");

// backend_ui のポートに合わせる
const API = "http://localhost:8080/blackjack";

// -----------------------------
// カードオブジェクト → 画像パスへ変換
// -----------------------------
const cardImage = (card) => {
  // 伏せカード
  if (card === "HIDDEN") return "/cards/back.png";

  // Java の Card.getFileName() と一致
  // suit_rank.png → 例: S_A.png
  return `/cards/${card.suit}_${card.rank}.png`;
};

// -----------------------------
// 手札を画像パスの配列に変換
// -----------------------------
const convertHand = (hand) => {
  return hand.map((c) => cardImage(c));
};

// -----------------------------
// ゲーム開始
// -----------------------------
const startGame = async () => {
  try {
    const res = await axios.get(`${API}/start`);
    console.log("START RESPONSE:", res.data);
    player.value = convertHand(res.data.player);
    dealer.value = convertHand(res.data.dealer);
    message.value = res.data.message;
  } catch (e) {
    console.error("START ERROR:", e);
  }
};


// -----------------------------
// Hit（カードを引く）
// -----------------------------
const hit = async () => {
  const res = await axios.get(`${API}/hit`);
  player.value = convertHand(res.data.player);
  dealer.value = convertHand(res.data.dealer);
  message.value = res.data.message;
};

// -----------------------------
// Stand（ディーラーのターン）
// -----------------------------
const stand = async () => {
  const res = await axios.get(`${API}/stand`);
  player.value = convertHand(res.data.player);
  dealer.value = convertHand(res.data.dealer);
  message.value = res.data.result;
};
</script>

<template>
  <div class="container">
    <h1>ブラックジャック</h1>

    <div class="buttons">
      <button @click="startGame">Start</button>
      <button @click="hit">Hit</button>
      <button @click="stand">Stand</button>
    </div>

    <h2>プレイヤー</h2>
    <div class="cards">
      <img
  v-for="(c, i) in player"
  :key="i"
  :src="c"
  class="card animate"
/>

    </div>

    <h2>ディーラー</h2>
    <div class="cards">
      <img
  v-for="(c, i) in dealer"
  :key="i"
  :src="c"
  class="card animate"
/>

    </div>

    <h2>メッセージ</h2>
    <p>{{ message }}</p>
  </div>
</template>

<style>
/* カードの基本スタイル */
.card {
  width: 80px;
  margin-right: 8px;
  border-radius: 6px;
}

/* 配るアニメーション */
.animate {
  animation: deal 0.4s ease-out;
}

/* 左下 → 目的地へ飛ぶ */
@keyframes deal {
  0% {
    transform: translate(-200px, 200px) rotate(-20deg);
    opacity: 0;
  }
  100% {
    transform: translate(0, 0) rotate(0deg);
    opacity: 1;
  }
}

.container {
  padding: 20px;
}

.buttons {
  margin-bottom: 20px;
}

button {
  margin-right: 10px;
  padding: 8px 16px;
  font-size: 16px;
}

.cards {
  display: flex;
  margin-bottom: 20px;
}

.card {
  width: 80px;
  margin-right: 8px;
}
</style>
