<template>
  <ExHeader />
  <div class="container">
    <ExBalance :total="total" />
    <ExIncomeExpense :transaction-list="transactionsList" />
    <ExTransactionList
      :transactions-list="transactionsList"
      @delete-transaction="deleteTransaction"
    />
    <ExAddTransaction @transaction-added="onNewTransaction" />
  </div>
</template>

<script setup lang="ts">
import ExAddTransaction from './components/ExAddTransaction.vue'
import ExBalance from './components/ExBalance.vue'
import ExHeader from './components/ExHeader.vue'
import ExIncomeExpense from './components/ExIncomeExpense.vue'
import ExTransactionList from './components/ExTransactionList.vue'
import type ITransaction from './interfaces/ITransaction.interface'

import { computed, ref } from 'vue'

const LOCAL_KEY = 'exp-tracker'

const getLocalList = () => {
  const list = localStorage.getItem(LOCAL_KEY) ? JSON.parse(localStorage.getItem(LOCAL_KEY)!) : []

  return list as ITransaction[]
}

const setLocalList = () => {
  localStorage.setItem(LOCAL_KEY, JSON.stringify(transactionsList.value))
}

const transactionsList = ref<ITransaction[]>(getLocalList())

const onNewTransaction = (newTransaction: ITransaction) => {
  transactionsList.value.push(newTransaction)
  setLocalList()
}

const total = computed(() => {
  const reduceFn = (acc: number, tr: ITransaction) => acc + tr.amount
  return transactionsList.value.reduce(reduceFn, 0)
})

const deleteTransaction = (id: number) => {
  transactionsList.value = transactionsList.value.filter((tr) => tr.id != id)
  setLocalList()
}
</script>

<style scoped></style>
