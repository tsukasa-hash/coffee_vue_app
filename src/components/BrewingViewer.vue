<template>
  <div
    style="width: 300px"
  >
    <p>{{ time }}</p>
    <br>
    {{ minutes }} : {{ seconds }}
    <br>
    <button
      class="btn btn-light"
      :disabled="disabledStartButton"
      @click="startTimer"
    >
      スタート
    </button>
    <button
      class="btn btn-light"
      :disabled="disabledStopButton"
      @click="stopTimer"
    >
      ストップ
    </button>
    <button
      class="btn btn-light"
      :disabled="disabledResetButton"
      @click="resetTimer"
    >
      リセット
    </button>
    <br>
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
  data(): { timerFSM: TimerFSM | null, controller: NormalTimerController, method: Method | null
  , minutes: string, seconds: string, disabledStartButton: boolean, disabledStopButton: boolean
  , disabledResetButton: boolean } {
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
          console.log(`Time changed to: ${newVal}`);
          // FIXME:カプセル化でタイマーの扱いをFSM？で1本化したい。
          this.timerFSM.setInitialTime(newVal);
          this.timerFSM.initialize(); // タイマーを初期化
          console.log(`TimerFSM initial time set to: ${this.timerFSM.getInitialTime()}`);

          // 画面上の時間も更新
          this.minutes = this.timerFSM.getMinutes();
          this.seconds = this.timerFSM.getSeconds();
        }
      },
      immediate: true,
    },
  },

  created() {
    // mountedではコンパイルに通らない
    // TODO：初期値を外部から取得する。timerは抽出手順配列から順番に取得する。
    this.method = new Method();
    // this.method.addProcedures(new Procedure("ドリッパーを温める", 30));
    // this.method.addProcedures(new Procedure("蒸らす", 60));
    // this.method.setName("画面で初期化したメソッド名");
    // this.timer = new Timer(0);

    // this.method.getProcedures().forEach((p: Procedure) => {
    //   this.timer.setInitialTime(p.getTime());
    // });
    // const currentProcedure: Procedure[] = this.method.getProcedures();
    // this.timer.setInitialTime(currentProcedure[0].getTime());
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
  },
  methods: {
    // TODO:0秒になったら次のタイマーを実行する
    startTimer() {
      this.timerFSM?.start(); // null チェックして安全に呼び出し
      // TODO：Timerの状態によって活性制御する。
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
      this.timerFSM?.reset();
      this.disabledStartButton = false;
      this.disabledStopButton = true;
      this.disabledResetButton = true;
    },
  },
});

</script>
