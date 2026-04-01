<template>
  <button class="plus-button">
    <span class="plus-icon">+</span>
  </button>
  <!-- <h3>Nova movimentação</h3>
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
  </form> -->
</template>

<script setup lang="ts">
// import type ITransaction from '@/interfaces/ITransaction.interface'
// import { ref } from 'vue'
// import { useToast } from 'vue-toastification'

// const emit = defineEmits(['transactionAdded'])

// const toast = useToast()
// const description = ref('')
// const amount = ref()

// const isInvalid = () => {
//   return !description.value || !amount.value
// }

// const clearInputs = () => {
//   description.value = ''
//   amount.value = null
// }

// const onSubmit = () => {
//   if (isInvalid()) {
//     toast.error('try not to sleep next time and fix these inputs u frkin dumbass')
//     return
//   }

//   const transactionData: ITransaction = {
//     id: new Date().getUTCMilliseconds(),
//     amount: amount.value,
//     isIncome: amount.value > 0,
//     description: description.value,
//   }

//   emit('transactionAdded', transactionData)

//   toast.success('slayyyy queeen thats just how ya do it')
//   clearInputs()
// }
</script>

<style scoped>
.plus-button {
  display: flex;
  align-items: center;
  justify-content: center;

  width: 30px;
  height: 30px;

  border: none;
  border-radius: .5rem;
  background-color: #1faf27;

  color: white;
  font-size: 24px;
  font-weight: bold;

  cursor: pointer;
  transition: all 0.2s ease;
}

.plus-button:hover:not(:disabled) {
  background-color: #198a1f;
  transform: scale(1.05);
}

.plus-button:active:not(:disabled) {
  transform: scale(0.95);
}

.plus-button:disabled {
  background-color: #ccc;
  cursor: not-allowed;
  opacity: 0.6;
}

.plus-icon {
  line-height: 1;
}
</style>
