<template>
  <div class="container">
    <h1>画像一覧（サムネイル）</h1>

    <div class="grid">
      <div
        v-for="img in images"
        :key="img.imageId"
        class="thumb"
        @click="openImage(img.imageId)"
      >
        <img :src="`http://localhost:9001/images/file/${img.imageId}`" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'
import { useRouter } from 'vue-router'

const images = ref([])
const router = useRouter()

// ★ 全画像をロード
const loadImages = async () => {
  try {
    const res = await axios.get('http://localhost:9001/images/all')
    images.value = res.data
  } catch (e) {
    console.error("画像一覧取得エラー:", e)
  }
}

// ★ サムネイルクリックで個別ビューへ
const openImage = (id) => {
  router.push(`/randomimage?id=${id}`)
}

onMounted(() => {
  loadImages()
})
</script>

<style scoped>
.container {
  padding: 20px;
}

.grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
  gap: 12px;
}

.thumb {
  cursor: pointer;
}

.thumb img {
  width: 100%;
  height: 120px;
  object-fit: cover;
  border-radius: 6px;
  box-shadow: 0 0 5px #333;
}
</style>
