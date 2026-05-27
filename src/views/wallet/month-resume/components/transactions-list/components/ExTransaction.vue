<template>
  <v-card class="pb-2 border-md">
    <v-card-text class="d-flex ga-4 justify-space-between">
      <v-avatar :color="transaction.color" size="40">
        <v-icon
          :icon="transaction.icon"
          :color="transaction.iconColor"
          size="28"
        />
      </v-avatar>

      <div class="transaction-info flex-grow-1">
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
                'd-inline-block text-h6 font-weight-bold mt-4 ml-auto',
                transaction.type,
              ]"
            >
              {{ formatCurrency(tr.amount) }}
            </span>
          </div>
        </div>
      </div>

      <v-btn icon="mdi-dots-vertical" size="small" variant="text" @click="show">
      </v-btn>
    </v-card-text>
  </v-card>

  <v-menu
    v-model="showMenu"
    :offset="[-8, -12]"
    :target="menuTarget"
    location="bottom end"
    scroll-strategy="close"
  >
    <v-list class="py-0" density="compact" item-value="code" item-props slim>
      <v-list-item
        @click="store.deleteTransaction(tr.id)"
        prepend-icon="mdi-delete-outline"
      >
        <v-list-item-title> Apagar </v-list-item-title>
      </v-list-item>
      <v-list-item
        @click="store.deleteTransaction(tr.id)"
        prepend-icon="mdi-pencil-outline"
      >
        <v-list-item-title> Editar </v-list-item-title>
      </v-list-item>
    </v-list>
  </v-menu>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { ITransaction } from "@/interfaces/ITransaction.interface";
import { useTransactions } from "@/stores/TransactionsStore";

const props = defineProps<{
  tr: ITransaction;
}>();

const store = useTransactions();

const transaction = ref({
  color: props.tr.isIncoming
    ? "rgba(76, 175, 80, 0.15)"
    : "rgba(244, 67, 54, 0.15)",
  icon: props.tr.isIncoming ? "mdi-arrow-up-circle" : "mdi-arrow-down-circle",
  iconColor: props.tr.isIncoming ? "green-accent-3" : "red-accent-3",
  type: props.tr.isIncoming ? "text-green-accent-3" : "text-red-accent-3",
});

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

const showMenu = ref(false);
const menuTarget = ref<HTMLElement | null>(null);

const show = async (evt: MouseEvent) => {
  if (showMenu.value) {
    showMenu.value = false;
    await new Promise((resolve) => setTimeout(resolve, 100));
  }
  menuTarget.value = (evt.target as HTMLElement).closest(".v-btn");
  showMenu.value = true;
};
</script>
