<template>
  <v-container class="d-flex align-center ga-3 border rounded-lg pa-4">
    <div class="d-flex align-center">
      <v-icon
        icon="mdi-arrow-up-bold-circle-outline"
        color="green"
        size="28"
      ></v-icon>
    </div>

    <div class="flex-grow-1 d-flex flex-column ga-1">
      <div class="d-flex justify-space-between align-center">
        <span
          class="text-h6 font-weight-bold text-truncate"
          style="max-width: 200px"
        >
          {{ tr.description }}
        </span>

        <span class="text-h6 font-weight-bold text-green">
          + R$ 43.334.345,60
        </span>
      </div>

      <div class="text-body-2 text-medium-emphasis">
        <span>20 de mai.</span>
        <span class="mx-1">•</span>
        <span>Alimentação</span>
      </div>

      <div class="text-body-2 text-medium-emphasis font-weight-medium">PIX</div>

      <div class="mt-1">
        <v-chip
          color="blue"
          size="small"
          variant="flat"
          class="rounded-lg text-white font-weight-bold px-3"
        >
          fixo
        </v-chip>
      </div>
    </div>

    <div class="d-flex align-center">
      <v-btn
        color="grey-lighten-1"
        icon="mdi-trash-can-outline"
        variant="text"
        density="comfortable"
      >
      </v-btn>
    </div>
  </v-container>
</template>

<script setup lang="ts">
import { ITransaction } from "@/interfaces/ITransaction.interface";

defineProps<{
  tr: ITransaction;
}>();
</script>
