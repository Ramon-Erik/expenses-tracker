<template>
  <p v-if="store.cart.length" class="text-center text-h6">
    Produtos adicionados
  </p>
  <v-list>
    <v-list-item
      v-for="product in store.cart"
      :key="product.id"
      @dblclick="store.removeProduct(product.id)"
    >
      <v-list-item-title class="d-flex justify-space-between">
        <div class="product d-flex">
          <span class="item-amount d-inline-block" style="width: 50px"
            >{{ product.amount }}x</span
          >
          <span class="item-name">{{ product.name }}</span>
        </div>
        <span class="item-price">{{ currencyFormat(product.price) }}</span>
      </v-list-item-title>
    </v-list-item>
  </v-list>
</template>

<script setup lang="ts">
import { useCart } from "@/stores/CartStore";
import { currencyFormat } from "@/utils/currency";

const store = useCart();
</script>
