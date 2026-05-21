<template>
  <v-container style="min-width: 100px; padding: 0.5rem 0">
    <div class="font-weight-bold text-title-medium">
      <p>{{ title }}</p>
    </div>
    <p :class="color">{{ text }}</p>
  </v-container>
</template>

<script setup lang="ts">
defineProps<{
  title: string;
  text: string;
  color: string;
}>();
</script>
