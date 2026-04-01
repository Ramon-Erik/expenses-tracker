<template>
  <div class="inc-exp-container">
    <div>
      <h4>Entradas</h4>
      <p id="money-plus" class="money plus">{{ income }}</p>
    </div>
    <div>
      <h4>Saídas</h4>
      <p id="money-minus" class="money minus">{{ expense }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import type ITransaction from '@/interfaces/ITransaction.interface'
import currencyFormat from '@/utils/currency'
import { computed } from 'vue'

const props = defineProps<{
  transactionList: ITransaction[]
}>()

function totalAmount(condition: boolean) {
  const total = props.transactionList.reduce((acc, tr) => {
    return tr.isIncome == condition ? acc + tr.amount : acc
  }, 0)

  return currencyFormat(total)
}

const income = computed(() => {
  return totalAmount(true)
})

const expense = computed(() => {
  return totalAmount(false)
})
</script>
