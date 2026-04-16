<template>
  <p>Total gasto: {{ currencyFormat(store.total) }}</p>
</template>

<script setup lang="ts">
import { useCart } from '@/stores/CartStore';
import { currencyFormat } from '@/utils/currency';


const store = useCart()

</script>

<style scoped>

p {
  text-align: center;
}

</style>
