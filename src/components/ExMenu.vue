<template>
  <ul>
    <li><a href="/wallet">Carteira</a></li>
    <li><a href="/simulate">Simular</a></li>
  </ul>
</template>

<script setup lang="ts"></script>

<style scoped>
ul {
  display: flex;
  justify-content: center;
  gap: 1rem;
  padding: 0;
  list-style-type: none;
}

ul a {
  color: var(--color-primary);
  text-decoration: none;
  transition: all .5s ease;
}

ul a:hover {
  transform: scale(1.06);
}
</style>
