<script setup>
import { ref } from "vue";
import axios from "axios";

// プレイヤーとディーラーの合計値
const playerValue = ref(0);
const dealerValue = ref(0);


// プレイヤーとディーラーの手札（画像パスの配列）
const player = ref([]);
const dealer = ref([]);

// メッセージ（勝敗・案内）
const message = ref("");

// backend_ui のポートに合わせる
const API = "/blackjack";

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
  const res = await axios.get(`${API}/start`);
  player.value = convertHand(res.data.player);
  dealer.value = convertHand(res.data.dealer);
  playerValue.value = res.data.playerValue;
  dealerValue.value = res.data.dealerValue;
  message.value = res.data.message;
};


// -----------------------------
// Hit（カードを引く）
// -----------------------------
const hit = async () => {
  const res = await axios.get(`${API}/hit`);
  player.value = convertHand(res.data.player);
  dealer.value = convertHand(res.data.dealer);
  playerValue.value = res.data.playerValue;
  dealerValue.value = res.data.dealerValue;
  message.value = res.data.message;
};

// -----------------------------
// Stand（ディーラーのターン）
// -----------------------------
const stand = async () => {
  const res = await axios.get(`${API}/stand`);
  player.value = convertHand(res.data.player);
  dealer.value = convertHand(res.data.dealer);
  playerValue.value = res.data.playerValue;
  dealerValue.value = res.data.dealerValue;
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
    <h2>プレイヤー（合計: {{ playerValue }}）</h2>
    <div class="cards">
      <img v-for="c in player" :key="c" :src="c" class="card-img" />
    </div>

    <h2>ディーラー</h2>
    <h2>ディーラー（合計: {{ dealerValue }}）</h2>
    <div class="cards">
      <img v-for="c in dealer" :key="c" :src="c" class="card-img" />
    </div>

    <h2>メッセージ</h2>

<!-- 勝敗メッセージ（大きく中央に表示） -->
<p v-if="message.includes('勝ち') || message.includes('負け')" class="message-big">
  {{ message }}
</p>

<!-- 通常メッセージ（小さく表示） -->
<p v-else>
  {{ message }}
</p>
  </div>
</template>


<style>

.buttons button {
  background: linear-gradient(180deg, #4da3ff, #1e6fe0);
  color: white;
  font-size: 18px;
  font-weight: bold;
  padding: 10px 24px;
  margin: 0 8px;
  border: none;
  border-radius: 10px;
  cursor: pointer;

  box-shadow: 0 4px 10px rgba(0,0,0,0.25);
  transition: transform 0.15s ease, box-shadow 0.15s ease;
}

.buttons button:hover {
  transform: translateY(-3px);
  box-shadow: 0 8px 18px rgba(0,0,0,0.35);
}

.buttons button:active {
  transform: translateY(0);
  box-shadow: 0 3px 6px rgba(0,0,0,0.2);
}

.container {
  text-align: center;
  padding: 20px;
}

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
.card {
  width: 80px;
  margin-right: 8px;
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
  justify-content: center;
  align-items: center;
  gap: 12px;
  margin: 12px 0;
}

.card-img {
  width: 80px;
  height: auto;
  border-radius: 6px;
  box-shadow: 0 4px 10px rgba(0,0,0,0.2);

  /* ここからアニメーション */
  opacity: 0;
  transform: translateY(10px);
  animation: fadeInUp 0.4s ease forwards;
}

@keyframes fadeInUp {
  to {
    opacity: 1;
    transform: translateY(0);
  }
}


.container {
  text-align: center;
  padding: 20px;
}

.card-box {
  width: 60px;
  height: 90px;
  border-radius: 8px;
  background: white;
  border: 2px solid #333;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 22px;
  font-weight: bold;
}
.message-big {
  font-size: 36px;
  font-weight: 900;
  text-align: center;
  margin-top: 20px;
  color: #ff4444;
  text-shadow: 0 0 10px rgba(255, 0, 0, 0.4);

  opacity: 0;
  transform: scale(0.8);
  animation: popIn 0.4s ease forwards;
}

@keyframes popIn {
  to {
    opacity: 1;
    transform: scale(1);
  }
}


</style>
