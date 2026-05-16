import { createRouter, createWebHistory } from "vue-router";
import TaskList from "../components/TaskList.vue";
import ExpiredList from "../components/ExpiredList.vue";
import Select1 from "../components/select1.vue";
import Maze from "../components/MazeView.vue";
import FileList from "../components/FileList.vue";
import Blackjack from "../views/BlackjackView.vue";   // ← ここが重要！
import RandomImageView from "../views/RandomImageView.vue";
import ImageListView from "../views/ImageListView.vue";

const routes = [
  { path: "/tasklist", component: TaskList },
  { path: "/expired", component: ExpiredList },
  { path: "/listselect1", component: Select1 },
  { path: "/maze", component: Maze },
  { path: "/filelist", component: FileList },
  { path: "/blackjack", component: Blackjack },  
  { path: "/randomimage", component: RandomImageView },
  { path: "/imagelist", component: ImageListView },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
