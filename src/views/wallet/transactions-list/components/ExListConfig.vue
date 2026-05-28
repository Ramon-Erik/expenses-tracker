<template>
  <v-btn icon="mdi-cog-outline" @click="dialog = true"></v-btn>

  <v-dialog v-model="dialog" width="auto">
    <v-card
      max-width="400"
      prepend-icon="mdi-cog-outline"
      title="Mudar Visualização"
    >
      <v-card-text>
        <v-row>
          <v-col>
            <p class="font-weight-bold">Escolha uma visualização</p>
            <v-radio-group v-model="visualization">
              <v-radio label="Movimentações" value="transactions"></v-radio>
              <v-radio label="Categorias (tags)" value="tags"></v-radio>
              <v-radio label="Por Dia" value="day"></v-radio>
            </v-radio-group>
          </v-col>
        </v-row>
      </v-card-text>
      <template v-slot:actions>
        <v-btn text="cancelar" @click="close"></v-btn>
        <v-spacer></v-spacer>
        <v-btn type="submit" color="green" @click="apply">aplicar</v-btn>
      </template>
    </v-card>
  </v-dialog>
</template>

<script setup lang="ts">
import { useTransactions, Visualization } from "@/stores/TransactionsStore";
import { ref } from "vue";

const store = useTransactions();

const dialog = ref(false);
const visualization = ref<Visualization>("transactions");

const close = () => {
  dialog.value = false;
  visualization.value = store.visualization;
};

const apply = () => {
  store.changeVisualization(visualization.value);
  dialog.value = false;
};
</script>
