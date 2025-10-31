<template>
  <div class="d-flex justify-content-between">
    <h1 class="text-start">
      {{ minutes }} : {{ seconds }}
    </h1>
    <section>
      <button
        v-if="!disabledStartButton"
        class="btn btn-dark text-nowrap p-2"
        @click="startTimer"
      >
        スタート
      </button>
      <button
        v-if="!disabledStopButton"
        class="btn btn-dark text-nowrap p-2"
        @click="stopTimer"
      >
        ストップ
      </button>
      <button
        class="btn btn-dark text-nowrap p-2"
        :disabled="disabledResetButton"
        @click="resetTimer"
      >
        リセット
      </button>
    </section>
  </div>
</template>
<script lang="ts">
import { defineComponent } from "vue";
import TimerFSM from "./timer/TimerFSM";
import Method from "./method/Method";
import { NormalTimerController } from "./timer/controller/TimerController";

export default defineComponent({
  props: {
    selectedMethod: Method,
    time: {
      type: Number,
      default: 0,
    },
  },
  // タイマーのカウントダウンが終了したことを親コンポーネントに伝える
  emits: ["finished", "reset"],
  data(): { timerFSM: TimerFSM | null, controller: NormalTimerController, method: Method | null
  , minutes: string, seconds: string, disabledStartButton: boolean
  , disabledStopButton: boolean, disabledResetButton: boolean } {
    return {
      timerFSM: null,
      controller: new NormalTimerController(),
      method: null,
      minutes: "",
      seconds: "",
      disabledStartButton: false,
      disabledStopButton: true,
      disabledResetButton: true,
    };
  },
  watch: {
    time: {
      handler(newVal: number) {
        if (this.timerFSM) {
          // FIXME:カプセル化でタイマーの扱いをFSM？で1本化したい。
          this.timerFSM.setInitialTime(newVal);
          this.timerFSM.initialize(); // タイマーを初期化

          // 画面上の時間も更新
          this.minutes = this.timerFSM.getMinutes();
          this.seconds = this.timerFSM.getSeconds();
        }
      },
      immediate: true,
    },
  },

  created() {
    this.method = new Method();
  },
  mounted() {
    this.timerFSM = new TimerFSM(this.controller);
    this.timerFSM.setInitialTime(this.time); // 初期時間を設定
    // TODO:setInitialTimeをすると画面上の値も初期化するようにしたい
    this.timerFSM.initialize();
    this.minutes = this.timerFSM?.getMinutes() || "00";
    this.seconds = this.timerFSM?.getSeconds() || "00";

    // コールバックで画面更新
    this.timerFSM.setUpdateCallback(() => {
      this.minutes = this.timerFSM?.getMinutes() || "00";
      this.seconds = this.timerFSM?.getSeconds() || "00";
    });

    // 終了時に親コンポーネントへ通知
    this.timerFSM.setOnComplete(() => {
      this.$emit("finished");
      // FIXME:stopにはもう一つの状態があるのかもしれない。一時停止中と完全停止。これを整理する。
      this.timerFSM?.stop();
      this.disabledStartButton = false;
      this.disabledStopButton = true;
      this.disabledResetButton = true;
    });
  },
  methods: {
    startTimer() {
      // DONE:ストップを押した後にスタートを押すと、中断したところから再開したい
      this.timerFSM?.start(); // null チェックして安全に呼び出し
      // TODO:Timerの状態によって活性制御する。
      this.disabledStartButton = true;
      this.disabledStopButton = false;
      this.disabledResetButton = true;
    },
    stopTimer() {
      this.timerFSM?.stop();
      this.disabledStartButton = false;
      this.disabledStopButton = true;
      this.disabledResetButton = false;
    },
    resetTimer() {
      // DONE:リセットを押すと、最初の手順に戻る
      this.timerFSM?.reset();
      this.$emit("reset");

      this.disabledStartButton = false;
      this.disabledStopButton = true;
      this.disabledResetButton = true;
    },
  },
});

</script>
