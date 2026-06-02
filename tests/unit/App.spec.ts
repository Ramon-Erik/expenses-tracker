import App from "@/App.vue";
import { mountComponentWithVuetify } from "../test-utils/mountComponent";

describe("App", () => {
  const wrapper = mountComponentWithVuetify(App, {
    global: {
      stubs: {
        ExMenu: true,
        ExFooter: true,
        ExToggleTheme: true,
        "router-view": true,
      },
    },
  });

  it("should render menu", () => {
    expect(wrapper.findComponent({ name: "ExMenu" }).exists()).toBe(true);
  });

  it("should render footer", () => {
    expect(wrapper.findComponent({ name: "ExFooter" }).exists()).toBe(true);
  });

  it("should render toggle theme", () => {
    expect(wrapper.findComponent({ name: "ExToggleTheme" }).exists()).toBe(
      true
    );
  });

  it("should render router-view", () => {
    expect(wrapper.findComponent({ name: "router-view" }).exists()).toBe(true);
  });
});
