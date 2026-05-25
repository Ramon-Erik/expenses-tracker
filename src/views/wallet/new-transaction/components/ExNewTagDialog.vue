<template>
  <v-dialog :model-value="isOpen" @update:model-value="close" width="auto">
    <v-card prepend-icon="mdi-plus" title="Adicionar nova tag">
      <v-card-text>
        <v-text-field
          v-model="newTag"
          label="Nome da tag"
          variant="outlined"
          placeholder="Ex: Salário, Transporte"
          persistent-placeholder
          clearable
        >
          <!-- :rules="[rules.required, rules.minLength(3), rules.maxLength(30)]" -->
        </v-text-field>
      </v-card-text>
      <v-card-actions>
        <v-btn text="fechar" @click="close"></v-btn>
        <v-spacer></v-spacer>
        <v-btn text="salvar" @click="addNewTag"></v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup lang="ts">
import { useTransactions } from "@/stores/TransactionsStore";
import { ref } from "vue";

const store = useTransactions();

defineProps<{
  isOpen: boolean;
}>();

const emit = defineEmits<{
  (e: "update:isOpen", value: boolean): void;
}>();

const close = () => {
  emit("update:isOpen", false);
};

const newTag = ref("");

const addNewTag = () => {
  store.addTag(newTag.value);
  close();
};
</script>
