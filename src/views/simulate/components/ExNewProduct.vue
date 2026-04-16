<template>
  <div class="product-info">
    <input type="number" id="productAmount" class="product-amount" placeholder="Qtd." min="0" />
    <input
      type="text"
      id="productName"
      class="product-name"
      placeholder="Produto"
      autocapitalize="true"
    />
    <label for="price" class="product-price">
      <input type="text" id="price" placeholder="R$ 0,00" />
    </label>
  </div>
</template>

<style scoped>
.product-info {
  display: flex;
  gap: 1rem;
  margin-bottom: 1rem;
}

input {
  padding: .8rem;
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
