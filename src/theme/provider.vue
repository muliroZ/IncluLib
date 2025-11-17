<script setup lang="ts">
import { onMounted } from "vue";
import { setTheme, type Theme } from "./index";

interface Props {
  theme?: Theme;
}

const props = withDefaults(defineProps<Props>(), {
  theme: "light",
});

onMounted(() => {
  setTheme(props.theme);
});
</script>

<template>
  <slot />
</template>
