import HomeView from "../views/HomeView.vue";
import MazeView from "../components/MazeView.vue";
import Blackjack from "../views/BlackjackView.vue"; 

import { createRouter, createWebHistory } from "vue-router";
import TaskList from "../components/TaskList.vue";
import ExpiredList from "../components/ExpiredList.vue";
import Select1 from "../components/select1.vue";
import FileList from "../components/FileList.vue";

import RandomImageView from "../views/RandomImageView.vue";
import ImageListView from "../views/ImageListView.vue";

const routes = [
  { path: "/", component: HomeView },
  { path: "/home", component: HomeView },

  // ★views配下
  { path: "/maze", component: MazeView },
  { path: "/blackjack", component: Blackjack },

  // ★components配下
  { path: "/expired", component: ExpiredList },
  { path: "/listselect1", component: Select1 },
  { path: "/tasklist", component: TaskList },
  
  { path: "/filelist", component: FileList },
  { path: "/randomimage", component: RandomImageView },
  { path: "/imagelist", component: ImageListView },
  
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
