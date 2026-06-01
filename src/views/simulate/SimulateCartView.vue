<template>
  <v-container class="d-flex flex-column ga-8">
    <v-card>
      <v-card-text>
        <ExAmount />
        <ExNewProduct />
      </v-card-text>
    </v-card>
    <v-card>
      <v-card-text>
        <ExProductsList />
        <ExTotal />
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script setup lang="ts">
import ExAmount from "./components/ExAmount.vue";
import ExNewProduct from "./components/ExNewProduct.vue";
import ExProductsList from "./components/ExProductsList.vue";
import ExTotal from "./components/ExTotal.vue";
</script>
