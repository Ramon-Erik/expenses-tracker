<template>
  <div class="title">
    <h3>Movimentações</h3>
    <ExAddTransaction />
  </div>
  <ul id="list" class="list" v-if="transactionsList.length">
    <li
      v-for="transaction in transactionsList"
      :key="transaction.id"
      :class="transaction.isIncome ? 'plus' : 'minus'"
    >
      {{ transaction.description }} <span>{{ currencyFormat(transaction.amount) }}</span
      ><button class="delete-btn" @click="store.deleteTransaction(transaction.id)">x</button>
    </li>
  </ul>
  <p v-else class="warning">Nenhuma movimentação cadastrada.</p>
</template>

<script setup lang="ts">
import currencyFormat from '@/utils/currency'
import ExAddTransaction from './ExAddTransaction.vue'
import { useTransactionsStore } from '@/stores/TransactionssStore'
import { computed } from 'vue'

const store = useTransactionsStore()

const transactionsList = computed(() => store.transactionsList)
</script>

<style scoped>
.title {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-bottom: 0.8rem;
  border-bottom: 1px solid var(--color-muted);
}

.title h3 {
  margin: 0;
  padding: 0;
}

.warning {
  text-align: center;
}

.list {
  max-height: 85vh;
  overflow-y: auto;
  padding: 0 0 1rem 0;
  margin-bottom: 40px;
  list-style-type: none;
}

.list li {
  position: relative;
  padding: 10px;
  margin: 10px 0;
  display: flex;
  justify-content: space-between;
  background: var(--bg-secondary);
  box-shadow: var(--box-shadow);
}

.list li.plus {
  border-right: 5px solid var(--color-success);
}

.list li.minus {
  border-right: 5px solid var(--color-danger-dark);
}

.delete-btn {
  position: absolute;
  bottom: -76%;
  right: -1rem;
  opacity: 0;
  padding: 2px 5px;
  cursor: pointer;
  background: var(--color-danger);
  border: 0;
  color: var(--btn-text);
  font-size: 20px;
  line-height: 20px;
  transform: translate(-100%, -50%);
  transition: opacity 0.3s ease;
}

.list li:hover {
  margin-bottom: 2rem;
}

.list li:hover .delete-btn {
  opacity: 1;
}
</style>
