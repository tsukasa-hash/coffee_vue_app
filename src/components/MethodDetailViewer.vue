<template>
  <div style="display: flex; flex-wrap: wrap">
    <h1 style="border-top: 1px solid #ddd" />
    <div style="width: 900px;min-height: 430px">
      <h2 style="text-align: left">
        メソッドの詳細
      </h2>
      <table>
        <tbody>
          <tr>
            <td style="text-align: left">
              コーヒーの粉
            </td>
            <td>
              {{ selectedMethod.typeOfCoffeePowder }}
            </td>
          </tr>
          <tr>
            <td style="text-align: left">
              コーヒー粉の量
            </td>
            <td>
              {{ selectedMethod.amountOfCoffeePowder }}
              g
            </td>
          </tr>
          <tr>
            <td style="text-align: left">
              コーヒーの量
            </td>
            <td>
              {{ selectedMethod.amountOfACupOfCoffee }}
              ml
            </td>
          </tr>
          <tr>
            <td style="text-align: left">
              抽出に必要なお湯の量
            </td>
            <td>
              {{ selectedMethod.amountOfHotWater }}
              ml
            </td>
          </tr>
          <tr>
            <td style="text-align: left">
              お湯の温度
            </td>
            <td>
              {{ selectedMethod.temperatureOfHotWater }}
              ℃
            </td>
          </tr>
          <tr>
            <td style="text-align: left">
              ドリッパーの種類
            </td>
            <td>
              {{ selectedMethod.typeOfDripper }}
            </td>
          </tr>
          <tr>
            <td style="text-align: left">
              メモ
            </td>
            <td>
              {{ selectedMethod.memo }}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <div style="width: 900px;min-height: 430px">
      <div style="display: flex; flex-wrap: wrap">
        <h2 style="text-align: left;padding-right: 10px">
          手順
        </h2>
        <BrewingViewer
          ref="brewingViewer"
          :time="initialTime"
          @finished="onTimerFinished"
          @processing="onTimerProcessing"
          @reset="onResetTimer"
        />
      </div>
      <div>
        <table>
          <thead>
            <tr>
              <th>詳細</th>
              <th />
              <th>合計</th>
              <th />
            </tr>
          </thead>
          <tbody
            v-for="(step, index)
              in
                selectedMethod.procedure"
            :key="index"
          >
            <tr>
              <td
                v-if="index === currentStep"
                :style="{ background: gradientStyle, textAlign: 'left', rowSpan: '2' }"
              >
                {{ step.description }}
              </td>
              <td
                v-else
                :style="{textAlign: 'left', rowSpan: '2' }"
              >
                {{ step.description }}
              </td>
              <td style="text-align: right">
                {{ step.time }}秒
              </td>
              <td style="text-align: right">
                {{ step.totalTime }}秒
              </td>
            </tr>
            <tr>
              <td />
              <td style="text-align: right">
                {{ step.amount }}ml
              </td>
              <td style="text-align: right">
                {{ step.totalAmount }}ml
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent } from "vue";
import Method from "./method/Method";
import BrewingViewer from "./BrewingViewer.vue";
import Procedure from "./method/Procedure";
import ConfirmDialogService from "./dialog/ConfirmDialogService";

export default defineComponent({
  name: "MethodDetailViewer",
  components: { BrewingViewer },
  props: {
    selectedMethod: Method,
  },
  data(): {
    // brewingViewerに渡すカウントダウンタイマーの初期時間
    initialTime: number,
    method: Method | undefined,
    elapsedTime: number,
    intervalId: number | null,
    currentStep: number,
    numberOfTotalSteps: number,
  } {
    return {
      initialTime: 0,
      method: new Method(),
      elapsedTime: 0,
      intervalId: null as number | null,
      currentStep: 0,
      numberOfTotalSteps: 0,
    };
  },
  computed: {
    // DONE:タイマーに応じて該当の手順だけ色を変える。
    // TODO:ミリ秒単位で変化を滑らかにする
    gradientStyle(): string {
      // elapsedTimeはタイマーの経過時間なので、初期時間からの経過時間を引いて、進捗を計算する。
      const percent = Math.min(100, ((this.initialTime - this.elapsedTime) / this.initialTime)
      * 100);
      // 進捗に応じて色を変える
      return `linear-gradient(to right,
      rgba(173, 118, 77, 0.58) 0%, 
      rgba(173, 118, 77, 0.58) ${percent}%, 
      #fff ${percent}%, 
      #fff 100%)`;
    },
  },
  watch: {
    selectedMethod() {
      this.method = this.selectedMethod ? this.selectedMethod : new Method();
      const rawProcedure = this.method.getProcedure();
      const procedure: Procedure[] = rawProcedure.map((p) => Object.assign(new Procedure("", 0, 0), p));
      const step1: Procedure = procedure[0];
      const time: number = Number(step1.getTime());
      this.initialTime = time;
      this.numberOfTotalSteps = procedure.length;
    },
  },
  mounted() {
    this.method = this.selectedMethod;
  },
  methods: {
    // タイマーのスタートと同時に、プログレスバーをスタートする。
    // DONE:タイマーの時刻と同期させる。
    // タイマーが終わったら次の手順に進み、タイマーを実行する。
    async onTimerFinished() {
      // 手順1は初期描画時に渡すため、タイマー終了時に最初に渡す値は1（手順2）となる。
      this.currentStep += 1;
      if (this.currentStep >= this.numberOfTotalSteps) {
        // 全ての手順が完了したとき、初期化し、終了する。
        this.currentStep = 0;
        this.elapsedTime = 0;
        // FIXME:methodを取り出す処理をまとめたい。
        this.method = this.selectedMethod ? this.selectedMethod : new Method();
        const rawProcedure = this.method.getProcedure();
        const procedure: Procedure[] = rawProcedure.map((p) => Object.assign(new Procedure("", 0, 0), p));
        const step1: Procedure = procedure[0];
        const time: number = Number(step1.getTime());
        this.initialTime = time;
        await ConfirmDialogService.showDialog({ message: "お疲れ様でした！", buttonLabel: "了解です" });
        return;
      }
      this.method = this.selectedMethod ? this.selectedMethod : new Method();
      const rawProcedure = this.method.getProcedure();
      const procedure: Procedure[] = rawProcedure.map((p) => Object.assign(new Procedure("", 0, 0), p));

      const nextStep: Procedure = procedure[this.currentStep];
      const time: number = Number(nextStep.getTime());
      this.initialTime = time;

      // ここでTimerに初期値を設定する。最初は画面描画時に渡している。2回目以降は初期値をどうにかして渡さないといけないが今は渡していない。
      // $nextTickを使って、inititalTimeを設定した後にBrewingViewerのstartTimerを呼び出す。
      await this.$nextTick();

      const brewingViewer = this.$refs.brewingViewer as { startTimer: () => void };
      brewingViewer.startTimer();
    },
    onTimerProcessing(elapsedTime: number) {
      this.elapsedTime = elapsedTime;
    },
    onResetTimer() {
      // FIXME:onTimerFinishedの最後の手順のときと処理と同じなので処理をまとめたい。
      this.currentStep = 0;
      this.method = this.selectedMethod ? this.selectedMethod : new Method();
      const rawProcedure = this.method.getProcedure();
      const procedure: Procedure[] = rawProcedure.map((p) => Object.assign(new Procedure("", 0, 0), p));
      const step1: Procedure = procedure[0];
      const time: number = Number(step1.getTime());
      this.initialTime = time;
    },
  },
});
</script>
