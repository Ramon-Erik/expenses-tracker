import { mount } from "@vue/test-utils";
import { createTestingPinia } from "@pinia/testing";
import ExAmount from "@/views/simulate/components/ExAmount.vue";
import { useCart } from "@/stores/CartStore";
import { currencyFormat } from "@/utils/currency";

describe("ExAmount.vue", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  const mountComponent = (initialState = {}) => {
    return mount(ExAmount, {
      global: {
        plugins: [
          createTestingPinia({
            initialState,
            stubActions: false,
          }),
        ],
      },
    });
  };

  it("it should load localstoraged max value when mounted", async () => {
    const wrapper = mountComponent();

    const localStoragedMax = localStorage.getItem("exp-tracker-cart-max") || "";

    const input = wrapper.find("input").element as HTMLInputElement;
    expect(input.value).toBe(localStoragedMax);
  });

  it("deve formatar o input como moeda BRL enquanto o usuário digita", async () => {
    const wrapper = mountComponent();
    const input = wrapper.find("input");

    await input.setValue("123456");
    await input.trigger("input");

    expect((input.element as HTMLInputElement).value).toBe("1.234,56");
  });

  it("deve calcular a sobra corretamente baseada no gasto da store", async () => {
    const wrapper = mountComponent();
    const store = useCart();

    const input = wrapper.find("input");
    await input.setValue("10000");
    await input.trigger("input");

    store.addProduct({ id: 1, name: "Item", price: 40, amount: 1 });

    await wrapper.vm.$nextTick();

    const p = wrapper.find('[data-test-id="totalParagraph"]');
    expect(p.text()).toContain(currencyFormat(60));
  });

  it("deve aplicar a classe 'warn' quando há itens no carrinho mas o orçamento está vazio", async () => {
    const wrapper = mountComponent();
    const store = useCart();

    store.addProduct({ id: 1, name: "Item", price: 10, amount: 1 });

    await wrapper.vm.$nextTick();

    const label = wrapper.find("label");
    expect(label.classes()).toContain("warn");
  });

  it("deve aplicar a classe 'overbudget' quando o gasto excede o orçamento", async () => {
    const wrapper = mountComponent();
    const store = useCart();

    const input = wrapper.find("input");
    await input.setValue("1000");
    await input.trigger("input");

    store.addProduct({ id: 1, name: "Item Caro", price: 20, amount: 1 });

    await wrapper.vm.$nextTick();

    const label = wrapper.find("label");
    expect(label.classes()).toContain("overbudget");

    // O parágrafo de sobra deve mostrar R$ 0,00 (conforme lógica value - store.total > 0)
    const p = wrapper.find('[data-test-id="totalParagraph"]');
    expect(p.text()).toContain(currencyFormat(0));
  });

  it("deve atualizar a store ao alterar o valor do input", async () => {
    const wrapper = mountComponent();
    const store = useCart();

    const input = wrapper.find("input");
    await input.setValue("20000");
    await input.trigger("input");

    await wrapper.vm.$nextTick();

    expect(store.max).toBe("200,00");
  });
});
