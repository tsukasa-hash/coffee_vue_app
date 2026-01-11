<template>
  <div>
    <h1>ユーザを登録する</h1>
    <div class="container">
      <form id="c_form-h">
        <!-- <form @submit.prevent="registerUser"> -->
        <div class="form-group row">
          <label
            for="nickname"
            class="col-md-2 col-form-label"
          >ニックネーム</label>
          <span class="col-md-4">
            <input
              id="nickname"
              v-model.trim="form.nickname"
              type="text"
              :class="['form-control', nicknameValidation()]"
            >
          </span>
          <span class="col-md-6 form-validation-NG-col">
            {{ nicknameErrorMessage() }}
          </span>
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
              :class="['form-control', emailValidation()]"
            >
          </span>
          <span class="col-md-6 form-validation-NG-col">
            {{ emailErrorMessage() }}
          </span>
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
              :class="['form-control', passwordValidation()]"
            >
          </span>
          <span class="col-md-6 form-validation-NG-col">
            {{ passwordErrorMessage() }}
          </span>
        </div>
        <div class="form-group row">
          <label
            for="password"
            class="col-md-2 col-form-label"
          >パスワード（確認用）</label>
          <span class="col-md-4">
            <input
              id="confirmPassword"
              v-model="form.confirmPassword"
              type="password"
              :class="['form-control', confirmPasswordValidation()]"
            >
          </span>
          <span class="col-md-6 form-validation-NG-col">
            {{ confirmPasswordErrorMessage() }}
          </span>
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
import useVuelidate, { ErrorObject } from "@vuelidate/core";
import {
 required, email, minLength, maxLength,
 helpers,
} from "@vuelidate/validators";
import { FirebaseError } from "firebase/app";
import {
 createUserWithEmailAndPassword, sendEmailVerification, updateProfile,
} from "firebase/auth";
import { useRouter } from "vue-router";
import { auth } from "../firebase";
import showDialog from "./dialog/TwoButtonDialogService";

export default defineComponent({
  setup() {
    // DONE:ユーザ名の入力欄を追加する
    const form = reactive({
      nickname: "",
      email: "",
      password: "",
      confirmPassword: "",
    });
    const rules = {
      // DONE:authenticationにない入力チェックをする
      nickname: {
        $autoDirty: true,
        required: helpers.withMessage("ニックネームは必須です。", required),
        minLength: minLength(1),
        maxLength: helpers.withMessage("10文字以内で入力してください。", maxLength(10)),
      },
      email: {
        $autoDirty: true,
        required: helpers.withMessage("メールアドレスは必須です。", required),
        email: helpers.withMessage("メールアドレスの形式で入力してください。", email),
      },
      password: {
        $autoDirty: true,
        required: helpers.withMessage("パスワードは必須です。", required),
        minLength: helpers.withMessage("パスワードは8文字以上20文字以内で入力してください。", minLength(8)),
        maxLength: helpers.withMessage("パスワードは8文字以上20文字以内で入力してください。", maxLength(20)),
      },
      confirmPassword: {
        $autoDirty: true,
        required: helpers.withMessage("確認用パスワードは必須です。", required),
        // NOTE:sameAsがうまく動作しなかったので、無名関数で代用する
        sameAs: helpers.withMessage("パスワードと確認用パスワードが一致しません。", (() => form.password === form.confirmPassword)),
      },
    };

    const v$ = useVuelidate(rules, form);
    const formValidationNG = async (): Promise<boolean> => {
      const result = await v$.value.$validate();
      return !result;
    };
    const router = useRouter();
    const createAccount = async () => {
      if (await formValidationNG()) return;

      try {
        await showDialog(
          "登録してよろしいですか？",
          {
            onLeftClick: () => {
              try {
                // DONE:メールアドレス宛にメールを送り、メールアドレスが使えることを確認する
                createUserWithEmailAndPassword(auth, form.email, form.password)
                  .then((userCredential) => {
                    // DONE:画面表示名を登録する
                    updateProfile(userCredential.user, {
                      displayName: form.nickname,
                      photoURL: "",
                    })
                      .then(async () => {
                        console.log("プロフィールの更新に成功しました。");
                        await router.push("/top");
                      })
                      .catch((error: FirebaseError) => {
                        console.log(error);

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
                    console.log(error);

                    alert(error.message);
                  });
                // ユーザを登録する
              } catch (error) {
                console.error("ユーザ登録に失敗しました。", error);
              }
            },
            onRightClick: () => { /* 何もしない */ },
          },
        );
      } catch (error) {
        console.error("Dialog error:", error);
      }
    };
    const nicknameValidation = () => {
      if (!v$.value.nickname.$dirty) return "";
      return v$.value.nickname.$invalid ? "validation-NG" : "validation-OK";
    };
    const emailValidation = () => {
      if (!v$.value.email.$dirty) return "";
      return v$.value.email.$invalid ? "validation-NG" : "validation-OK";
    };
    const passwordValidation = () => {
      if (!v$.value.password.$dirty) return "";
      return v$.value.password.$invalid ? "validation-NG" : "validation-OK";
    };
    const confirmPasswordValidation = () => {
      if (!v$.value.confirmPassword.$dirty) return "";
      return v$.value.confirmPassword.$invalid ? "validation-NG" : "validation-OK";
    };
    const hasErrorMessage = (field: Array<ErrorObject>) => field.length > 0;
    const nicknameErrorMessage = () => (hasErrorMessage(v$.value.nickname.$errors) ? v$.value.nickname.$errors[0].$message : "");
    const emailErrorMessage = () => (hasErrorMessage(v$.value.email.$errors) ? v$.value.email.$errors[0].$message : "");
    const passwordErrorMessage = () => (hasErrorMessage(v$.value.password.$errors) ? v$.value.password.$errors[0].$message : "");
    const confirmPasswordErrorMessage = () => (hasErrorMessage(v$.value.confirmPassword.$errors) ? v$.value.confirmPassword.$errors[0].$message : "");
    return {
      form,
      formValidationNG,
      v$,
      createAccount,
      nicknameValidation,
      emailValidation,
      passwordValidation,
      confirmPasswordValidation,
      nicknameErrorMessage,
      emailErrorMessage,
      passwordErrorMessage,
      confirmPasswordErrorMessage,
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
