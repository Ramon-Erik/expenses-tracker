<template>
  <v-container class="d-flex flex-column ga-8">
    <ex-new-transaction> </ex-new-transaction>
    <ex-month-resume></ex-month-resume>
  </v-container>
</template>

<script setup lang="ts">
import ExMonthResume from "./month-resume/ExMonthResume.vue";
import ExNewTransaction from "./new-transaction/ExNewTransaction.vue";
</script>
