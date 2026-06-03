import ExNewProduct from "@/views/simulate/components/ExNewProduct.vue";
import { useCart } from "@/stores/CartStore";
import {
  mountComponentWithVuetify,
  mountComponentWithVuetifyAndPinia,
} from "../../../../test-utils/mountComponent";
import { createTestingPinia } from "@pinia/testing";

describe("ExNewProduct", () => {
  const pinia = createTestingPinia();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should have only three inputs rendered", () => {
    const wrapper = mountComponentWithVuetify(ExNewProduct);
    const inputs = wrapper.findAll("input");
    expect(inputs.length).toBe(3);
  });

  it("should not add products without price", async () => {
    const wrapper = mountComponentWithVuetifyAndPinia(ExNewProduct, pinia);
    const store = useCart();

    const nameInput = wrapper.find("input#productName");
    await nameInput.setValue("mock");

    const priceInput = wrapper.find("input#price");

    await priceInput.trigger("keyup.enter");

    const priceInputElement = priceInput.element as HTMLInputElement;

    await wrapper.vm.$nextTick();
    expect(priceInputElement.value).toBe("0.00");
    expect(store.addProduct).not.toHaveBeenCalled();
  });

  it("should add products with name and price and clear inputs", async () => {
    const wrapper = mountComponentWithVuetifyAndPinia(ExNewProduct, pinia);
    const store = useCart();

    const nameInput = wrapper.find("input#productName");
    const priceInput = wrapper.find("input#price");

    await nameInput.setValue("mock");
    await priceInput.setValue(1000);

    await nameInput.trigger("input");
    await priceInput.trigger("keyup.enter");

    expect(store.addProduct).toHaveBeenCalledTimes(1);

    await wrapper.vm.$nextTick();
    const priceInputElement = priceInput.element as HTMLInputElement;
    const nameInputElement = nameInput.element as HTMLInputElement;

    expect(priceInputElement.value).toBe("0.00");
    expect(nameInputElement.value).toBe("");
  });
});
