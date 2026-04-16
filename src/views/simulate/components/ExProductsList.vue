<template>
  <div class="cart-container">
    <ExNewProduct />
    <ul class="cart-list">
      <div class="cart-item">
        <span class="item-amount">3x</span>
        <span class="item-name">Feijão</span>
        <span class="item-price">R$ 6,76</span>
      </div>
    </ul>
  </div>
</template>

<script setup lang="ts">
import ExNewProduct from './ExNewProduct.vue'
</script>

<style scoped>
.cart-container {
  padding: 1rem 0;
  margin: 1.5rem 0;
  border: 1px solid var(--color-secondary);
  border-left: none;
  border-right: none;
}

.cart-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.cart-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.5rem 1rem;
  border-bottom: 1px solid var(--color-secondary-light, #e0e0e0);
}

.cart-item:last-child {
  border-bottom: none;
}

.item-amount {
  font-weight: bold;
  color: var(--color-primary);
}

.item-name {
  flex: 1;
  margin-left: 0.5rem;
}

.item-price {
  font-weight: bold;
  color: var(--color-accent);
}
</style>
