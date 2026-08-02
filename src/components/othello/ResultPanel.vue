<template>
  <transition name="fade">
    <div v-if="visible" class="result-panel">
      {{ store.winnerMessage }}
    </div>
  </transition>
</template>

<script setup>
import { ref, watch } from 'vue';
import { useOthelloStore } from '@/stores/useOthelloStore';

const store = useOthelloStore();
const visible = ref(false);

// 勝敗メッセージが更新されたらフェード表示
watch(
  () => store.winnerMessage,
  (newVal) => {
    if (!newVal) {
      visible.value = false;
      return;
    }

    visible.value = true;

    // 4秒後にフェードアウト
    setTimeout(() => {
      visible.value = false;
    }, 4000);
  }
);
</script>

<style scoped>
.result-panel {
  position: absolute;
  top: -80px;
  left: 0;
  right: 0;
  margin: auto;
  width: fit-content;
  padding: 12px 20px;
  background: rgba(255, 255, 255, 0.95);
  border: 2px solid #444;
  border-radius: 8px;
  font-size: 20px;
  font-weight: bold;
  color: #222;
  text-align: center;
}

/* フェードアニメーション */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.8s;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
