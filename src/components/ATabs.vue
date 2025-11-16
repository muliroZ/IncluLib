<script setup lang="ts">
import { ref } from "vue";

interface Tab {
  id: string;
  label: string;
}

interface Props {
  tabs: Tab[];
  modelValue: string; // id da aba
}

const props = defineProps<Props>();
const emit = defineEmits(["update:modelValue"]);

const tabRefs = ref<HTMLElement[]>([]);

function activate(id: string) {
  emit("update:modelValue", id);
}

function onKey(e: KeyboardEvent, index: number) {
  const max = props.tabs.length - 1;

  if (e.key === "ArrowRight") {
    const next = index === max ? 0 : index + 1;
    const nextTab = props.tabs[next];
    if (!nextTab) return;
    activate(nextTab.id);
    tabRefs.value[next]?.focus();
  }
  if (e.key === "ArrowLeft") {
    const prev = index === 0 ? max : index - 1;
    const prevTab = props.tabs[prev];
    if (!prevTab) return;
    activate(prevTab.id);
    tabRefs.value[prev]?.focus();
  }
}
</script>

<template>
  <div class="a-tabs">
    <div role="tablist" class="a-tabs-list">
      <button
        v-for="(t, i) in tabs"
        :key="t.id"
        ref="tabRefs"
        role="tab"
        class="a-tab"
        :tabindex="modelValue === t.id ? 0 : -1"
        :aria-selected="modelValue === t.id"
        @click="activate(t.id)"
        @keydown="onKey($event, i)"
      >
        {{ t.label }}
      </button>
    </div>

    <div class="a-tabs-panel">
      <slot :active="modelValue" />
    </div>
  </div>
</template>

<style scoped>
.a-tabs-list {
  display: flex;
  gap: 8px;
  border-bottom: 2px solid var(--color-neutral-500);
}

.a-tab {
  padding: 8px 12px;
  border: none;
  background: none;
  cursor: pointer;
}

.a-tab[aria-selected="true"] {
  border-bottom: 2px solid var(--color-brand-primary-500);
  font-weight: bold;
}
</style>