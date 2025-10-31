<template>
  <div>
    <section class="py-2 px-2 text-end page-header">
      ゲスト名
      <router-link
        to="/"
        class="text-dark"
      >
        トップページに戻る
      </router-link>
    </section>
    <router-view />
  </div>
</template>

<script>
export default {};
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
