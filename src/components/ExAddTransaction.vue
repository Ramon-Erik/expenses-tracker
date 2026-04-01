<template>
  <h3>Nova movimentação</h3>
  <form id="form" @submit.prevent="onSubmit">
    <div class="form-control">
      <label for="text">Descrição</label>
      <input type="text" id="text" v-model="description" placeholder="Enter text..." />
    </div>
    <div class="form-control">
      <label for="amount">Valor</label>
      <input type="number" step=".01" v-model="amount" id="amount" placeholder="Enter amount..." />
    </div>
    <button class="btn"><span>Adicionar</span></button>
  </form>
</template>

<script setup lang="ts">
import type ITransaction from '@/interfaces/ITransaction.interface'
import { ref } from 'vue'
import { useToast } from 'vue-toastification'

const emit = defineEmits(['transactionAdded'])

const toast = useToast()
const description = ref('')
const amount = ref()

const isInvalid = () => {
  return !description.value || !amount.value
}

const clearInputs = () => {
  description.value = ''
  amount.value = null
}

const onSubmit = () => {
  if (isInvalid()) {
    toast.error('try not to sleep next time and fix these inputs u frkin dumbass')
    return
  }

  const transactionData: ITransaction = {
    id: new Date().getUTCMilliseconds(),
    amount: amount.value,
    isIncome: amount.value > 0,
    description: description.value,
  }

  emit('transactionAdded', transactionData)

  toast.success('slayyyy queeen thats just how ya do it')
  clearInputs()
}
</script>
