<template>
  <Teleport to="#modal">
    <Transition name="modal">
      <div class="modal-bg" v-if="isModalOpen">
        <div class="modal" ref="modalRef">
          <h3>Nova movimentação</h3>
          <form id="form" @submit.prevent="onSubmit">
            <div class="form-control">
              <label for="text">Descrição</label>
              <input type="text" id="text" v-model="description" placeholder="Enter text..." />
            </div>
            <div class="form-control">
              <label for="amount">Valor</label>
              <input
                type="number"
                step=".01"
                v-model="amount"
                id="amount"
                placeholder="Enter amount..."
              />
              <button class="btn" :disabled="disabled"><span>Adicionar</span></button>
            </div>
          </form>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup lang="ts">
import type ITransaction from '@/interfaces/ITransaction.interface'
import { onClickOutside } from '@vueuse/core'
import { computed, ref, useTemplateRef } from 'vue'
import { useToast } from 'vue-toastification'

const emit = defineEmits<{
  newTransaction: [transactoin: ITransaction]
  closeModal: []
}>()
defineProps<{
  isModalOpen: boolean
}>()

const toast = useToast()

const modalTarget = useTemplateRef('modalRef')
const closeModal = () => {
  emit('closeModal')
}
onClickOutside(modalTarget, closeModal)

const description = ref('')
const amount = ref()

const disabled = computed(() => {
  return isInvalid()
})
const isInvalid = () => {
  return !description.value || !amount.value
}

const clearInputs = () => {
  description.value = ''
  amount.value = null
}

const onSubmit = () => {
  if (isInvalid()) {
    toast.error('Inputs inválidas!')
    return
  }

  const transactionData: ITransaction = {
    id: new Date().getUTCMilliseconds(),
    amount: amount.value,
    isIncome: amount.value > 0,
    description: description.value,
  }

  emit('newTransaction', transactionData)
  emit('closeModal')

  toast.success('Adicionado!')
  clearInputs()
}
</script>

<style scoped>
.modal-bg {
  position: fixed;
  top: 0;
  left: 0;

  display: flex;
  align-items: center;
  justify-content: center;

  width: 100%;
  height: 100%;

  background-color: rgba(0, 0, 0, 0.5);
  z-index: 1000;
}

.modal {
  width: calc(100% - 60px);
  max-width: 500px;

  padding: 1rem;

  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  background-color: white;

  border-radius: 8px;

  h3 {
    margin-top: 1rem;
  }
}

.modal-enter-active,
.modal-leave-active {
  transition: all 0.25s ease;
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
  transform: scale(1.1);
}
</style>
