<template>
  <div class="container">
    <h1>ランダム画像ビューア</h1>

    <div class="image-box">
      <img v-if="imageUrl" :src="imageUrl" alt="random image" />
      <p v-else>画像を読み込み中...</p>
    </div>

    <button @click="loadRandomImage" class="btn">次の画像</button>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'

const imageUrl = ref(null)

const loadRandomImage = async () => {
  try {
    const res = await axios.get('http://localhost:9001/images/random')
    const id = res.data.imageId

    // ★ ここが最重要 ★
    imageUrl.value = `http://localhost:9001/images/file/${id}`
  } catch (e) {
    console.error('画像取得エラー:', e)
  }
}


onMounted(() => {
  loadRandomImage()
})
</script>

<style scoped>
.container {
  padding: 20px;
  text-align: center;
}

.image-box {
  margin: 20px auto;
}

img {
  max-width: 90%;
  max-height: 80vh;
  border-radius: 8px;
  box-shadow: 0 0 10px #333;
}

.btn {
  padding: 10px 20px;
  background: #4caf50;
  color: white;
  border: none;
  cursor: pointer;
  margin-top: 20px;
  font-size: 18px;
}

.btn:hover {
  background: #45a049;
}
</style>
