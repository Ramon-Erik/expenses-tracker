import App from "@/App.vue";
import { shallowMount } from "@vue/test-utils";

describe("App", () => {
  it("should render its components", () => {
    const wrapper = shallowMount(App, {
      global: {
        stubs: {
          ExHeader: true,
          ExFooter: true,
          ExMenu: true,
          "router-view": true,
        },
      },
    });
    expect(wrapper.findComponent({ name: "ExHeader" }).exists()).toBe(true);
    expect(wrapper.findComponent({ name: "ExFooter" }).exists()).toBe(true);
    expect(wrapper.findComponent({ name: "ExMenu" }).exists()).toBe(true);
  });
});
