<template>
  <div class="title">
    <h3>Movimentações</h3>
    <ExAddTransaction @add-transaction="emitNewTransaction" />
  </div>
  <ul id="list" class="list" v-if="transactionsList?.length">
    <li
      v-for="transaction in transactionsList"
      :key="transaction.id"
      :class="transaction.isIncome ? 'plus' : 'minus'"
    >
      {{ transaction.description }} <span>{{ currencyFormat(transaction.amount) }}</span
      ><button class="delete-btn" @click="emitDeletion(transaction.id)">x</button>
    </li>
  </ul>
  <p v-else class="warning">Nenhuma movimentação cadastrada.</p>
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
  transactionsList?: ITransaction[]
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

.warning {
  text-align: center;
}

.list {
  max-height: 85vh;
  overflow-y: scroll;
  padding: 0;
  margin-bottom: 40px;
  list-style-type: none;
}

.list li {
  background: var(--bg-secundary);
  box-shadow: var(--box-shadow);
  display: flex;
  justify-content: space-between;
  position: relative;
  padding: 10px;
  margin: 10px 0;
}

.list li.plus {
  border-right: 5px solid #2ecc71;
}

.list li.minus {
  border-right: 5px solid #c0392b;
}

.delete-btn {
  position: absolute;
  top: 50%;
  left: 0;
  opacity: 0;
  padding: 2px 5px;
  cursor: pointer;
  background: #e74c3c;
  border: 0;
  color: #fff;
  font-size: 20px;
  line-height: 20px;
  transform: translate(-100%, -50%);
  transition: opacity 0.3s ease;
}

.list li:hover .delete-btn {
  opacity: 1;
}
</style>
