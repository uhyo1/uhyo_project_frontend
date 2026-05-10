import { createRouter, createWebHistory } from 'vue-router'
import TaskList from '../components/TaskList.vue'
import ExpiredList from '../components/ExpiredList.vue'
import select1 from '../components/select1.vue'
import MazeView from '../components/MazeView.vue'   // ← 追加
import FileList from '../components/FileList.vue'


const routes = [
  { path: '/', redirect: '/maze' },   // ← これを追加
  { path: '/tasklist', component: TaskList },
  { path: '/expired', component: ExpiredList },
  { path: '/select1', component: select1 },
  { path: '/maze', component: MazeView },
  { path: '/FileList', component: FileList },
  {
  path: "/blackjack",
  name: "blackjack",
  component: () => import("../views/BlackjackView.vue"),
}

]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
