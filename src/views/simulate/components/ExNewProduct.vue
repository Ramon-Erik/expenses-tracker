<template>
  <div class="product-info">
    <input
      type="number"
      id="productAmount"
      class="product-amount"
      v-model="productAmount"
      placeholder="Qtd."
      min="0"
    />
    <input
      type="text"
      id="productName"
      class="product-name"
      v-model="productName"
      placeholder="Produto"
      autocomplete="off"
      autocapitalize="true"
    />
    <label for="price" class="product-price">
      <input
        type="text"
        id="price"
        v-model="productPrice"
        placeholder="R$ 0,00"
        autocomplete="off"
        @focusout="handleAddItem"
        @input="priceInput"
      />
    </label>
  </div>
</template>

<script setup lang="ts">
import type IProduct from '@/interfaces/IProduct.interface'
import { useCart } from '@/stores/CartStore'
import { formatPriceToDecimal } from '@/utils/currency'
import { ref } from 'vue'
import { useToast } from 'vue-toastification'

const store = useCart()
const toast = useToast()

const maxDigits = 6

const productAmount = ref<number | undefined>()
const productName = ref<string | undefined>()
const productPrice = ref<string | undefined>()

const clearInputs = () => {
  productAmount.value = undefined
  productName.value = undefined
  productPrice.value = undefined
}

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

const areInfoInvalid = () => {
  if (!productName.value?.trim()) {
    toast.error('O nome é obrigatório!')
    return true
  }
  if (!productPrice.value) {
    toast.error('O preço é obrigatório!')
    return true
  }
  if (!productAmount.value) {
    toast.warning('Apenas uma unidade adicionada!')
  }
  return false
}

const getFormatedProduct: () => IProduct = () => {
  const id = Date.now()
  const price = Number.parseFloat(formatPriceToDecimal(productPrice.value!, maxDigits)) / 100
  return {
    id,
    name: productName.value!,
    price,
    amount: productAmount.value || 1,
  }
}

const handleAddItem = () => {
  if (areInfoInvalid()) {
    return
  }

  const productInfo: IProduct = getFormatedProduct()

  store.addProduct(productInfo)
  clearInputs()
}
</script>

<style scoped>
.product-info {
  display: flex;
  gap: 1rem;
  margin-bottom: 1rem;
}

input {
  padding: 0.8rem;
}

.product-amount {
  flex: 1;
}

.product-name {
  flex: 3;
}

.product-price {
  flex: 2;
}
</style>
