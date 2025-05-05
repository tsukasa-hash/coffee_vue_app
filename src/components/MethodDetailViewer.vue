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
        <button
          class="btn btn-dark"
          style="width: 72px; height: 44px;"
        >
          DRIP
        </button>
      </div>
      <table>
        <tbody
          v-for="(step, index)
            in
              selectedMethod.procedure"
          :key="index"
        >
          <tr>
            <td style="text-align: left;rowspan:2">
              {{ step.description }}
            </td>
            <td style="text-align: right">
              {{ step.time }}秒
            </td>
            <td style="text-align: right">
              {{ step.totaltime }}秒
            </td>
          </tr>
          <tr>
            <td />
            <td style="text-align: right">
              {{ step.amount }}ml
            </td>
            <td style="text-align: right">
              {{ step.totalamount }}ml
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent } from "vue";
import Method from "./method/Method";

export default defineComponent({
  name: "MethodDetailViewer",
  props: {
    selectedMethod: Method,
  },
});
</script>
