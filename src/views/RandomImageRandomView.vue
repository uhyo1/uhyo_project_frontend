<template>
  <div class="viewer">
    <h1>ランダム画像ビューア</h1>

    <div class="image-container">
      <img v-if="imageUrl" :src="imageUrl" class="main-image" />
      <p v-else>画像を読み込み中...</p>

      <!-- ★ 画像のすぐ下に配置 -->
      <button @click="loadRandom" class="btn">次のランダム画像</button>
    </div>
  </div>
</template>


<script setup>
// ★ Vue の基本機能
import { ref, onMounted } from 'vue'
// ★ HTTP 通信
import axios from 'axios'

// ★ 表示する画像の URL を保持する変数
const imageUrl = ref("")

// ★ ランダム画像を読み込む関数
const loadRandom = async () => {
  try {
    // ★ バックエンドのランダム画像 API を叩く
    const res = await axios.get('/images/random')

    // ★ 返ってくる JSON は { imageId: 123, filePath: "...", ... }
    const id = res.data.imageId

    // ★ 表示用 URL を生成
    imageUrl.value = `/images/file/${id}`

  } catch (e) {
    console.error("ランダム画像取得エラー:", e)
  }
}

// ★ ページが表示されたら最初のランダム画像を読み込む
onMounted(() => {
  loadRandom()
})
</script>

<style scoped>
.viewer {
  padding: 20px;
  text-align: center;
}

/* ★ 画像とボタンを縦に並べて中央寄せ */
.image-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px; /* 画像とボタンの間の余白 */
}

.main-image {
  max-width: 90%;
  max-height: 80vh;
  object-fit: contain;
  border-radius: 8px;
  box-shadow: 0 0 10px #333;
}

.btn {
  padding: 10px 20px;
  background: #4caf50;
  color: white;
  border: none;
  cursor: pointer;
  font-size: 18px;
  border-radius: 6px;
}

.btn:hover {
  background: #45a049;
}
</style>
