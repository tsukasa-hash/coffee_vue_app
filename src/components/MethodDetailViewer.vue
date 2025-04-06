<template>
  <div>
    <h1 style="border-top: 1px solid #ddd">
      child element
    </h1>
    {{ methodId }}
    {{ selectedMethod }}
    {{ selectedMethod.methodName }}
    <div class="py-5">
      <div class="container">
        <div class="row">
          <div class="col-md-12">
            <div class="form-group row">
              <label
                for="methodName"
                class="col-2 col-form-label"
              >メソッド名</label>
              {{ methodName }}
            </div>
            <div class="form-group row">
              <label
                for="amountOfCoffeePowder"
                class="col-2 col-form-label"
              >コーヒー粉の量</label>
              {{ amountOfCoffeePowder }}
            </div>
            <div class="form-group row">
              <label
                for="amountOfACupOfCoffee"
                class="col-2 col-form-label"
              >コーヒーの量</label>
              {{ amountOfACupOfCoffee }}
            </div>
            <div class="form-group row">
              <label
                for="amountOfHotWater"
                class="col-2 col-form-label"
              >抽出に必要なお湯の量</label>
              {{ amountOfHotWater }}
            </div>
            <div class="form-group row">
              <label
                for="temperatureOfHotWater"
                class="col-2 col-form-label"
              >お湯の温度</label>
              {{ temperatureOfHotWater }}
            </div>
            <div class="form-group row">
              <label
                for="typeOfDripper"
                class="col-2 col-form-label"
              >ドリッパーの種類</label>
              {{ typeOfDripper }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "MethodDetailViewer",
  props: {
    methodId: String,
    selectedMethod: null,
  },
  // setup(props) {
  //   console.log("setup");

  //   console.log(props.methodId);
  // this.methodName = methodId;
  // this.methodName = JSON.parse(selectedMethod).methodName;
  // },
  data: () => ({
    method: null,
    methodName: "original method name",
    // methodName: selectedMethod.methodName,
    amountOfCoffeePowder: null,
    amountOfACupOfCoffee: null,
    amountOfHotWater: null,
    temperatureOfHotWater: null,
    typeOfDripper: null,
    isSuccess: false,
    message: null,
  }),
  mounted: () => {
    console.log("mounted");

    // this.method = JSON.parse(selectedMethod);
  },
  created: () => {
    //   this.methodName = methodId;
    console.log("created");
  },
};
</script>
<script setup>
// const props = defineProps(["methodId", "selectedMethod"]);
// console.log(props.selectedMethod[0].methodName);
</script>
