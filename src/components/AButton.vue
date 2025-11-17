<script setup lang="ts">
import { computed } from 'vue';

interface Props {
    label?: string
    disabled?: boolean
    loading?: boolean
    type?: 'button' | 'submit' | 'reset'
}

const props = withDefaults(defineProps<Props>(), {
    disabled: false,
    loading: false,
    type: 'button'
})

// Atributos acessíveis
const ariaDisabled = computed(() => props.disabled || props.loading)
const ariaBusy = computed(() => props.loading)
</script>

<template>
    <button
        class="a-btn"
        :type="props.type"
        :disabled="props.disabled || props.loading"
        :aria-disabled="ariaDisabled"
        :aria-busy="ariaBusy"
    >
        <span v-if="props.loading" class="loader" aria-hidden="true"></span>
        <span v-if="props.label">{{ props.label }}</span>
        <slot v-else></slot>
    </button>
</template>

<style scoped>
.a-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;

  padding: var(--spacing-md) calc(var(--spacing-md) * 2);

  background: var(--color-primary);
  color: var(--color-primary-text);

  border: none;
  border-radius: var(--border-radius-md);
  font-size: var(--font-body-regular);

  cursor: pointer;
  transition: background var(--transition);
}

.a-btn:hover:not(:disabled) {
  background: var(--color-primary-hover);
}

.a-btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

/* Ícone de carregamento */
.loader {
  width: 1rem;
  height: 1rem;
  border: 2px solid var(--color-primary-text);
  border-bottom-color: transparent;
  border-radius: 50%;
  margin-right: 8px;
  animation: spin 0.7s linear infinite;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}
</style>