<script setup lang="ts">
import { ref } from 'vue'
import axios from 'axios'

// ★ ファイル一覧を保持する配列
const files = ref<string[]>([])

// ★ チェックされたファイル名を保持する配列
const selectedFiles = ref<string[]>([])

// ★ API のベースURL（backend_ui を経由する想定）
const API_BASE = "http://localhost:8080"  // 必要に応じて変更

/**
 * ファイル一覧を読み込む処理
 * backend_ui → backend_data_management の /files を叩く
 */
const loadFiles = async () => {
  try {
    const res = await axios.get(`${API_BASE}/files`)
    files.value = res.data
  } catch (e) {
    console.error("ファイル一覧取得エラー:", e)
  }
}
/**
 * ZIP ダウンロード処理
 */
const downloadZip = async () => {
  if (selectedFiles.value.length === 0) {
    alert("ファイルが選択されていません")
    return
  }

  try {
    const res = await axios.post(
      `${API_BASE}/download`,
      selectedFiles.value,
      { responseType: "blob" } // ZIP をバイナリで受け取る
    )

    // Blob → ダウンロードリンクに変換
    const url = window.URL.createObjectURL(new Blob([res.data]))
    const link = document.createElement("a")
    link.href = url
    link.setAttribute("download", "download.zip")
    document.body.appendChild(link)
    link.click()
    link.remove()

  } catch (e) {
    console.error("ZIP ダウンロードエラー:", e)
  }
}
</script>

<template>
  <div class="container">
    <h2>ファイル一覧（チェック付き）</h2>

    <!-- ファイル一覧を読み込むボタン -->
    <button @click="loadFiles">表示</button>
    <button @click="downloadZip">ダウンロード</button>


    <!-- ファイル一覧表示 -->
    <div v-if="files.length > 0" class="file-list">
      <div
        v-for="file in files"
        :key="file"
        class="file-row"
      >
        <!-- チェックボックス -->
        <input
          type="checkbox"
          v-model="selectedFiles"
          :value="file"
        />
        {{ file }}
      </div>
    </div>

    <!-- 選択中のファイルを表示（デバッグ用） -->
    <div class="selected">
      <h3>選択されたファイル：</h3>
      <pre>{{ selectedFiles }}</pre>
    </div>
  </div>
</template>

<style scoped>
.container {
  padding: 20px;
  font-family: sans-serif;
}

.file-list {
  margin-top: 16px;
}

.file-row {
  margin: 4px 0;
}

.selected {
  margin-top: 20px;
  background: #222;
  padding: 10px;
  color: #eee;
}
</style>
