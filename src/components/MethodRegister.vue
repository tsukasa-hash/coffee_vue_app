<template>
  <div>
    <h1>抽出メソッドを登録する</h1>
    <div class="py-5">
      <div class="container">
        <div class="row">
          <div class="col-md-12">
            <form
              id="c_form-h"
              class=""
            >
              <div class="form-group row">
                <label
                  for="methodName"
                  class="col-2 col-form-label"
                  style=""
                >メソッド名</label>
                <div
                  class="col-10 col-md-4"
                  style=""
                >
                  <input
                    id="methodName"
                    v-model="methodName"
                    type="text"
                    class="form-control"
                  >
                </div>
              </div>
              <div class="form-group row">
                <label
                  for="amountOfCoffeePowder"
                  class="col-2 col-form-label"
                  style=""
                >コーヒー粉の量</label>
                <div
                  class="col-10 col-md-4"
                  style=""
                >
                  <input
                    id="amountOfCoffeePowder"
                    v-model="amountOfCoffeePowder"
                    type="text"
                    class="form-control"
                  >
                </div>
              </div>
              <div class="form-group row">
                <label
                  for="amountOfACupOfCoffee"
                  class="col-2 col-form-label"
                  style=""
                >コーヒーの量</label>
                <div
                  class="col-10 col-md-4"
                  style=""
                >
                  <input
                    id="amountOfACupOfCoffee"
                    v-model="amountOfACupOfCoffee"
                    type="text"
                    class="form-control"
                  >
                </div>
              </div>
              <div class="form-group row">
                <label
                  for="amountOfHotWater"
                  class="col-2 col-form-label"
                  style=""
                >抽出に必要なお湯の量</label>
                <div
                  class="col-10 col-md-4"
                  style=""
                >
                  <input
                    id="amountOfHotWater"
                    v-model="amountOfHotWater"
                    type="text"
                    class="form-control"
                  >
                </div>
              </div>
              <div class="form-group row">
                <label
                  for="temperatureOfHotWater"
                  class="col-2 col-form-label"
                  style=""
                >お湯の温度</label>
                <div
                  class="col-10 col-md-4"
                  style=""
                >
                  <input
                    id="temperatureOfHotWater"
                    v-model="temperatureOfHotWater"
                    type="text"
                    class="form-control"
                  >
                </div>
              </div>
              <div class="form-group row">
                <label
                  for="typeOfDripper"
                  class="col-2 col-form-label"
                  style=""
                >ドリッパーの種類</label>
                <div
                  class="col-10 col-md-4"
                  style=""
                >
                  <input
                    id="typeOfDripper"
                    v-model="typeOfDripper"
                    type="text"
                    class="form-control"
                  >
                </div>
              </div>
              <button
                type="submit"
                class="btn btn-primary"
                :disabled="true"
                @click="register"
              >
                登録
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
    <router-link to="/top">
      メニューに戻る
    </router-link>
    <br>
    <router-link to="/">
      トップページに戻る
    </router-link>
  </div>
</template>
<script>
export default {
  name: "MethodRegister",
  data: () => ({
    methodName: null,
    amountOfCoffeePowder: null,
    amountOfACupOfCoffee: null,
    amountOfHotWater: null,
    temperatureOfHotWater: null,
    typeOfDripper: null,
    isSuccess: false,
    message: null,
  }),
  //   methods: {
  //     async register() {
  //       const req = JSON.stringify({
  //         methodName: this.methodName,
  //         amountOfCoffeePowder: this.amountOfCoffeePowder,
  //         amountOfACupOfCoffee: this.amountOfACupOfCoffee,
  //         amountOfHotWater: this.amountOfHotWater,
  //         temperatureOfHotWater: this.temperatureOfHotWater,
  //         typeOfDripper: this.typeOfDripper,
  //       });

//       await this.axios
//         .post("http://127.0.0.1:5000/api/post_method", req)
//         .then((res) => {
//           if (res.data.isSuccess) {
//             alert(res.data.message);
//           } else {
//             alert("リクエストは失敗しました。");
//           }
//         })
//         .catch(() => {
//           this.isSuccess = false;
//           alert("通信中にエラーが発生しました。");
//         });
//     },
//   },
};
</script>
<style scoped>
</style>
