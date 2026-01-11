<template>
  <div>
    <h1>抽出メソッドを登録する</h1>
    <div class="container">
      <form
        id="c_form-h"
      >
        <div class="form-group row">
          <label
            for="methodName"
            class="col-md-2 col-form-label"
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
            class="col-md-6 form-validation-NG-col"
          >
            {{ methodNameValidationNgMessage() }}
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
            class="col-md-6 form-validation-NG-col"
          >
            {{ typeOfCoffeePowderValidationNgMessage() }}
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
            class="col-md-6 form-validation-NG-col"
          >
            {{ amountOfCoffeePowderValidationNgMessage() }}
          </span>
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
            class="col-md-6 form-validation-NG-col"
          >
            {{ amountOfACupOfCoffeeValidationNgMessage() }}
          </span>
        </div>
        <div class="form-group row">
          <label
            for="amountOfHotWater"
            class="col-md-2 col-form-label"
          >抽出に必要なお湯の量</label>
          <span
            class="col-md-4"
          >
            <input
              id="amountOfHotWater"
              v-model.number="form.amountOfHotWater"
              type="number"
              :class="['form-control', amountOfHotWaterValidation()]"
            >
          </span>
          <span
            class="col-md-6 form-validation-NG-col"
          >
            {{ amountOfHotWaterValidationNgMessage() }}
          </span>
        </div>
        <div class="form-group row">
          <label
            for="temperatureOfHotWater"
            class="col-md-2 col-form-label"
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
            class="col-md-6 form-validation-NG-col"
          >
            {{ temperatureOfHotWaterValidationNgMessage() }}
          </span>
        </div>
        <div class="form-group row">
          <label
            for="typeOfDripper"
            class="col-md-2 col-form-label"
          >ドリッパーの種類</label>
          <span
            class="col-md-4"
          >
            <input
              id="typeOfDripper"
              v-model.trim="form.typeOfDripper"
              type="text"
              :class="['form-control', typeOfDripperValidation()]"
            >
          </span>
          <span
            class="col-md-6 form-validation-NG-col"
          >
            {{ typeOfDripperValidationNgMessage() }}
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
            <textarea
              id="memo"
              v-model="form.memo"
              rows="3"
              class="form-control"
            />
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
          <span class="form-validation-NG-col">
            {{ procedureValidationNgMessage }}
          </span>
        </div>
        <table>
          <thead>
            <tr>
              <th class="col-md-2">
                詳細
              </th>
              <th class="col-md-2">
                お湯の量
              </th>
              <th class="col-md-2">
                合計量
              </th>
              <th class="col-md-2">
                時間
              </th>
              <th class="col-md-2">
                合計時間
              </th>
              <th class="col-md-2" />
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="(row, index) in form.rows"
              :key="index"
            >
              <!-- <DripProcedures
                :procedure="row"
                :vuelidate="v$.rows[index]"
              /> -->
              <td>
                <select
                  v-model="row.description"
                  class="form-select"
                >
                  <option
                    value=""
                    disabled
                  >
                    選択してください
                  </option>
                  <option value="お湯を注ぐ">
                    お湯を注ぐ
                  </option>
                  <option value="円を描くように注ぐ">
                    円を描くように注ぐ
                  </option>
                  <option value="蒸らす">
                    蒸らす
                  </option>
                  <option value="待つ">
                    待つ
                  </option>
                  <option value="かき混ぜる">
                    かき混ぜる
                  </option>
                  <option value="カップを回す">
                    カップを回す
                  </option>
                </select>
              </td>
              <td>
                <input
                  v-model="row.amount"
                  type="number"
                  class="form-control"
                >
              </td>
              <td>
                {{ row.totalAmount = totalAmount(index) }}
              </td>
              <td>
                <input
                  v-model="row.time"
                  type="number"
                >
              </td>
              <td>
                {{ row.totalTime = totalTime(index) }}
              </td>
              <td>
                <button
                  type="button"
                  class="btn btn-dark"
                  :disabled="rowHasOneElement()"
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
      <!-- <button
        class="btn btn-primary"
        @click="update"
      >
        更新
      </button> -->
    </div>
    <router-link to="/top">
      メニューに戻る
    </router-link>
  </div>
</template>
<script lang="ts">
/* eslint-disable import/no-cycle */
import {
 defineComponent, nextTick, reactive, ref,
} from "vue";
import {
  addDoc, collection,
} from "firebase/firestore";
import { getAuth } from "firebase/auth";
import useVuelidate from "@vuelidate/core";
import {
  required, minValue, between, maxValue, integer, numeric,
} from "@vuelidate/validators";
import { useRouter } from "vue-router";
import { db } from "../firebase";
// import Procedure from "./method/Procedure";
import showTwoButtonDialogWithEachMethod from "./dialog/TwoButtonDialogService";
// import DripProcedures from "./DripProcedures.vue";
// NOTE:error  Dependency cycle via ./router:12  import/no-cycle
//  NOTE:Vulidateを使うためにComposition APIに変換した

