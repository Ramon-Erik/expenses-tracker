import SimulateCartView from "@/views/simulate/SimulateCartView.vue";
import { mountComponentWithVuetify } from "../../../test-utils/mountComponent";

describe("SimulateCartView", () => {
  const wrapper = mountComponentWithVuetify(SimulateCartView, {
    global: {
      stubs: {
        ExAmount: true,
        ExNewProduct: true,
        ExProductsList: true,
        ExTotal: true,
      },
    },
  });

  it("should render four component", () => {
    expect(wrapper.findAll(".v-card-text > *").length).toBe(4);
  });

  it("should render Amount component", () => {
    expect(wrapper.findComponent({ name: "ExAmount" }).exists()).toBe(true);
  });

  it("should render NewProduct component", () => {
    expect(wrapper.findComponent({ name: "ExNewProduct" }).exists()).toBe(true);
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
