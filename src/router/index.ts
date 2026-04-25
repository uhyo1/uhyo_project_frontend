import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router'
import TaskList from '@/components/TaskList.vue'
import ExpiredList from '@/components/ExpiredList.vue'
import Select1 from '@/components/select1.vue'

const routes: Array<RouteRecordRaw> = [
  { path: '/tasklist', component: TaskList },
  { path: '/expired', component: ExpiredList },
  { path: '/select1', component: Select1 }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
