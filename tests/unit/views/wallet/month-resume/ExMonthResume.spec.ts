import ExMonthResume from "@/views/wallet/month-resume/ExMonthResume.vue";
import { mount } from "@vue/test-utils";
import { createVuetify } from "vuetify";
import * as components from "vuetify/dist/vuetify";
import * as directives from "vuetify/dist/vuetify";

globalThis.ResizeObserver = require("resize-observer-polyfill");

const vuetify = createVuetify({ components, directives });

describe("ExMonthResume", () => {
  const mountComponent = () => {
    return mount(ExMonthResume, {
      shallow: true,
      global: {
        plugins: [vuetify],
        components: (components as any).components,
      },
    });
  };
  it("deveria mostrar o mês e ano atual", () => {
    const wrapper = mountComponent();

    const date = new Date().toLocaleString("pt-BR", {
      month: "long",
      year: "numeric",
    });

    expect(wrapper.text()).toContain(date);
  });
});
