import { defineStore } from 'pinia';
import axios from 'axios';

export const useOthelloStore = defineStore('othello', {
  state: () => ({
    gameId: null,
    board: [],
    validMoves: [],
    currentTurn: 'PLAYER',
    playerColor: 1,
    cpuColor: 2,
    cpuLevel: 'NORMAL',
    blackCount: 2,
    whiteCount: 2,
    isGameOver: false,
    tauntMessage: null,
    winnerMessage: null,
  }),

  actions: {

    // 新規ゲーム開始
    async newGame(playerColor, level) {
      const response = await axios.post(
        '/api/othello/new',
        {
          playerColor,
          cpuLevel: level
        }
      );
      this.applyResponse(response.data);
    },

    // プレイヤーの手
    async playerMove(x, y) {
      const res = await axios.post('/api/othello/move', {
        gameId: this.gameId,
        x,
        y
      });

      this.applyResponse(res.data);
    },

    // CPUの手
    async cpuMove() {
      const res = await axios.post('/api/othello/cpu-move', {
        gameId: this.gameId
      });

      this.applyResponse(res.data);
    },

    // 共通：レスポンスを state に反映
    applyResponse(data) {
      this.gameId = data.gameId;
      this.board = data.board;
      this.validMoves = data.validMoves;
      this.currentTurn = data.currentTurn;
      this.playerColor = data.playerColor;
      this.cpuColor = data.cpuColor;
      this.cpuLevel = data.cpuLevel;
      this.blackCount = data.blackCount;
      this.whiteCount = data.whiteCount;
      this.isGameOver = data.isGameOver;
      this.tauntMessage = data.tauntMessage;
      if (data.isGameOver) {
        switch (data.winner) {
          case "PLAYER":
            this.winnerMessage = "あなたの勝ちです！";
            break;
    case "CPU":
            this.winnerMessage = "CPU の勝ちです…";
            break;
          case "DRAW":
            this.winnerMessage = "引き分けです";
            break;
        }
    } else {
            this.winnerMessage = null;
    }

    }
  }
});
