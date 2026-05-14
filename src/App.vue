<template>
  <v-app>
    <v-main>
      <v-container class="d-flex flex-column pa-0" style="height: 100%">
        <h1>Oi</h1>
        <v-container class="mt-auto pa-0">
          <ex-menu></ex-menu>
          <ex-footer></ex-footer>
        </v-container>
      </v-container>
    </v-main>
  </v-app>
</template>

<script setup lang="ts">
import ExMenu from "./components/ExMenu.vue";
import ExFooter from "./components/ExFooter.vue";
</script>
