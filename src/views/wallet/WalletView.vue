<template>
  <div class="container">
    <ExBalance />
    <ExIncomeExpense />
    <ExTransactionList />
  </div>
</template>

<script setup lang="ts">
import ExBalance from './components/ExBalance.vue'
import ExIncomeExpense from './components/ExIncomeExpense.vue'
import ExTransactionList from './components/ExTransactionList.vue'
</script>
