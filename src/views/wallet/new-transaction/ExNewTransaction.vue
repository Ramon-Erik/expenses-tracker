<template>
  <v-card>
    <v-card-title>
      <h2>Nova movimentação</h2>
    </v-card-title>
    <v-card-text>
      <v-text-field
        label="Descrição"
        variant="outlined"
        placeholder="Ex: Salário, Transporte"
        persistent-placeholder
        clearable
      ></v-text-field>
      <div class="transaction-info">
        <v-row>
          <v-col cols="6">
            <v-number-input
              variant="outlined"
              label="Valor total (R$)"
              placeholder="0,00"
              control-variant="hidden"
              persistent-placeholder
              hide-details
            ></v-number-input>
          </v-col>
          <v-col cols="6">
            <p>Tipo</p>
            <v-switch label="Entrada" color="green" hide-details></v-switch>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12" sm="6">
            <v-date-input
              hide-details
              prepend-icon=""
              prepend-inner-icon="$calendar"
              variant="outlined"
              label="Data de início"
            ></v-date-input>
          </v-col>
          <v-col cols="12" sm="6">
            <v-date-input
              hide-details
              prepend-icon=""
              prepend-inner-icon="$calendar"
              variant="outlined"
              label="Data de fim"
            ></v-date-input>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12" sm="6">
            <v-select
              hide-details
              variant="outlined"
              label="Categoria"
              :items="[
                'California',
                'Colorado',
                'Florida',
                'Georgia',
                'Texas',
                'Wyoming',
              ]"
            ></v-select>
          </v-col>
          <v-col cols="12" sm="6">
            <v-select
              hide-details
              variant="outlined"
              label="Método de pagamento"
              :items="[
                'California',
                'Colorado',
                'Florida',
                'Georgia',
                'Texas',
                'Wyoming',
              ]"
            ></v-select>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12">
            <p>Tags</p>
            <v-chip-group selected-class="text-primary" multiple column>
              <v-chip
                v-for="tag in tags"
                :key="tag"
                class="text-capitalize"
                :text="tag"
                filter
              ></v-chip>
              <v-btn
                class="ma-auto ml-0 text-capitalize"
                density="comfortable"
                rounded="xl"
                prepend-icon="mdi-plus"
                >Nova Tag</v-btn
              >
            </v-chip-group>
          </v-col>
        </v-row>
        <v-row class="justify-space-between">
          <v-col>
            <v-btn>Limpar</v-btn>
          </v-col>
          <v-col cols="auto">
            <v-btn prepend-icon="mdi-plus" color="green">Adicionar</v-btn>
          </v-col>
        </v-row>
      </div>
    </v-card-text>
  </v-card>
</template>

<script setup lang="ts">
import { ref } from "vue";

const tags = ref<string[]>(["estágio - ida", "estágio - volta", "comida"]);
</script>
