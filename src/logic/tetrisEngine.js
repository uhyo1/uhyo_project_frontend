/*
  File: tetrisEngine.js
  Role: テトリスのゲームロジック（ミノ生成・衝突判定・落下処理など）
  Created: 2026-07-12
  Author: Seiji
*/

export function createTetrisEngine() {

  // ================================
  // 1. フィールド設定
  // ================================
  const ROWS = 20;
  const COLS = 10;

  // 20x10 のフィールド（0 = 空）
  let field = Array.from({ length: ROWS }, () => Array(COLS).fill(0));

  // ================================
  // 2. ミノ定義（色番号付き）
  // ================================
  /*
    色番号:
      1: I（シアン）
      2: O（黄色）
      3: S（緑）
      4: Z（赤）
      5: J（青）
      6: L（オレンジ）
      7: T（紫）
  */

  const tetrominoes = {
    I: [
      [1, 1, 1, 1]   // Cyan
    ],
    O: [
      [2, 2],
      [2, 2]         // Yellow
    ],
    T: [
      [7, 7, 7],
      [0, 7, 0]      // Purple
    ],
    L: [
      [6, 6, 6],
      [6, 0, 0]      // Orange
    ],
    J: [
      [5, 5, 5],
      [0, 0, 5]      // Blue
    ],
    S: [
      [0, 3, 3],
      [3, 3, 0]      // Green
    ],
    Z: [
      [4, 4, 0],
      [0, 4, 4]      // Red
    ]
  };

  // 現在のミノ
  let currentPiece = null;
  let currentX = 3;
  let currentY = 0;

  // 次ミノ
  let nextPiece = null;

  // スコア関連
  let score = 0;
  let lines = 0;
  let level = 1;

  // ================================
  // 3. ミノ生成
  // ================================
  function spawnPiece() {
    const keys = Object.keys(tetrominoes);
    const randomKey = keys[Math.floor(Math.random() * keys.length)];

    currentPiece = tetrominoes[randomKey];
    currentX = 3;
    currentY = 0;

    // 次ミノ生成
    const nextKey = keys[Math.floor(Math.random() * keys.length)];
    nextPiece = tetrominoes[nextKey];
  }

  // ================================
  // 4. 衝突判定
  // ================================
  function isCollision(px, py, piece = currentPiece) {
    for (let y = 0; y < piece.length; y++) {
      for (let x = 0; x < piece[y].length; x++) {
        if (piece[y][x] !== 0) {
          const nx = px + x;
          const ny = py + y;

          // 壁・床
          if (nx < 0 || nx >= COLS || ny >= ROWS) {
            return true;
          }

          // 固定ブロック
          if (ny >= 0 && field[ny][nx] !== 0) {
            return true;
          }
        }
      }
    }
    return false;
  }

  // ================================
  // 5. ミノ固定
  // ================================
  function fixPiece() {
    for (let y = 0; y < currentPiece.length; y++) {
      for (let x = 0; x < currentPiece[y].length; x++) {
        if (currentPiece[y][x] !== 0) {
          field[currentY + y][currentX + x] = currentPiece[y][x];
        }
      }
    }
  }

  // ================================
  // 6. ライン消去
  // ================================
  function clearLines() {
    let cleared = 0;

    for (let y = ROWS - 1; y >= 0; y--) {
      if (field[y].every(cell => cell !== 0)) {
        field.splice(y, 1);
        field.unshift(Array(COLS).fill(0));
        cleared++;
        y++;
      }
    }

    if (cleared > 0) {
      lines += cleared;
      score += cleared * 100;
    }
  }

  // ================================
  // 7. 落下処理（tick）
  // ================================
  function tick() {
    if (!isCollision(currentX, currentY + 1)) {
      currentY++;
    } else {
      fixPiece();
      clearLines();
      spawnPiece();
    }
  }

  // ================================
  // 8. 操作
  // ================================
  function moveLeft() {
    if (!isCollision(currentX - 1, currentY)) currentX--;
  }

  function moveRight() {
    if (!isCollision(currentX + 1, currentY)) currentX++;
  }

  function softDrop() {
    if (!isCollision(currentX, currentY + 1)) currentY++;
  }

  function hardDrop() {
    while (!isCollision(currentX, currentY + 1)) {
      currentY++;
    }
    tick();
  }

  function rotate() {
    const rotated = rotateMatrix(currentPiece);
    if (!isCollision(currentX, currentY, rotated)) {
      currentPiece = rotated;
    }
  }

  function rotateMatrix(matrix) {
    return matrix[0].map((_, i) => matrix.map(row => row[i]).reverse());
  }

  // ================================
  // 9. ゲーム開始
  // ================================
  function initGame() {
    field = Array.from({ length: ROWS }, () => Array(COLS).fill(0));
    score = 0;
    lines = 0;
    level = 1;
    spawnPiece();
  }

  // ================================
  // 9.5 start() をここに追加する
  // ================================
  function start() {
    initGame();      // ゲーム初期化
    // ゲームループ開始
    // tick を一定間隔で呼び出す
    setInterval(() => {
      tick();
    }, 500);
  }

  // ================================
  // 10. ゲームオーバー判定
  // ================================
  function isGameOver() {
    return isCollision(currentX, currentY);
  }

  // ================================
  // 返却する状態
  // ================================
  return {
    get field() { return field; },
    get currentPiece() { return currentPiece; },
    get currentX() { return currentX; },
    get currentY() { return currentY; },
    get nextPiece() { return nextPiece; },
    get score() { return score; },
    get lines() { return lines; },
    get level() { return level; },
    initGame,
    start,
    tick,
    moveLeft,
    moveRight,
    rotate,
    softDrop,
    hardDrop,
    isGameOver
  };
}
