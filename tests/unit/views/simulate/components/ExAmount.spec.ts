import { useCart } from "@/stores/CartStore";
import { currencyFormat } from "@/utils/currency";
import ExAmount from "@/views/simulate/components/ExAmount.vue";
import { createTestingPinia } from "@pinia/testing";
import { mount } from "@vue/test-utils";

describe("ExAmount", () => {
  it("should render a paragraph with money left", () => {
    const wrapper = mount(ExAmount, {
      global: {
        plugins: [createTestingPinia()],
      },
    });

    const p = wrapper.find('p[data-test-id="totalParagraph"');

    const store = useCart();
    const formatedTotal = currencyFormat(store.total);

    expect(p.text()).toContain(formatedTotal);
  });
});
