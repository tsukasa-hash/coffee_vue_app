<template>
  <div>
    <!-- <h1>何をする？</h1> -->
    <!-- <router-link to="/brewing">
      抽出する
    </router-link> <br> -->
    <router-link to="/method_register">
      <!-- 抽出を登録する -->
      <img
        src="../assets/Icon Button.svg"
        alt="登録アイコン"
        style="width: 20px; height: 20px;"
      >
    </router-link> <br>
    <!-- <router-link to="/method_list_viewer">
      抽出方法を見る
    </router-link> -->
    <div
      style="display: flex; flex-wrap: wrap"
      class="detail"
    >
      <method-list-viewer />
      <brewing-viewer />
    </div>
    <!-- <method-list-viewer />
    <brewing-viewer /> -->
    <router-view />
  </div>
</template>
<script lang="ts">
import { defineComponent } from "vue";
import MethodListViewer from "./MethodListViewer.vue";
import BrewingViewer from "./BrewingViewer.vue";

export default defineComponent({
  name: "TopPage",
  components: {
    MethodListViewer,
    BrewingViewer,
  },
});
</script>
