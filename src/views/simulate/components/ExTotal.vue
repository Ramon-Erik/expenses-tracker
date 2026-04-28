<template>
  <p data-test-id="clearParagraph" class="clear-cart" @click="store.clearCart">
    Limpar carrinho
  </p>
  <p data-test-id="totalParagraph">
    Total gasto: {{ currencyFormat(store.total) }}
  </p>
</template>

<script setup lang="ts">
import { useCart } from "@/stores/CartStore";
import { currencyFormat } from "@/utils/currency";

const store = useCart();
</script>

<style scoped>
.clear-cart {
  margin-bottom: 1rem;
  text-decoration: underline;
  font-size: 0.95rem;

  cursor: pointer;
}

p {
  text-align: center;
  font-size: 1.15rem;
}
</style>
