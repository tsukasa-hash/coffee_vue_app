// 起動したときに最初に表示されるページ
<template>
    <article class="max-w-7xl w-full bg-gray-200 sm:bg-red-200 md:bg-yellow-200 lg:bg-green-200 xl:bg-blue-200">
      <img class="m-auto" alt="Break Timw logo" src="../assets/break_time_logo.png" />
      <br>
      <button class="btn btn-light shadow-sm" @click="showTopPage">top pageへ遷移</button>
      <!-- <button class="btn btn-light shadow-sm rounded-5" @click="showTopPage">top pageへ遷移</button>
      <button class="btn btn-light shadow-sm rounded-pill" @click="showTopPage">top pageへ遷移</button> -->
    </article>
</template>

<script>
export default {
  methods: {
    showTopPage() {
      this.$router.push('/top');
    }
  }
}
</script>