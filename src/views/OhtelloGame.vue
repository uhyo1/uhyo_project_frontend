<template>
  <div class="othello-game">

    <!-- 状態表示パネル -->
    <OthelloStatusPanel
      :playerColor="store.playerColor"
      :cpuLevel="store.cpuLevel"
      :currentTurn="store.currentTurn"
      :blackCount="store.blackCount"
      :whiteCount="store.whiteCount"
    />

    <!-- 盤面 -->
    <OthelloBoard
      :board="store.board"
      :validMoves="store.validMoves"
      @playerMove="onPlayerMove"
    />

    <!-- CPU煽りメッセージ -->
    <OthelloTauntPanel :message="store.tauntMessage" />

    <!-- 操作パネル -->
    <OthelloControlPanel @newGame="onNewGame" />

    <!-- ゲーム終了表示 -->
    <div v-if="store.isGameOver" class="game-over">
      <h2>ゲーム終了</h2>
      <p>
        黒: {{ store.blackCount }}  
        白: {{ store.whiteCount }}
      </p>
      <p>{{ resultMessage }}</p>
    </div>

  </div>
</template>

<script setup>
import { computed, watch } from 'vue';
import { useOthelloStore } from '@/stores/othelloStore';

import OthelloBoard from '@/components/othello/OthelloBoard.vue';
import OthelloStatusPanel from '@/components/othello/OthelloStatusPanel.vue';
import OthelloControlPanel from '@/components/othello/OthelloControlPanel.vue';
import OthelloTauntPanel from '@/components/othello/OthelloTauntPanel.vue';

const store = useOthelloStore();

/**
 * 新規対局開始
 */
async function onNewGame({ playerColor, cpuLevel }) {
  await store.startNewGame(playerColor, cpuLevel);

  // CPUが先手の場合は即 CPU の手を打つ
  if (store.currentTurn === 'CPU') {
    await store.cpuMove();
  }
}

/**
 * プレイヤーの手
 */
async function onPlayerMove({ x, y }) {
  await store.playerMove(x, y);

  // プレイヤーの手の後、CPUターンなら自動で打つ
  if (!store.isGameOver && store.currentTurn === 'CPU') {
    await store.cpuMove();
  }
}

/**
 * 勝敗メッセージ
 */
const resultMessage = computed(() => {
  if (!store.isGameOver) return '';

  if (store.blackCount > store.whiteCount) {
    return store.playerColor === 1 ? 'あなたの勝ち！' : 'CPUの勝ち…';
  } else if (store.whiteCount > store.blackCount) {
    return store.playerColor === 2 ? 'あなたの勝ち！' : 'CPUの勝ち…';
  } else {
    return '引き分け';
  }
});
</script>

<style scoped>
.othello-game {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
}

.game-over {
  margin-top: 20px;
  padding: 10px 20px;
  background-color: #eee;
  border-radius: 8px;
  text-align: center;
}
</style>
