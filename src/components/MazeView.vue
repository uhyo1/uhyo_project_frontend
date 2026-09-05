<template>
  <div class="container">
    <button @click="loadMaze" class="btn">迷路生成</button>

    <div v-if="maze.length > 0" class="maze">
      <div v-for="(row, y) in maze" :key="y" class="row">
        <div
          v-for="(cell, x) in row"
          :key="x"
          class="cell"
          :class="cellClass(cell)"
        >
          {{ cell }}
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import axios from 'axios'

const maze = ref([])

const loadMaze = async () => {
  const res = await axios.get('/maze/generate')
  maze.value = res.data
}

const cellClass = (c) => {
  if (c === '#') return 'wall'
  if (c === 'S') return 'start'
  if (c === 'G') return 'goal'
  return 'path'
}
</script>

<style scoped>
.container {
  padding: 20px;
}

.btn {
  padding: 8px 16px;
  background: #4caf50;
  color: white;
  border: none;
  cursor: pointer;
  margin-bottom: 20px;
}

.maze {
  display: inline-block;
}

.row {
  display: flex;
}

.cell {
  width: 20px;
  height: 20px;
  text-align: center;
  font-size: 14px;
  line-height: 20px;
  border: 1px solid #ddd;
}

.wall {
  background: black;
  color: black;
}

.path {
  background: white;
}

.start {
  background: yellow;
  font-weight: bold;
}

.goal {
  background: lightgreen;
  font-weight: bold;
}
</style>
