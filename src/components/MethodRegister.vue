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
                  class="col-md-2 col-form-label"
                  style=""
                >メソッド名</label>
                <span
                  class="col-md-4"
                >
                  <input
                    id="methodName"
                    v-model.trim="form.methodName"
                    type="text"
                    :class="['form-control', methodNameValidation()]"
                  >
                </span>
                <span
                  v-if="v$.methodName.$dirty
                    && !v$.methodName.required.$response"
                  class="col-md-6 d-flex align-items-center text-left"
                  style="color:#EF5350"
                >
                  必須項目です
                </span>
              </div>
              <div class="form-group row">
                <label
                  for="typeOfCoffeePowder"
                  class="col-md-2 col-form-label"
                >コーヒーの粉</label>
                <span
                  class="col-md-4"
                >
                  <input
                    id="typeOfCoffeePowder"
                    v-model.trim="form.typeOfCoffeePowder"
                    type="text"
                    :class="['form-control', typeOfCoffeePowderValidation()]"
                  >
                </span>
                <span
                  v-if="v$.typeOfCoffeePowder.$dirty
                    && !v$.typeOfCoffeePowder.required.$response"
                  class="col-md-6 d-flex align-items-center text-left"
                  style="color:#EF5350"
                >
                  必須項目です
                </span>
              </div>
              <div class="form-group row">
                <label
                  for="amountOfCoffeePowder"
                  class="col-md-2 col-form-label"
                >コーヒー粉の量</label>
                <span
                  class="col-md-4"
                >
                  <input
                    id="amountOfCoffeePowder"
                    v-model.number="form.amountOfCoffeePowder"
                    type="number"
                    :class="['form-control', amountOfCoffeePowderValidation()]"
                  >
                </span>
                <span
                  v-if="v$.amountOfCoffeePowder.$dirty
                    && !v$.amountOfCoffeePowder.required.$response"
                  class="col-md-6 d-flex align-items-center text-left"
                  style="color:#EF5350"
                >
                  必須項目です
                </span>
                <span
                  v-if="v$.amountOfCoffeePowder.$dirty
                    && !v$.amountOfCoffeePowder.minValue.$response"
                  class="col-md-6 d-flex align-items-center text-left"
                  style="color:#EF5350"
                >
                  1以上を入力してください
                </span>
                <!-- <span
                  v-if="v$.amountOfCoffeePowder.$dirty
                    && !v$.amountOfCoffeePowder.between.$response"
                  class="col-md-6 d-flex align-items-center text-left"
                  style="color:#EF5350"
                >
                  1〜1000の範囲で入力してください
                </span> -->
              </div>
              <div class="form-group row">
                <label
                  for="amountOfACupOfCoffee"
                  class="col-md-2 col-form-label"
                >コーヒーの量</label>
                <span
                  class="col-md-4"
                >
                  <input
                    id="amountOfACupOfCoffee"
                    v-model.number="form.amountOfACupOfCoffee"
                    type="number"
                    :class="['form-control', amountOfACupOfCoffeeValidation()]"
                  >
                </span>
                <span
                  v-if="v$.amountOfACupOfCoffee.$dirty
                    && !v$.amountOfACupOfCoffee.required.$response"
                  class="col-md-6 d-flex align-items-center text-left"
                  style="color:#EF5350"
                >
                  必須項目です
                </span>
                <span
                  v-if="v$.amountOfACupOfCoffee.$dirty
                    && !v$.amountOfACupOfCoffee.minValue.$response"
                  class="col-md-6 d-flex align-items-center text-left"
                  style="color:#EF5350"
                >
                  1以上を入力してください
                </span>
                <!-- <span
                  v-if="v$.amountOfACupOfCoffee.$dirty
                    && !v$.amountOfACupOfCoffee.between.$response"
                  class="col-md-6 d-flex align-items-center text-left"
                  style="color:#EF5350"
                >
                  1〜1000の範囲で入力してください
                </span> -->
              </div>
              <div class="form-group row">
                <label
                  for="amountOfHotWater"
                  class="col-md-2 col-form-label"
                  style=""
                >抽出に必要なお湯の量</label>
                <span
                  class="col-md-4"
                  style=""
                >
                  <input
                    id="amountOfHotWater"
                    v-model.number="form.amountOfHotWater"
                    type="number"
                    :class="['form-control', amountOfHotWaterValidation()]"
                  >
                </span>
                <span
                  v-if="v$.amountOfHotWater.$dirty
                    && !v$.amountOfHotWater.required.$response"
                  class="col-md-6 d-flex align-items-center text-left"
                  style="color:#EF5350"
                >
                  必須項目です
                </span>
                <span
                  v-else-if="v$.amountOfHotWater.$dirty
                    && !v$.amountOfHotWater.numeric.$response"
                  class="col-md-6 d-flex align-items-center text-left"
                  style="color:#EF5350"
                >
                  数値を入力してください
                </span>
                <span
                  v-else-if="v$.amountOfHotWater.$dirty
                    && !v$.amountOfHotWater.integer.$response"
                  class="col-md-6 d-flex align-items-center text-left"
                  style="color:#EF5350"
                >
                  整数を入力してください
                </span>
                <span
                  v-else-if="v$.amountOfHotWater.$dirty
                    && !v$.amountOfHotWater.minValue.$response"
                  class="col-md-6 d-flex align-items-center text-left"
                  style="color:#EF5350"
                >
                  {{ v$.amountOfHotWater.minValue.$params.min }}以上を入力してください
                </span>
              </div>
              <div class="form-group row">
                <label
                  for="temperatureOfHotWater"
                  class="col-md-2 col-form-label"
                  style=""
                >お湯の温度</label>
                <span
                  class="col-md-4"
                >
                  <input
                    id="temperatureOfHotWater"
                    v-model.number="form.temperatureOfHotWater"
                    type="number"
                    :class="['form-control', temperatureOfHotWaterValidation()]"
                  >
                </span>
                <span
                  v-if="v$.temperatureOfHotWater.$dirty
                    && !v$.temperatureOfHotWater.required.$response"
                  class="col-md-6 d-flex align-items-center text-left"
                  style="color:#EF5350"
                >
                  必須項目です
                </span>
                <span
                  v-if="v$.temperatureOfHotWater.$dirty
                    && !v$.temperatureOfHotWater.numeric.$response"
                  class="col-md-6 d-flex align-items-center text-left"
                  style="color:#EF5350"
                >
                  数値を入力してください
                </span>
                <span
                  v-else-if="v$.temperatureOfHotWater.$dirty
                    && !v$.temperatureOfHotWater.integer.$response"
                  class="col-md-6 d-flex align-items-center text-left"
                  style="color:#EF5350"
                >
                  整数を入力してください
                </span>
                <span
                  v-else-if="v$.temperatureOfHotWater.$dirty
                    && !v$.temperatureOfHotWater.maxValue.$response"
                  class="col-md-6 d-flex align-items-center text-left"
                  style="color:#EF5350"
                >
                  {{ v$.temperatureOfHotWater.maxValue.$params.max }}以下を入力してください
                </span>
              </div>
              <div class="form-group row">
                <label
                  for="typeOfDripper"
                  class="col-md-2 col-form-label"
                  style=""
                >ドリッパーの種類</label>
                <span
                  class="col-md-4"
                >
                  <input
                    id="typeOfDripper"
                    v-model.trim="form.typeOfDripper"
                    type="text"
                    class="form-control"
                    :class="['form-control', typeOfDripperValidation()]"
                  >
                </span>
                <span
                  v-if="v$.typeOfDripper.$dirty
                    && !v$.typeOfDripper.required.$response"
                  class="col-md-6 d-flex align-items-center text-left"
                  style="color:#EF5350"
                >
                  必須項目です
                </span>
              </div>
              <div class="form-group row">
                <label
                  for="memo"
                  class="col-md-2 col-form-label"
                  style=""
                >メモ</label>
                <span
                  class="col-md-4"
                >
                  <input
                    id="memo"
                    v-model="form.memo"
                    type="text"
                    class="form-control"
                  >
                </span>
              </div>
              <div style="display: flex; flex-wrap: wrap">
                <h2 style="text-align: left">
                  手順
                </h2>
                <button
                  type="button"
                  class="btn btn-dark"
                  style="width: 72px; height: 44px;"
                  @click="createRow"
                >
                  +追加
                </button>
                <span
                  v-if="v$.rows.$dirty
                    && !v$.rows.required.$response"
                >
                  1つ以上の手順を入力してください
                </span>
              </div>
              <table>
                <thead>
                  <tr>
                    <th>詳細</th>
                    <th>お湯の量</th>
                    <th>合計量</th>
                    <th>時間</th>
                    <th>合計時間</th>
                    <th />
                  </tr>
                </thead>
                <tbody>
                  <tr
                    v-for="(row, index) in form.rows"
                    :key="index"
                  >
                    <td>
                      <input
                        id="description"
                        v-model="row.description"
                        type="text"
                      >
                    </td>
                    <td>
                      <input
                        v-model="row.amount"
                        type="text"
                      >
                    </td>
                    <td>
                      <input
                        v-model="row.totalAmount"
                        type="text"
                      >
                    </td>
                    <td>
                      <input
                        v-model="row.time"
                        type="text"
                      >
                    </td>
                    <td>
                      <input
                        v-model="row.totalTime"
                        type="text"
                      >
                    </td>
                    <td>
                      <button
                        type="button"
                        class="btn btn-dark"
                        @click="deleteRow(index)"
                      >
                        <span class="material-icons">
                          delete
                        </span>
                      </button>
                    </td>
                  </tr>
                  <!-- <div
                    v-if="v$.rows[index]?.description.$dirty
                      && !v$.rows[index]?.description.required"
                  >
                    必須項目です
                  </div> -->
                </tbody>
              </table>
            </form>
            <button
              class="btn btn-primary"
              @click="registerForFirestore"
            >
              登録
            </button>
            <button
              class="btn btn-primary"
              @click="update"
            >
              更新
            </button>
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
<script lang="ts">
/* eslint-disable import/no-cycle */
import { defineComponent, reactive } from "vue";
import {
  addDoc, collection,
} from "firebase/firestore";
import useVuelidate from "@vuelidate/core";
import {
  required, minValue, between, maxValue, integer, numeric,
} from "@vuelidate/validators";
import { db } from "../firebase";
import Procedure from "./method/Procedure";
import showTwoButtonDialogWithEachMethod from "./dialog/TwoButtonDialogService";
// NOTE:error  Dependency cycle via ./router:12  import/no-cycle
//  NOTE:Vulidateを使うためにComposition APIに変換した

