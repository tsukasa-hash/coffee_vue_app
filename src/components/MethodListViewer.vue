<template>
  <div>
    <h1>どの抽出メソッドを見る？</h1>

    <!-- TODO:ユーザが登録している抽出メソッドの一覧をデフォルト表示する -->
    <button
      class="btn btn-light shadow-sm"
      @click="getMethods"
    >
      抽出方法を取得する
    </button>
    <div>
      <div
        v-for="method in methods"
        :key="method.id"
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
          {{ method.methodName }}
        </label>
      </div>
      <br>
      {{ methodId }}
    </div>
    <div v-if="methodIsSelected">
      <!-- TODO:methodIdを渡し、タイトルに表示する -->
      <!-- 2025/3/26 オブジェクトは渡せたが、値を表示できない -->
      <!-- 2025/3/27 selectedMethodをオブジェクト型として渡したい -->
      <MethodDetailViewer
        :method-id="methodId"
        :selected-method="selectedMethod"
      />
    </div>
    <br>
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
import { defineComponent } from "vue";
// import MethodDetailViewer from "./MethodDetailViewer.vue";

class Method {
  private methodId: string = "";

  private methodName: string = "";
}

export default defineComponent({
  data(): { methods: Method[] | null
  , method: Method | null
  , methodIsSelected: boolean
  , methodId: string
  , selectedMethod: Method | null } {
    return {
      methods: null,
      method: null,
      methodIsSelected: false,
      methodId: "",
      selectedMethod: null,
    };
  },
  watch: {
    methodId() {
      this.methodIsSelected = this.methodId !== null;
      // TODO:選ばれたmethodIdをもつmethodをmethodsから取り出す or チェックが付いたmethodを設定する
      // this.selectedMethod = this.methods.filter((m) => m.id === this.methodId);
      // this.selectedMethod = JSON.parse(
      //   this.methods.filter((m) => m.id === this.methodId)
      // );
    },
  },
  methods: {
    async getMethods() {
      await this.axios
        .get("http://127.0.0.1:5000/api/get_methods")
        .then((res: { data: { isSuccess: boolean; methods: Method[]; }; }) => {
          if (res.data.isSuccess) {
            this.methods = res.data.methods;
          } else {
            alert("リクエストは失敗しました。");
          }
        })
        .catch(() => {
          // this.isSuccess = false;
          alert("通信中にエラーが発生しました。");
        });
    },
  },
});
// export default {
//   name: "MethodListViewer",
//   components: {
//     MethodDetailViewer,
//   },
//   // data: () => ({
//   //   methods: null,
//   //   method: {
//   //     methodId: null,
//   //     methodName: null,
//   //   },
//   //   methodIsSelected: false,
//   //   methodId: null,
//   //   selectedMethod: null,
//   // }),
//   watch: {
//     methodId() {
//       this.methodIsSelected = this.methodId !== null;
//       // TODO:選ばれたmethodIdをもつmethodをmethodsから取り出す or チェックが付いたmethodを設定する
//       this.selectedMethod = this.methods.filter((m) => m.id === this.methodId);
//       // this.selectedMethod = JSON.parse(
//       //   this.methods.filter((m) => m.id === this.methodId)
//       // );
//     },
//   },
//   methods: {
//     async getMethods() {
//       await this.axios
//         .get("http://127.0.0.1:5000/api/get_methods")
//         .then((res) => {
//           if (res.data.isSuccess) {
//             this.methods = res.data.methods;
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
// };
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
  margin-right: 18px;
  border-radius: 3px;
  transition: all 0.2s;
}

.radio-inline__input:checked + .radio-inline__label {
  background: #b54a4a;
  color: #fff;
  text-shadow: 0 0 1px rgba(0, 0, 0, 0.7);
}

.radio-inline__input:focus + .radio-inline__label {
  outline-color: #4d90fe;
  outline-offset: -2px;
  outline-style: auto;
  outline-width: 5px;
}
</style>
