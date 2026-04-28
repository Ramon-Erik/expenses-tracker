import App from "@/App.vue";
import { shallowMount } from "@vue/test-utils";

describe("App", () => {
  const stubs = {
    ExHeader: true,
    ExMenu: true,
    ExFooter: true,
    "router-view": true,
  };

  const wrapper = shallowMount(App, {
    global: {
      stubs,
    },
  });

  it("should render header", () => {
    expect(wrapper.findComponent({ name: "ExHeader" }).exists()).toBe(true);
  });

  it("should render menu", () => {
    expect(wrapper.findComponent({ name: "ExMenu" }).exists()).toBe(true);
  });

  it("should render footer", () => {
    expect(wrapper.findComponent({ name: "ExFooter" }).exists()).toBe(true);
  });

  it("should render router-view", () => {
    expect(wrapper.findComponent({ name: "router-view" }).exists()).toBe(true);
  });
});
