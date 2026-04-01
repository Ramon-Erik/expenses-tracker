<template>
  <p id="balance">{{ currencyFormat(total) }}</p>
</template>

<script setup lang="ts">
import currencyFormat from '@/utils/currency'

defineProps<{
  total: number
}>()
</script>

<style scoped>
#balance {
  margin: 0;
  text-align: center;
  font-size: 2rem;
}
</style>
