<template>
  <div class="container">
    <ExAmount />
    <ExNewProduct />
    <ExProductsList />
    <ExTotal />
  </div>
</template>

<script setup lang="ts">
import ExAmount from "./components/ExAmount.vue";
import ExNewProduct from "./components/ExNewProduct.vue";
import ExProductsList from "./components/ExProductsList.vue";
import ExTotal from "./components/ExTotal.vue";
</script>
