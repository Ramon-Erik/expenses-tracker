import { useTransactions } from "@/stores/TransactionsStore";
import ExNewTransaction from "@/views/wallet/new-transaction/ExNewTransaction.vue";
import { createTestingPinia } from "@pinia/testing";
import { mountComponentWithVuetifyAndPinia } from "../../../../test-utils/mountComponent";

interface IRules {
  required: (v: unknown) => true | "Este campo é obrigatório";
  minElements: (min: number) => (v: number[]) => string | true;
  minValue: (min: number) => (v: number) => string | true;
  minLength: (min: number) => (v: string) => string | true;
  maxLength: (max: number) => (v: string) => string | true;
  finalDate: (
    v: string
  ) =>
    | true
    | "Selecione a data de início antes"
    | "A data final deve ser maior que a inicial";
}

describe("ExNewTransaction", () => {
  const pinia = createTestingPinia();
  const opts = {
    global: {
      stubs: {
        "v-date-input": true,
      },
    },
  };

  it("deveria começar com somente uma input", () => {
    const wrapper = mountComponentWithVuetifyAndPinia(
      ExNewTransaction,
      pinia,
      opts
    );

    expect(wrapper.findAll("input").length).toBe(1);
  });

  it("deveria mostrar o resto do formulário com 3 letras na descrição", async () => {
    const wrapper = mountComponentWithVuetifyAndPinia(
      ExNewTransaction,
      pinia,
      opts
    );

    const desc = wrapper.find("input#desc");

    await desc.setValue("arr");
    await wrapper.vm.$nextTick();

    expect(wrapper.findAll("input").length > 1).toBe(true);
  });

  it(" ", async () => {
    const wrapper = mountComponentWithVuetifyAndPinia(
      ExNewTransaction,
      pinia,
      opts
    );

    const rules = wrapper.vm.rules as {
      required: (v: unknown) => true | "Este campo é obrigatório";
      minElements: (min: number) => (v: number[]) => string | true;
      minValue: (min: number) => (v: number) => string | true;
      minLength: (min: number) => (v: string) => string | true;
      maxLength: (max: number) => (v: string) => string | true;
    };

    expect(rules.required("")).toBe("Este campo é obrigatório");
  });

  it("deveria validar todas as regras do formulário (rules)", async () => {
    const wrapper = mountComponentWithVuetifyAndPinia(
      ExNewTransaction,
      pinia,
      opts
    );

    await wrapper.find("input#desc").setValue("aaaa");

    const rules = wrapper.vm.rules as IRules;

    expect(rules.required("")).toBe("Este campo é obrigatório");
    expect(rules.required("asassa")).toBe(true);

    expect(rules.minElements(1)([])).toBe("Selecione pelo menos 1 tag");
    expect(rules.minElements(1)([1])).toBe(true);

    expect(rules.minValue(0)(-1)).toBe("Valores a partir de 0");
    expect(rules.minValue(0)(5)).toBe(true);

    expect(rules.minLength(3)("ab")).toBe("Mínimo de 3 caracteres");
    expect(rules.minLength(3)("abc")).toBe(true);

    expect(rules.maxLength(5)("abcdef")).toBe("Máximo de 5 caracteres");
    expect(rules.maxLength(5)("abc")).toBe(true);

    const vm = wrapper.vm as any;
    vm.form.values.inicialDate = null;
    expect(rules.finalDate("2026-06-10")).toBe(
      "Selecione a data de início antes"
    );

    vm.form.values.inicialDate = new Date("2026-06-10");
    expect(rules.finalDate("2026-06-05")).toBe(
      "A data final deve ser maior que a inicial"
    );
    expect(rules.finalDate("2026-06-15")).toBe(true);
  });
});
