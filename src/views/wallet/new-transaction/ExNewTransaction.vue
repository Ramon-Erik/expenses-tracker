<template>
  <v-card>
    <v-card-title>
      <h2>Nova movimentação</h2>
    </v-card-title>
    <v-card-text>
      <v-form v-model="form.valid" ref="formRef" @submit.prevent="handleSubmit">
        <v-text-field
          v-model="form.values.description"
          label="Descrição"
          variant="outlined"
          placeholder="Ex: Salário, Transporte"
          :rules="[rules.required, rules.minLength(3), rules.maxLength(30)]"
          persistent-placeholder
          clearable
        ></v-text-field>
        <v-expand-transition mode="out-in">
          <div v-if="showForm" class="transaction-info pt-3">
            <v-row>
              <v-col cols="6">
                <v-number-input
                  v-model="form.values.amount"
                  variant="outlined"
                  label="Valor total (R$)"
                  placeholder="0.00"
                  :precision="2"
                  control-variant="hidden"
                  :rules="[rules.required, rules.minValue(0)]"
                  persistent-placeholder
                ></v-number-input>
              </v-col>
              <v-col cols="6">
                <p>Tipo</p>
                <v-switch
                  v-model="form.values.isIncoming"
                  label="Entrada"
                  color="green"
                ></v-switch>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="12" sm="6">
                <v-date-input
                  v-model="form.values.inicialDate"
                  prepend-icon=""
                  prepend-inner-icon="$calendar"
                  variant="outlined"
                  label="Data de início"
                  :rules="[rules.required]"
                ></v-date-input>
              </v-col>
              <v-col cols="12" sm="6">
                <v-date-input
                  v-model="form.values.finalDate"
                  prepend-icon=""
                  prepend-inner-icon="$calendar"
                  variant="outlined"
                  label="Data final"
                  :rules="[rules.finalDate]"
                ></v-date-input>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="12" sm="6">
                <v-select
                  v-model="form.values.category"
                  variant="outlined"
                  label="Categoria"
                  :items="categories"
                  :rules="[rules.required]"
                ></v-select>
              </v-col>
              <v-col cols="12" sm="6">
                <v-select
                  v-model="form.values.paymentMethod"
                  variant="outlined"
                  label="Método de pagamento"
                  :items="paymentMethods"
                  :rules="[rules.required]"
                ></v-select>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="12">
                <p>Tags (escolha pelo menos uma)</p>
                <v-input
                  v-model="form.values.tags"
                  :rules="[rules.minElements(1)]"
                >
                  <v-chip-group
                    v-model="form.values.tags"
                    selected-class="text-primary"
                    multiple
                    column
                  >
                    <v-chip
                      v-for="tag in store.tagList"
                      :key="tag.value"
                      @dblclick="store.deleteTag(tag.value)"
                      class="text-capitalize"
                      :value="tag.value"
                      :text="tag.text"
                      filter
                    ></v-chip>
                    <v-btn
                      class="ma-auto ml-0 text-capitalize"
                      density="comfortable"
                      rounded="xl"
                      prepend-icon="mdi-plus"
                      @click="isNewTagDialogOpen = true"
                      >Nova Tag</v-btn
                    >
                  </v-chip-group>
                </v-input>
              </v-col>
            </v-row>
            <v-row class="justify-space-between">
              <v-col>
                <v-btn @click="clearForm">
                  Limpar
                  <v-tooltip activator="parent" location="end">
                    Esconde esse formulário
                  </v-tooltip>
                </v-btn>
              </v-col>
              <v-col cols="auto">
                <v-btn
                  type="submit"
                  :disabled="!form.valid"
                  prepend-icon="mdi-plus"
                  color="green"
                  >Adicionar</v-btn
                >
              </v-col>
            </v-row>
          </div>
        </v-expand-transition>
      </v-form>
    </v-card-text>
  </v-card>
  <ex-new-tag-dialog v-model:isOpen="isNewTagDialogOpen"></ex-new-tag-dialog>
</template>

<script setup lang="ts">
import { IRawTransaction } from "@/interfaces/ITransaction.interface";
import { useTransactions } from "@/stores/TransactionsStore";
import { ComponentPublicInstance, nextTick, ref, watch } from "vue";
import type { VForm } from "vuetify/components";
import ExNewTagDialog from "./components/ExNewTagDialog.vue";

type VFormRef = ComponentPublicInstance & InstanceType<typeof VForm>;

const store = useTransactions();

const isNewTagDialogOpen = ref(false);

const categories = [
  "Salário",
  "Extra",
  "Alimentação",
  "Transporte",
  "Moradia",
  "Saúde",
  "Educação",
  "Lazer",
  "Compras",
  "Outros",
];

const paymentMethods = [
  "Dinheiro",
  "PIX",
  "Cartão Crédito",
  "Cartão Débito",
  "Transferência",
  "Outros",
];

const formDefault = {
  description: "",
  amount: null,
  isIncoming: false,
  inicialDate: new Date(),
  finalDate: null,
  category: null,
  paymentMethod: null,
  tags: [] as number[],
};

const form = ref({
  values: { ...formDefault },
  valid: null as boolean | null,
});
const formRef = ref<null | VFormRef>(null);
const showForm = ref(false);

const rules = {
  required: (v: unknown) =>
    (!!v && showForm.value) || "Este campo é obrigatório",
  minElements: (min: number) => {
    return (v: number[]) =>
      v.length >= min || `Selecione pelo menos ${min} tag${min > 1 ? "s" : ""}`;
  },
  minValue: (min: number) => {
    return (v: number) => v > min || `Valores a partir de ${min}`;
  },
  minLength: (min: number) => {
    return (v: string) => v.length >= min || `Mínimo de ${min} caracteres`;
  },
  maxLength: (max: number) => {
    return (v: string) => v.length <= max || `Máximo de ${max} caracteres`;
  },
  finalDate: (v: string) => {
    if (!v) return true;

    const inicialDate = form.value.values.inicialDate;
    if (!inicialDate) return "Selecione a data de início antes";

    const start = new Date(inicialDate).getTime();
    const end = new Date(v).getTime();

    return start < end || "A data final deve ser maior que a inicial";
  },
};

const clearForm = async () => {
  form.value.values.description = "";
  form.value.values.amount = formDefault.amount;
  form.value.values.isIncoming = formDefault.isIncoming;
  form.value.values.inicialDate = new Date();
  form.value.values.finalDate = formDefault.finalDate;
  form.value.values.category = formDefault.category;
  form.value.values.paymentMethod = formDefault.paymentMethod;
  form.value.values.tags = [];

  form.value.valid = null;

  await nextTick();
  if (formRef.value) formRef.value.resetValidation();

  showForm.value = false;
};

const getTags = (selectedTags: number[]) => {
  return store.tagList
    .filter((t) => selectedTags.includes(t.value))
    .map((f) => f.text);
};

const formValueProcessor = (): IRawTransaction => ({
  description: form.value.values.description || "",
  amount: form.value.values.amount || 0,
  category: form.value.values.category || "",
  finalDate: form.value.values.finalDate || null,
  inicialDate: form.value.values.inicialDate || "",
  isIncoming: form.value.values.isIncoming || false,
  paymentMethod: form.value.values.paymentMethod || "",
  tags: getTags(form.value.values.tags),
});

const handleSubmit = () => {
  if (!form.value.valid) return;
  console.log(form.value.values);
  store.addTransaction(formValueProcessor());
  clearForm();
};

watch(
  () => form.value.values.description,
  async (newDescription) => {
    if (newDescription && newDescription.length) {
      showForm.value = true;
    }
  }
);
</script>
