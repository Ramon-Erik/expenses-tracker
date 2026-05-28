<template>
  <v-card-text>
    <h3 class="text-title-medium mb-4">
      <span class="pr-1">Movimentações</span>
      <ex-list-config></ex-list-config>
    </h3>

    <div class="transactions-list d-flex flex-column ga-4">
      <ex-transaction
        v-for="tr in store.transactionsList"
        :key="tr.id"
        :tr="tr"
      ></ex-transaction>
    </div>
    <div
      class="transactions-list d-flex flex-column ga-4"
      v-if="store.visualization === 'tags'"
    >
      em andamento
    </div>
    <div
      class="transactions-list d-flex flex-column ga-4"
      v-if="store.visualization === 'day'"
    >
      em andamento
    </div>
  </v-card-text>
</template>

<script setup lang="ts">
import { useTransactions } from "@/stores/TransactionsStore";
import ExListConfig from "./components/ExListConfig.vue";
import ExTransaction from "./components/ExTransaction.vue";

const store = useTransactions();
</script>
