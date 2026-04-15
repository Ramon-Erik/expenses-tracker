<template>
  <Teleport to="#modal">
    <Transition name="modal">
      <div class="modal-bg" v-if="isModalOpen">
        <div class="modal" ref="modalRef">
          <h3>Nova movimentação</h3>
          <form id="form" @submit.prevent="onSubmit" autocomplete="off">
            <div class="form-control amount">
              <label for="amount">
                <input
                  class="bank-input"
                  type="string"
                  v-model="amount"
                  @input="amountInput"
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
import { useTransactionsStore } from '@/stores/TransactionssStore'
import { onClickOutside } from '@vueuse/core'
import { computed, ref, useTemplateRef } from 'vue'
import { useToast } from 'vue-toastification'

const store = useTransactionsStore()
const maxDigits = 7

const emit = defineEmits<{
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
const amount = ref<string | undefined>()

const amountInput = (event: InputEvent) => {
  const target = event.target as HTMLInputElement
  let value = target.value
  const isNegative = target.value.startsWith('-')

  if (value == '0') {
    amount.value = undefined
    return
  }

  value = value
    .replace(',', '')
    .replace('.', '')
    .replace('-', '')
    .slice(0, maxDigits) || '0'

  console.log(isNegative);

  const floatValue = Number.parseFloat(value) / 100
  let amountDisplay = Intl.NumberFormat('pt-br', { style: 'currency', currency: 'BRL' }).format(
    floatValue,
  )
  amountDisplay = amountDisplay.slice(3, amountDisplay.length)
  console.log('v', value, floatValue, amountDisplay);


  amount.value = isNegative ? '-' + amountDisplay : amountDisplay
}

const disabled = computed(() => {
  return isInvalid() || loading.value
})
const loading = ref(false)
const isInvalid = () => {
  return !description.value || !amount.value
}

const clearInputs = () => {
  description.value = ''
  amount.value = undefined
}

const onSubmit = () => {
  loading.value = true

  if (isInvalid()) {
    toast.error('Inputs inválidas!')
    return
  }

  const amountToStore = amount.value ? Number.parseFloat(amount.value) : 0

  const transactionData: ITransaction = {
    id: new Date().getUTCMilliseconds(),
    amount: amountToStore,
    isIncome: amountToStore > 0,
    description: description.value,
  }

  store.addTransaction(transactionData)
  closeModal()

  toast.success('Adicionado!')
  loading.value = false
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
  background: var(--overlay);
  z-index: 1000;
}

.modal {
  width: calc(100% - 60px);
  max-width: 500px;
  padding: 1rem;
  box-shadow: var(--shadow-soft);
  background: var(--bg-secondary);

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
  display: flex;
  justify-content: center;
}

.amount label {
  position: relative;
}

.amount label::before {
  content: 'R$';
  position: absolute;
  left: -25%;
  top: 50%;
  display: block;

  font-size: 2rem;
  font-weight: 400;
  transform: translate(0, -50%);
}

.bank-input {
  width: 200px;
  padding: 16px;
  border: 1px solid var(--input-border);
  border-radius: 12px;
  background: var(--bg-input);
  color: var(--color-text);
  outline: none;
  font-family: monospace;
  font-size: 32px;
  font-weight: 600;
  text-align: center;
}

.bank-input:focus {
  box-shadow: 0 0 0 4px var(--focus-ring);
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
  border: 1px solid var(--input-border);
  border-radius: 8px;
  transition: all 0.2s ease;
  background: var(--bg-input);
  color: var(--color-text);
  outline: none;
}

.description-input:focus {
  border-color: var(--bg-btn);
  box-shadow: 0 0 0 4px var(--focus-ring);
}

.description-input::placeholder {
  color: var(--input-placeholder);
  font-size: 14px;
}

.btn {
  display: block;
  width: 100%;
  padding: 10px;
  margin: 10px 0 30px;
  background: var(--bg-btn);
  box-shadow: var(--box-shadow);
  border: 0;
  border-radius: 0.5rem;
  color: var(--btn-text);
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
