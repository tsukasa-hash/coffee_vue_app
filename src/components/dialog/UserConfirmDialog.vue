<template>
  <div>
    <button
      :disabled="showDialog"
      @click="onClick"
    >
      確認
    </button>
    <div v-if="showDialog">
      ダイアログ表示
      <button @click="onConfirm">
        OK
      </button>
      <button @click="onCancel">
        Cancel
      </button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";

export default defineComponent({
  setup() {
    const showDialog = ref(false);
    function onClick() {
      showDialog.value = true;
    }

    function onConfirm() {
      showDialog.value = false;

      // 確認後処理
    }

    function onCancel() {
      showDialog.value = false;
    }

    return {
      showDialog,
      onClick,
      onConfirm,
      onCancel,
    };
  },
});
</script>
