import { createRouter, createWebHistory } from "vue-router";

// ★ views 配下
import HomeView from "../views/HomeView.vue";
import MazeView from "../components/MazeView.vue";
import Blackjack from "../views/BlackjackView.vue";
import TetrisView from "../views/TetrisView.vue";

import RandomImageView from "../views/RandomImageView.vue";
import ImageListView from "../views/ImageListView.vue";
import RandomImageRandomView from "../views/RandomImageRandomView.vue";

// ★ components 配下
import TaskList from "../components/TaskList.vue";
import ExpiredList from "../components/ExpiredList.vue";
import Select1 from "../components/select1.vue";
import FileList from "../components/FileList.vue";

// ★ Othello（views 配下）
import OthelloView from "../views/OthelloView.vue";

const routes = [
  { path: "/", component: HomeView },
  { path: "/home", component: HomeView },

  // ★ views 配下
  { path: "/maze", component: MazeView },
  { path: "/blackjack", component: Blackjack },

  // ★ components 配下
  { path: "/expired", component: ExpiredList },
  { path: "/listselect1", component: Select1 },
  { path: "/tasklist", component: TaskList },
  { path: "/filelist", component: FileList },

  // ★ RandomImage 系
  {
    path: "/randomimage",
    name: "RandomImageRandom",
    component: RandomImageRandomView,
  },
  {
    path: "/randomimage/:id",
    name: "RandomImage",
    component: RandomImageView,
  },

  // ★ Tetris
  {
    path: "/tetris",
    name: "Tetris",
    component: TetrisView,
  },

  // ★ ImageList
  { path: "/imagelist", component: ImageListView },

  // ★ Othello（今回追加）
  {
    path: "/othello",
    name: "Othello",
    component: OthelloView,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
