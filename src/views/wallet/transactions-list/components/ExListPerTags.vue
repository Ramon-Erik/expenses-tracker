<template>
  <div class="d-flex flex-wrap ga-3">
    <v-card
      v-for="(tagGroup, index) in transactionsByTag"
      :key="tagGroup.tagName"
      @click="openTagDetails(tagGroup)"
      variant="outlined"
      class="hover-card cursor-pointer flex-grow-1"
    >
      <v-card-text
        class="d-flex flex-wrap ga-4 justify-space-between align-center py-3"
      >
        <div class="d-flex align-center ga-2">
          <v-chip
            :color="colorTags[index % colorTags.length]"
            text-color="white"
            size="small"
            class="font-weight-bold"
          >
            # {{ tagGroup.tagName }}
          </v-chip>
          <span class="text-caption text-grey">
            {{ tagGroup.transactions.length }}
            {{ tagGroup.transactions.length === 1 ? "item" : "itens" }}
          </span>
        </div>

        <div v-if="tagGroup.incomingTotal > 0" class="d-flex flex-column">
          <span class="text-caption text-grey">Entradas</span>
          <span class="text-body-2 font-weight-bold text-green-accent-3">
            + {{ formatMoney(tagGroup.incomingTotal) }}
          </span>
        </div>

        <div v-if="tagGroup.outgoingTotal > 0" class="d-flex flex-column">
          <span class="text-caption text-grey">Saídas</span>
          <span class="text-body-2 font-weight-bold text-red-accent-3">
            - {{ formatMoney(tagGroup.outgoingTotal) }}
          </span>
        </div>
      </v-card-text>
    </v-card>

    <v-dialog v-model="isModalOpen" max-width="500">
      <v-card v-if="selectedTag" class="pa-2">
        <v-card-title class="d-flex justify-space-between align-center">
          <div class="d-flex align-center ga-2">
            <span>Transações com</span>
            <v-chip color="orange" size="small"
              ># {{ selectedTag.tagName }}</v-chip
            >
          </div>
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
            v-for="tr in selectedTag.transactions"
            :key="tr.id"
            :tr="tr"
          />
        </v-card-text>

        <v-divider class="mt-2"></v-divider>

        <v-card-actions class="justify-space-between px-4 py-2 text-subtitle-2">
          <span class="text-green-accent-3"
            >Entradas: {{ formatMoney(selectedTag.incomingTotal) }}</span
          >
          <span class="text-red-accent-3"
            >Saídas: {{ formatMoney(selectedTag.outgoingTotal) }}</span
          >
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";
import { useTransactions } from "@/stores/TransactionsStore";
import { ITagGroup } from "@/interfaces/ITagsGroup.interface";
import ExTransaction from "./ExTransaction.vue";

const store = useTransactions();

const isModalOpen = ref(false);
const selectedTag = ref<ITagGroup | null>(null);

const colorTags = [
  "indigo",
  "teal",
  "purple",
  "cyan",
  "amber",
  "deep-purple",
  "green",
  "pink",
  "blue",
  "orange",
];

const transactionsByTag = computed<ITagGroup[]>(() => {
  const groups: Record<string, ITagGroup> = {};

  store.transactionsList.forEach((tr) => {
    // Se a transação não tiver tags ou o array estiver vazio, ignora
    if (!tr.tags || tr.tags.length === 0) return;

    tr.tags.forEach((tag) => {
      const tagKey = tag.trim().toLowerCase();

      if (!tagKey) return;

      // Inicializa o grupo da tag se ele ainda não existir no Record
      if (!groups[tagKey]) {
        groups[tagKey] = {
          tagName: tag,
          incomingTotal: 0,
          outgoingTotal: 0,
          transactions: [],
        };
      }

      groups[tagKey].transactions.push(tr);

      if (tr.isIncoming) {
        groups[tagKey].incomingTotal += tr.amount;
      } else {
        groups[tagKey].outgoingTotal += tr.amount;
      }
    });
  });

  // Transforma o Record em Array e ordena: Tags com maior gasto de saída primeiro
  return Object.values(groups).sort(
    (a, b) => b.outgoingTotal - a.outgoingTotal
  );
});

const openTagDetails = (tagGroup: ITagGroup) => {
  selectedTag.value = tagGroup;
  isModalOpen.value = true;
};

const formatMoney = (value: number) => {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(value);
};
</script>

<style scoped>
.hover-card:hover {
  background-color: rgba(255, 255, 255, 0.02);
  transition: background-color 0.2s ease;
}
</style>
