<template>
  <div class="text-center">
    <v-btn @click="toggleTheme">mudar tema</v-btn>
  </div>
</template>

<script setup ts>
import { useTheme } from "vuetify/lib/composables/theme";
const localKey = "ex-local-th";
const theme = useTheme();

const localTheme = localStorage.getItem(localKey) || "darkTheme";
theme.global.name.value = localTheme;

const toggleTheme = () => {
  theme.global.name.value =
    theme.global.name.value == "lightTheme" ? "darkTheme" : "lightTheme";
  localStorage.setItem(localKey, theme.global.name.value);
};
</script>
