<template>
  <div class="inc-exp-container">
    <div class="inc-exp-card">
      <h4>Entradas</h4>
      <p id="money-plus" class="money plus">{{ income }}</p>
    </div>
    <div class="inc-exp-card">
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

<style scoped>
/* Mobile First - padrão para celular */
.inc-exp-container {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  width: 100%;

  padding: 0.6rem;
  margin-bottom: 1rem;

  background: #fff;
  border-radius: 1rem;
}

.inc-exp-card {
  flex: 1;
  background: #fff;
  border-radius: 8px;
  text-align: center;
}

.inc-exp-card h4 {
  font-size: 1rem;
  margin: 0 0 0.5rem 0;
  color: #666;
  font-weight: normal;
}

.money {
  font-size: 1.1rem;
  font-weight: bold;
  margin: 0;
}

.money.plus {
  color: #2ecc71;
}

.money.minus {
  color: #e74c3c;
}

@media (min-width: 768px) {
  .inc-exp-container {
    flex-direction: row;
  }
}
</style>
