import { shallowMount } from "@vue/test-utils";
import { createTestingPinia } from "@pinia/testing";
import { nextTick } from "vue";
import ExTransactionList from "@/views/wallet/components/ExTransactionList.vue";
import { useTransactionsStore } from "@/stores/TransactionsStore";

describe("ExTransactionList.vue", () => {
  const createWrapper = () => {
    return shallowMount(ExTransactionList, {
      global: {
        plugins: [
          createTestingPinia({
            stubActions: false,
          }),
        ],
        stubs: {
          ExAddTransaction: true,
        },
      },
    });
  };

  beforeEach(() => {
    localStorage.clear();
  });

  it("should render warning message when list is empty", () => {
    const wrapper = createWrapper();

    expect(wrapper.find(".warning").exists()).toBe(true);
    expect(wrapper.find("#list").exists()).toBe(false);
  });

  it("should render transactions list correctly", async () => {
    const wrapper = createWrapper();
    const store = useTransactionsStore();

    store.addTransaction({
      id: 1,
      description: "Freelance",
      amount: 2000,
      isIncome: true,
    });

    store.addTransaction({
      id: 2,
      description: "Rent",
      amount: -1000,
      isIncome: false,
    });

    await nextTick();

    const items = wrapper.findAll("li");
    expect(items).toHaveLength(2);
    expect(items[0].classes()).toContain("plus");
    expect(items[1].classes()).toContain("minus");
    expect(items[0].text()).toContain("Freelance");
  });

  it("should call delete action when delete button is clicked", async () => {
    const wrapper = createWrapper();
    const store = useTransactionsStore();

    store.addTransaction({
      id: 99,
      description: "Utility bill",
      amount: -100,
      isIncome: false,
    });

    await nextTick();

    await wrapper.find(".delete-btn").trigger("click");

    expect(store.deleteTransaction).toHaveBeenCalledWith(99);
  });
});
