import ExToggleTheme from "@/components/ExToggleTheme.vue";
import { mountComponentWithVuetify } from "../../test-utils/mountComponent";

const localKey = "ex-local-th";

describe("ExToggleMenu", () => {
  it("deveria renderizar um botão", () => {
    const wrapper = mountComponentWithVuetify(ExToggleTheme);

    const btn = wrapper.findComponent({ name: "VBtn" });

    expect(btn.exists()).toBe(true);
  });

  it("deveria alterar o tema apenas para light e darkTheme", async () => {
    const wrapper = mountComponentWithVuetify(ExToggleTheme);
    const toggleThemeSpy = jest.spyOn(Storage.prototype, "setItem");
    const btn = wrapper.findComponent({ name: "VBtn" });

    await btn.trigger("click");

    let theme = localStorage.getItem(localKey);

    expect(theme).toBe("light");

    await btn.trigger("click");
    theme = localStorage.getItem(localKey);
    expect(theme).toBe("darkTheme");

    await btn.trigger("click");
    theme = localStorage.getItem(localKey);
    expect(theme).toBe("light");

    expect(toggleThemeSpy).toBeCalledTimes(3);
  });
});
