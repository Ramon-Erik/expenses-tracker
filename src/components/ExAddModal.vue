<template>
  <Teleport to="#modal">
    <Transition name="modal">
      <div class="modal-bg" v-if="isModalOpen">
        <div class="modal" ref="modalRef">
          <h3>Nova movimentação</h3>
          <form id="form" @submit.prevent="onSubmit">
            <div class="form-control amount">
              <label for="amount">
                <input
                  class="bank-input"
                  type="number"
                  step=".01"
                  v-model="amount"
                  placeholder="0,00"
                  id="amount"
                />
              </label>
            </div>
            <div class="form-control">
              <label for="text">Descrição</label>
              <input
                type="text"
                id="text"
                class="description-input"
                v-model="description"
                placeholder="O que é a movimentação"
              />
            </div>
            <button class="btn" :disabled="disabled"><span>Adicionar</span></button>
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
  clearInputs()
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
  closeModal()

  toast.success('Adicionado!')
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
    text-align: center;
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

form {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.amount {
  position: relative;
  display: flex;
  justify-content: center;
}

.amount::before {
  content: 'R$';
  position: absolute;
  left: 0;
  top: 50%;
  display: block;

  font-size: 2rem;
  font-weight: 400;
  transform: translate(0, -50%);
}

.bank-input {
  width: 200px;

  padding: 16px;

  background: #f5f5f5;

  border: none;
  border-radius: 12px;
  outline: none;

  font-family: monospace;
  font-size: 32px;
  font-weight: 600;
  text-align: center;
}

.bank-input:focus {
  background: white;
  box-shadow: 0 0 0 2px #8257e5;
}

.bank-input::-webkit-outer-spin-button,
.bank-input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

.description-input {
  width: 100%;
  padding: 12px 16px;
  font-size: 16px;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  background-color: #f9f9f9;
  transition: all 0.2s ease;
  outline: none;
}

.description-input:focus {
  border-color: #8257e5;
  background-color: white;
  box-shadow: 0 0 0 3px rgba(130, 87, 229, 0.1);
}

.description-input::placeholder {
  color: #bbb;
  font-size: 14px;
}

.btn {
  display: block;
  width: 100%;

  padding: 10px;
  margin: 10px 0 30px;

  background: #9c88ff;
  box-shadow: var(--box-shadow);
  border: 0;
  border-radius: 0.5rem;

  color: #fff;
  font-size: 16px;

  cursor: pointer;
}

.btn:focus,
.delete-btn:focus {
  outline: 0;
}

.btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}
</style>
