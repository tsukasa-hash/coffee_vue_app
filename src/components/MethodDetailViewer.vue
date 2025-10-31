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
          @reset="onResetTimer"
        />
        <section>
          <h4 class="text-start gap-2">
            {{ totalAmountOfPreviousStep }}ml→{{ totalAmountOfCurrentStep }}ml
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
                {{ minutes(step.time) }}:{{ seconds(step.time) }}
                <br>
                {{ step.amount }}ml
              </td>
            </tr>
          </tbody>
        </table>
      </section>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent } from "vue";
import Method from "./method/Method";
import BrewingViewer from "./BrewingViewer.vue";
import Procedure from "./method/Procedure";
import ConfirmDialogService from "./dialog/ConfirmDialogService";

const AT_FIRST_STEP = 0;
const INITIAL_AMOUNT_OF_WATER = 0;

export default defineComponent({
  name: "MethodDetailViewer",
  components: { BrewingViewer },
  props: {
    selectedMethod: Method,
  },
  data(): {
    // brewingViewerに渡すカウントダウンタイマーの初期時間
    initialTime: number,
    intervalId: number | null,
    currentStep: number,
    numberOfTotalSteps: number,
    procedure: Procedure[],
  } {
    return {
      initialTime: 0,
      intervalId: null as number | null,
      currentStep: AT_FIRST_STEP,
      numberOfTotalSteps: 0,
      procedure: [],
    };
  },
  computed: {
    totalAmountOfPreviousStep(): number {
      if (this.isAtFirstStep()) return INITIAL_AMOUNT_OF_WATER;
      return this.procedure[this.currentStep - 1]?.getTotalAmount() ?? 0;
    },
    totalAmountOfCurrentStep(): number {
      return this.procedure[this.currentStep]?.getTotalAmount() ?? 0;
    },
  },
  watch: {
    selectedMethod() {
      this.initializeTimerAndProcedure();
    },
  },
  mounted() {
    this.initializeTimerAndProcedure();
  },
  methods: {
    isAtFirstStep(): boolean {
      return this.currentStep === AT_FIRST_STEP;
    },
    // DONE:タイマーの時刻と同期させる。
    // タイマーが終わったら次の手順に進み、タイマーを実行する。
    async onTimerFinished() {
      // 手順1は初期描画時に渡すため、タイマー終了時に最初に渡す値は1（手順2）となる。
      this.moveOnToTheNextStep();
      if (this.allStepsAreDone()) {
        this.initializeTimerAndProcedure();
        await ConfirmDialogService.showDialog({ message: "お疲れ様でした！", buttonLabel: "了解です" });
      } else {
        await this.startNextStep();
      }
    },
    onResetTimer() {
      this.initializeTimerAndProcedure();
    },
    moveOnToTheNextStep() {
      this.currentStep += 1;
    },
    allStepsAreDone(): boolean {
      return this.currentStep >= this.numberOfTotalSteps;
    },
    async startNextStep() {
      // ここでTimerに初期値を設定する。最初は画面描画時に渡している。
      this.initialTime = this.stepTime(this.currentStep);

      // $nextTickを使って、inititalTimeを設定した後にBrewingViewerのstartTimerを呼び出す。
      await this.$nextTick();

      const brewingViewer = this.$refs.brewingViewer as { startTimer: () => void };
      brewingViewer.startTimer();
    },
    stepTime(step: number): number {
      return this.procedure[step].getTime();
    },
    initializeTimerAndProcedure() {
      this.currentStep = AT_FIRST_STEP;
      this.procedure = this.selectedMethod?.getProcedure?.() ?? [];
      this.numberOfTotalSteps = this.procedure.length;
      this.initialTime = this.stepTime(AT_FIRST_STEP);
    },
    // TODO:TimerControllerにも同じ処理があるのでまとめたい。
    minutes(seconds: number): string {
      return Math.floor((seconds / 60) % 60)
        .toString()
        .padStart(2, "0");
    },
    seconds(seconds: number): string {
      return (seconds % 60).toString().padStart(2, "0");
    },
  },
});
</script>
