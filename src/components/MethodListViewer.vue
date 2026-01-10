<template>
  <div class="container">
    <!-- TODO:開く事に変更してユーザに寄り添うコメントを表示したい -->
    <h1>今日もコーヒーを淹れよう</h1>

    <router-link to="/method_register">
      <!-- 抽出を登録する -->
      <span class="material-icons">
        coffee
      </span>
      <img
        src="../assets/Icon Button.svg"
        alt="登録アイコン"
        style="width: 20px; height: 20px;"
      >
    </router-link>
    <div class="bl_flexContainer method-list-container">
      <div
        v-for="method in methods"
        :key="method.id"
        class="el_flexItem"
      >
        <div class="l-wrapper card-radius card">
          <input
            :id="method.id"
            v-model="methodId"
            type="radio"
            class="radio-inline__input"
            :value="method.id"
          >
          <label
            class="radio-inline__label"
            :for="method.id"
          >
            <button
              type="button"
              class="material-icons delete-card-button"
              @click="deleteMethod(method.id)"
            >
              delete_outline
            </button>
            <p class="card__header card__title">
              {{ method.methodName }}
            </p>
            <table>
              <tbody style="text-align: left">
                <tr>
                  <td colspan="2">
                    {{ method.typeOfCoffeePowder }}
                  </td>
                  <td />
                </tr>
                <tr>
                  <td>
                    粉末量
                  </td>
                  <td>
                    {{ method.amountOfCoffeePowder }}
                    g
                  </td>
                </tr>
                <tr>
                  <td>
                    抽出量
                  </td>
                  <td>
                    {{ method.amountOfACupOfCoffee }}
                    ml
                  </td>
                </tr>
                <tr>
                  <td>
                    ドリッパー
                  </td>
                  <td>
                    {{ method.typeOfDripper }}
                  </td>
                </tr>
              </tbody>
            </table>
          </label>
        </div>
      </div>
    </div>

    <MethodDetailViewer
      v-if="methodIsSelected"
      class="py-3"
      :selected-method="selectedMethod"
    />
  </div>
</template>
<script lang="ts">
import { defineComponent } from "vue";
import {
  collection, deleteDoc, doc, getDocs,
} from "firebase/firestore";
import { getAuth } from "firebase/auth";
import Method from "./method/Method";
import MethodDetailViewer from "./MethodDetailViewer.vue";
import { db } from "../firebase";
import showTwoButtonDialogWithEachMethod from "./dialog/TwoButtonDialogService";

export default defineComponent({
  components: {
    MethodDetailViewer,
  },
  data(): { methods: Method[] | null
  , method: Method | null
  , methodIsSelected: boolean
  , methodId: string
  , selectedMethod: Method | undefined } {
    return {
      methods: null,
      method: new Method(),
      methodIsSelected: false,
      methodId: "",
      selectedMethod: new Method(),
    };
  },
  watch: {
    methodId() {
      this.methodIsSelected = this.methodId !== null;
      // 選ばれたmethodIdをもつmethodをmethodsから取り出す
      const found = this.methods?.find((m) => m.getId() === this.methodId);
      // 2025/3/27 selectedMethodをMethod型として渡す。これをしないとMethodDetailViewer.vueでMethod型として扱えない
      this.selectedMethod = found ? Object.assign(new Method(), found) : undefined;
    },
  },
  mounted() {
    this.getMethodsFromFirestore().catch(console.error);
  },
  methods: {
    async getMethods() {
      await this.axios
        .get("http://127.0.0.1:5000/api/get_methods")
        .then((res: { data: { isSuccess: boolean; methods: Method[]; }; }) => {
          if (res.data.isSuccess) {
            // 取得したデータの方が判別できないため、Method型に変換する
            this.methods = res.data.methods.map((method) => Object.assign(new Method(), method));
          } else {
            alert("リクエストは失敗しました。");
          }
        })
        .catch(() => {
          alert("通信中にエラーが発生しました。");
        });
    },
    // TODO: Procedureを取得できるようにする
    // TODO: firestoreの処理を1つにまとめる
    // TODO:Procedureのtimeをnumberで受け取る。今はwarningが出ている
    async getMethodsFromFirestore() {
const uid = getAuth().currentUser?.uid;
      const querySnapshot = await getDocs(collection(db, "users", String(uid), "method"));
      this.methods = querySnapshot.docs.map((document) => {
        let m = new Method();
        m = Object.assign(m, document.data());
        m.setId(document.id);

        return m;
      });
    },
    // DONE: 削除の確認ダイアログを表示する
    async deleteMethod(methodId: string) {
      try {
        await showTwoButtonDialogWithEachMethod(
          "本当に削除しますか？",
          {
            onLeftClick: async () => {
      const uid = getAuth().currentUser?.uid;
              await deleteDoc(doc(db, "users", String(uid), "method", methodId));
              // DONE: 削除したときにメソッドを取得し直し、削除したメソッドを画面で見えないようにする
              this.getMethodsFromFirestore().catch(console.error);
            },
            onRightClick: async () => { },
          },
          "はい",
          "いいえ",
        );
      } catch (error) {
        console.error("Error deleting method:", error);
      }
    },
  },
});
</script>
<style scoped>
.radio-inline__input {
  clip: rect(1px, 1px, 1px, 1px);
  position: absolute !important;
}

.radio-inline__label {
  background-color: #f8f9fa;
  outline-color: #000;
  display: inline-block;
  padding: 0.5rem 1rem;
  border-radius: 3px;
  transition: all 0.2s;
}

.radio-inline__input:checked + .radio-inline__label {
  background: #6f4c3e;
  color: #fff;
  text-shadow: 0 0 1px rgba(0, 0, 0, 0.7);
}

.bl_flexContainer {
display: flex;
overflow-x:scroll;
padding: 10px;
}
.el_flexItem {
min-width: 377px;
min-height: 256px;
padding: 0 5px;
}
.l-wrapper:hover {
  transform: translateY(-3px);
  box-shadow: 0 7px 14px rgba(50,50,93,.1), 0 3px 6px rgba(0,0,0,.08);
  transition: all .5s;
}
.card-radius{
  overflow: hidden;
  border-radius: 8px;
  box-shadow: 0 4px 15px rgba(0,0,0,.2);
}

.card__title {
  display: flex;
  flex-wrap: wrap;
  padding: 1rem 1.5rem 0;
  font-size: 1.6rem;
  order: 1;
  font-weight: bold;
  text-decoration: none;
  /*線の種類（実線） 太さ 色*/
  border-bottom: solid 3px black;

}

 /* 追加 */
.delete-card-button {
  width: 40px;
  height: 40px;
}

.method-list-container::-webkit-scrollbar{
  background: transparent;
  width: 5px;
  height: 5px;
  display: block;
}
.method-list-container:hover::-webkit-scrollbar{
  background: lightgray;
  width: 5px;
  height: 5px;
  display: block;
}
.method-list-container:hover::-webkit-scrollbar-thumb{
  background-color: gray;
}
</style>
