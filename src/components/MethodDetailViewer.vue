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
        <BrewingViewer :time="initialTime" />
        <!-- <button
          class="btn btn-dark"
          style="width: 100px; height: 44px;"
        >
          <span class="material-icons">
            coffee_maker
          </span>
          DRIP
        </button> -->
        <router-link to="/brewing">
          <button
            class="btn btn-dark"
            style="width: 100px; height: 44px;"
          >
            <span class="material-icons">
              coffee_maker
            </span>
            DRIP
          </button>
        </router-link>
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
              <td :style="{ background: gradientStyle, textAlign: 'left', rowSpan: '2' }">
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
      <p>
        selectedMethod.procedure[0]:
        {{ selectedMethod.procedure[0]?.time }}
        initialTime:
        {{ initialTime }}
      </p>
      <button @click="startProgress">
        クリック
      </button>
      {{ elapsedTime }} / {{ totalTime }}
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent } from "vue";
import Method from "./method/Method";
import BrewingViewer from "./BrewingViewer.vue";
import Procedure from "./method/Procedure";

export default defineComponent({
  name: "MethodDetailViewer",
  components: { BrewingViewer },
  props: {
    selectedMethod: Method,
  },
  data(): {
    initialTime: number,
    method: Method | undefined,
    elapsedTime: number,
    totalTime: number,
    intervalId: number | null,
  } {
    return {
      initialTime: 0,
      method: new Method(),
      elapsedTime: 0,
      totalTime: 0,
      intervalId: null as number | null,
    };
  },
  computed: {
    // タイマーに応じて該当の手順だけ色を変える。
    gradientStyle(): string {
      const percent = Math.min(100, (this.elapsedTime / this.totalTime) * 100);
      // 進捗に応じて色を変える
      return `linear-gradient(to right,
      #ff0000 0%, 
      #ff0000 ${percent}%, 
      #0000ff ${percent}%, 
      #0000ff 100%)`;
    },
  },
  watch: {
    selectedMethod() {
      this.method = this.selectedMethod ? this.selectedMethod : new Method();
      // FIXME:処理をきれいにしたい。initilaTimeの変数が必要なのか。
      // TODO:タイマーが終わったら次の手順に進みタイマーを実行する。
      // TODO:タイマーのスタートと同時に、プログレスバーをスタートさせる。
      const rawProcedure = this.method.getProcedure();
      const procedure: Procedure[] = rawProcedure.map((p) => Object.assign(new Procedure("", 0, 0), p));
      const step1: Procedure = procedure[0];
      const time: number = Number(step1.getTime());
      this.initialTime = time;
      this.totalTime = time;
    },
  },
  mounted() {
    this.method = this.selectedMethod;
  },
  methods: {
    startProgress() {
      this.elapsedTime = 0;
      this.intervalId = setInterval(() => {
        if (this.elapsedTime < this.totalTime) {
          this.elapsedTime += 0.1;
        } else {
          clearInterval(this.intervalId!);
        }
      }, 100); // 0.1秒ごと
    },
  },
});
</script>
