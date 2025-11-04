<template>
  <div>
    <h1>ユーザを登録する</h1>
    <div class="container">
      <form id="c_form-h">
        <!-- <form @submit.prevent="registerUser"> -->
        <!-- <div class="form-group row">
          <label
            for="username"
            class="col-md-2 col-form-label"
          >ユーザ名</label>
          <span class="col-md-4">
            <input
              id="username"
              v-model.trim="form.username"
              type="text"
              class="form-control"
            >
          </span>
          <span class="col-md-6 form-validation-NG-col" />
        </div> -->
        <div class="form-group row">
          <label
            for="email"
            class="col-md-2 col-form-label"
          >メールアドレス</label>
          <span class="col-md-4">

            <input
              id="email"
              v-model.trim="form.email"
              type="email"
              class="form-control"
            >
          </span>
          <span class="col-md-6 form-validation-NG-col" />
        </div>
        <div class="form-group row">
          <label
            for="password"
            class="col-md-2 col-form-label"
          >パスワード</label>
          <span class="col-md-4">
            <input
              id="password"
              v-model="form.password"
              type="password"
              class="form-control"
            >
          </span>
          <span class="col-md-6 form-validation-NG-col" />
        </div>
        <button
          class="btn btn-primary"
          type="button"
          @click="createAccount"
        >
          登録
        </button>
      </form>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, reactive } from "vue";
import useVuelidate from "@vuelidate/core";
import { FirebaseError } from "firebase/app";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";

export default defineComponent({
  setup() {
    const form = reactive({
      username: "",
      email: "",
      password: "",
      errMsg: "",
    });
    const rules = {
      username: { $autoDirty: true, required: true, maxLength: 30 },
      email: { $autoDirty: true, required: true, email: true },
      password: { $autoDirty: true, required: true, minLength: 6 },
    };

    const v$ = useVuelidate(rules, form);
    const formValidationNG = async (): Promise<boolean> => {
      const result = await v$.value.$validate();
      return !result;
    };
    // const createAccount = async () => {
    //   try {
    //     const userCredentia
    // = await createUserWithEmailAndPassword(auth, form.email, form.password);
    //     alert("ユーザ登録に成功しました");
    //     console.log(userCredentia);
    //     form.errMsg = "";
    //     // 必要ならリダイレクト等を行う (例: router.push)
    //   } catch (error) {
    //     const e = error as FirebaseError;
    //     const msg = e?.message ?? "ユーザ登録に失敗しました";
    //     alert(msg);
    //     console.error(error);
    //     form.errMsg = msg;
    //   }
    // };
    const createAccount = () => {
      // TODO:authenticationにない入力チェックをする
      // TODO:メールアドレス宛にメールを送り、メールアドレスが使えることを確認する
      createUserWithEmailAndPassword(auth, form.email, form.password)
        .then((user) => {
          alert("ユーザ登録に成功しました");
          console.log(user);
        })
        .catch((error: FirebaseError) => {
        // this.showLoginErroer(error);
          alert(error.message);
        // form.errMsg = "ユーザ登録に失敗しました";
        });
    };
    // showLoginErroer(error: FirebaseError) {
    //   if (error.code === AuthErrorCodes.USER_DELETED) {
    //     this.errMsg = "ユーザが見つかりません";
    //   } else if (error.code === AuthErrorCodes.INVALID_PASSWORD) {
    //     this.errMsg = "パスワードが間違っています";
    //   } else if (error.code === AuthErrorCodes.INVALID_EMAIL) {
    //     this.errMsg = "メールアドレスの形式が正しくありません";
    //   } else {
    //     this.errMsg = "ログインに失敗しました";
    //   }
    // },
    return {
      form,
      formValidationNG,
      v$,
      createAccount,
    };
  },
});
</script>
