<template>
  <div class="cart-limit">
    <label for="cartAmount">
      <span>Quanto você tem?</span>
      <input
        type="text"
        class="bank-input"
        id="cartAmount"
        v-model="productPrice"
        autocomplete="off"
        placeholder="500,00"
        @input="priceInput"
      />
    </label>
  </div>
  <p>Sobra: {{ currencyFormat(total) }}</p>
</template>

<script setup lang="ts">
import { useCart } from '@/stores/CartStore'
import { currencyFormat, formatPriceToDecimal } from '@/utils/currency'
import { computed, ref } from 'vue'

const store = useCart()

const maxDigits = 6

const productPrice = ref<string | undefined>()

const total = computed(() => {
  if (productPrice.value) {
    const value = Number.parseFloat(formatPriceToDecimal(productPrice.value, maxDigits)) / 100
    return value - store.total > 0 ? value - store.total : 0
  }
  return 0
})

const priceInput = (event: InputEvent) => {
  const target = event.target as HTMLInputElement
  let value = target.value

  value = formatPriceToDecimal(value, maxDigits)

  if (value == '0' || isNaN(Number.parseFloat(value))) {
    productPrice.value = undefined
    return
  }

  const floatValue = Number.parseFloat(value) / 100
  let amountDisplay = Intl.NumberFormat('pt-br', { style: 'currency', currency: 'BRL' }).format(
    floatValue,
  )
  amountDisplay = amountDisplay.slice(3, amountDisplay.length)

  productPrice.value = amountDisplay
}
</script>

<style scoped>
label,
p {
  text-align: center;
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
  content: 'R$';
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
  font-size: 32px;
  font-weight: 600;
  text-align: center;
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
