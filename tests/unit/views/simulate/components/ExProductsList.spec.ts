import { useCart } from "@/stores/CartStore";
import { currencyFormat } from "@/utils/currency";
import ExProductsList from "@/views/simulate/components/ExProductsList.vue";
import { createTestingPinia } from "@pinia/testing";
import { mountComponentWithVuetifyAndPinia } from "../../../../test-utils/mountComponent";

describe("ExProductsList", () => {
  const pinia = createTestingPinia({ stubActions: false });
  beforeEach(() => {
    localStorage.clear();
  });

  it("não deveria carregar uma lista no início", () => {
    const wrapper = mountComponentWithVuetifyAndPinia(ExProductsList, pinia);

    const ul = wrapper.find("ul");

    expect(ul.exists()).toBe(false);
  });

  it("deveria carregar apenas itens do carrinho", async () => {
    const store = useCart();
    const mockProds = [
      {
        amount: 1,
        id: 1,
        name: "mock",
        price: 100,
      },

      {
        amount: 2,
        id: 2,
        name: "mock 2",
        price: 10,
      },
    ];

    store.addProduct(mockProds[0]);

    store.addProduct(mockProds[1]);

    const wrapper = mountComponentWithVuetifyAndPinia(ExProductsList, pinia);

    await wrapper.vm.$nextTick();

    const li = wrapper.findAll(".v-list-item");

    expect(li.length).toBe(2);

    li.forEach((prod, index) => {
      const amount = prod.find("span.item-amount");
      const name = prod.find("span.item-name");
      const price = prod.find("span.item-price");

      expect(amount.text()).toBe(`${mockProds[index].amount}x`);
      expect(name.text()).toBe(`${mockProds[index].name}`);
      expect(price.text()).toBe(currencyFormat(mockProds[index].price));
    });
  });

  it("deveria apagar o item no dbl click e atualizar a lista", async () => {
    const store = useCart();
    const mockProds = [
      {
        amount: 1,
        id: 1,
        name: "mock",
        price: 100,
      },

      {
        amount: 2,
        id: 2,
        name: "mock 2",
        price: 10,
      },
    ];

    store.addProduct(mockProds[0]);

    const wrapper = mountComponentWithVuetifyAndPinia(ExProductsList, pinia);

    await wrapper.vm.$nextTick();

    const li = wrapper.find(".v-list-item");
    await li.trigger("dblclick");

    expect(store.removeProduct).toBeCalledTimes(1);
  });
});
