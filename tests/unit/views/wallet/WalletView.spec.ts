import WalletView from "@/views/wallet/WalletView.vue";
import { shallowMount } from "@vue/test-utils";

describe("WalletView", () => {
  it("Should render only trhee components", () => {
    const wrapper = shallowMount(WalletView, { shallow: true });
    const components = wrapper.findAll(".container > *");

    expect(components.length).toBe(3);
  });
});
