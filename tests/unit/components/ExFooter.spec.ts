/// <reference types="jest" />

import ExFooter from "@/components/ExFooter.vue";
import { mount } from "@vue/test-utils";

describe("Footer", () => {
  it('Should render "Desenvolvido por Ramon"', () => {
    const wrapper = mount(ExFooter);
    expect(wrapper.text()).toBe("Desenvolvido por Ramon");
  });
});
