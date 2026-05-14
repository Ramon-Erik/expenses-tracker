import SimulateCartView from "@/views/simulate/SimulateCartView.vue";
import { shallowMount } from "@vue/test-utils";

describe("SimulateCartView", () => {
  const wrapper = shallowMount(SimulateCartView);

  it("should render four component", () => {
    expect(wrapper.findAll(".container > *").length).toBe(4);
  });

  it("should render Amount component", () => {
    expect(wrapper.findComponent({ name: "ExAmount" }).exists()).toBe(true);
  });

  it("should render ProductsList component", () => {
    expect(wrapper.findComponent({ name: "ExProductsList" }).exists()).toBe(
      true
    );
  });

  it("should render Total component", () => {
    expect(wrapper.findComponent({ name: "ExTotal" }).exists()).toBe(true);
  });
});
