<template>
  <div class="viewer">
    <h1>画像ビューア</h1>

    <!-- ★ imageUrl がセットされたら画像を表示 -->
    <img v-if="imageUrl" :src="imageUrl" class="main-image" />

    <p v-else>画像を読み込み中...</p>
  </div>
</template>

<script setup>
// ★ 必要なものを import
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'

// ★ URL から :id を取得する
const route = useRoute()
const imageId = route.params.id   // ← ここが最重要

// ★ 表示する画像の URL を保持
const imageUrl = ref("")

// ★ 選択された画像を読み込む関数
const loadImage = () => {
  // ★ サムネイル一覧で選んだ画像をそのまま表示する
  //    フロントは Vite のプロキシ経由で backend_ui (http://localhost:8080) に
  //    リクエストを投げるため、相対パスを使う
  imageUrl.value = `/images/file/${imageId}`
}

// ★ コンポーネントが表示されたら画像を読み込む
onMounted(() => {
  loadImage()
})
</script>

<style scoped>
.viewer {
  padding: 20px;
  text-align: center;
}

.main-image {
  max-width: 90%;
  max-height: 80vh;
  object-fit: contain;
  border-radius: 8px;
  box-shadow: 0 0 10px #333;
}
</style>
