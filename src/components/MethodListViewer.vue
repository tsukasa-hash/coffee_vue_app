<template>
  <div style="background-color: #c2b180">
    <p>ようこそ、ゲストさん</p>
    <!-- TODO:開く事に変更してユーザに寄り添うコメントを表示したい -->
    <h1>今日もコーヒーを淹れよう</h1>

    <router-link to="/method_register">
      <!-- 抽出を登録する -->
      <img
        src="../assets/Icon Button.svg"
        alt="登録アイコン"
        style="width: 20px; height: 20px;"
      >
    </router-link>
    <router-link to="/">
      トップページに戻る
    </router-link>
    <!-- <router-link to="/firestore_test">
      Firestoreのテスト
    </router-link> -->
    <div class="bl_flexContainer">
      <div
        v-for="method in methods"
        :key="method.id"
        class="el_flexItem"
      >
        <div class="l-wrapper_02 card-radius_02">
          <article
            class="card_02"
          >
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
                @click="deleteMethod(method.id)"
              >
                <span class="material-icons">
                  delete_outline
                </span>
              </button>
              <div class="card__header_02">
                <p class="card__title_02">
                  {{ method.methodName }}
                </p>
              </div>
              <div class="card__body_02">
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
              </div>
            </label>
          </article>
        </div>
      </div>
      <br>
    </div>

    <div
      style="display: flex; flex-wrap: wrap"
      class="detail"
    >
      <MethodDetailViewer
        :selected-method="selectedMethod"
      />
      <UserConfirmDialog />
    </div>
    <br>
  </div>
</template>
<script lang="ts">
import { defineComponent } from "vue";
import {
  collection, deleteDoc, doc, getDocs,
} from "firebase/firestore";
import Method from "./method/Method";
import MethodDetailViewer from "./MethodDetailViewer.vue";
import { db } from "../firebase";
import UserConfirmDialog from "./dialog/UserConfirmDialog.vue";
// import BrewingViewerVue from "./BrewingViewer.vue";

export default defineComponent({
  components: {
    MethodDetailViewer,
    UserConfirmDialog,
    // BrewingViewerVue,
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
    async getMethodsFromFirestore() {
      const querySnapshot = await getDocs(collection(db, "method"));
      this.methods = querySnapshot.docs.map((document) => {
        let m = new Method();
        m = Object.assign(m, document.data());
        m.setId(document.id);
        console.log(document.id);

        return m;
      });
    },
    async deleteMethod(methodId: string) {
      try {
        await deleteDoc(doc(db, "method", methodId));
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

.radio-inline__input:focus + .radio-inline__label {
  outline-color: #4d90fe;
  outline-offset: -2px;
  outline-style: auto;
  outline-width: 5px;
}

.bl_flexContainer {
display: flex;
/* flex-wrap: wrap; */
overflow-x:scroll;
/* justify-content: space-between; */
padding: 10px;
}
.el_flexItem {
/* width: 20%; */
min-width: 361px;
/* height: 300px; */
min-height: 256px;
padding: 0 5px;
}
/*--------------------------------------
  カード型_02
--------------------------------------*/
.l-wrapper_02 {
  margin: 1rem auto;
  width: 361px;
}
.l-wrapper_02:hover {
  transform: translateY(-3px);
  box-shadow: 0 7px 14px rgba(50,50,93,.1), 0 3px 6px rgba(0,0,0,.08);
  transition: all .5s;
}
.card-radius_02{
  overflow: hidden;
  border-radius: 8px;
  box-shadow: 0 4px 15px rgba(0,0,0,.2);
}

.card_02 {
  background-color: #fff;
  box-shadow: 0 0 0px rgba(0, 0, 0, .16);
  color: #212121;
  text-decoration: none;
  min-height: 256px;
  min-width: 361px;
}

.card__header_02 {
  display: flex;
  flex-wrap: wrap;
}

.card__title_02 {
  padding: 1rem 1.5rem 0;
  font-size: 1.6rem;
  order: 1;
  font-weight: bold;
  text-decoration: none;
  /*線の種類（実線） 太さ 色*/
  border-bottom: solid 3px black;

}

.card__body_02 {
  padding: 0 1.5rem;
}

.card__text_02 {
  font-size: .8rem;
  text-align:center;
  text-decoration: none;
}

.card__text2_02 {
  font-size: .8rem;
  margin-top: 0;
  margin-bottom: 1.5rem;
}
</style>
