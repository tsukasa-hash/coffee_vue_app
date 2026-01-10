<template>
  <div>
    <h1>ユーザを登録する</h1>
    <div class="container">
      <form id="c_form-h">
        <!-- <form @submit.prevent="registerUser"> -->
        <div class="form-group row">
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
        </div>
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
import {
 createUserWithEmailAndPassword, sendEmailVerification, updateProfile,
} from "firebase/auth";
import { auth } from "../firebase";

export default defineComponent({
  setup() {
    // TODO:ユーザ名の入力欄を追加する
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
    const createAccount = () => {
      // TODO:authenticationにない入力チェックをする
      // DONE:メールアドレス宛にメールを送り、メールアドレスが使えることを確認する
      createUserWithEmailAndPassword(auth, form.email, form.password)
        .then((userCredential) => {
          // TODO:画面表示名を登録する
          updateProfile(userCredential.user, {
            displayName: form.username,
            photoURL: "",
          })
            .then(() => {
              console.log("プロフィールの更新に成功しました。");
            })
            .catch((error: FirebaseError) => {
              alert(error.message);
            });
          sendEmailVerification(userCredential.user)
            .then(() => {
              alert("メールを送信しました。メール内のリンクをクリックしてメールアドレスの認証を完了させてください。");
            })
            .catch((error: FirebaseError) => {
              alert(error.message);
            });
        })
        .catch((error: FirebaseError) => {
          alert(error.message);
        });
    };
    return {
      form,
      formValidationNG,
      v$,
      createAccount,
    };
  },
});
</script>
