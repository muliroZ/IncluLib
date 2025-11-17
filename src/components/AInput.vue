<script setup lang="ts">
import { computed } from 'vue'

interface Props {
  id?: string
  modelValue: string | null
  label?: string
  placeholder?: string
  disabled?: boolean
  readonly?: boolean
  required?: boolean
  error?: string | null
  description?: string | null
}

const props = withDefaults(defineProps<Props>(), {
  id: undefined,
  label: '',
  placeholder: '',
  disabled: false,
  readonly: false,
  required: false,
  error: null,
  description: null,
  modelValue: '',
})

const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void
}>()

const inputId = computed(() => 
  props.id || `a-input-${Math.random().toString(36).slice(2)}`
)

const descriptionId = computed(() =>
  props.description ? `${inputId.value}-desc` : undefined
)

const errorId = computed(() =>
  props.error ? `${inputId.value}-err` : undefined
)

const ariaDescribedBy = computed(() => {
  const ids: string[] = []
  if (props.description && descriptionId.value) ids.push(descriptionId.value)
  if (props.error && errorId.value) ids.push(errorId.value)
  return ids.length ? ids.join(' ') : undefined
})
</script>

<template>
  <label :for="inputId" class="a-input-label" v-if="label">
    {{ label }}
    <span v-if="required" aria-hidden="true">*</span>
  </label>

  <div class="a-input-wrapper">
    <slot name="left"></slot>

    <input
      class="a-input"
      :id="inputId"
      :value="modelValue ?? ''"
      :placeholder="placeholder"
      :disabled="disabled"
      :readonly="readonly"
      :required="required"
      :aria-describedby="ariaDescribedBy"
      :aria-invalid="Boolean(error)"
      @input="emit('update:modelValue', ($event.target as HTMLInputElement).value)"
    />

    <slot name="right"></slot>
  </div>

  <p v-if="description" :id="descriptionId" class="a-input-desc">
    {{ description }}
  </p>

  <p v-if="error" :id="errorId" class="a-input-error">
    {{ error }}
  </p>
</template>

<style scoped>
.a-input-label {
  display: block;
  margin-bottom: 4px;
  font-size: var(--font-body-regular);
}

.a-input-wrapper {
  display: flex;
  align-items: center;
  gap: 6px;

  background: var(--color-bg, #fff);
  border: 1px solid var(--color-border, #cbd5e1);
  border-radius: var(--border-radius-md);
  padding: var(--spacing-md);

  transition: border var(--transition);
}

.a-input-wrapper:focus-within {
  border-color: var(--color-primary);
  box-shadow: var(--focus-ring);
}

.a-input {
  flex: 1;
  border: none;
  background: transparent;
  font-size: var(--font-body-regular);
  outline: none;
}

.a-input:disabled {
  opacity: 0.6;
}

.a-input-desc {
  margin-top: 4px;
  color: var(--color-text-subtle, #64748b);
  font-size: var(--font-caption);
}

.a-input-error {
  margin-top: 4px;
  color: var(--color-danger, #ef4444);
  font-size: var(--font-caption);
}
</style>
