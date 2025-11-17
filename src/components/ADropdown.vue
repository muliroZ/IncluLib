<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from "vue";

interface Option {
  id: string;
  label: string;
}

interface Props {
  options: Option[];
  modelValue?: string;
  label?: string;
}

const props = withDefaults(defineProps<Props>(), {
  label: "Selecionar",
});

const emit = defineEmits(["update:modelValue"]);

const open = ref(false);
const button = ref<HTMLElement | null>(null);
const menu = ref<HTMLElement | null>(null);

function toggle() {
  open.value = !open.value;
}

function select(id: string) {
  emit("update:modelValue", id);
  open.value = false;
  button.value?.focus();
}

function onKey(e: KeyboardEvent) {
  if (e.key === "Escape") open.value = false;
}

function clickOutside(e: MouseEvent) {
  if (!menu.value || !button.value) return;
  if (!menu.value.contains(e.target as Node) && !button.value.contains(e.target as Node)) {
    open.value = false;
  }
}

onMounted(() => {
  document.addEventListener("click", clickOutside);
  document.addEventListener("keydown", onKey);
});

onBeforeUnmount(() => {
  document.removeEventListener("click", clickOutside);
  document.removeEventListener("keydown", onKey);
});
</script>

<template>
  <div class="a-dropdown">
    <button
      ref="button"
      class="a-dropdown-btn"
      @click="toggle"
      aria-haspopup="listbox"
      :aria-expanded="open"
    >
      {{ props.options.find(o => o.id === modelValue)?.label || label }}
    </button>

    <ul
      v-if="open"
      ref="menu"
      class="a-dropdown-menu"
      role="listbox"
    >
      <li
        v-for="o in options"
        :key="o.id"
        :role="'option'"
        :aria-selected="modelValue === o.id"
        @click="select(o.id)"
        class="a-dropdown-item"
      >
        {{ o.label }}
      </li>
    </ul>
  </div>
</template>

<style scoped>
.a-dropdown {
  position: relative;
  display: inline-block;
}

.a-dropdown-btn {
  padding: 8px 12px;
  background: var(--color-bg);
  border: 1px solid var(--color-border);
  border-radius: var(--border-radius-sm);
  cursor: pointer;
}

.a-dropdown-menu {
  list-style: none;
  padding: 4px 0;
  margin: 4px 0 0;
  position: absolute;
  background: var(--color-bg);
  border: 1px solid var(--color-border);
  border-radius: var(--border-radius-sm);
  width: 100%;
  z-index: 10;
}

.a-dropdown-item {
  padding: 8px;
  cursor: pointer;
}

.a-dropdown-item[aria-selected="true"] {
  background: var(--color-primary);
  color: var(--color-primary-text);
}
</style>