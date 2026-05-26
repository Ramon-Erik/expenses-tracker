<template>
  <v-card class="pb-2 border-md">
    <v-card-text class="d-flex ga-4 justify-space-between">
      <v-avatar
        :color="
          tr.isIncoming ? 'rgba(76, 175, 80, 0.15)' : 'rgba(244, 67, 54, 0.15)'
        "
        size="40"
      >
        <v-icon
          :icon="
            tr.isIncoming ? 'mdi-arrow-up-circle' : 'mdi-arrow-down-circle'
          "
          :color="tr.isIncoming ? 'green-accent-3' : 'red-accent-3'"
          size="28"
        />
      </v-avatar>

      <div class="flex-grow-1">
        <div class="w-100 pr-1">
          <span
            class="text-subtitle-1 font-weight-bold text-wrap line-clamp-2 pr-2"
          >
            {{ tr.description }}
          </span>
        </div>
        <div class="mt-1">
          <div
            class="d-flex flex-wrap align-center text-caption text-grey-darken-1 gap-1"
          >
            <span>{{ formatDate(tr.inicialDate) }}</span>
            <v-icon icon="mdi-circle" size="4" class="mx-1" />
            <span>{{ tr.paymentMethod }}</span>
            <v-icon icon="mdi-circle" size="4" class="mx-1" />
            <span>{{ tr.category }}</span>
          </div>
          <div>
            <div class="tags d-flex flex-wrap ga-2 mt-4">
              <v-chip v-for="(tag, i) in tr.tags" :key="i" size="small">
                {{ tag }}
              </v-chip>
            </div>
            <span
              :class="[
                'text-h6 font-weight-bold ml-auto',
                tr.isIncoming ? 'text-green-accent-3' : 'text-red-accent-3',
              ]"
            >
              {{ formatCurrency(tr.amount) }}
            </span>
          </div>
        </div>
      </div>

      <v-btn
        icon="mdi-delete-outline"
        variant="text"
        color="grey-lighten-1"
        size="small"
        @click="store.deleteTransaction(tr.id)"
      />
    </v-card-text>
  </v-card>
</template>

<script setup lang="ts">
import { ITransaction } from "@/interfaces/ITransaction.interface";
import { useTransactions } from "@/stores/TransactionsStore";

const props = defineProps<{
  tr: ITransaction;
}>();

const store = useTransactions();

// Auxiliares de formatação
const formatCurrency = (value: number) => {
  const sign = props.tr.isIncoming ? "+ " : "- ";

  return (
    sign +
    new Intl.NumberFormat("pt-BR", {
      minimumFractionDigits: 0,
      maximumFractionDigits: 2,
      currency: "BRL",
      style: "currency",
    }).format(value)
  );
};

const formatDate = (date: Date) => {
  return new Intl.DateTimeFormat("pt-BR", {
    day: "2-digit",
    month: "2-digit",
  }).format(new Date(date));
};
</script>
