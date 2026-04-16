<template>
  <p id="balance">{{ currencyFormat(total) }}</p>
</template>

<script setup lang="ts">
import { useTransactionsStore } from '@/stores/TransactionsStore'
import currencyFormat from '@/utils/currency'
import { computed } from 'vue'

const store = useTransactionsStore()

const total = computed(() =>
  store.transactionsList.reduce((acc, nextTransaction) => acc + nextTransaction.amount, 0),
)
</script>

<style scoped>
#balance {
  margin: 0;
  text-align: center;
  font-size: 2rem;
}
</style>
