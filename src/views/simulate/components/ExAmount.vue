<template>
  <div class="cart-limit">
    <label for="cartAmount">
      <span>Quanto você tem?</span>
      <input
        type="text"
        class="bank-input"
        id="cartAmount"
        autocomplete="off"
        placeholder="500,00"
      />
    </label>
  </div>
  <p>Sobra: R$ 0,00</p>
</template>

<script setup lang="ts"></script>

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
