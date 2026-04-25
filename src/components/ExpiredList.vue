<script setup lang="ts">
import { ref, onMounted } from 'vue'
import axios from 'axios'

interface ExpiredItem {
  pswdExpiredId: number
  userId: string
  accessInfo: string
  password: string
  createTime: string
  updatedTime: string
}

const items = ref<ExpiredItem[]>([])

onMounted(async () => {
  const res = await axios.get('http://localhost:8080/expired/all')
  items.value = res.data
})
</script>


<template>
  <table border="1">
    <thead>
      <tr>
        <th>ID</th>
        <th>User ID</th>
        <th>Access Info</th>
        <th>Password</th>
        <th>Create Time</th>
        <th>Updated Time</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="item in items" :key="item.pswdExpiredId">
        <td>{{ item.pswdExpiredId }}</td>
        <td>{{ item.userId }}</td>
        <td>{{ item.accessInfo }}</td>
        <td>{{ item.password }}</td>
        <td>{{ item.createTime }}</td>
        <td>{{ item.updatedTime }}</td>
      </tr>
    </tbody>
  </table>
</template>
