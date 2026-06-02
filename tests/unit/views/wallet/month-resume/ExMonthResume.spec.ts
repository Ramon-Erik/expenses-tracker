import ExMonthResume from "@/views/wallet/month-resume/ExMonthResume.vue";
import { mountComponentWithVuetify } from "../../../../test-utils/mountComponent";

describe("ExMonthResume", () => {
  const wrapper = mountComponentWithVuetify(ExMonthResume, {
    global: { stubs: { ExMonthBalance: true } },
  });

  it("deveria mostrar o mês e ano atual", () => {
    const date = new Date().toLocaleString("pt-BR", {
      month: "long",
      year: "numeric",
    });

    expect(wrapper.text()).toContain(date);
  });

  it("deveria carregar o componente MonthBalance", () => {
    expect(wrapper.findComponent({ name: "ExMonthBalance" }).exists()).toBe(
      true
    );
  });
});
