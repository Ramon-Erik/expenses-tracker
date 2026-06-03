import ExAmount from "@/views/simulate/components/ExAmount.vue";
import { useCart } from "@/stores/CartStore";
import { currencyFormat } from "@/utils/currency";
import { mountComponentWithVuetifyAndPinia } from "../../../../test-utils/mountComponent";
import { createTestingPinia } from "@pinia/testing";

describe.only("ExAmount.vue", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  const pinia = createTestingPinia({
    stubActions: false,
  });

  it("deve carregar o máximo do localstorage", async () => {
    const wrapper = mountComponentWithVuetifyAndPinia(ExAmount, pinia);

    const localStoragedMax =
      localStorage.getItem("exp-tracker-cart-max") || "0.00";

    const input = wrapper.find("input#cartAmount").element as HTMLInputElement;
    expect(input.value).toBe(localStoragedMax);
  });

  it("deve calcular a sobra corretamente baseada no gasto da store", async () => {
    const wrapper = mountComponentWithVuetifyAndPinia(ExAmount, pinia);
    const store = useCart();

    const input = wrapper.find("input");
    await input.setValue("100");
    await input.trigger("input");

    store.addProduct({ id: 1, name: "Item", price: 50, amount: 1 });

    await wrapper.vm.$nextTick();

    const p = wrapper.find('[data-test-id="totalParagraph"]');
    expect(p.text()).toContain(currencyFormat(50));
  });

  it("deve atualizar a store ao alterar o valor do input", async () => {
    const wrapper = mountComponentWithVuetifyAndPinia(ExAmount, pinia);
    const store = useCart();

    const input = wrapper.find("input");
    await input.setValue("200.05");
    await input.trigger("input");

    await wrapper.vm.$nextTick();

    expect(store.max).toBe(200.05);
  });
});
