<template>
  <div>
    <section class="py-2 px-2 text-end page-header">
      {{ displayName }}
      <router-link
        to="/"
        class="text-dark"
        @click="logout"
      >
        ログアウト
      </router-link>
    </section>
    <router-view />
  </div>
</template>

<script lang="ts">
import { FirebaseError } from "firebase/app";
import { defineComponent, ref, onMounted } from "vue";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase";

export default defineComponent({
  setup() {
    // a@a.com 123456
    const displayName = ref("");
    const logout = () => {
      auth.signOut()
        .then(() => {
        })
        .catch((error: FirebaseError) => {
          console.error("ログアウトに失敗しました", error);
        });
    };

    onMounted(() => {
      // ログイン状態の変化を監視する。ログアウトするときにログイン状態が変化するので、そのタイミングで表示名もnullになる。
      onAuthStateChanged(auth, (user) => {
        displayName.value = user ? user.displayName || "" : "";
      });
    });

    return {
      logout,
      displayName,
    };
  },
});
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
}

.page-header {
  background-color: transparent;
}
</style>
