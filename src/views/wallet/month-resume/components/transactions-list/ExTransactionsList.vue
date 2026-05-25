<template>
  <v-container class="pa-0 mt-6">
    <h3 class="text-title-medium mb-4">Movimentações</h3>

    <div class="transactions-list d-flex flex-column ga-4">
      <ex-transaction
        v-for="tr in store.transactionsList"
        :key="tr.id"
        :tr="tr"
      ></ex-transaction>
    </div>
  </v-container>
</template>

<script setup lang="ts">
import { useTransactions } from "@/stores/TransactionsStore";
import ExTransaction from "./components/ExTransaction.vue";

const store = useTransactions();
</script>
