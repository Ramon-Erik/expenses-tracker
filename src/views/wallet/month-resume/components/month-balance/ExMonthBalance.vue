<template>
  <v-row>
    <v-col sm="4">
      <ex-template
        :title="'Entradas'"
        :text="store.monthBalance.incomes"
        color="text-green"
      ></ex-template>
    </v-col>
    <v-col sm="4">
      <ex-template
        :title="'Saidas'"
        :text="store.monthBalance.outcomes"
        color="text-red"
      ></ex-template>
    </v-col>
    <v-col sm="4">
      <ex-template
        :title="'Saldo'"
        :text="store.monthBalance.balance"
        :color="
          store.monthBalance.balance.includes('-') ? 'text-red' : 'text-green'
        "
      ></ex-template>
    </v-col>
  </v-row>
</template>

<script setup lang="ts">
import { useTransactions } from "@/stores/TransactionsStore";
import ExTemplate from "./components/ExTemplate.vue";

const store = useTransactions();
</script>
