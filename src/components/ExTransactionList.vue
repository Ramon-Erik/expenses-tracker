<template>
  <h3>Histórico</h3>
  <ul id="list" class="list" v-if="transactionsList.length">
    <li
      v-for="transaction in transactionsList"
      :key="transaction.id"
      :class="transaction.isIncome ? 'plus' : 'minus'"
    >
      {{ transaction.description }} <span>{{ currencyFormat(transaction.amount) }}</span
      ><button class="delete-btn" @click="emitDeletion(transaction.id)">x</button>
    </li>
  </ul>
  <p v-else>Nenhuma movimentação cadastrada.</p>
</template>

<script setup lang="ts">
import type ITransaction from '@/interfaces/ITransaction.interface'
import currencyFormat from '@/utils/currency'

const emit = defineEmits<{
  deleteTransaction: [transactionId: number]
}>()

const props = defineProps<{
  transactionsList: ITransaction[]
}>()

const emitDeletion = (id: number) => {
  emit('deleteTransaction', id)
}
</script>
