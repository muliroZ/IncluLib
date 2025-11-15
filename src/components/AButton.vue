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

    background: var(--color-brand-primary-500);
    color: var(--black);

    border: none;
    border-radius: var(--radius-md);
    font-size: var(--font-body-regular);
    font-family: var(--font-family);

    cursor: pointer;
    transition: background 0.3s ease;
}

.a-btn:hover:not(:disabled) {
    background: var(--color-brand-primary-600);
}

.a-btn:disabled {
    opacity: 0.6;
    cursor: not-allowed;
}

.loader {
    border: 2px solid var(--black);
    border-bottom-color: transparent;
    border-radius: 50%;
    width: 1rem;
    height: 1rem;
    margin-right: var(--spacing-sm);
    animation: spin 1s linear infinite;
}

@keyframes spin {
    to {
        transform: rotate(360deg);
    }
}
</style>