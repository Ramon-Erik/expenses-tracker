import { useCart } from "@/stores/CartStore";
import { currencyFormat } from "@/utils/currency";
import ExProductsList from "@/views/simulate/components/ExProductsList.vue";
import { createTestingPinia } from "@pinia/testing";
import { mount } from "@vue/test-utils";

describe("ExProductsList", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it("should render a ul", () => {
    const wrapper = mount(ExProductsList, {
      global: {
        plugins: [createTestingPinia()],
      },
    });

    const ul = wrapper.find("ul.cart-list");

    expect(ul.exists()).toBe(true);
  });

  it("should render only and exactly cart items", async () => {
    const wrapper = mount(ExProductsList, {
      global: {
        plugins: [createTestingPinia({ stubActions: false })],
      },
    });

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

    await wrapper.vm.$nextTick();

    const li = wrapper.findAll("li.cart-item");

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

  it("should delete item when it is double clicked and update ul", async () => {
    const wrapper = mount(ExProductsList, {
      global: {
        plugins: [
          createTestingPinia({
            stubActions: false,
          }),
        ],
      },
    });

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

    await wrapper.vm.$nextTick();

    const li = wrapper.find("li.cart-item");
    await li.trigger("dblclick");

    expect(store.removeProduct).toBeCalledTimes(1);
  });
});
