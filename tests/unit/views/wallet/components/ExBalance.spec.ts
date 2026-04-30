import ITransaction from "@/interfaces/ITransaction.interface";
import { useTransactionsStore } from "@/stores/TransactionsStore";
import { currencyFormat } from "@/utils/currency";
import ExBalance from "@/views/wallet/components/ExBalance.vue";
import { createTestingPinia } from "@pinia/testing";
import { mount, VueWrapper } from "@vue/test-utils";

describe("ExBalance", () => {
  const mountComponent = (configs = {}) => {
    return mount(ExBalance, {
      global: {
        plugins: [
          createTestingPinia({
            stubActions: false,
          }),
        ],
      },
      ...configs,
    });
  };

  it("should have a paragraph with total amount", async () => {
    const wrapper: VueWrapper<InstanceType<typeof ExBalance>> =
      mountComponent();
    const store = useTransactionsStore();

    const expenses: ITransaction[] = [
      {
        id: 1,
        description: "string",
        amount: 100,
        isIncome: true,
      },
      {
        id: 22,
        description: "mock",
        amount: -10,
        isIncome: false,
      },
    ];

    const totalMoney = expenses.reduce(
      (acc, nextTransaction) => acc + nextTransaction.amount,
      0
    );

    expenses.some((ex) => store.addTransaction(ex));

    await wrapper.vm.$nextTick();

    expect(wrapper.find("p#balance").text()).toContain(
      currencyFormat(totalMoney)
    );
  });
});
