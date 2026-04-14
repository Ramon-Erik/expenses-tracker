<template>
  <button class="plus-button" @click="toggleModal">
    <span class="plus-icon">+</span>
  </button>
  <ExAddModal
    :is-modal-open="isModalOpen"
    @close-modal="toggleModal"
  />

</template>

<script setup lang="ts">
import ExAddModal from './ExAddModal.vue'
import { ref } from 'vue'

const isModalOpen = ref(false)
const toggleModal = () => {
  isModalOpen.value = !isModalOpen.value
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
  background: var(--bg-btn);

  color: white;
  font-size: 24px;
  font-weight: bold;

  cursor: pointer;
  transition: all 0.2s ease;
}

.plus-button:hover:not(:disabled) {
  background: var(--bg-btn-hover);
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
