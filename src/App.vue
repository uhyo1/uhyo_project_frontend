<template>
  <div id="app">
    <!-- ハンバーガーメニュー -->
    <div class="hamburger" @click="toggleMenu">
      &#9776;
    </div>

    <!-- サイドメニュー -->
    <div class="side-menu" :class="{ open: isOpen }">
      <ul>
        <li><router-link to="/" @click="closeMenu">Home</router-link></li>
        <li><router-link to="/tasklist" @click="closeMenu">TaskList</router-link></li>
        <li><router-link to="/expired" @click="closeMenu">Expired Password List</router-link></li>
        <li><router-link to="/listselect1" @click="closeMenu">Select1</router-link></li>
        <li><router-link to="/maze" @click="closeMenu">Maze</router-link></li>
        <li><router-link to="/blackjack" @click="closeMenu">Blackjack</router-link></li>
        <li><router-link to="/randomimage" @click="closeMenu">Random Image</router-link></li>
        <li><router-link to="/imagelist" @click="closeMenu">Image List</router-link></li>
      </ul>
    </div>

    <!-- メイン画面 -->
    <div class="content">
      <router-view />
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const isOpen = ref(false)

const toggleMenu = () => {
  isOpen.value = !isOpen.value
}

const closeMenu = () => {
  isOpen.value = false
}
</script>

<style>
/* ハンバーガーアイコン */
.hamburger {
  position: fixed;
  top: 10px;
  left: 10px;
  font-size: 28px;
  cursor: pointer;
  z-index: 2000;
}

/* サイドメニュー */
.side-menu {
  position: fixed;
  top: 0;
  left: -250px; /* 初期は隠す */
  width: 250px;
  height: 100%;
  background-color: #333;
  color: white;
  padding-top: 60px;
  transition: left 0.3s ease;
  z-index: 1500;
}

.side-menu.open {
  left: 0; /* 開いた状態 */
}

.side-menu ul {
  list-style: none;
  padding: 0;
}

.side-menu li {
  padding: 15px 20px;
}

.side-menu a {
  color: white;
  text-decoration: none;
  font-size: 18px;
}

.side-menu a:hover {
  text-decoration: underline;
}

/* メインコンテンツ */
.content {
  padding: 20px;
  margin-top: 40px;
}
</style>
