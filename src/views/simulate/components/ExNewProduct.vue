<template>
  <p class="text-h6 mt-6 text-center">Novo produto</p>
  <div
    class="new-item w-100 mx-auto mt-2 d-flex flex-column flex-wrap ga-4"
    style="max-width: 290px"
  >
    <v-text-field
      v-model="product.name"
      variant="outlined"
      clearable
      hide-details
      label="Item"
      density="compact"
      id="productName"
      autocomplete="off"
      autocapitalize="sentences"
      @keyup.enter="handleAddItem"
    ></v-text-field>

    <div class="price-number d-flex ga-4">
      <v-number-input
        v-model="product.amount"
        placeholder="Qtd."
        variant="outlined"
        control-variant="hidden"
        hide-details
        density="compact"
        id="productAmount"
      ></v-number-input>

      <v-number-input
        v-model="product.price"
        placeholder="R$ 0,00"
        variant="outlined"
        :precision="2"
        control-variant="hidden"
        hide-details
        density="compact"
        id="price"
        autocomplete="off"
        @keyup.enter="handleAddItem"
      ></v-number-input>
    </div>
  </div>
</template>

<script setup lang="ts">
import type IProduct from "@/interfaces/IProduct.interface";
import { useCart } from "@/stores/CartStore";
import { ref } from "vue";

const store = useCart();

const product = ref({
  amount: 1,
  name: "",
  price: 0,
});

const clearInputs = () => {
  product.value = {
    amount: 1,
    name: "",
    price: 0,
  };
};

const getFormatedProduct: () => IProduct = () => {
  const id = Date.now();
  return {
    id,
    name: product.value.name,
    price: product.value.price,
    amount: product.value.amount,
  };
};

const isProductValid = () => {
  const prod = product.value;

  if (prod.amount < 1 || prod.name.trim().length < 3 || prod.price <= 0)
    return false;
  return true;
};

const handleAddItem = () => {
  if (!isProductValid()) return;

  const productInfo = getFormatedProduct();
  store.addProduct(productInfo);
  clearInputs();
};
</script>

<style scoped>
.gap-1 {
  gap: 4px;
}
</style>
