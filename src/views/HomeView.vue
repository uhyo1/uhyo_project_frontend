<template>
  <div class="container">
    <h1 class="title">牛乳伝説</h1>

    <div class="card-grid">

  <div class="card" @click="go('/randomimage')">
    <i class="fa-solid fa-shuffle icon"></i>
    <h2>ランダム画像ビューア</h2>
    <p>ランダムに1枚表示します</p>
  </div>

  <div class="card" @click="go('/imagelist')">
    <i class="fa-solid fa-images icon"></i>
    <h2>サムネイル一覧</h2>
    <p>全画像を一覧表示します</p>
  </div>

  <div class="card" @click="go('/maze')">
    <i class="fa-solid fa-puzzle-piece icon"></i>
    <h2>迷路ゲーム</h2>
    <p>Javaで生成した迷路を表示</p>
  </div>


  <div class="card" @click="go('/blackjack')">
    <i class="fa-solid fa-dice icon"></i>
    <h2>ブラックジャック</h2>
    <p>Vue × Spring のゲーム</p>
  </div>

  <div class="card" @click="go('/tasklist')">
    <i class="fa-solid fa-list-check icon"></i>
    <h2>タスク一覧</h2>
    <p>登録されたタスクを表示</p>
  </div>

  <div class="card" @click="go('/expired')">
    <i class="fa-solid fa-clock icon"></i>
    <h2>期限切れタスク</h2>
    <p>期限切れのタスクを表示</p>
  </div>

  <div class="card" @click="go('/listselect1')">
    <i class="fa-solid fa-list icon"></i>
    <h2>リスト選択</h2>
    <p>select1 の画面</p>
  </div>
</div>

</div>
  
</template>

<script setup>
import { useRouter } from 'vue-router'
const router = useRouter()

const go = (path) => {
  router.push(path)
}
</script>

<style scoped>

.container {
  padding: 30px;
  text-align: center;
  min-height: 100vh;
  background: linear-gradient(135deg, #89f7fe, #66a6ff);
}


.icon {
  font-size: 32px;
  margin-bottom: 10px;
  color: #444;
}

.container {
  padding: 30px;
  text-align: center;
}

.title {
  margin-bottom: 30px;
  font-size: 44px;
  font-weight: 900;
  letter-spacing: 5px;
  color: #ffffff;
  text-shadow:
    0 0 8px #66a6ff,
    0 0 16px #66a6ff,
    0 0 24px #66a6ff;
}




.card-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
  gap: 20px;
  padding: 10px;
}

.card {
  background: white;
  padding: 20px;
  border-radius: 12px;
  box-shadow: 0 4px 10px rgba(0,0,0,0.15);
  cursor: pointer;
  transition: 
    transform 0.25s cubic-bezier(0.22, 1, 0.36, 1),
    box-shadow 0.25s cubic-bezier(0.22, 1, 0.36, 1);
}

.card:hover {
  transform: translateY(-6px) scale(1.03);
  box-shadow: 0 12px 24px rgba(0,0,0,0.25);
}

.card:hover .icon {
  transform: scale(1.15);
  transition: transform 0.25s ease;
}
.card.disabled {
  opacity: 0.4;
  cursor: default;
  pointer-events: none;
}
</style>
