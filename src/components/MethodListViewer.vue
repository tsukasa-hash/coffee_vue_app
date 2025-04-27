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
    </div>
    <div v-if="methodIsSelected">
      <MethodDetailViewer
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
import Method from "./method/Method";
import MethodDetailViewer from "./MethodDetailViewer.vue";

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
  methods: {
    async getMethods() {
      await this.axios
        .get("http://127.0.0.1:5000/api/get_methods")
        .then((res: { data: { isSuccess: boolean; methods: Method[]; }; }) => {
          if (res.data.isSuccess) {
            this.methods = res.data.methods.map((method) => Object.assign(new Method(), method));
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
