<template>
  <div class="upper-part">
    <ExHeader />
    <div class="container">
      <ExMenu />
      <router-view />
    </div>
  </div>
  <ExFooter />
</template>

<script setup lang="ts">
import ExHeader from "./components/ExHeader.vue";
import ExFooter from "./components/ExFooter.vue";
import ExMenu from "./components/ExMenu.vue";
</script>
