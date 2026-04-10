<template>
  <ul>
    <li>
      <router-link active-class="active" to="/">Carteira</router-link>
    </li>
    <li>
      <router-link active-class="active" to="/simulate">Simular</router-link>
    </li>
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
  transition: all 0.5s ease;
}

ul a.active {
  color: var(--color-primary);
  text-decoration: underline;
}

ul a:hover {
  transform: scale(1.06);
}
</style>