export default defineComponent({
  setup() {
    const form = reactive({
      methodName: "",
      typeOfCoffeePowder: "",
      amountOfCoffeePowder: 0 as number,
      amountOfACupOfCoffee: 0 as number,
      amountOfHotWater: 0 as number,
      temperatureOfHotWater: 0 as number,
      typeOfDripper: "",
      memo: "",
      isSuccess: false,
      message: "",
      procedures: [] as Procedure[],
      rows: [
        {
          description: "", amount: 0, totalAmount: 0, time: 0, totalTime: 0,
        },
      ],
    });

    const rules = {
      // TODO:SQLインジェクション対策をする。（発生するかはわからない）
      // TODO:numericチェックで-もエラーとなる。これを考慮し入力チェックの条件を設定する。
      methodName: { $autoDirty: true, required },
      typeOfCoffeePowder: { $autoDirty: true, required },
      amountOfCoffeePowder: {
        $autoDirty: true,
        required,
        minValue: minValue(1),
        between: between(1, 1000),
      },
      amountOfACupOfCoffee: {
        $autoDirty: true,
        required,
        numeric,
        integer,
        minValue: minValue(1),
        between: between(1, 1000),
      },
      amountOfHotWater: {
        $autoDirty: true,
        required,
        numeric,
        integer,
        minValue: minValue(1),
      },
      temperatureOfHotWater: {
        $autoDirty: true, required, numeric, integer, maxValue: maxValue(100),
      },
      typeOfDripper: { $autoDirty: true, required },
      memo: { $autoDirty: true },
      rows: {
        $autoDirty: true,
        required,
        $each: {
          description: { $autoDirty: true, required },
          amount: {
            $autoDirty: true, required, numeric, integer, minValue: minValue(0),
          },
          totalAmount: {
            $autoDirty: true, required, numeric, integer, minValue: minValue(0),
          },
          time: {
            $autoDirty: true, required, numeric, integer, minValue: minValue(0),
          },
          totalTime: {
            $autoDirty: true, required, numeric, integer, minValue: minValue(0),
          },
        },
      },
    };

    const v$ = useVuelidate(rules, form);

    const registerMethod = async () => {
      await addDoc(collection(db, "method"), {
        methodName: form.methodName,
        typeOfCoffeePowder: form.typeOfCoffeePowder,
        // amountOfCoffeePowder: amountOfCoffeePowder.value,
        amountOfACupOfCoffee: form.amountOfACupOfCoffee,
        amountOfHotWater: form.amountOfHotWater,
        temperatureOfHotWater: form.temperatureOfHotWater,
        typeOfDripper: form.typeOfDripper,
        memo: form.memo,
        procedure: form.rows.map((row) => ({
          description: row.description,
          amount: row.amount,
          totalAmount: row.totalAmount,
          time: row.time,
          totalTime: row.totalTime,
        })),
      });
    };
    const isFormCorrect = async (): Promise<boolean> => v$.value.$validate();
    const registerForFirestore = async () => {
      // 入力チェックにエラーがあれば処理を中断する。
      if (!await isFormCorrect()) return;
      try {
        await showTwoButtonDialogWithEachMethod(
          "メソッドを登録しますか？",
          {
            onLeftClick: async () => {
              try {
                await registerMethod();
                // await $router.push("/top");
              } catch (error) {
                console.error("Error adding document: ", error);
              }
            },
            onRightClick: async () => { },
          },
        );
      } catch (error) {
        console.error("Error adding document: ", error);
      }
    };
    // FIXME:共通化したい
    const methodNameValidation = () => {
      if (!v$.value.methodName.$dirty) return "";
      return v$.value.methodName.$invalid ? "text-incorrect" : "text-correct";
    };
    const amountOfCoffeePowderValidation = () => {
      if (!v$.value.amountOfCoffeePowder.$dirty) return "";
      return v$.value.amountOfCoffeePowder.$invalid ? "text-incorrect" : "text-correct";
    };
    const typeOfCoffeePowderValidation = () => {
      if (!v$.value.typeOfCoffeePowder.$dirty) return "";
      return v$.value.typeOfCoffeePowder.$invalid ? "text-incorrect" : "text-correct";
    };
    const amountOfACupOfCoffeeValidation = () => {
      if (!v$.value.amountOfACupOfCoffee.$dirty) return "";
      return v$.value.amountOfACupOfCoffee.$invalid ? "text-incorrect" : "text-correct";
    };
    const amountOfHotWaterValidation = () => {
      if (!v$.value.amountOfHotWater.$dirty) return "";
      return v$.value.amountOfHotWater.$invalid ? "text-incorrect" : "text-correct";
    };
    const temperatureOfHotWaterValidation = () => {
      if (!v$.value.temperatureOfHotWater.$dirty) return "";
      return v$.value.temperatureOfHotWater.$invalid ? "text-incorrect" : "text-correct";
    };
    const typeOfDripperValidation = () => {
      if (!v$.value.typeOfDripper.$dirty) return "";
      return v$.value.typeOfDripper.$invalid ? "text-incorrect" : "text-correct";
    };

    const createRow = () => {
      form.rows.push({
        description: "", amount: 0, totalAmount: 0, time: 0, totalTime: 0,
      });
    };
    const deleteRow = (index: number) => {
      form.rows.splice(index, 1);
    };
    return {
      form,
      registerForFirestore,
      registerMethod,
      createRow,
      deleteRow,
      v$,
      methodNameValidation,
      amountOfCoffeePowderValidation,
      typeOfCoffeePowderValidation,
      amountOfACupOfCoffeeValidation,
      amountOfHotWaterValidation,
      temperatureOfHotWaterValidation,
      typeOfDripperValidation,
    };
  },
});
</script>
<style scoped>
.text-correct {
    border-color: forestgreen;
    background: mintcream;
}
.text-incorrect {
  border-color: #EF5350;
  background: #FFEBEE;
}

</style>
