<template>
  <button class="plus-button" @click="togleModal">
    <span class="plus-icon">+</span>
  </button>
  <ExAddModal
    :is-modal-open="isModalOpen"
    @close-modal="togleModal"
    @new-transaction="handleNewTransaction"
  />
</template>

<script setup lang="ts">
import type ITransaction from '@/interfaces/ITransaction.interface'
import ExAddModal from './ExAddModal.vue'
import { ref } from 'vue'

const emit = defineEmits<{
  addTransaction: [transaction: ITransaction]
}>()

const isModalOpen = ref(false)
const togleModal = () => {
  isModalOpen.value = !isModalOpen.value
}

const handleNewTransaction = (transaction: ITransaction) => {
  emit('addTransaction', transaction)
}
</script>

<style scoped>
.plus-button {
  display: flex;
  align-items: center;
  justify-content: center;

  width: 30px;
  height: 30px;

  border: none;
  border-radius: 0.5rem;
  background: #1faf27;

  color: white;
  font-size: 24px;
  font-weight: bold;

  cursor: pointer;
  transition: all 0.2s ease;
}

.plus-button:hover:not(:disabled) {
  background: #198a1f;
  transform: scale(1.05);
}

.plus-button:active:not(:disabled) {
  transform: scale(0.95);
}

.plus-button:disabled {
  background: #ccc;
  cursor: not-allowed;
  opacity: 0.6;
}

.plus-icon {
  line-height: 1;
}
</style>
