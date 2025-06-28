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
              <div class=" row">
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
                  for="typeOfCoffeePowder"
                  class="col-2 col-form-label"
                  style=""
                >コーヒーの粉</label>
                <div
                  class="col-10 col-md-4"
                  style=""
                >
                  <input
                    id="typeOfCoffeePowder"
                    v-model="typeOfCoffeePowder"
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
              <div class="form-group row">
                <label
                  for="memo"
                  class="col-2 col-form-label"
                  style=""
                >メモ</label>
                <div
                  class="col-10 col-md-4"
                  style=""
                >
                  <input
                    id="memo"
                    v-model="memo"
                    type="text"
                    class="form-control"
                  >
                </div>
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
              </div>
              <table>
                <tbody>
                  <tr
                    v-for="(row, index) in rows"
                    :key="index"
                  >
                    <td>
                      <input
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
                        v-model="row.time"
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
import { defineComponent } from "vue";
import {
  addDoc, collection,
} from "firebase/firestore";
import { db } from "../firebase";
import Procedure from "./method/Procedure";
// NOTE:error  Dependency cycle via ./router:12  import/no-cycle

export default defineComponent({
  data(): {
    methodName: string,
    typeOfCoffeePowder: string,
    amountOfCoffeePowder: string,
    amountOfACupOfCoffee: string,
    amountOfHotWater: string,
    temperatureOfHotWater: string,
    typeOfDripper: string,
    memo: string,
    description: string,
    time: number,
    amount: number,
    isSuccess: boolean,
    message: string,
    procedures: Procedure[],
    rows: { description: string, amount: number, time: number }[]
  } {
    return {
      methodName: "",
      typeOfCoffeePowder: "",
      amountOfCoffeePowder: "",
      amountOfACupOfCoffee: "",
      amountOfHotWater: "",
      temperatureOfHotWater: "",
      typeOfDripper: "",
      memo: "",
      description: "",
      time: 0,
      amount: 0,
      isSuccess: false,
      message: "",
      procedures: [],
      rows: [
        { description: "", amount: 0, time: 0 },
      ],
    };
  },
  methods: {
    async registerForFirestore() {
      try {
        await addDoc(collection(db, "method"), {
          methodName: this.methodName,
          typeOfCoffeePowder: this.typeOfCoffeePowder,
          amountOfCoffeePowder: this.amountOfCoffeePowder,
          amountOfACupOfCoffee: this.amountOfACupOfCoffee,
          amountOfHotWater: this.amountOfHotWater,
          temperatureOfHotWater: this.temperatureOfHotWater,
          typeOfDripper: this.typeOfDripper,
          memo: this.memo,
          procedure: this.rows.map((row) => ({
            description: row.description,
            time: row.time,
            amount: row.amount,
          })),
        });
        console.log("{$doc.id} added successfully!");
      } catch (error) {
        console.error("Error adding document: ", error);
      }
    },
    createRow() {
      this.rows.push({ description: "", amount: 0, time: 0 });
    },
    deleteRow(index: number) {
      this.rows.splice(index, 1);
    },
  },

});
</script>
<style scoped>
</style>
