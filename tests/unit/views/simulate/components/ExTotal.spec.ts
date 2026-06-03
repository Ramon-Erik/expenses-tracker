import { useCart } from "@/stores/CartStore";
import { currencyFormat } from "@/utils/currency";
import ExTotal from "@/views/simulate/components/ExTotal.vue";
import { createTestingPinia } from "@pinia/testing";
import { mountComponentWithVuetifyAndPinia } from "../../../../test-utils/mountComponent";

describe("ExTotal", () => {
  const pinia = createTestingPinia({ stubActions: false });
  beforeEach(() => {
    jest.clearAllMocks();
    localStorage.clear();
  });

  it("deveria renderizar apenas um paragrafo com a lista vazia", () => {
    const wrapper = mountComponentWithVuetifyAndPinia(ExTotal, pinia);

    const paragraphs = wrapper.findAll("p");

    expect(paragraphs.length).toBe(1);
  });

  it("deveria renderizar dois paragrafo com a lista com itens", async () => {
    const wrapper = mountComponentWithVuetifyAndPinia(ExTotal, pinia);

    const store = useCart();
    store.addProduct({
      amount: 1,
      id: 1,
      name: "mock",
      price: 100,
    });

    await wrapper.vm.$nextTick();

    const paragraphs = wrapper.findAll("p");

    expect(paragraphs.length).toBe(2);
  });

  it("should render total correctly", async () => {
    const wrapper = mountComponentWithVuetifyAndPinia(ExTotal, pinia);

    const store = useCart();

    store.clearCart();

    store.addProduct({
      amount: 1,
      id: 1,
      name: "mock",
      price: 100,
    });

    const formatedCurrency = currencyFormat(100);

    await wrapper.vm.$nextTick();

    const p = wrapper.find('p[data-test-id="totalParagraph"]');

    expect(p.text()).toContain(formatedCurrency);
  });

  it("should clear total when clearParagraph is clicked ", async () => {
    const wrapper = mountComponentWithVuetifyAndPinia(ExTotal, pinia);

    const store = useCart();

    const p = wrapper.find('p[data-test-id="clearParagraph"]');

    await p.trigger("click");

    expect(store.clearCart).toHaveBeenCalledTimes(1);
  });
});
