<template>
  <v-card-text>
    <h3 class="text-title-medium mb-4">
      <span class="pr-1">Movimentações</span>
      <ex-list-config></ex-list-config>
    </h3>

    <div class="transactions-list d-flex flex-column ga-4">
      <template v-if="store.visualization === 'transactions'">
        <ex-transaction
          v-for="tr in store.transactionsList"
          :key="tr.id"
          :tr="tr"
        />
      </template>

      <template v-else-if="store.visualization === 'tags'">
        <div>Visualização por tags em andamento...</div>
      </template>

      <template v-else-if="store.visualization === 'day'">
        <ex-list-per-day></ex-list-per-day>
      </template>
    </div>
  </v-card-text>
</template>

<script setup lang="ts">
import { useTransactions } from "@/stores/TransactionsStore";
import ExListConfig from "./components/ExListConfig.vue";
import ExListPerDay from "./components/ExListPerDay.vue";
import ExTransaction from "./components/ExTransaction.vue";

const store = useTransactions();
</script>
