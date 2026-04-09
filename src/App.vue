<template>
  <div class="upper-part">
    <ExHeader />
    <div class="container">
      <ExBalance :total="total" />
      <ExMenu />
    </div>
  </div>
  <ExFooter />
</template>

<script setup lang="ts">
import ExBalance from './components/ExBalance.vue'
import ExHeader from './components/ExHeader.vue'
import ExFooter from './components/ExFooter.vue'
import ExMenu from './components/ExMenu.vue'
import type ITransaction from './interfaces/ITransaction.interface'

import { computed, ref } from 'vue'

const LOCAL_KEY = 'exp-tracker'

const getLocalList = () => {
  const list = localStorage.getItem(LOCAL_KEY) ? JSON.parse(localStorage.getItem(LOCAL_KEY)!) : []

  return list as ITransaction[]
}

/* const updateLocalList = (callbackFn: () => void) => {
  callbackFn()
  localStorage.setItem(LOCAL_KEY, JSON.stringify(transactionsList.value))
} */

const transactionsList = ref<ITransaction[]>(getLocalList())

/* const onNewTransaction = (newTransaction: ITransaction) => {
  updateLocalList(() => {
    transactionsList.value.push(newTransaction)
  })
} */

const total = computed(() => {
  const reduceFn = (acc: number, tr: ITransaction) => acc + tr.amount
  return transactionsList.value.reduce(reduceFn, 0)
})

/* const deleteTransaction = (id: number) => {
  updateLocalList(() => {
    transactionsList.value = transactionsList.value.filter((tr) => tr.id != id)
  })
} */
</script>

<style scoped></style>
