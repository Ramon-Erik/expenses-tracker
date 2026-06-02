import ExFooter from "@/components/ExFooter.vue";
import { mountComponent } from "../../test-utils/mountComponent";

describe("Footer", () => {
  it('Should render "Desenvolvido por Ramon ©"', () => {
    const wrapper = mountComponent(ExFooter);
    expect(wrapper.text()).toBe("Desenvolvido por Ramon ©");
  });
});
