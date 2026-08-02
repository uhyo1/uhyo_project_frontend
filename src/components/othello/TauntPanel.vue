<template>
  <transition name="fade">
    <div v-if="visible" class="taunt-panel">
      {{ store.tauntMessage }}
    </div>
  </transition>
</template>

<script setup>
import { ref, watch } from 'vue';
import { useOthelloStore } from '@/stores/useOthelloStore';

const store = useOthelloStore();
const visible = ref(false);

// tauntMessage が変わったらフェード表示
watch(
  () => store.tauntMessage,
  (newVal) => {
    if (!newVal) {
      visible.value = false;
      return;
    }

    visible.value = true;

    // 3秒後にフェードアウト
    setTimeout(() => {
      visible.value = false;
    }, 3000);
  }
);
</script>

<style scoped>
.taunt-panel {
  position: absolute;
  top: -40px;
  left: 0;
  right: 0;
  margin: auto;
  width: fit-content;
  padding: 8px 16px;
  background: rgba(255, 255, 200, 0.9);
  border: 1px solid #aaa;
  border-radius: 6px;
  font-style: italic;
  font-size: 16px;
  color: #333;
  text-align: center;
}

/* フェードアニメーション */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.6s;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
