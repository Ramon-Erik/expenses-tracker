import { shallowMount, VueWrapper } from "@vue/test-utils";
import ExAddTransaction from "@/views/wallet/components/ExAddTransaction.vue";
import ExAddModal from "@/views/wallet/components/ExAddModal.vue";

type ExAddTransactionInstance = InstanceType<typeof ExAddTransaction>;

describe("ExAddTransaction.vue", () => {
  const createWrapper = () => {
    return shallowMount(
      ExAddTransaction
    ) as unknown as VueWrapper<ExAddTransactionInstance>;
  };

  it("should have isModalOpen as false by default", () => {
    const wrapper = createWrapper();
    expect(wrapper.findComponent(ExAddModal).props("isModalOpen")).toBe(false);
  });

  it("should toggle isModalOpen when button is clicked", async () => {
    const wrapper = createWrapper();
    const button = wrapper.find(".plus-button");

    await button.trigger("click");
    expect(wrapper.findComponent(ExAddModal).props("isModalOpen")).toBe(true);

    await button.trigger("click");
    expect(wrapper.findComponent(ExAddModal).props("isModalOpen")).toBe(false);
  });

  it("should close modal when ExAddModal emits close-modal", async () => {
    const wrapper = createWrapper();
    const modal = wrapper.findComponent(ExAddModal);

    await wrapper.find(".plus-button").trigger("click");
    expect(modal.props("isModalOpen")).toBe(true);

    await modal.vm.$emit("closeModal");
    expect(modal.props("isModalOpen")).toBe(false);
  });

  it("should toggle modal state multiple times", async () => {
    const wrapper = createWrapper();
    const button = wrapper.find(".plus-button");

    await button.trigger("click"); // Abre
    expect(wrapper.vm.isModalOpen).toBe(true);

    await button.trigger("click"); // Fecha
    expect(wrapper.vm.isModalOpen).toBe(false);
  });
});
