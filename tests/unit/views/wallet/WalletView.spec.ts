import WalletView from "@/views/wallet/WalletView.vue";
import { mountComponentWithVuetify } from "../../../test-utils/mountComponent";

describe("WalletView", () => {
  const wrapper = mountComponentWithVuetify(WalletView, {
    global: {
      stubs: {
        ExMonthResume: true,
        ExNewTransaction: true,
        ExTransactionsList: true,
      },
    },
  });

  it("deveria renderizar MonthResume", () => {
    expect(wrapper.findComponent({ name: "ExMonthResume" }).exists()).toBe(
      true
    );
  });

  it("deveria renderizar NewTransaction", () => {
    expect(wrapper.findComponent({ name: "ExNewTransaction" }).exists()).toBe(
      true
    );
  });

  it("deveria renderizar TransactionsList", () => {
    expect(wrapper.findComponent({ name: "ExTransactionsList" }).exists()).toBe(
      true
    );
  });
});
