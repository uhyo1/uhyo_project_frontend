<template>
  <div class="container">
    <h1>画像一覧（サムネイル）</h1>

    <div class="grid">
  <div 
    v-for="img in images" 
    :key="img.id" 
    class="thumb"
    @click="goToViewer(img.id)"
  >
    <img :src="img.thumbnailUrl" />
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

// ★ サムネイルをクリックした時だけ遷移する
const goToViewer = (id) => {
  router.push(`/randomimage/${id}`)
}

// ★ 全画像をロード
const loadImages = async () => {
  try {
    const res = await axios.get('http://localhost:9001/images/all')

    console.log("レスポンス:", res.data)

    // ★ バックエンドのレスポンスを Vue 用に変換する
    images.value = res.data.map(img => ({
      id: img.imageId,   // ★ imageId を id に変換
      thumbnailUrl: `http://localhost:9001/images/file/${img.imageId}` // ★ 表示用URLを生成
    }))

  } catch (e) {
    console.error("画像一覧取得エラー:", e)
  }
}


// ★ setup のトップレベルで router.push を呼んではいけない
// ★ ここにあった router.push(`/randomimage/${id}`) を削除！

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
