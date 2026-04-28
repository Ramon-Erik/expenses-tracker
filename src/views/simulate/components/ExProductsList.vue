<template>
  <div class="cart-container">
    <ul class="cart-list">
      <li
        class="cart-item"
        v-for="product in store.cart"
        :key="product.id"
        @dblclick="store.removeProduct(product.id)"
      >
        <span class="item-amount">{{ product.amount }}x</span>
        <span class="item-name">{{ product.name }}</span>
        <span class="item-price">{{ currencyFormat(product.price) }}</span>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { useCart } from "@/stores/CartStore";
import { currencyFormat } from "@/utils/currency";

const store = useCart();
</script>

<style scoped>
.cart-container {
  margin: 1.5rem 0;
  border-bottom: 1px solid var(--color-secondary);
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