export default defineComponent({
  // components: {
  //   DripProcedures,
  // },
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
      // procedures: [] as Procedure[],
      rows: [
        {
          description: "", amount: 0 as number, totalAmount: 0 as number, time: 0 as number, totalTime: 0 as number,
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
        $each: {
          description: { $autoDirty: true, required },
          amount: {
            $autoDirty: true, required, numeric, integer, minValue: minValue(1),
          },
          time: {
            $autoDirty: true, required, numeric, integer, minValue: minValue(1),
          },
        },
      },
    };

    const v$ = useVuelidate(rules, form);

    const registerMethod = async () => {
// DONE:ユーザIDをURLに追加する。ユーザ自身のみのデータを取得できるようにするため。
      const uid = getAuth().currentUser?.uid;
      await addDoc(collection(db, "users", String(uid), "method"), {
        methodName: form.methodName,
        typeOfCoffeePowder: form.typeOfCoffeePowder,
        amountOfCoffeePowder: form.amountOfCoffeePowder,
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
    // TODO:手順の入力チェックをvuelidateで実装する。
    const procedureValidationNgMessage = ref("");
    const procedureValidationIsOk = (): boolean => {
      procedureValidationNgMessage.value = "";
      let hasError = false;
      form.rows.forEach((row) => {
        if (row.description === "") {
          hasError = true;
          procedureValidationNgMessage.value = "手順の詳細を選択してください。";
        }
        if (row.amount < 0) {
          hasError = true;
          procedureValidationNgMessage.value += "お湯の量は0以上を入力してください。";
        }
        if (!Number.isInteger(row.amount)) {
          hasError = true;
          procedureValidationNgMessage.value += "お湯の量は整数を入力してください。";
        }
        if (row.time < 1) {
          hasError = true;
          procedureValidationNgMessage.value += "時間は1以上を入力してください。";
        }
        if (!Number.isInteger(row.time)) {
          hasError = true;
          procedureValidationNgMessage.value += "時間は整数を入力してください。";
        }
      });
      return !hasError;
    };
    const formValidationNG = async (): Promise<boolean> => {
      const result = await v$.value.$validate();

      // 検証結果にエラーがあればfalseが返るため、NGならtrueを返す。
      return !result || !procedureValidationIsOk();
    };
    const router = useRouter();
    const registerForFirestore = async () => {
      // 入力チェックにエラーがあれば処理を中断する。
      if (await formValidationNG()) return;
      try {
        await showTwoButtonDialogWithEachMethod(
          "メソッドを登録しますか？",
          {
            onLeftClick: async () => {
              try {
                await registerMethod();
                await router.push("/top");
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
    const totalAmount = (index: number) => {
      if (index === 0) return form.rows[0].amount;
      return form.rows[index - 1].totalAmount + form.rows[index].amount;
    };
    const totalTime = (index: number) => {
      if (index === 0) return form.rows[0].time;
      return form.rows[index - 1].totalTime + form.rows[index].time;
    };

    // FIXME:共通化したい
    const methodNameValidation = () => {
      if (!v$.value.methodName.$dirty) return "";
      return v$.value.methodName.$invalid ? "validation-NG" : "validation-OK";
    };
    const amountOfCoffeePowderValidation = () => {
      if (!v$.value.amountOfCoffeePowder.$dirty) return "";
      return v$.value.amountOfCoffeePowder.$invalid ? "validation-NG" : "validation-OK";
    };
    const typeOfCoffeePowderValidation = () => {
      if (!v$.value.typeOfCoffeePowder.$dirty) return "";
      return v$.value.typeOfCoffeePowder.$invalid ? "validation-NG" : "validation-OK";
    };
    const amountOfACupOfCoffeeValidation = () => {
      if (!v$.value.amountOfACupOfCoffee.$dirty) return "";
      return v$.value.amountOfACupOfCoffee.$invalid ? "validation-NG" : "validation-OK";
    };
    const amountOfHotWaterValidation = () => {
      if (!v$.value.amountOfHotWater.$dirty) return "";
      return v$.value.amountOfHotWater.$invalid ? "validation-NG" : "validation-OK";
    };
    const temperatureOfHotWaterValidation = () => {
      if (!v$.value.temperatureOfHotWater.$dirty) return "";
      return v$.value.temperatureOfHotWater.$invalid ? "validation-NG" : "validation-OK";
    };
    const typeOfDripperValidation = () => {
      if (!v$.value.typeOfDripper.$dirty) return "";
      return v$.value.typeOfDripper.$invalid ? "validation-NG" : "validation-OK";
    };
    const methodNameValidationNgMessage = () => {
      if (!v$.value.methodName.$dirty) return "";
      if (!v$.value.methodName.required.$response) return "必須項目です";
      return "";
    };
    const typeOfCoffeePowderValidationNgMessage = () => {
      if (!v$.value.typeOfCoffeePowder.$dirty) return "";
      if (!v$.value.typeOfCoffeePowder.required.$response) return "必須項目です";
      return "";
    };
    const amountOfCoffeePowderValidationNgMessage = () => {
      if (!v$.value.amountOfCoffeePowder.$dirty) return "";
      if (!v$.value.amountOfCoffeePowder.required.$response) return "必須項目です";
      if (!v$.value.amountOfCoffeePowder.minValue.$response) return "1以上を入力してください";
      return "";
    };
    const amountOfACupOfCoffeeValidationNgMessage = () => {
      if (!v$.value.amountOfACupOfCoffee.$dirty) return "";
      if (!v$.value.amountOfACupOfCoffee.required.$response) return "必須項目です";
      if (!v$.value.amountOfACupOfCoffee.minValue.$response) return "1以上を入力してください";
      return "";
    };
    const amountOfHotWaterValidationNgMessage = () => {
      if (!v$.value.amountOfHotWater.$dirty) return "";
      if (!v$.value.amountOfHotWater.required.$response) return "必須項目です";
      if (!v$.value.amountOfHotWater.numeric.$response) return "数値を入力してください";
      if (!v$.value.amountOfHotWater.integer.$response) return "整数を入力してください";
      // if (!v$.value.amountOfHotWater.minValue.$response)
      // return ` ${v$.value.amountOfHotWater.minValue.$params.min}以上を入力してください`;
      if (!v$.value.amountOfHotWater.minValue.$response) return "最小値以上を入力してください";
      return "";
    };
    const temperatureOfHotWaterValidationNgMessage = () => {
      if (!v$.value.temperatureOfHotWater.$dirty) return "";
      if (!v$.value.temperatureOfHotWater.required.$response) return "必須項目です";
      if (!v$.value.temperatureOfHotWater.numeric.$response) return "数値を入力してください";
      if (!v$.value.temperatureOfHotWater.integer.$response) return "整数を入力してください";
      if (!v$.value.temperatureOfHotWater.maxValue.$response) return "最大値以上を入力してください";
      return "";
    };
    const typeOfDripperValidationNgMessage = () => {
      if (!v$.value.typeOfDripper.$dirty) return "";
      if (!v$.value.typeOfDripper.required.$response) return "必須項目です";
      return "";
    };
    // DONE:手順の入力チェックのエラーメッセージを表示させる。まずは自力で作る。
    // const descriptionValidationNgMessage = (index: number) => {
    //   if (!v$.value.rows.$dirty) return index;
    //   console.log(form.rows[0]);

    // if (!v$.value.rows[index]?.description.$dirty) return "";
    // v$.value.rows.forEach((element) => {
    //   if (!element.description.required.$response) return "必須項目です";
    // });
    // if (!v$.value.rows.description.required.$response) return "必須項目です";
    // return index;
    // };
    // const timeValidationNgMessage = () => {
    //   if (!v$.value.rows.$dirty) return "";
    //   // if (!v$.value.rows.time?.required.$response) return "必須項目です";
    //   return "";
    // };
    // const rowsValidationNgMessage = () => {
    //   console.log("rowsValidationNgMessage()が実行されました。");

    //   if (!v$.value.rows.$dirty) return "";
      // if (!v$.value.rows.$each.time.required) return "必須項目です";
      // v$.value.rows.$each((element, index) => {
        // if (!element.time.required.$response) {
        //   console.log("rowsValidationNgMessage():必須項目です");
          // return "validation-NG";
        // }
      // });
    //   console.log(v$.value.rows);

    //   return "";
    // };
    const rowHasOneElement = () => form.rows.length === 1;

    const createRow = async () => {
      form.rows.push({
        description: "", amount: 0, totalAmount: 0, time: 0, totalTime: 0,
      });
      await nextTick();
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
      totalAmount,
      totalTime,
      methodNameValidation,
      amountOfCoffeePowderValidation,
      typeOfCoffeePowderValidation,
      amountOfACupOfCoffeeValidation,
      amountOfHotWaterValidation,
      temperatureOfHotWaterValidation,
      typeOfDripperValidation,
      methodNameValidationNgMessage,
      typeOfCoffeePowderValidationNgMessage,
      amountOfCoffeePowderValidationNgMessage,
      amountOfACupOfCoffeeValidationNgMessage,
      amountOfHotWaterValidationNgMessage,
      temperatureOfHotWaterValidationNgMessage,
      typeOfDripperValidationNgMessage,
      // descriptionValidationNgMessage,
      // timeValidationNgMessage,
      // rowsValidationNgMessage,
      rowHasOneElement,
      procedureValidationNgMessage,
    };
  },
});
</script>
<style scoped>

 .form-validation-NG-col {
   align-items: center;
   color: #ef5350;
   display: flex;
   text-align: left;
 }
.validation-OK {
    border-color: forestgreen;
    background: mintcream;
}
.validation-NG {
  border-color: #EF5350;
  background: #FFEBEE;
}

</style>
