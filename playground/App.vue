<template>
  <div style="padding: 40px;">
    <h1>Testando IncluLib</h1>

    <AInput label="Nome" placeholder="Digite algo..." />

    <ACheckbox v-model="aceito">Aceito os termos</ACheckbox>

    <AButton @click="toggle">Trocar tema</AButton>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { toggleTheme } from '@lib/theme'

const aceito = ref(false)
const toggle = () => toggleTheme()
</script>
