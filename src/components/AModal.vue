<script setup lang="ts">
import { ref, watch, onBeforeUnmount } from "vue";

interface Props {
  modelValue: boolean;
  title?: string;
  closeOnBackdrop?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  title: "",
  closeOnBackdrop: true,
});

const emit = defineEmits(["update:modelValue"]);

const dialog = ref<HTMLDivElement | null>(null);

watch(
  () => props.modelValue,
  (isOpen) => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    if (isOpen) setTimeout(() => dialog.value?.focus(), 20);
  }
);

onBeforeUnmount(() => {
  document.body.style.overflow = "";
});

function close() {
  emit("update:modelValue", false);
}

function onBackdrop(e: MouseEvent) {
  if (e.target === e.currentTarget && props.closeOnBackdrop)
    close();
}
</script>

<template>
  <div
    v-if="modelValue"
    class="a-modal-backdrop"
    @click="onBackdrop"
  >
    <div
      class="a-modal"
      role="dialog"
      :aria-label="title"
      tabindex="-1"
      ref="dialog"
    >
      <header class="a-modal-header">
        <h2>{{ title }}</h2>
        <button class="a-modal-close" @click="close">✕</button>
      </header>

      <div class="a-modal-body">
        <slot />
      </div>

      <footer class="a-modal-footer">
        <slot name="footer" />
      </footer>
    </div>
  </div>
</template>

<style scoped>
.a-modal-backdrop {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, .45);
  display: grid;
  place-items: center;
  padding: 16px;
  z-index: 999;
}

.a-modal {
  background: var(--color-bg, #fff);
  color: var(--color-text-primary);
  border-radius: var(--border-radius-md);
  padding: 16px;
  width: min(500px, 90%);
  outline: none;
}

.a-modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: var(--color-text-primary);
}

.a-modal-header h2 {
  margin: 0;
  font-size: var(--font-heading-2);
  color: var(--color-text-primary);
}

.a-modal-close {
  background: none;
  border: none;
  font-size: 20px;
  cursor: pointer;
  color: var(--color-text-primary);
}

.a-modal-body {
  margin: 16px 0;
  color: var(--color-text-subtle);
}
</style>