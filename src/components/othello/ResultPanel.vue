<template>
  <Teleport to="body">
    <Transition name="dialog">
      <div
        v-if="visible"
        class="result-backdrop"
        tabindex="-1"
        @click.self="dismiss"
        @keydown.esc="dismiss"
      >
        <section class="result-dialog" role="dialog" aria-modal="true" aria-labelledby="cpu-dialog-title">
          <div class="cpu-mark" aria-hidden="true">CPU</div>
          <h2 id="cpu-dialog-title">対局終了</h2>
          <p class="speech">{{ store.winnerMessage }}</p>
          <button ref="closeButton" type="button" @click="dismiss">閉じる</button>
        </section>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup>
import { nextTick, ref, watch } from 'vue';
import { useOthelloStore } from '@/stores/useOthelloStore';

const store = useOthelloStore();
const visible = ref(false);
const closeButton = ref(null);

watch(
  () => store.isGameOver,
  async (isGameOver) => {
    visible.value = isGameOver;
    if (isGameOver) {
      await nextTick();
      closeButton.value?.focus();
    }
  }
);

function dismiss() {
  visible.value = false;
}
</script>

<style scoped>
.result-backdrop {
  position: fixed;
  inset: 0;
  z-index: 1000;
  display: grid;
  place-items: center;
  padding: 20px;
  background: rgb(12 20 14 / 65%);
}

.result-dialog {
  width: min(100%, 420px);
  padding: 28px;
  border: 2px solid #263a2a;
  border-radius: 8px;
  background: #f7f6ed;
  box-shadow: 0 18px 60px rgb(0 0 0 / 35%);
  color: #202720;
  text-align: center;
}

.cpu-mark {
  display: grid;
  width: 56px;
  aspect-ratio: 1;
  place-items: center;
  margin: 0 auto 12px;
  border-radius: 50%;
  background: #263a2a;
  color: #fff;
  font-size: 14px;
  font-weight: 700;
}

.result-dialog h2 {
  margin: 0 0 16px;
  font-size: 20px;
}

.speech {
  margin: 0 0 24px;
  padding: 16px;
  border: 1px solid #b9c2b8;
  border-radius: 6px;
  background: #fff;
  font-size: 18px;
  line-height: 1.7;
}

.result-dialog button {
  min-width: 112px;
  padding: 10px 18px;
  border: 0;
  border-radius: 4px;
  background: #263a2a;
  color: #fff;
  cursor: pointer;
}

.result-dialog button:focus-visible {
  outline: 3px solid #d89e36;
  outline-offset: 3px;
}

.dialog-enter-active,
.dialog-leave-active {
  transition: opacity 180ms ease;
}

.dialog-enter-active .result-dialog,
.dialog-leave-active .result-dialog {
  transition: transform 180ms ease;
}

.dialog-enter-from,
.dialog-leave-to {
  opacity: 0;
}

.dialog-enter-from .result-dialog,
.dialog-leave-to .result-dialog {
  transform: translateY(10px);
}
</style>
