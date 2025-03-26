<template>
  <div>
    <h1>{{ method_name }}</h1>
    <div class="py-5">
      <div class="container">
        <div class="row">
          <div class="col-md-12">
            <div class="form-group row">
              <label for="method_name" class="col-2 col-form-label" style=""
                >メソッド名</label
              >
              {{ method_name }}
            </div>
            <div class="form-group row">
              <label
                for="amount_of_coffee_powder"
                class="col-2 col-form-label"
                style=""
                >コーヒー粉の量</label
              >
              {{ amount_of_coffee_powder }}
            </div>
            <div class="form-group row">
              <label
                for="amount_of_a_cup_of_coffee"
                class="col-2 col-form-label"
                style=""
                >コーヒーの量</label
              >
              {{ amount_of_a_cup_of_coffee }}
            </div>
            <div class="form-group row">
              <label
                for="amount_of_hot_water"
                class="col-2 col-form-label"
                style=""
                >抽出に必要なお湯の量</label
              >
              {{ amount_of_hot_water }}
            </div>
            <div class="form-group row">
              <label
                for="temperature_of_hot_water"
                class="col-2 col-form-label"
                style=""
                >お湯の温度</label
              >
              {{ temperature_of_hot_water }}
            </div>
            <div class="form-group row">
              <label for="type_of_dripper" class="col-2 col-form-label" style=""
                >ドリッパーの種類</label
              >
              {{ type_of_dripper }}
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- <router-link to="/top">メニューに戻る</router-link>
        <br>
        <router-link to="/">トップページに戻る</router-link> -->
  </div>
</template>
<script>
export default {
  name: "MethodDetailViewer",
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
  // methods: {
  //   async get() {
  //     const req = JSON.stringify({
  //       method_name: "メソッド名",
  //     });

  //     await this.axios
  //       .get(`http://127.0.0.1:5000/api/get_method`)
  //       .then((res) => {
  //         if (res.data.is_success) {
  //           const method = res.data.method;

  //           this.method_name = method.method_name;
  //           this.amount_of_coffee_powder = method.amount_of_coffee_powder;
  //           this.amount_of_a_cup_of_coffee = method.amount_of_a_cup_of_coffee;
  //           this.amount_of_hot_water = method.amount_of_hot_water;
  //           this.temperature_of_hot_water = method.temperature_of_hot_water;
  //           this.type_of_dripper = method.type_of_dripper;
  //         } else {
  //           alert("リクエストは失敗しました。");
  //         }
  //       })
  //       .catch(() => {
  //         this.is_success = false;
  //         alert("通信中にエラーが発生しました。");
  //       });
  //   },
  // },
};
</script>
