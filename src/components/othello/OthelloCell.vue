<template>
  <div
    class="cell"
    :class="cellClasses"
    @click="handleClick"
  ></div>
</template>

<script setup>
import { computed } from 'vue';
import { useOthelloStore } from '@/stores/useOthelloStore';

const props = defineProps({
  x: Number,
  y: Number,
  value: Number,        // 0=空, 1=黒, 2=白
  validMoves: {
    type: Array,
    default: () => []
  }
});

const emit = defineEmits(['cell-click']);

const store = useOthelloStore();

/**
 * セルの見た目を決める
 */
const cellClasses = computed(() => {
  const classes = [];

  if (props.value === 1) classes.push('black');
  if (props.value === 2) classes.push('white');

  const isValid = (props.validMoves ?? []).some(m => m.x === props.x && m.y === props.y);
  if (isValid) classes.push('valid');

  return classes;
});

/**
 * セルクリック
 */
const handleClick = () => {
  emit('cell-click', props.x, props.y);
};
</script>

<style scoped>

/* 合法手の点滅アニメーション */
.cell.valid {
  animation: pulse 1s infinite;
}

@keyframes pulse {
  0% {
    background-color: #0fbf0f;
  }
  50% {
    background-color: #0a7a0a;
  }
  100% {
    background-color: #0fbf0f;
  }
}

.cell {
  width: 40px;
  height: 40px;
  background: #0a7a0a;
  border: 1px solid #004400;
  border-radius: 4px;
  cursor: pointer;
  position: relative;
}

.cell.black::after {
  content: "";
  width: 32px;
  height: 32px;
  background: black;
  border-radius: 50%;
  position: absolute;
  top: 4px;
  left: 4px;
}

.cell.white::after {
  content: "";
  width: 32px;
  height: 32px;
  background: white;
  border-radius: 50%;
  position: absolute;
  top: 4px;
  left: 4px;
}

.cell.valid {
  background: #0fbf0f;
}
.cell.black::after,
.cell.white::after {
  animation: fadeIn 0.3s ease-out;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: scale(0.6);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
  
}

</style>
