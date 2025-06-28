<template>
  <article
    class="max-w-7xl w-full bg-gray-200 sm:bg-red-200 md:bg-yellow-200 lg:bg-green-200
     xl:bg-blue-200"
  >
    <img
      class="m-auto"
      alt="Break Timw logo"
      src="../assets/break_time_logo.png"
    >
    <br>
    <!-- TODO:googleアカウントのログインを実装する -->
    <input
      v-model="email"
      type="text"
      placeholder="メールアドレス"
    >
    <input
      v-model="password"
      type="password"
      placeholder="パスワード"
    >
    <button
      class="btn btn-light shadow-sm"
      @click="login"
    >
      Log In
    </button>
    <!-- TODO:ユーザ登録ページを作成する -->
    <button
      class="btn btn-light shadow-sm"
      @click="createAccount"
    >
      Sign Up
    </button>
    <p
      v-if="errMsg"
      style="color: red;"
    >
      {{ errMsg }}
    </p>
    <br>
    <button
      class="btn btn-light shadow-sm"
      @click="showTopPage"
    >
      top pageへ遷移
    </button>
    <button
      class="btn btn-light shadow-sm"
      @click="logout"
    >
      Log Out
    </button>
  </article>
</template>
<script lang="ts">
import { defineComponent } from "vue";
import {
  signInWithEmailAndPassword, createUserWithEmailAndPassword, AuthErrorCodes,
} from "firebase/auth";
import { FirebaseError } from "firebase/app";
import { auth } from "../firebase";
// import { auth } from "../main";

// const auth = getAuth();
export default defineComponent({
  data(): {
    email: string;
    password: string;
    errMsg: string;
  } {
    return {
      email: "",
      password: "",
      errMsg: "",
    };
  },
  methods: {
    login() {
      signInWithEmailAndPassword(auth, this.email, this.password)
        .then(async () => {
          await this.showTopPage();
        })
        .catch((error: FirebaseError) => {
          this.showLoginErroer(error);
        });
    },
    createAccount() {
      createUserWithEmailAndPassword(auth, this.email, this.password)
        .then()
        .catch((error: FirebaseError) => {
          this.showLoginErroer(error);
        });
    },
    showLoginErroer(error: FirebaseError) {
      if (error.code === AuthErrorCodes.USER_DELETED) {
        this.errMsg = "ユーザが見つかりません";
      } else if (error.code === AuthErrorCodes.INVALID_PASSWORD) {
        this.errMsg = "パスワードが間違っています";
      } else if (error.code === AuthErrorCodes.INVALID_EMAIL) {
        this.errMsg = "メールアドレスの形式が正しくありません";
      } else {
        this.errMsg = "ログインに失敗しました";
      }
    },
    logout() {
      auth.signOut()
        .then(() => {
          console.log("ログアウトしました");
        })
        .catch((error: FirebaseError) => {
          console.error("ログアウトに失敗しました", error);
        });
    },
    async showTopPage() {
      try {
        await this.$router.push("/top");
      } catch (error) {
        console.error("Navigation error:", error);
      }
    },
  },
});
</script>
