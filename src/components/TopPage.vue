<template>
  <div>
    <h1>何をする？</h1>
    <router-link to="/brewing">
      抽出する
    </router-link> <br>
    <router-link to="/method_register">
      抽出を登録する
    </router-link> <br>
    <router-link to="/method_list_viewer">
      抽出方法を見る
    </router-link>
    <router-view />
  </div>
</template>
<script>
export default { name: "TopPage" };
</script>
