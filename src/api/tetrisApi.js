/*
  File: tetrisApi.js
  Role: テトリスのゲーム開始・終了・ハイスコア取得を行う API 呼び出し処理
  Created: 2026-07-12
  Author: Seiji
*/

import axios from "axios";

// backend_ui の URL
const BASE_URL = "http://localhost:8080/tetris";

/**
 * ゲーム開始ログ送信
 */
export async function startGameApi() {
  try {
    const res = await axios.post(`${BASE_URL}/start`);
    return res.data;
  } catch (err) {
    console.error("startGameApi error:", err);
    throw err;
  }
}

/**
 * ゲーム終了時のスコア送信
 * @param {Object} scoreData - { score, lines, level, duration }
 */
export async function finishGameApi(scoreData) {
  try {
    const res = await axios.post(`${BASE_URL}/finish`, scoreData);
    return res.data;
  } catch (err) {
    console.error("finishGameApi error:", err);
    throw err;
  }
}

/**
 * ハイスコア一覧取得
 */
export async function getHighScoresApi() {
  try {
    const res = await axios.get(`${BASE_URL}/highscores`);
    return res.data;
  } catch (err) {
    console.error("getHighScoresApi error:", err);
    throw err;
  }
}
