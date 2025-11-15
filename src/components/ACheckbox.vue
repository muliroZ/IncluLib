<script setup lang="ts">
import { ref, onMounted, watch } from 'vue'

interface Props {
  id?: string
  modelValue: boolean
  label?: string
  disabled?: boolean
  indeterminate?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  id: undefined,
  label: '',
  disabled: false,
  indeterminate: false,
})

const emit = defineEmits<{
  (e: 'update:modelValue', value: boolean): void
}>()

const inputId = props.id || `a-checkbox-${Math.random().toString(36).slice(2)}`

const el = ref<HTMLInputElement | null>(null)

onMounted(() => {
  if (el.value) {
    el.value.indeterminate = props.indeterminate
  }
})

watch(
  () => props.indeterminate,
  (val) => {
    if (el.value) {
      el.value.indeterminate = val
    }
  }
)
</script>

<template>
  <label class="a-checkbox" :for="inputId">
    <input
      ref="el"
      type="checkbox"
      class="a-checkbox-input"
      :id="inputId"
      :checked="modelValue"
      :disabled="disabled"
      @change="emit('update:modelValue', ($event.target as HTMLInputElement).checked)"
    />

    <span class="a-checkbox-box">
      <span class="a-checkbox-icon" v-if="modelValue && !indeterminate">✔</span>
      <span class="a-checkbox-icon" v-if="indeterminate">—</span>
    </span>

    <span class="a-checkbox-label">{{ label }}</span>
  </label>
</template>

<style scoped>
.a-checkbox {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
  user-select: none;
}

.a-checkbox-input {
  position: absolute;
  opacity: 0;
  pointer-events: none;
}

.a-checkbox-box {
  width: 18px;
  height: 18px;
  border: 2px solid var(--color-border, #64748b);
  border-radius: var(--radius-sm, 4px);
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--color-bg, white);
  transition: all var(--transition);
  color: transparent;
}

/* IMPORTANTE: combinator com input escondido não funciona.
   A solução é estilizar baseado no estado da própria caixa com aria */
.a-checkbox-input:checked + .a-checkbox-box,
.a-checkbox-input[indeterminate] + .a-checkbox-box {
  background: var(--color-primary);
  border-color: var(--color-primary);
  color: var(--color-primary-text, #fff);
}

.a-checkbox-input:focus-visible + .a-checkbox-box {
  outline: none;
  box-shadow: var(--focus-ring);
}

.a-checkbox-label {
  font-size: var(--font-size-md);
}
</style>
