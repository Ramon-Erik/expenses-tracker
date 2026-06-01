<template>
  <div class="disponible-amount text-center">
    <p class="text-h5 font-weight-bold">Quanto você tem?</p>
    <v-number-input
      v-model="totalToExpend"
      variant="outlined"
      placeholder="R$ 0.00"
      :precision="2"
      control-variant="hidden"
      persistent-placeholder
      class="mx-auto mt-2"
      style="width: 200px"
      id="cartAmount"
    ></v-number-input>
    <p data-test-id="totalParagraph">Sobra: {{ currencyFormat(total) }}</p>
  </div>
</template>

<script setup lang="ts">
import { useCart } from "@/stores/CartStore";
import { currencyFormat } from "@/utils/currency";
import { computed, onMounted, ref, watch } from "vue";

const store = useCart();

const totalToExpend = ref<number>(0);

const total = computed(() => {
  return totalToExpend.value - store.total;
});

onMounted(() => {
  if (store.max) {
    totalToExpend.value = store.max;
  }
});

watch(
  () => totalToExpend.value,
  (newTotal) => {
    store.updateMaxValue(newTotal);
  },
  { deep: true }
);
</script>
