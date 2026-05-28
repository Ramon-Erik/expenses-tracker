<template>
  <v-card
    v-for="day in transactionsByDay"
    :key="day.dateString"
    @click="openDayDetails(day)"
    variant="outlined"
    class="hover-card cursor-pointer"
  >
    <v-card-text class="d-flex justify-space-between align-center py-3">
      <div class="d-flex flex-column">
        <span class="text-subtitle-1 font-weight-bold">{{
          day.dateString
        }}</span>
        <span class="text-caption text-grey">
          {{ day.transactions.length }}
          {{ day.transactions.length === 1 ? "transação" : "transações" }}
        </span>
      </div>

      <div class="d-flex ga-4 text-right">
        <div v-if="day.incomingTotal > 0" class="d-flex flex-column">
          <span class="text-caption text-grey">Entradas</span>
          <span class="text-body-2 font-weight-bold text-green-accent-3">
            + {{ formatMoney(day.incomingTotal) }}
          </span>
        </div>

        <div v-if="day.outgoingTotal > 0" class="d-flex flex-column">
          <span class="text-caption text-grey">Saídas</span>
          <span class="text-body-2 font-weight-bold text-red-accent-3">
            - {{ formatMoney(day.outgoingTotal) }}
          </span>
        </div>
      </div>
    </v-card-text>
  </v-card>

  <v-dialog v-model="isModalOpen" max-width="500">
    <v-card v-if="selectedDay" class="pa-2">
      <v-card-title class="d-flex justify-space-between align-center">
        <span>Transações de {{ selectedDay.dateString }}</span>
        <v-btn
          icon="mdi-close"
          variant="text"
          size="small"
          @click="isModalOpen = false"
        />
      </v-card-title>

      <v-card-text
        class="d-flex flex-column ga-3 overflow-y-auto"
        style="max-height: 60vh"
      >
        <ex-transaction
          v-for="tr in selectedDay.transactions"
          :key="tr.id"
          :tr="tr"
        />
      </v-card-text>

      <v-divider class="mt-2"></v-divider>

      <v-card-actions class="justify-space-between px-4 py-2 text-subtitle-2">
        <span class="text-green-accent-3"
          >Entradas: {{ formatMoney(selectedDay.incomingTotal) }}</span
        >
        <span class="text-red-accent-3"
          >Saídas: {{ formatMoney(selectedDay.outgoingTotal) }}</span
        >
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";
import { useTransactions } from "@/stores/TransactionsStore";
import { IDayGroup } from "@/interfaces/IDayGroup.interface";
import ExTransaction from "./ExTransaction.vue"; // Reaproveita seu card

const store = useTransactions();

// Estado do Modal
const isModalOpen = ref(false);
const selectedDay = ref<IDayGroup | null>(null);

// Função auxiliar para formatar a data como chave (DD/MM/AAAA)
const formatDateKey = (dateInput: Date | string) => {
  return new Intl.DateTimeFormat("pt-BR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  }).format(new Date(dateInput));
};

// 🌟 A Mágica: Agrupa as transações por dia
const transactionsByDay = computed<IDayGroup[]>(() => {
  const groups: Record<string, IDayGroup> = {};

  store.transactionsList.forEach((tr) => {
    const dayKey = formatDateKey(tr.inicialDate);

    // Se o dia ainda não foi registrado no objeto, inicializa ele
    if (!groups[dayKey]) {
      groups[dayKey] = {
        dateString: dayKey,
        rawDate: new Date(tr.inicialDate),
        incomingTotal: 0,
        outgoingTotal: 0,
        transactions: [],
      };
    }

    // Adiciona a transação ao dia
    groups[dayKey].transactions.push(tr);

    // Calcula os totais do dia
    if (tr.isIncoming) {
      groups[dayKey].incomingTotal += tr.amount;
    } else {
      groups[dayKey].outgoingTotal += tr.amount;
    }
  });

  // Transforma o objeto de volta em um Array ordenado por data mais recente
  return Object.values(groups).sort(
    (a, b) => b.rawDate.getTime() - a.rawDate.getTime()
  );
});

// Abre o modal injetando o dia clicado
const openDayDetails = (day: IDayGroup) => {
  selectedDay.value = day;
  isModalOpen.value = true;
};

// Auxiliar para os totais gerais do modal
const formatMoney = (value: number) => {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(value);
};
</script>
