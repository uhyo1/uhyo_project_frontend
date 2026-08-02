import { defineStore } from 'pinia';
import axios from 'axios';

export const useOthelloStore = defineStore('othello', {
  state: () => ({
    gameId: null,
    board: [],                 // 8x8 配列
    validMoves: [],            // 合法手一覧
    currentTurn: 'PLAYER',     // PLAYER / CPU
    playerColor: 1,            // 1=黒, 2=白
    cpuColor: 2,
    cpuLevel: 'NORMAL',        // EASY / NORMAL / HARD
    blackCount: 2,
    whiteCount: 2,
    isGameOver: false,
    tauntMessage: null         // CPU煽りメッセージ
  }),

  actions: {
    /**
     * 新規ゲーム開始
     */
    async startNewGame(playerColor, cpuLevel) {
      try {
        const res = await axios.post('/api/othello/new', {
          playerColor,
          cpuLevel
        });

        this.applyGameUpdate(res.data);
        this.gameId = res.data.gameId;

      } catch (err) {
        console.error('startNewGame error:', err);
      }
    },

    /**
     * プレイヤーの手
     */
    async playerMove(x, y) {
      try {
        const res = await axios.post('/api/othello/move', {
          gameId: this.gameId,
          x,
          y
        });

        this.applyGameUpdate(res.data);

      } catch (err) {
        console.error('playerMove error:', err);
      }
    },

    /**
     * CPUの手
     */
    async cpuMove() {
      try {
        const res = await axios.post('/api/othello/cpu-move', {
          gameId: this.gameId
        });

        this.applyGameUpdate(res.data);

      } catch (err) {
        console.error('cpuMove error:', err);
      }
    },

    /**
     * バックエンドから返ってきたゲーム状態を反映
     */
    applyGameUpdate(data) {
      this.board = data.board;
      this.validMoves = data.validMoves;
      this.currentTurn = data.currentTurn;
      this.blackCount = data.blackCount;
      this.whiteCount = data.whiteCount;
      this.isGameOver = data.isGameOver;
      this.tauntMessage = data.tauntMessage || null;

      // プレイヤー色・CPU色・強さは初期化時のみ更新
      if (data.playerColor) this.playerColor = data.playerColor;
      if (data.cpuColor) this.cpuColor = data.cpuColor;
      if (data.cpuLevel) this.cpuLevel = data.cpuLevel;
    }
  }
});
