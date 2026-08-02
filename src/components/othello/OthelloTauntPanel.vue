<template>
  <transition name="fade">
    <div v-if="visible" class="taunt-panel">
      {{ message }}
    </div>
  </transition>
</template>

<script setup>
import { ref, watch } from 'vue';

const props = defineProps({
  message: { type: String, default: null }
});

const visible = ref(false);
let timer = null;

/**
 * メッセージが変わったらフェード表示
 */
watch(
  () => props.message,
  (newMessage) => {
    if (!newMessage) {
      visible.value = false;
      return;
    }

    visible.value = true;

    // 既存タイマーがあればクリア
    if (timer) clearTimeout(timer);

    // 3秒後にフェードアウト
    timer = setTimeout(() => {
      visible.value = false;
    }, 3000);
  }
);
</script>

<style scoped>
.taunt-panel {
  padding: 10px 16px;
  background-color: rgba(0, 0, 0, 0.75);
  color: #fff;
  border-radius: 8px;
  font-size: 14px;
  max-width: 260px;
  text-align: center;
  margin-top: 10px;
}

/* フェードアニメーション */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.4s;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
