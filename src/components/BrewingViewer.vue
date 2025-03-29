<template>
  <div>
    <h1>タイマーでカウントダウンをする</h1>
    <br />
    {{ timer.getMinutes() }}:{{ timer.getSeconds() }}
    <br />
    <button class="btn btn-light" @click="startTimer">スタート</button>
    <button class="btn btn-light" @click="stopTimer">ストップ</button>
    <button class="btn btn-light" @click="resetTimer">リセット</button>
    <br />
    <router-link to="/top">メニューに戻る</router-link>
    <br />
    <router-link to="/">トップページに戻る</router-link>
  </div>
</template>
<script>
import Timer from "./timer/Timer";
export default {
  data() {
    return {
      timer: Timer,
    };
  },
  created() {
    // TODO：初期値を外部から取得する
    // mountedではコンパイルに通らない
    this.timer = new Timer(70);
  },
  methods: {
    // TODO:0秒になったら次のタイマーを実行する
    startTimer() {
      this.timer.start();
    },
    stopTimer() {
      this.timer.stop();
    },
    resetTimer() {
      this.timer.reset();
    },
  },
};
</script>