<template>
  <div>
    <h1 style="border-top: 1px solid #ddd" />
    <div class="py-5">
      <div class="container">
        <div class="row">
          <div class="col-md-12">
            <div class="form-group row">
              <label
                for="methodName"
                class="col-2 col-form-label"
              >メソッド名</label>
              {{ selectedMethod.methodName }}
            </div>
            <div class="form-group row">
              <label
                for="amountOfCoffeePowder"
                class="col-2 col-form-label"
              >コーヒー粉の量</label>
              {{ selectedMethod.amountOfCoffeePowder }}
            </div>
            <div class="form-group row">
              <label
                for="amountOfACupOfCoffee"
                class="col-2 col-form-label"
              >コーヒーの量</label>
              {{ selectedMethod.amountOfACupOfCoffee }}
            </div>
            <div class="form-group row">
              <label
                for="amountOfHotWater"
                class="col-2 col-form-label"
              >抽出に必要なお湯の量</label>
              {{ selectedMethod.amountOfHotWater }}
            </div>
            <div class="form-group row">
              <label
                for="temperatureOfHotWater"
                class="col-2 col-form-label"
              >お湯の温度</label>
              {{ selectedMethod.temperatureOfHotWater }}
            </div>
            <div class="form-group row">
              <label
                for="typeOfDripper"
                class="col-2 col-form-label"
              >ドリッパーの種類</label>
              {{ selectedMethod.typeOfDripper }}
            </div>
          </div>
        </div>
      </div>
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
