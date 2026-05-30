<template>
  <div>
    <h2>ジョブ実行テスト</h2>

    <button @click="runJob">ジョブ実行</button>

    <pre>{{ result }}</pre>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { startJob } from "../api/jobApi";

const result = ref(null);

const runJob = async () => {
  result.value = await startJob(10, [1, 2]);
};
</script>
