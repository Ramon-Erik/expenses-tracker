import ExTotal from "@/views/simulate/components/ExTotal.vue";
import { createTestingPinia } from "@pinia/testing";
import { shallowMount } from "@vue/test-utils";

describe("ExTotal", () => {
  it("should render two paragraphs", () => {
    const wrapper = shallowMount(ExTotal, {
      global: { plugins: [createTestingPinia()] },
    });

    const paragraphs = wrapper.findAll("p");

    expect(paragraphs.length).toBe(2);
  });
});
