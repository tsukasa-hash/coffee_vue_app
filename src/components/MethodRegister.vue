<template>
  <div>
    <h1>抽出メソッドを登録する</h1>
    <div class="py-5">
      <div class="container">
        <div class="row">
          <div class="col-md-12">
            <form id="c_form-h" class="">
              <div class="form-group row">
                <label for="method_name" class="col-2 col-form-label" style=""
                  >メソッド名</label
                >
                <div class="col-10 col-md-4" style="">
                  <input
                    type="text"
                    class="form-control"
                    id="method_name"
                    v-model="method_name"
                  />
                </div>
              </div>
              <div class="form-group row">
                <label
                  for="amount_of_coffee_powder"
                  class="col-2 col-form-label"
                  style=""
                  >コーヒー粉の量</label
                >
                <div class="col-10 col-md-4" style="">
                  <input
                    type="text"
                    class="form-control"
                    id="amount_of_coffee_powder"
                    v-model="amount_of_coffee_powder"
                  />
                </div>
              </div>
              <div class="form-group row">
                <label
                  for="amount_of_a_cup_of_coffee"
                  class="col-2 col-form-label"
                  style=""
                  >コーヒーの量</label
                >
                <div class="col-10 col-md-4" style="">
                  <input
                    type="text"
                    class="form-control"
                    id="amount_of_a_cup_of_coffee"
                    v-model="amount_of_a_cup_of_coffee"
                  />
                </div>
              </div>
              <div class="form-group row">
                <label
                  for="amount_of_hot_water"
                  class="col-2 col-form-label"
                  style=""
                  >抽出に必要なお湯の量</label
                >
                <div class="col-10 col-md-4" style="">
                  <input
                    type="text"
                    class="form-control"
                    id="amount_of_hot_water"
                    v-model="amount_of_hot_water"
                  />
                </div>
              </div>
              <div class="form-group row">
                <label
                  for="temperature_of_hot_water"
                  class="col-2 col-form-label"
                  style=""
                  >お湯の温度</label
                >
                <div class="col-10 col-md-4" style="">
                  <input
                    type="text"
                    class="form-control"
                    id="temperature_of_hot_water"
                    v-model="temperature_of_hot_water"
                  />
                </div>
              </div>
              <div class="form-group row">
                <label
                  for="type_of_dripper"
                  class="col-2 col-form-label"
                  style=""
                  >ドリッパーの種類</label
                >
                <div class="col-10 col-md-4" style="">
                  <input
                    type="text"
                    class="form-control"
                    id="type_of_dripper"
                    v-model="type_of_dripper"
                  />
                </div>
              </div>
              <button
                type="submit"
                class="btn btn-primary"
                @click="register"
                v-bind:disabled="true"
              >
                登録
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
    <router-link to="/top">メニューに戻る</router-link>
    <br />
    <router-link to="/">トップページに戻る</router-link>
  </div>
</template>
<script>
export default {
  name: "MethodRegister",
  data: () => ({
    method_name: null,
    amount_of_coffee_powder: null,
    amount_of_a_cup_of_coffee: null,
    amount_of_hot_water: null,
    temperature_of_hot_water: null,
    type_of_dripper: null,
    is_success: false,
    message: null,
  }),
  methods: {
    async register() {
      const req = JSON.stringify({
        method_name: this.method_name,
        amount_of_coffee_powder: this.amount_of_coffee_powder,
        amount_of_a_cup_of_coffee: this.amount_of_a_cup_of_coffee,
        amount_of_hot_water: this.amount_of_hot_water,
        temperature_of_hot_water: this.temperature_of_hot_water,
        type_of_dripper: this.type_of_dripper,
      });

      await this.axios
        .post(`http://127.0.0.1:5000/api/post_method`, req)
        .then((res) => {
          if (res.data.is_success) {
            alert(res.data.message);
          } else {
            alert("リクエストは失敗しました。");
          }
        })
        .catch(() => {
          this.is_success = false;
          alert("通信中にエラーが発生しました。");
        });
    },
  },
};
</script>
<style scoped>
</style>