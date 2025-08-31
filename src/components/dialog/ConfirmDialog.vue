<template>
  <div
    v-if="visible"
    class="dialog-overlay"
  >
    <div class="dialog">
      <p>{{ message }}</p>
      <div class="actions">
        <button @click="handleConfirm()">
          {{ buttonLabel }}
        </button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "ConfirmDialog",
  props: {
    message: {
      type: String,
      required: true,
    },
    buttonLabel: {
      type: String,
      default: "OK",
    },
  },
  emits: ["action"],
  data() {
    return {
      visible: true,
    };
  },
  methods: {
    handleConfirm() {
      this.visible = false;
      this.$emit("action", "confirm");
    },
  },
});
</script>
<style>
.dialog-overlay {
  position: fixed;
  top: 0; left: 0;
  width: 100%; height: 100%;
  background: rgba(0,0,0,0.5);
  display: flex; justify-content: center; align-items: center;
}
.dialog {
  background: white;
  padding: 20px;
  border-radius: 8px;
}
.actions {
  display: flex;
  justify-content: flex-end;
  margin-top: 10px;
}
</style>
