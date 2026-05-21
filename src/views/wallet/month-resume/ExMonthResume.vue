<template>
  <v-card>
    <v-card-title>
      <h2>Resumo do mês</h2>
    </v-card-title>
    <v-card-subtitle>
      {{ monthSubtitle }}
    </v-card-subtitle>
    <v-card-text>
      <ex-month-balance></ex-month-balance>
      <ex-transactions-list></ex-transactions-list>
    </v-card-text>
  </v-card>
</template>

<script setup lang="ts">
import { computed } from "vue";
import ExMonthBalance from "./components/month-balance/ExMonthBalance.vue";
import ExTransactionsList from "./components/transactions-list/ExTransactionsList.vue";

const monthSubtitle = computed(() => {
  const date = new Date().toLocaleString("pt-BR", {
    month: "long",
    year: "numeric",
  });

  return `${date}`;
});
</script>
