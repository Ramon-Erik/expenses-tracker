<template>
  <div class="cart-limit">
    <label
      for="cartAmount"
      :class="{
        warn: isPriceMissing,
        overbudget: isOverBudget,
      }"
    >
      <span>Quanto você tem?</span>
      <input
        type="text"
        inputmode="decimal"
        class="bank-input"
        id="cartAmount"
        v-model="totalToExpend"
        autocomplete="off"
        placeholder="500,00"
        @input="priceInput"
      />
    </label>
  </div>
  <p>Sobra: {{ currencyFormat(total) }}</p>
</template>

<script setup lang="ts">
import { useCart } from "@/stores/CartStore";
import { currencyFormat, formatPriceToDecimal } from "@/utils/currency";
import { computed, onMounted, ref } from "vue";

const store = useCart();

const maxDigits = 6;

const totalToExpend = ref<string | undefined>();

const inputValue = computed(() => {
  if (totalToExpend.value) {
    const value = String(totalToExpend.value);
    return Number.parseFloat(formatPriceToDecimal(value, maxDigits)) / 100;
  }
  return 0;
});

const total = computed(() => {
  if (totalToExpend.value) {
    const totalString = String(totalToExpend.value);
    const value =
      Number.parseFloat(formatPriceToDecimal(totalString, maxDigits)) / 100;
    return value - store.total > 0 ? value - store.total : 0;
  }
  return 0;
});

const isPriceMissing = computed(() => {
  return (
    store.cart.length > 0 &&
    (!totalToExpend.value || totalToExpend.value == undefined)
  );
});

const isOverBudget = computed(() => {
  return totalToExpend.value && inputValue.value < store.total;
});

const formatToBRL = (price: string) => {
  const value = formatPriceToDecimal(price, maxDigits);

  const floatValue = Number.parseFloat(value) / 100;
  let amountDisplay = Intl.NumberFormat("pt-br", {
    style: "currency",
    currency: "BRL",
  }).format(floatValue);
  amountDisplay = amountDisplay.slice(3, amountDisplay.length);

  return amountDisplay;
};

const priceInput = (event: InputEvent) => {
  const target = event.target as HTMLInputElement;
  const value = target.value;

  if (value == "0" || isNaN(Number.parseFloat(value))) {
    totalToExpend.value = undefined;
    return;
  }

  totalToExpend.value = formatToBRL(value);
  store.updateMaxValue(String(value));
};

onMounted(() => {
  if (store.max) {
    totalToExpend.value = formatToBRL(String(store.max));
  }
});
</script>

<style scoped>
label,
p {
  text-align: center;
}

.warn {
  input[type="text"] {
    border: 2px solid var(--warn-border-color);
    background-color: var(--warn-bg-color);
  }

  &::before {
    color: var(--warn-border-color);
  }

  .bank-input::placeholder {
    color: var(--warn-border-color-placeholder);
  }
}

.overbudget {
  input[type="text"] {
    border: 2px solid var(--overbudget-border-color);
    color: var(--overbudget-border-color);
    background-color: var(--overbudget-bg-color);
  }

  &::before {
    color: var(--overbudget-border-color);
  }

  .bank-input::placeholder {
    color: var(--overbudget-border-color-placeholder);
  }
}

.cart-limit {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.cart-limit label {
  position: relative;
  display: flex;
  flex-direction: column;
}

.cart-limit label::before {
  content: "R$";
  position: absolute;
  left: -25%;
  top: 55%;
  display: block;

  font-size: 2rem;
  font-weight: 400;
  transform: translate(0, -50%);
}

.bank-input {
  width: 200px;
  padding: 16px;
  border: 1px solid var(--input-border);
  border-radius: 12px;
  background: var(--bg-input);
  color: var(--color-text);
  outline: none;
  font-size: 2rem;
  font-weight: 600;
  text-align: center;
}

.bank-input::placeholder {
  color: var(--input-placeholder);
}

.bank-input:focus {
  box-shadow: 0 0 0 4px var(--focus-ring);
}

.bank-input::-webkit-outer-spin-button,
.bank-input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}
</style>
