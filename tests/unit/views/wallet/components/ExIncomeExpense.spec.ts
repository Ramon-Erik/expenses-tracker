// import { useTransactionsStore } from "@/stores/TransactionsStore";
// import ExIncomeExpense from "@/views/wallet/components/ExIncomeExpense.vue";
// import { createTestingPinia } from "@pinia/testing";
// import { mount } from "@vue/test-utils";

// describe("ExIncomeExpense", () => {
//   const mountComponent = () => {
//     return mount(ExIncomeExpense, {
//       global: {
//         plugins: [createTestingPinia({ stubActions: false })],
//       },
//     });
//   };

//   it("should render only two paragraphs", () => {
//     const wrapper = mountComponent();

//     const p = wrapper.findAll("p");

//     expect(p.length).toBe(2);
//   });

//   it("should update incomes and outcomes", async () => {
//     const wrapper = mountComponent();

//     const incomes = wrapper.find("p[data-test-id='incomes'");
//     const outcomes = wrapper.find('p[data-test-id="outcomes"');

//     await wrapper.vm.$nextTick();

//     expect(incomes.text()).toContain("0");
//     expect(outcomes.text()).toContain("0");

//     const store = useTransactionsStore();
//     const expenses = [
//       {
//         id: 1,
//         description: "string",
//         amount: 100,
//         isIncome: true,
//       },
//       {
//         id: 22,
//         description: "mock",
//         amount: -10,
//         isIncome: false,
//       },
//     ];

//     expenses.some((ex) => store.addTransaction(ex));

//     await wrapper.vm.$nextTick();

//     expect(incomes.text()).toContain("100");
//     expect(outcomes.text()).toContain("10");
//   });
// });
