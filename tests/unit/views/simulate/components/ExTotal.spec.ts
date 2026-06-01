// import { useCart } from "@/stores/CartStore";
// import { currencyFormat } from "@/utils/currency";
// import ExTotal from "@/views/simulate/components/ExTotal.vue";
// import { createTestingPinia } from "@pinia/testing";
// import { mount } from "@vue/test-utils";

// describe("ExTotal", () => {
//   beforeEach(() => {
//     localStorage.clear();
//   });

//   it("should render two paragraphs", () => {
//     const wrapper = mount(ExTotal, {
//       global: { plugins: [createTestingPinia()] },
//     });

//     const paragraphs = wrapper.findAll("p");

//     expect(paragraphs.length).toBe(2);
//   });

//   it("should render total correctly", async () => {
//     const wrapper = mount(ExTotal, {
//       global: {
//         plugins: [createTestingPinia({ stubActions: false })],
//       },
//     });

//     const store = useCart();
//     store.addProduct({
//       amount: 1,
//       id: 1,
//       name: "mock",
//       price: 100,
//     });

//     const formatedCurrency = currencyFormat(100);

//     await wrapper.vm.$nextTick();

//     const p = wrapper.find('p[data-test-id="totalParagraph"]');

//     expect(p.text()).toContain(formatedCurrency);
//   });

//   it("should clear total when clearParagraph is clicked ", async () => {
//     const wrapper = mount(ExTotal, {
//       global: {
//         plugins: [createTestingPinia({ stubActions: false })],
//       },
//     });

//     const store = useCart();

//     const p = wrapper.find('p[data-test-id="clearParagraph"]');

//     await p.trigger("click");

//     expect(store.clearCart).toHaveBeenCalledTimes(1);
//   });
// });
