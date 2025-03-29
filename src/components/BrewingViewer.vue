<template>
  <div>
    <h1>タイマーでカウントダウンをする</h1>
    <br />
    {{ minutes }}:{{ seconds }}
    <br />
    <button class="btn btn-light" @click="startTimer" v-if="!timerIsRunning">
      スタート
    </button>
    <button class="btn btn-light" @click="startTimer" v-if="timerIsRunning">
      再開
    </button>
    <button class="btn btn-light" @click="stopTimer">ストップ</button>
    <button class="btn btn-light" @click="resetTimer">リセット</button>
    <br />
    <router-link to="/top">メニューに戻る</router-link>
    <br />
    <router-link to="/">トップページに戻る</router-link>
  </div>
</template>
<script>
export default {
  data() {
    return {
      tick: null,
      timerIsRunning: false,
      millisecondsTime: 0,
    };
  },
  created() {},
  methods: {
    // TODO:状態遷移がある。停止中、実行中、一時停止中
    // TODO:0秒になったら停止する
    startTimer() {
      const startTime = Date.now();
      this.tick = setInterval(() => {
        // TODO:変数名を変更する。millisecondではなく秒
        this.millisecondsTime = 70 - this.durationFromStart(startTime);
      }, 1000);
      this.timerIsRunning = true;
    },
    durationFromStart(startTime) {
      return ((Date.now() - startTime) * 0.001).toFixed(0);
    },
    stopTimer() {
      clearInterval(this.tick);
      this.timerIsRunning = false;
    },
    resetTimer() {},
  },
  computed: {
    minutes: function () {
      return Math.floor((this.millisecondsTime / 60) % 60)
        .toString()
        .padStart(2, "0");
    },
    seconds: function () {
      return Math.floor(this.millisecondsTime % 60)
        .toString()
        .padStart(2, "0");
    },
  },
};
</script>