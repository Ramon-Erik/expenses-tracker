<template>
  <h2>Movimentações</h2>
  <p id="balance">{{ currencyFormat(total) }}</p>
</template>

<script setup lang="ts">
import currencyFormat from '@/utils/currency'

const props = defineProps<{
  total: number
}>()
</script>

<style scoped>
h2 {
  margin: 0;
}

#balance {
  margin: 0;
  font-size: 2rem;
}
</style>
