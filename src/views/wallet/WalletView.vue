<template>
  <v-container class="d-flex flex-column ga-8">
    <ex-new-transaction> </ex-new-transaction>
    <v-card>
      <ex-month-resume></ex-month-resume>
      <ex-transactions-list></ex-transactions-list>
    </v-card>
  </v-container>
</template>

<script setup lang="ts">
import ExMonthResume from "./month-resume/ExMonthResume.vue";
import ExNewTransaction from "./new-transaction/ExNewTransaction.vue";
import ExTransactionsList from "./transactions-list/ExTransactionsList.vue";
</script>
