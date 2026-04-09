<template>
  <div class="title">
    <h3>Movimentações</h3>
    <ExAddTransaction @add-transaction="emitNewTransaction" />
  </div>
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
import ExAddTransaction from './ExAddTransaction.vue';

const emit = defineEmits<{
  deleteTransaction: [transactionId: number]
  addTransaction: [transaction: ITransaction]
}>()

defineProps<{
  transactionsList: ITransaction[]
}>()

const emitDeletion = (id: number) => {
  emit('deleteTransaction', id)
}

const emitNewTransaction = (transaction: ITransaction) => {
  emit('addTransaction', transaction)
}
</script>

<style scoped>
.title {
  display: flex;
  justify-content: space-between;
  align-items: center;

  padding-bottom: 0.8rem;
  border-bottom: 1px solid #bbb;

  h3 {
    margin: 0;
    padding: 0;
  }
}
</style>
