<template>
  <div class="container d-flex flex-wrap">
    <div class="col-md-6 mr-1 container py-3">
      <h2
        class="text-start mb-0"
        style="height: 80px"
      >
        {{ selectedMethod.methodName }}
      </h2>
      <section class="col-lg-8">
        <table class="table table-bordered">
          <tbody>
            <tr>
              <td
                class="col-md-4 text-start align-middle"
              >
                コーヒーの粉
              </td>
              <td class="col-md-8 text-end align-middle">
                {{ selectedMethod.typeOfCoffeePowder }}
              </td>
            </tr>
            <tr>
              <td class="text-start align-middle">
                コーヒー粉の量
              </td>
              <td class="text-end align-middle">
                {{ selectedMethod.amountOfCoffeePowder }}
                g
              </td>
            </tr>
            <tr>
              <td class="text-start align-middle">
                コーヒーの量
              </td>
              <td class="text-end align-middle">
                {{ selectedMethod.amountOfACupOfCoffee }}
                ml
              </td>
            </tr>
            <tr>
              <td class="text-start align-middle">
                抽出に必要なお湯の量
              </td>
              <td class="text-end align-middle">
                {{ selectedMethod.amountOfHotWater }}
                ml
              </td>
            </tr>
            <tr>
              <td class="text-start align-middle">
                お湯の温度
              </td>
              <td class="text-end align-middle">
                {{ selectedMethod.temperatureOfHotWater }}
                ℃
              </td>
            </tr>
            <tr>
              <td class="text-start align-middle">
                ドリッパーの種類
              </td>
              <td class="text-end align-middle">
                {{ selectedMethod.typeOfDripper }}
              </td>
            </tr>
            <tr>
              <td class="text-start align-middle">
                メモ
              </td>
              <td class="text-end align-middle">
                {{ selectedMethod.memo }}
              </td>
            </tr>
          </tbody>
        </table>
      </section>
    </div>
    <div class="col-md-6 container py-3">
      <section
        style="width: 312px;height: 80px;"
      >
        <BrewingViewer
          ref="brewingViewer"
          :time="initialTime"
          @finished="onTimerFinished"
          @processing="onTimerProcessing"
          @reset="onResetTimer"
        />
        <section>
          <h4 class="text-start gap-2">
            {{ totalAmountOfPreviousStep }}ml
            →{{ selectedMethod.procedure[currentStep].totalAmount }}ml
          </h4>
        </section>
      </section>
      <section
        class="col-lg-6 card card-body"
        style="max-width: 312px"
      >
        <table class="table table-borderless">
          <tbody
            v-for="(step, index)
              in
                selectedMethod.procedure"
            :key="index"
          >
            <tr
              :class="['text-start align-middle'
                       , index === currentStep ? 'table-info': '']"
            >
              <td class="col-md-8 rounded-start">
                {{ step.description }}
              </td>
              <td
                class="col-md-4 rounded-end text-end"
              >
                00:{{ step.time }}
                <br>
                {{ step.amount }}ml
              </td>
            </tr>
          </tbody>
        </table>
      </section>
    </div>
    <!-- </div> -->
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
    totalAmountOfPreviousStep(): number {
      if (this.currentStep === 0) {
        return 0;
      }
      const rawProcedure = this.selectedMethod?.getProcedure?.() ?? [];
      const procedure = rawProcedure.map((p) => Object.assign(new Procedure("", 0, 0), p));
      const prev = procedure[this.currentStep - 1];
      return prev.getTotalAmount();
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
